import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CaseData } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import * as THREE from 'three';

interface CaseCard3DProps {
  caseData: CaseData;
  index: number;
  totalCases: number;
  isHeroPhoto?: boolean; // Skip if this index is handled by HeroPhotos
}

// Hero photo indices that are handled separately
const HERO_PHOTO_INDICES = [6, 7, 8];

const CaseCard3D = ({ caseData, index, totalCases, isHeroPhoto }: CaseCard3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const borderMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const { hoveredCaseId, setHoveredCaseId } = useGalleryState();
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  
  // Skip rendering if this is a hero photo index
  if (HERO_PHOTO_INDICES.includes(index)) {
    return null;
  }
  
  // Calculate center offset for the strip
  const centerOffset = (totalCases - 1) / 2;
  
  // Calculate base position - overlapping horizontal row with perspective
  const basePosition = useMemo(() => {
    const spacing = 1.4;
    const x = (index - centerOffset) * spacing;
    const y = 0;
    const distFromCenter = Math.abs(index - centerOffset);
    const z = -distFromCenter * 0.3 + index * 0.1;
    return new THREE.Vector3(x, y, z);
  }, [index, centerOffset]);
  
  // Determine states
  const isHovered = hoveredCaseId === caseData.id;
  const anyHovered = hoveredCaseId !== null;
  
  // Get hovered card index for split animation
  const hoveredIndex = useMemo(() => {
    if (!hoveredCaseId) return -1;
    const parts = hoveredCaseId.split('-');
    return parseInt(parts[1]) || -1;
  }, [hoveredCaseId]);
  
  // Store current values for smooth animation
  const currentValues = useRef({
    scale: 1,
    opacity: 0,
    posX: basePosition.x,
    posY: basePosition.y - 20, // Start below
    posZ: basePosition.z,
    rotY: 0.3,
    borderOpacity: 0,
  });
  
  // Animate card properties smoothly
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current || !borderMaterialRef.current) return;
    
    const lerpSpeed = 3 * delta;
    
    // Cards fade in as scroll reaches gallery section (no fade out - text scrolls over)
    const galleryVisibility = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.5));
    const inGalleryMode = scrollProgress > 0.5;
    
    if (!inGalleryMode) {
      // Before gallery mode - cards stay hidden/below
      currentValues.current.posY += (basePosition.y - 20 - currentValues.current.posY) * lerpSpeed;
      currentValues.current.opacity += (0 - currentValues.current.opacity) * lerpSpeed;
    } else if (isHovered) {
      // Selected card: center of screen, larger, with pink border
      currentValues.current.posX += (0 - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (0 - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (10 - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (2.5 - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (1 - currentValues.current.opacity) * lerpSpeed;
      currentValues.current.rotY += (0 - currentValues.current.rotY) * lerpSpeed;
      currentValues.current.borderOpacity += (1 - currentValues.current.borderOpacity) * lerpSpeed;
    } else if (anyHovered) {
      // Other cards: split to left or right
      const isLeftOfSelected = index < hoveredIndex;
      const splitOffset = isLeftOfSelected ? -12 : 12;
      
      currentValues.current.posX += (basePosition.x + splitOffset - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (basePosition.y - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (basePosition.z - 5 - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (0.6 - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (0 - currentValues.current.opacity) * lerpSpeed;
      currentValues.current.rotY += (0.3 - currentValues.current.rotY) * lerpSpeed;
      currentValues.current.borderOpacity += (0 - currentValues.current.borderOpacity) * lerpSpeed;
    } else {
      // Default state: horizontal row with perspective - fade in based on scroll
      currentValues.current.posX += (basePosition.x - currentValues.current.posX) * lerpSpeed;
      currentValues.current.posY += (basePosition.y - currentValues.current.posY) * lerpSpeed;
      currentValues.current.posZ += (basePosition.z - currentValues.current.posZ) * lerpSpeed;
      currentValues.current.scale += (1 - currentValues.current.scale) * lerpSpeed;
      currentValues.current.opacity += (galleryVisibility - currentValues.current.opacity) * lerpSpeed;
      currentValues.current.rotY += (0.3 - currentValues.current.rotY) * lerpSpeed;
      currentValues.current.borderOpacity += (0 - currentValues.current.borderOpacity) * lerpSpeed;
    }
    
    // Apply values
    const s = currentValues.current.scale;
    meshRef.current.scale.set(s, s, s);
    meshRef.current.position.set(
      currentValues.current.posX,
      currentValues.current.posY,
      currentValues.current.posZ
    );
    meshRef.current.rotation.set(0, currentValues.current.rotY, 0);
    
    materialRef.current.opacity = currentValues.current.opacity;
    borderMaterialRef.current.opacity = currentValues.current.borderOpacity;
  });
  
  // Parse color
  const color = useMemo(() => new THREE.Color(caseData.color), [caseData.color]);
  
  // Pink/magenta accent color for selected border
  const accentColor = useMemo(() => new THREE.Color('hsl(300, 60%, 70%)'), []);
  
  // Handle click to toggle selection
  const handleClick = (e: any) => {
    e.stopPropagation();
    // Only allow interaction when in gallery mode
    if (scrollProgress < 0.8) return;
    
    if (isHovered) {
      setHoveredCaseId(null);
    } else {
      setHoveredCaseId(caseData.id);
    }
  };
  
  return (
    <group
      ref={meshRef}
      position={[basePosition.x, basePosition.y - 20, basePosition.z]}
      rotation={[0, 0.3, 0]}
      onClick={handleClick}
      onPointerEnter={() => {
        if (scrollProgress >= 0.8) document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Pink accent border (visible when selected) */}
      <mesh position={[0, 0, -0.03]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 1.7, 0.02]} />
        <meshStandardMaterial 
          ref={borderMaterialRef}
          color={accentColor}
          transparent 
          opacity={0} 
          emissive={accentColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Photo/Card surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.1, 1.5, 0.04]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={0}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

export default CaseCard3D;
