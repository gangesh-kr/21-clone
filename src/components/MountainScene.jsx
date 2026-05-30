import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Cloud } from '@react-three/drei'
import { EffectComposer, Vignette, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useRef, useLayoutEffect, useEffect, Suspense, useMemo, useState } from 'react'
import * as THREE from 'three'

function MountainModel() {
  const [modelPath, setModelPath] = useState('/hero_mountain.glb')

  useEffect(() => {
    fetch('/terrain_alpine.glb', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type')
        if (res.ok && contentType && !contentType.includes('text/html')) {
          setModelPath('/terrain_alpine.glb')
        }
      })
      .catch(() => { })
  }, [])

  const { scene } = useGLTF(modelPath)

  // Load new texture assets
  const [
    mountainTexture,
    rockNormal,
    noiseSolidNormal,
    noiseTexture,
    perlinNoise
  ] = useTexture([
    '/mountain-range.png',
    '/rock_normal.webp',
    '/noise-solid-normal.webp',
    '/noise.webp',
    '/perlinNoise.webp'
  ])

  const modelRef = useRef()
  const baseY = -5.5

  const isAlpine = modelPath === '/terrain_alpine.glb'

  // Dynamic layout values: adjust scaling/position for Sketchfab model vs default
  const modelScale = isAlpine ? [1.5, 1.5, 1.5] : [26, 18, 26]
  const modelPosition = isAlpine ? [0, baseY + 1.2, -6.5] : [0, baseY, -7.5]
  const modelRotation = isAlpine ? [0, 0, 0] : [0.05, -0.2, 0]

  // Smooth scroll and mouse parallax animations inside WebGL loop
  useFrame((state) => {
    if (!modelRef.current) return
    const t = state.clock.getElapsedTime()
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

    // Target values: mountain slowly shifts right and tilts based on scroll and mouse pointer
    const baseRotY = isAlpine ? 0.0 : -0.2
    const baseRotX = isAlpine ? 0.0 : 0.05
    const targetRotY = baseRotY + Math.sin(t * 0.012) * 0.006 + state.pointer.x * 0.06 - scrollPercent * 0.25
    const targetRotX = baseRotX + state.pointer.y * 0.025 + scrollPercent * 0.04
    
    // Add small translation parallax to the mountain on mouse movement
    const basePosX = 0.0
    const basePosY = isAlpine ? baseY + 1.2 : baseY
    const targetPosX = basePosX + state.pointer.x * 0.18
    const targetPosY = basePosY - scrollPercent * 1.5 + state.pointer.y * 0.1

    // Smoothly lerp towards target
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.05)
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.05)
    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetPosX, 0.05)
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetPosY, 0.05)
  })

  // Full cinematic material stack
  useLayoutEffect(() => {
    // 1. Color map settings
    mountainTexture.colorSpace = THREE.SRGBColorSpace
    mountainTexture.wrapS = THREE.RepeatWrapping
    mountainTexture.wrapT = THREE.RepeatWrapping
    mountainTexture.anisotropy = 16
    mountainTexture.minFilter = THREE.LinearMipmapLinearFilter

    // 2. Rock Normal map settings
    rockNormal.wrapS = THREE.RepeatWrapping
    rockNormal.wrapT = THREE.RepeatWrapping
    rockNormal.repeat.set(12, 12)
    rockNormal.anisotropy = 16

    // 3. Noise Solid Normal settings
    noiseSolidNormal.wrapS = THREE.RepeatWrapping
    noiseSolidNormal.wrapT = THREE.RepeatWrapping
    noiseSolidNormal.repeat.set(48, 48)
    noiseSolidNormal.anisotropy = 16

    // 4. Noise height bump map settings
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping
    noiseTexture.repeat.set(48, 48)
    noiseTexture.anisotropy = 16

    // 5. Perlin Noise (roughness) settings
    perlinNoise.wrapS = THREE.RepeatWrapping
    perlinNoise.wrapT = THREE.RepeatWrapping
    perlinNoise.repeat.set(12, 12)
    perlinNoise.anisotropy = 16

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false
        child.receiveShadow = false

        if (child.material) {
          // Base photographic texture
          child.material.map = mountainTexture
          child.material.color.setRGB(1.0, 1.0, 1.0) // Set to pure white so the map colors show through fully

          // Apply primary physical textures
          child.material.normalMap = rockNormal
          if (child.material.normalScale) {
            child.material.normalScale.set(1.5, 1.5)
          } else {
            child.material.normalScale = new THREE.Vector2(1.5, 1.5)
          }

          // Use perlinNoise as a roughnessMap to add lighting variance
          child.material.roughnessMap = perlinNoise
          child.material.roughness = 0.92
          child.material.metalness = 0.0
          child.material.envMapIntensity = 0.12

          // Use noiseTexture as a high-frequency height bump map
          child.material.bumpMap = noiseTexture
          child.material.bumpScale = 0.035

          // GPU-level shader injection to blend the second normal map (noiseSolidNormal) as a detail layer
          child.material.onBeforeCompile = (shader) => {
            shader.uniforms.detailNormalMap = { value: noiseSolidNormal }
            shader.uniforms.detailNormalScale = { value: new THREE.Vector2(0.7, 0.7) }

            // Inject uniform declarations
            shader.fragmentShader = shader.fragmentShader.replace(
              'uniform float opacity;',
              `uniform float opacity;
               uniform sampler2D detailNormalMap;
               uniform vec2 detailNormalScale;`
            )

            // Perturb the fragment normal further by blending the detail normal map
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <normal_fragment_maps>',
              `#include <normal_fragment_maps>
               vec3 detailNormalVal = texture2D( detailNormalMap, vNormalMapUv * 4.0 ).xyz * 2.0 - 1.0;
               detailNormalVal.xy *= detailNormalScale;
               normal = normalize(vec3(normal.xy + detailNormalVal.xy, normal.z * detailNormalVal.z));`
            )
          }

          child.material.needsUpdate = true
        }
      }
    })
  }, [scene, mountainTexture, rockNormal, noiseSolidNormal, noiseTexture, perlinNoise])

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={modelScale}
      position={modelPosition}
      rotation={modelRotation}
    />
  )
}

