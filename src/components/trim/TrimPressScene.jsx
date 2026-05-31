import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Machine from './machine/Machine';

export default function TrimPressScene({ machineController }) {
  const { targets, updateSensors, sensors } = machineController;

  return (
    <div className="w-full h-full relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-inner">
      <Canvas camera={{ position: [9.69, 7.43, 22.73], fov: 45 }} shadows>
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
          target={[0.00, 3.5, 0.00]} 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}
