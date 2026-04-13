import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';

function FloatingCrates() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(group.current) {
        group.current.rotation.y = Math.sin(t / 4) / 4;
        group.current.rotation.z = Math.sin(t / 4) / 4;
        group.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4ade80" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[1, -0.5, 0.5]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#2dd4bf" roughness={0.2} metalness={0.5} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1.2, -1]} castShadow>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#0f766e" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[0.5, 0.5, -2]} castShadow>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.3} metalness={0.8} />
        </mesh>
      </Float>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} color="#064e3b" />
    </group>
  );
}

const Hero3D = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0.3, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          <FloatingCrates />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default Hero3D;