// Floating dust particle layer with scroll sensitivity
function FloatingParticles({ count = 180 }) {
  const pointsRef = useRef()

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4
      spd[i] = 0.015 + Math.random() * 0.02
    }
    return [pos, spd]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

    const positionsArray = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Particles speed up their upward drift as scroll progress increases
      positionsArray[i * 3 + 1] += speeds[i] * (1.0 + scrollPercent * 4.0)
      positionsArray[i * 3] += Math.sin(t * 0.5 + i) * 0.0015

      // Wrap particles back to the bottom when they go off screen
      if (positionsArray[i * 3 + 1] > 8) {
        positionsArray[i * 3 + 1] = -8
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#a5f3fc"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Camera Rig tracking scroll journey
function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

    // Dynamic scroll journey for camera:
    // Pushes inward, elevates height, and offsets right to follow DOM text reading sections
    const targetCamZ = 5 - scrollPercent * 1.6
    const targetCamY = 0.3 + scrollPercent * 1.8
    const targetCamX = 0 + scrollPercent * 1.5

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05)

    // Center of focus slides slightly right and down to shift backdrop composition
    const targetLookAt = new THREE.Vector3(
      scrollPercent * 0.8,
      -scrollPercent * 1.0,
      0
    )
    camera.lookAt(targetLookAt)
  })

  return null
}

// Dynamic lighting overlay matching scroll depths and transition states
function DynamicLighting() {
  const ambLightRef = useRef()
  const hemiLightRef = useRef()
  const dirLightRef = useRef()

  useFrame(() => {
    const scrollY = window.scrollY
    const transitionPercent = Math.min(scrollY / window.innerHeight, 1.0)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

    // Smoothly lerp intensities from bright daylight (at scroll 0) to darker cinematic navy
    if (ambLightRef.current) {
      ambLightRef.current.intensity = THREE.MathUtils.lerp(0.75, 0.4, transitionPercent)
    }
    if (hemiLightRef.current) {
      hemiLightRef.current.intensity = THREE.MathUtils.lerp(0.45, 0.25, transitionPercent)
    }
    if (dirLightRef.current) {
      const baseIntensity = THREE.MathUtils.lerp(0.9, 0.65, transitionPercent)
      dirLightRef.current.intensity = THREE.MathUtils.lerp(baseIntensity, 0.25, scrollPercent)
    }
  })

  return (
    <>
      <ambientLight ref={ambLightRef} intensity={0.75} color="#e4ecf2" />
      <hemisphereLight ref={hemiLightRef} skyColor="#d5e0ea" groundColor="#f0ede8" intensity={0.45} />

      <directionalLight
        ref={dirLightRef}
        position={[-10, 12, 8]}
        intensity={0.9}
        color="#eef2f6"
      />

      <directionalLight
        position={[8, 5, -3]}
        intensity={0.18}
        color="#e0e8f0"
      />
    </>
  )
}

