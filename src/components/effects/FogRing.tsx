import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import { Group } from 'three';

export function FogRing() {
  const groupRef = useRef<Group>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003;
      groupRef.current.children.forEach((child, i) => {
        const y = child.position.y;
        child.position.y = y + Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.002;
      });
    }
  });

  const createFogCloud = (angle: number, radius: number, height: number, index: number) => {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const scale = 0.8 + Math.random() * 0.4;
    
    return (
      <Cloud
        key={`fog-${angle}-${radius}`}
        position={[x, height, z]}
        opacity={0.25}
        speed={0.1}
        width={15}
        depth={5}
        segments={8}
        color="#b4c4e0"
        depthWrite={false}
        transparent
        renderOrder={-2}
      />
    );
  };

  const createRandomCloud = (index: number, minRadius: number, maxRadius: number) => {
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    const angle = Math.random() * Math.PI * 2;
    const height = 0.3 + Math.random() * 0.1;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    return (
      <Cloud
        key={`random-fog-${index}`}
        position={[x, height, z]}
        opacity={0.2 + Math.random() * 0.1}
        speed={0.05}
        width={8 + Math.random() * 4}
        depth={3 + Math.random() * 2}
        segments={6}
        color="#b4c4e0"
        depthWrite={false}
        transparent
        renderOrder={-2}
      />
    );
  };

  const createFogRing = (baseRadius: number, count: number, height: number, ringIndex: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * Math.PI * 2) / count + (ringIndex * Math.PI / count / 2); // Offset each ring
      const radiusVariation = Math.random() * 2; // Reduced variation
      return createFogCloud(angle, baseRadius + radiusVariation, height, i + ringIndex * count);
    });
  };

  // Create arrays of random clouds between each ring
  const createRandomClouds = (minRadius: number, maxRadius: number, count: number, startIndex: number) => {
    return Array.from({ length: count }, (_, i) => 
      createRandomCloud(startIndex + i, minRadius, maxRadius)
    );
  };

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Main fog rings */}
      {createFogRing(25, 16, 0.3, 0)}
      {createRandomClouds(23, 27, 8, 0)}
      
      {createFogRing(28, 18, 0.32, 1)}
      {createRandomClouds(26, 30, 10, 8)}
      
      {createFogRing(31, 20, 0.31, 2)}
      {createRandomClouds(29, 33, 12, 18)}
      
      {createFogRing(34, 22, 0.33, 3)}
      {createRandomClouds(32, 36, 12, 30)}
      
      {createFogRing(37, 24, 0.32, 4)}
      {createRandomClouds(35, 39, 14, 42)}
      
      {createFogRing(40, 26, 0.31, 5)}
      {createRandomClouds(38, 42, 14, 56)}
      
      {createFogRing(43, 28, 0.33, 6)}
      {createRandomClouds(41, 45, 16, 70)}
      
      {createFogRing(46, 30, 0.32, 7)}
      {createRandomClouds(44, 48, 16, 86)}
    </group>
  );
}