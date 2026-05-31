import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Machine from './machine/Machine';

export default function TrimPressScene({ machineController }) {
  const { targets, updateSensors, sensors } = machineController;

  return (
    <div className="w-full h-full relative bg-gray-900">
      <Canvas camera={{ position: [8.5, 6.5, 19.0], fov: 40 }} shadows>
        <Suspense fallback={null}>
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.8}/>
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048} 
          />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          
          <Environment preset="warehouse" />
          
          <Machine targets={targets} updateSensors={updateSensors} sensors={sensors} />
          
          <ContactShadows resolution={1024} scale={30} blur={2} opacity={0.6} far={10} color="#000000" />
          <OrbitControls 
            makeDefault 
            target={[0.00, 3.8, 0.00]} 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