// Atmospheric fog — density increases and color darkens on scroll
function AtmosphericFog() {
  const { scene } = useThree()

  useFrame(() => {
    const scrollY = window.scrollY
    const transitionPercent = Math.min(scrollY / window.innerHeight, 1.0)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

    // Interpolate fog color from light gray-blue '#cbd3db' to deep navy '#0a0e17'
    const colorStart = new THREE.Color('#cbd3db')
    const colorEnd = new THREE.Color('#0a0e17')
    const currentFogColor = colorStart.lerp(colorEnd, transitionPercent)

    const targetDensity = 0.015 + scrollPercent * 0.015
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor)
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetDensity, 0.05)
    }
  })

  useLayoutEffect(() => {
    scene.fog = new THREE.FogExp2('#cbd3db', 0.015)
    return () => { scene.fog = null }
  }, [scene])

  return null
}

// Cinematic postprocessing stack
function CinematicPost() {
  return (
    <EffectComposer>
      <HueSaturation
        blendFunction={BlendFunction.NORMAL}
        saturation={-0.18}
      />
      <BrightnessContrast
        brightness={0.03}
        contrast={-0.08}
      />
      <Vignette
        offset={0.35}
        darkness={0.25}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

// Flowing volumetric clouds layer positioned to overlap/wrap the mountain peaks
function FlowingClouds({ isAlpine }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Slow organic wind drift movement in X and Z directions
    groupRef.current.position.x = Math.sin(t * 0.03) * 1.2
    groupRef.current.position.z = Math.cos(t * 0.015) * 0.5
  })

  // Set positions relative to whether we render terrain_alpine or standard hero mountain
  const zBase = isAlpine ? -5.3 : -5.0
  const yBase = isAlpine ? 0.8 : 0.0

  return (
    <group ref={groupRef}>
      {/* Cloud 1: Main front cloud covering the lower section and base */}
      <Cloud
        texture="/cloud-particle.png"
        position={[0, -2.8 + yBase, zBase + 0.6]}
        speed={0.15}
        opacity={0.42}
        segments={22}
        bounds={[14, 1.6, 5]}
        color="#cbd3db"
      />

      {/* Cloud 2: Drifts over the left ridge */}
      <Cloud
        texture="/cloud-particle.png"
        position={[-6, -1.2 + yBase, zBase + 0.2]}
        speed={0.1}
        opacity={0.38}
        segments={16}
        bounds={[8, 1.4, 3]}
        color="#dcdfe3"
      />

      {/* Cloud 3: Drifts over the right ridge */}
      <Cloud
        texture="/cloud-particle.png"
        position={[6, -0.8 + yBase, zBase + 0.2]}
        speed={0.08}
        opacity={0.35}
        segments={16}
        bounds={[8, 1.4, 3]}
        color="#dcdfe3"
      />

      {/* Cloud 4: Soft upper layer shrouding the peaks directly */}
      <Cloud
        texture="/cloud-particle.png"
        position={[0, 0.4 + yBase, zBase - 0.2]}
        speed={0.06}
        opacity={0.28}
        segments={20}
        bounds={[12, 1.8, 4]}
        color="#f4f6f8"
      />
    </group>
  )
}

export default function MountainScene() {
  const wrapperRef = useRef()
  const [modelPath, setModelPath] = useState('/hero_mountain.glb')

  useEffect(() => {
    fetch('/terrain_alpine.glb', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type')
        if (res.ok && contentType && !contentType.includes('text/html')) {
          setModelPath('/terrain_alpine.glb')
        }
      })
      .catch(() => {})
  }, [])

  const isAlpine = modelPath === '/terrain_alpine.glb'

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return
      const scrollY = window.scrollY
      const transitionPercent = Math.min(scrollY / window.innerHeight, 1.0)

      // Interpolate background color of wrapper from glacier gray #cbd3db (rgb 203, 211, 219) to deep charcoal navy #0a0e17 (rgb 10, 14, 23)
      const r = Math.round(203 + (10 - 203) * transitionPercent)
      const g = Math.round(211 + (14 - 211) * transitionPercent)
      const b = Math.round(219 + (23 - 219) * transitionPercent)
      wrapperRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={wrapperRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#cbd3db] transition-colors duration-200">
      <Canvas
        camera={{ position: [0, 0.3, 5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <DynamicLighting />
        <AtmosphericFog />

        <Suspense fallback={null}>
          <MountainModel modelPath={modelPath} isAlpine={isAlpine} />
          <FloatingParticles />
          <FlowingClouds isAlpine={isAlpine} />
        </Suspense>

        <CameraRig />
        <CinematicPost />
      </Canvas>
    </div>
  )
}
