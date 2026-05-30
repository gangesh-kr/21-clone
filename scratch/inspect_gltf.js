import fs from 'fs';

function inspectGlb(filepath) {
  console.log(`Inspecting GLB: ${filepath}`);
  try {
    const buffer = fs.readFileSync(filepath);
    
    // Read GLB Header
    const magic = buffer.readUInt32LE(0);
    const version = buffer.readUInt32LE(4);
    const length = buffer.readUInt32LE(8);
    
    if (magic !== 0x46546C67) {
      console.error('Not a valid GLB file');
      return;
    }
    
    // Read Chunk 0 (JSON)
    const chunkLength = buffer.readUInt32LE(12);
    const chunkType = buffer.readUInt32LE(16);
    const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    console.log('\n--- Nodes ---');
    if (gltf.nodes) {
      gltf.nodes.forEach((node, idx) => {
        console.log(`  Node ${idx}: "${node.name}" (mesh: ${node.mesh !== undefined ? node.mesh : 'none'})`);
      });
    }
    
    console.log('\n--- Meshes ---');
    if (gltf.meshes) {
      gltf.meshes.forEach((mesh, idx) => {
        console.log(`  Mesh ${idx}: "${mesh.name}"`);
        mesh.primitives.forEach((p, pIdx) => {
          console.log(`    Primitive ${pIdx}: material: ${p.material !== undefined ? p.material : 'none'}, attributes:`, Object.keys(p.attributes));
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
}

const p = 'public/hero_mountain.glb';
inspectGlb(p);
