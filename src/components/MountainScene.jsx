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
  const materialsRef = useRef([])
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
    const heroHeight = window.innerHeight
    const heroScrollPercent = Math.min(scrollY / heroHeight, 1.0)

    // Target values: mountain slowly shifts right and tilts based on scroll and mouse pointer
    const baseRotY = isAlpine ? 0.0 : -0.2
    const baseRotX = isAlpine ? 0.0 : 0.05
    const targetRotY = baseRotY + Math.sin(t * 0.012) * 0.006 + state.pointer.x * 0.06 - heroScrollPercent * 0.25
    const targetRotX = baseRotX + state.pointer.y * 0.025 + heroScrollPercent * 0.04
    
    // Add small translation parallax to the mountain on mouse movement
    const basePosX = 0.0
    const basePosY = isAlpine ? baseY + 1.2 : baseY
    const targetPosX = basePosX + state.pointer.x * 0.18
    const targetPosY = basePosY - heroScrollPercent * 1.5 + state.pointer.y * 0.1

    // Move mountain away from camera in Z-axis based on scroll
    const basePosZ = isAlpine ? -6.5 : -7.5
    const targetPosZ = basePosZ - heroScrollPercent * 28.0

    // Smoothly lerp towards target
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.05)
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.05)
    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetPosX, 0.05)
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetPosY, 0.05)
    modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, targetPosZ, 0.05)

    // Smoothly fade out mountain opacity as we scroll past 15% of the hero section
    const targetOpacity = Math.max(0, Math.min(1, 1 - (heroScrollPercent - 0.15) / 0.55))
    materialsRef.current.forEach((mat) => {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05)
    })
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

    const mats = []
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false
        child.receiveShadow = false

        if (child.material) {
          // Base photographic texture
          child.material.map = mountainTexture
          child.material.color.setRGB(0.9, 0.9, 0.95) // soft slate-gray white
          child.material.transparent = true
          mats.push(child.material)

          // Apply primary physical textures
          child.material.normalMap = rockNormal
          if (child.material.normalScale) {
            child.material.normalScale.set(1.5, 1.5)
          } else {
            child.material.normalScale = new THREE.Vector2(1.5, 1.5)
          }

          // Use perlinNoise as a roughnessMap to add lighting variance
          child.material.roughnessMap = perlinNoise
          child.material.roughness = 0.85 // catch specular highlights
          child.material.metalness = 0.05 // add subtle metallic reflection
          child.material.envMapIntensity = 0.5 // boost reflection contrast

          // Use noiseTexture as a high-frequency height bump map
          child.material.bumpMap = noiseTexture
          child.material.bumpScale = 0.05 // increase bump details

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
    materialsRef.current = mats
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

    // Smoothly lerp intensities from dramatic daylight (at scroll 0) to darker cinematic navy
    if (ambLightRef.current) {
      ambLightRef.current.intensity = THREE.MathUtils.lerp(0.28, 0.15, transitionPercent)
    }
    if (hemiLightRef.current) {
      hemiLightRef.current.intensity = THREE.MathUtils.lerp(0.18, 0.1, transitionPercent)
    }
    if (dirLightRef.current) {
      const baseIntensity = THREE.MathUtils.lerp(1.4, 0.8, transitionPercent)
      dirLightRef.current.intensity = THREE.MathUtils.lerp(baseIntensity, 0.2, scrollPercent)
    }
  })

  return (
    <>
      <ambientLight ref={ambLightRef} intensity={0.28} color="#e4ecf2" />
      <hemisphereLight ref={hemiLightRef} skyColor="#d5e0ea" groundColor="#f0ede8" intensity={0.18} />

      <directionalLight
        ref={dirLightRef}
        position={[-12, 10, 6]}
        intensity={1.4}
        color="#ffffff"
      />

      <directionalLight
        position={[8, 5, -3]}
        intensity={0.15}
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

    // Make fog density significantly higher at the bottom to obscure the mountain
    const targetDensity = 0.015 + scrollPercent * 0.045
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

    const scrollY = window.scrollY
    const heroHeight = window.innerHeight
    const heroScrollPercent = Math.min(scrollY / heroHeight, 1.0)
    
    // Fade out all clouds as we scroll past 20% of the hero section
    const targetOpacityMultiplier = Math.max(0, Math.min(1, 1 - (heroScrollPercent - 0.2) / 0.6)) // goes to 0 at 80% scroll
    
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true
        if (child.userData.originalOpacity === undefined) {
          child.userData.originalOpacity = child.material.opacity !== undefined ? child.material.opacity : 0.8
        }
        child.material.opacity = THREE.MathUtils.lerp(
          child.material.opacity,
          child.userData.originalOpacity * targetOpacityMultiplier,
          0.05
        )
      }
    })
  })

  // Set positions relative to whether we render terrain_alpine or standard hero mountain
  const zBase = isAlpine ? -5.3 : -5.0
  const yBase = isAlpine ? 0.8 : 0.0

  return (
    <group ref={groupRef}>
      {/* Layer 1 (Lowest Deck) */}
      <Cloud
        texture="/cloud-particle.png"
        position={[0, -3.2 + yBase, zBase + 1.5]}
        speed={0.1}
        opacity={0.85}
        segments={12}
        bounds={[18, 1.2, 5]}
        color="#cbd3db"
      />

      {/* Layer 2 (Middle Deck) */}
      <Cloud
        texture="/cloud-particle.png"
        position={[-5, -2.5 + yBase, zBase + 1.0]}
        speed={0.08}
        opacity={0.85}
        segments={10}
        bounds={[12, 1.0, 4]}
        color="#dcdfe3"
      />

      <Cloud
        texture="/cloud-particle.png"
        position={[5, -2.5 + yBase, zBase + 1.0]}
        speed={0.07}
        opacity={0.85}
        segments={10}
        bounds={[12, 1.0, 4]}
        color="#dcdfe3"
      />

      {/* Layer 3 (Upper Base - Just below the peak to blend base into clouds) */}
      <Cloud
        texture="/cloud-particle.png"
        position={[0, -1.5 + yBase, zBase + 0.5]}
        speed={0.12}
        opacity={0.75}
        segments={12}
        bounds={[14, 0.8, 3]}
        color="#cbd3db"
      />

      <Cloud
        texture="/cloud-particle.png"
        position={[-4, -1.3 + yBase, zBase + 0.3]}
        speed={0.08}
        opacity={0.7}
        segments={8}
        bounds={[8, 0.8, 3]}
        color="#dcdfe3"
      />

      <Cloud
        texture="/cloud-particle.png"
        position={[4, -1.3 + yBase, zBase + 0.3]}
        speed={0.09}
        opacity={0.7}
        segments={8}
        bounds={[8, 0.8, 3]}
        color="#dcdfe3"
      />
    </group>
  )
}

export default function MountainScene() {
  const wrapperRef = useRef()
  const [modelPath, setModelPath] = useState('/hero_mountain.glb')
  const [isHeroVisible, setIsHeroVisible] = useState(true)

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
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Unmount canvas if scrolled past 120% of hero height to free GPU resources
      if (scrollY < heroHeight * 1.2) {
        setIsHeroVisible(true)
      } else {
        setIsHeroVisible(false)
      }

      if (!wrapperRef.current) return
      const transitionPercent = Math.min(scrollY / heroHeight, 1.0)

      // Interpolate background color of wrapper from glacier gray #cbd3db (rgb 203, 211, 219) to deep charcoal navy #0a0e17 (rgb 10, 14, 23)
      const r = Math.round(203 + (10 - 203) * transitionPercent)
      const g = Math.round(211 + (14 - 211) * transitionPercent)
      const b = Math.round(219 + (23 - 219) * transitionPercent)
      wrapperRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={wrapperRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#cbd3db] transition-colors duration-200">
      {isHeroVisible && (
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
            <FlowingClouds isAlpine={isAlpine} />
          </Suspense>

          <CameraRig />
          <CinematicPost />
        </Canvas>
      )}
    </div>
  )
}
