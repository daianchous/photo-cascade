import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { cases } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import CaseCard3D from './CaseCard3D';
import HeroPhotos from './HeroPhotos';
import * as THREE from 'three';

// Camera controller
const CameraController = () => {
  const { camera } = useThree();
  const { hoveredCaseId } = useGalleryState();
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  
  const targetPosition = useRef(new THREE.Vector3(0, 2, 25));
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));
  
  useEffect(() => {
    if (hoveredCaseId && scrollProgress > 0.25) {
      // Zoom in when a card is selected in gallery mode
      targetPosition.current.set(0, 0, 16);
      targetLookAt.current.set(0, 0, 0);
    } else if (scrollProgress > 0.25) {
      // Gallery view
      targetPosition.current.set(0, 0, 20);
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Hero view - camera looking at hero photos
      targetPosition.current.set(0, 2, 25);
      targetLookAt.current.set(0, 1, 0);
    }
  }, [hoveredCaseId, scrollProgress]);
  
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
      
      {/* Hero photos that animate from hero to gallery */}
      <HeroPhotos totalCases={cases.length} />
      
      {/* Render other case cards (excluding hero indices) */}
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
          position={[0, 2, 25]}
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
