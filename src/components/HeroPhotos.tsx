import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useGalleryState } from '@/hooks/useGalleryState';
import * as THREE from 'three';

interface HeroPhotoProps {
  index: number;
  color: string;
  heroPosition: [number, number, number];
  galleryIndex: number;
  totalCases: number;
}

// The 3 hero photos that animate from hero positions to gallery positions
const HeroPhoto = ({ index, color, heroPosition, galleryIndex, totalCases }: HeroPhotoProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const borderMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  const { hoveredCaseId, setHoveredCaseId } = useGalleryState();
  
  const caseId = `case-${galleryIndex}`;
  const isHovered = hoveredCaseId === caseId;
  const anyHovered = hoveredCaseId !== null;
  
  // Calculate gallery position
  const centerOffset = (totalCases - 1) / 2;
  const spacing = 1.4;
  const galleryPosition = useMemo(() => {
    const x = (galleryIndex - centerOffset) * spacing;
    const distFromCenter = Math.abs(galleryIndex - centerOffset);
    const z = -distFromCenter * 0.3 + galleryIndex * 0.1;
    return new THREE.Vector3(x, 0, z);
  }, [galleryIndex, centerOffset]);
  
  // Get hovered card index for split animation
  const hoveredIndex = useMemo(() => {
    if (!hoveredCaseId) return -1;
    const parts = hoveredCaseId.split('-');
    return parseInt(parts[1]) || -1;
  }, [hoveredCaseId]);
  
  const colorObj = useMemo(() => new THREE.Color(color), [color]);
  const accentColor = useMemo(() => new THREE.Color('hsl(300, 60%, 70%)'), []);
  
  const currentValues = useRef({
    scale: 1,
    opacity: 1,
    posX: heroPosition[0],
    posY: heroPosition[1],
    posZ: heroPosition[2],
    rotY: 0,
    borderOpacity: 0,
  });
  
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current || !borderMaterialRef.current) return;
    
    const lerpSpeed = 3 * delta;
    
    // Gallery is active when scrollProgress > 0.5 and < 1.8
    const inGalleryMode = scrollProgress > 0.5 && scrollProgress < 1.8;
    
    // Interpolate between hero and gallery positions based on scroll
    const transitionProgress = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.5));
    
    // Fade out when reaching text section
    const fadeOut = Math.max(0, 1 - Math.max(0, (scrollProgress - 1.5) / 0.3));
    
    let targetX: number, targetY: number, targetZ: number, targetScale: number, targetOpacity: number, targetRotY: number, targetBorderOpacity: number;
    
    if (scrollProgress >= 1.8) {
      // Text section - fade out completely
      targetX = galleryPosition.x;
      targetY = galleryPosition.y;
      targetZ = galleryPosition.z;
      targetScale = 1;
      targetOpacity = 0;
      targetRotY = 0.3;
      targetBorderOpacity = 0;
    } else if (!inGalleryMode || !anyHovered) {
      // Transitioning between hero and gallery default positions
      targetX = THREE.MathUtils.lerp(heroPosition[0], galleryPosition.x, transitionProgress);
      targetY = THREE.MathUtils.lerp(heroPosition[1], galleryPosition.y, transitionProgress);
      targetZ = THREE.MathUtils.lerp(heroPosition[2], galleryPosition.z, transitionProgress);
      targetScale = THREE.MathUtils.lerp(1.2, 1, transitionProgress);
      targetOpacity = fadeOut;
      targetRotY = THREE.MathUtils.lerp(0, 0.3, transitionProgress);
      targetBorderOpacity = 0;
    } else if (isHovered) {
      // Selected card in gallery mode
      targetX = 0;
      targetY = 0;
      targetZ = 10;
      targetScale = 2.5;
      targetOpacity = 1;
      targetRotY = 0;
      targetBorderOpacity = 1;
    } else {
      // Non-selected cards in gallery mode - split left/right
      const isLeftOfSelected = galleryIndex < hoveredIndex;
      const splitOffset = isLeftOfSelected ? -12 : 12;
      
      targetX = galleryPosition.x + splitOffset;
      targetY = galleryPosition.y;
      targetZ = galleryPosition.z - 5;
      targetScale = 0.6;
      targetOpacity = 0;
      targetRotY = 0.3;
      targetBorderOpacity = 0;
    }
    
    currentValues.current.posX += (targetX - currentValues.current.posX) * lerpSpeed;
    currentValues.current.posY += (targetY - currentValues.current.posY) * lerpSpeed;
    currentValues.current.posZ += (targetZ - currentValues.current.posZ) * lerpSpeed;
    currentValues.current.scale += (targetScale - currentValues.current.scale) * lerpSpeed;
    currentValues.current.opacity += (targetOpacity - currentValues.current.opacity) * lerpSpeed;
    currentValues.current.rotY += (targetRotY - currentValues.current.rotY) * lerpSpeed;
    currentValues.current.borderOpacity += (targetBorderOpacity - currentValues.current.borderOpacity) * lerpSpeed;
    
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
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    // Only allow interaction when in gallery mode
    if (scrollProgress < 0.8) return;
    
    if (isHovered) {
      setHoveredCaseId(null);
    } else {
      setHoveredCaseId(caseId);
    }
  };
  
  return (
    <group
      ref={meshRef}
      onClick={handleClick}
      onPointerEnter={() => {
        if (scrollProgress >= 0.8) document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Pink accent border */}
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
      
      {/* Photo surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.1, 1.5, 0.04]} />
        <meshStandardMaterial
          ref={materialRef}
          color={colorObj}
          transparent
          opacity={1}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

interface HeroPhotosProps {
  totalCases: number;
}

const HeroPhotos = ({ totalCases }: HeroPhotosProps) => {
  // Define the 3 hero photos with their initial positions and gallery indices
  // These will be indices 6, 7, 8 in the gallery (center-ish)
  const heroPhotos = [
    { 
      heroPosition: [-6, 4, 2] as [number, number, number], 
      color: 'hsl(0, 0%, 90%)', // Light grey/white for laptop
      galleryIndex: 6 
    },
    { 
      heroPosition: [6, 3, 0] as [number, number, number], 
      color: 'hsl(25, 60%, 35%)', // Brown/warm for phone on table
      galleryIndex: 7 
    },
    { 
      heroPosition: [4, -2, 1] as [number, number, number], 
      color: 'hsl(220, 50%, 70%)', // Blue gradient phone
      galleryIndex: 8 
    },
  ];
  
  return (
    <>
      {heroPhotos.map((photo, index) => (
        <HeroPhoto
          key={`hero-${index}`}
          index={index}
          color={photo.color}
          heroPosition={photo.heroPosition}
          galleryIndex={photo.galleryIndex}
          totalCases={totalCases}
        />
      ))}
    </>
  );
};

export default HeroPhotos;
