import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { cases } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import CaseCard3D from './CaseCard3D';
import * as THREE from 'three';

// Camera controller
const CameraController = () => {
  const { camera } = useThree();
  const { hoveredCaseId } = useGalleryState();
  
  const targetPosition = useRef(new THREE.Vector3(0, 0, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useEffect(() => {
    if (hoveredCaseId) {
      // Zoom in slightly when a card is selected
      targetPosition.current.set(0, 0, 16);
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Default view: centered on the row
      targetPosition.current.set(0, 0, 20);
      targetLookAt.current.set(0, 0, 0);
    }
  }, [hoveredCaseId]);
  
  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.001, delta);
    camera.position.lerp(targetPosition.current, lerpFactor * 0.8);
    camera.lookAt(targetLookAt.current);
  });
  
  return null;
};

const Scene = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 15, 20]} 
        intensity={0.7}
        castShadow
      />
      
      {/* Fill light from left */}
      <directionalLight position={[-10, 5, 10]} intensity={0.3} />
      
      {/* Subtle rim light */}
      <pointLight position={[0, -5, 15]} intensity={0.2} color="#ffffff" />
      
      {/* Render all case cards */}
      {cases.map((caseData, index) => (
        <CaseCard3D
          key={caseData.id}
          caseData={caseData}
          index={index}
          totalCases={cases.length}
        />
      ))}
      
      <CameraController />
    </>
  );
};

const CaseGallery3D = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 20]}
          fov={50}
          near={0.1}
          far={500}
        />
        <Scene />
      </Canvas>
    </div>
  );
};

export default CaseGallery3D;
