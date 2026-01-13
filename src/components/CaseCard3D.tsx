import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
  const { hoveredCaseId, activeTag, setHoveredCaseId } = useGalleryState();
  
  // Calculate position along diagonal strip - matching reference layout
  const basePosition = useMemo(() => {
    const spacing = 0.4;
    const x = index * spacing;
    const y = index * spacing * 0.5;
    const z = index * spacing * 0.15;
    return new THREE.Vector3(x, y, z);
  }, [index]);
  
  // Determine if this card matches current filter
  const isMatching = useMemo(() => {
    if (activeTag === 'all') return true;
    return caseData.tags.includes(activeTag);
  }, [activeTag, caseData.tags]);
  
  const isHovered = hoveredCaseId === caseData.id;
  
  // Store current values for smooth animation
  const currentValues = useRef({
    scale: 1,
    opacity: 1,
    zOffset: 0,
  });
  
  // Animate card properties smoothly
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Target values
    const targetScale = isHovered ? 1.2 : isMatching ? 1 : 0.85;
    const targetOpacity = isHovered ? 1 : isMatching ? 0.95 : 0.2;
    const targetZOffset = isMatching ? 0 : -1;
    
    // Smooth lerp with damping
    const lerpSpeed = 8 * delta;
    
    currentValues.current.scale += (targetScale - currentValues.current.scale) * lerpSpeed;
    currentValues.current.opacity += (targetOpacity - currentValues.current.opacity) * lerpSpeed;
    currentValues.current.zOffset += (targetZOffset - currentValues.current.zOffset) * lerpSpeed;
    
    // Apply values
    const s = currentValues.current.scale;
    meshRef.current.scale.set(s, s, s);
    materialRef.current.opacity = currentValues.current.opacity;
    
    meshRef.current.position.z = basePosition.z + currentValues.current.zOffset;
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
        <meshStandardMaterial color="white" />
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
