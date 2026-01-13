import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { cases } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import CaseCard3D from './CaseCard3D';
import * as THREE from 'three';

// Camera controller that follows hover/selection
const CameraController = () => {
  const { camera } = useThree();
  const { hoveredCaseId, activeTag } = useGalleryState();
  
  const targetPosition = useRef(new THREE.Vector3(-15, 20, 45));
  const targetLookAt = useRef(new THREE.Vector3(20, 15, 0));
  
  useEffect(() => {
    if (hoveredCaseId) {
      // Find the hovered case index
      const index = cases.findIndex(c => c.id === hoveredCaseId);
      if (index !== -1) {
        const spacing = 0.4;
        const x = index * spacing;
        const y = index * spacing * 0.5;
        
        // Move camera to focus on hovered card - closer and more centered
        targetPosition.current.set(x - 12, y + 8, 30);
        targetLookAt.current.set(x + 3, y + 3, 0);
      }
    } else if (activeTag !== 'all') {
      // Find center of matching cards
      const matchingIndices = cases
        .map((c, i) => c.tags.includes(activeTag) ? i : -1)
        .filter(i => i !== -1);
      
      if (matchingIndices.length > 0) {
        const avgIndex = matchingIndices.reduce((a, b) => a + b, 0) / matchingIndices.length;
        const spacing = 0.4;
        const x = avgIndex * spacing;
        const y = avgIndex * spacing * 0.5;
        
        targetPosition.current.set(x - 10, y + 10, 35);
        targetLookAt.current.set(x + 5, y + 5, 0);
      }
    } else {
      // Default wide view - showing the full diagonal strip
      targetPosition.current.set(-15, 20, 45);
      targetLookAt.current.set(20, 15, 0);
    }
  }, [hoveredCaseId, activeTag]);
  
  useFrame((state, delta) => {
    // Smooth camera movement with damped lerp
    const lerpFactor = 1 - Math.pow(0.001, delta);
    
    camera.position.lerp(targetPosition.current, lerpFactor * 0.8);
    camera.lookAt(targetLookAt.current);
  });
  
  return null;
};

const Scene = () => {
  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.7} />
      
      {/* Main directional light with shadows */}
      <directionalLight 
        position={[20, 30, 20]} 
        intensity={0.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      {/* Fill light */}
      <directionalLight position={[-10, 15, -10]} intensity={0.3} />
      
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
          position={[-15, 20, 45]}
          fov={45}
          near={0.1}
          far={500}
        />
        <Scene />
      </Canvas>
    </div>
  );
};

export default CaseGallery3D;
