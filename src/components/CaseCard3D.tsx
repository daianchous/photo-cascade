import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CaseData } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import * as THREE from 'three';

interface CaseCard3DProps {
  caseData: CaseData;
  index: number;
  totalCases: number;
}

const CaseCard3D = ({ caseData, index, totalCases }: CaseCard3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { camera } = useThree();
  const { hoveredCaseId, activeTag, setHoveredCaseId } = useGalleryState();
  
  // Calculate position along diagonal strip
  const basePosition = useMemo(() => {
    const spacing = 0.4;
    const x = index * spacing;
    const y = index * spacing * 0.5;
    const z = index * spacing * 0.15;
    return new THREE.Vector3(x, y, z);
  }, [index]);
  
  // Determine states
  const isHovered = hoveredCaseId === caseData.id;
  const anyHovered = hoveredCaseId !== null;
  
  const isMatching = useMemo(() => {
    if (activeTag === 'all') return true;
    return caseData.tags.includes(activeTag);
  }, [activeTag, caseData.tags]);
  
  // Store current values for smooth animation
  const currentValues = useRef({
    scale: 1,
    opacity: 1,
    posX: basePosition.x,
    posY: basePosition.y,
    posZ: basePosition.z,
    rotX: 0,
    rotY: 0,
  });
  
  // Animate card properties smoothly
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const lerpSpeed = 6 * delta;
    
    if (isHovered) {
      // Hovered card: move to center of screen and scale up massively
      // Calculate screen center position in world space
      const centerX = camera.position.x + 8;
      const centerY = camera.position.y - 5;
      const centerZ = camera.position.z - 25;
      
      currentValues.current.posX += (centerX - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (centerY - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (centerZ - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (8 - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (1 - currentValues.current.opacity) * lerpSpeed;
      currentValues.current.rotX += (0 - currentValues.current.rotX) * lerpSpeed;
      currentValues.current.rotY += (0 - currentValues.current.rotY) * lerpSpeed;
    } else if (anyHovered) {
      // Other cards when something is hovered: fade out completely
      currentValues.current.posX += (basePosition.x - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (basePosition.y - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (basePosition.z - 3 - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (0.8 - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (0 - currentValues.current.opacity) * lerpSpeed;
    } else {
      // Default state: normal position
      const targetScale = isMatching ? 1 : 0.85;
      const targetOpacity = isMatching ? 0.95 : 0.2;
      
      currentValues.current.posX += (basePosition.x - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (basePosition.y - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (basePosition.z - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (targetScale - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (targetOpacity - currentValues.current.opacity) * lerpSpeed;
    }
    
    // Apply values
    const s = currentValues.current.scale;
    meshRef.current.scale.set(s, s, s);
    meshRef.current.position.set(
      currentValues.current.posX,
      currentValues.current.posY,
      currentValues.current.posZ
    );
    meshRef.current.rotation.set(currentValues.current.rotX, currentValues.current.rotY, 0);
    materialRef.current.opacity = currentValues.current.opacity;
  });
  
  // Parse color
  const color = useMemo(() => new THREE.Color(caseData.color), [caseData.color]);
  
  return (
    <group
      ref={meshRef}
      position={[basePosition.x, basePosition.y, basePosition.z]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHoveredCaseId(caseData.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHoveredCaseId(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* White border/frame */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 1.4, 0.03]} />
        <meshStandardMaterial color="white" transparent opacity={currentValues.current.opacity} />
      </mesh>
      
      {/* Photo/Card surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.3, 0.02]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={1}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

export default CaseCard3D;
