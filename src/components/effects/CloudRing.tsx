import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import { Group } from 'three';

export function CloudRing() {
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

  const createCloud = (angle: number, radius: number = 25) => {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const randomHeight = 15 + Math.random() * 3; // Lowered height range
    const randomSpeed = 0.02 + Math.random() * 0.05;
    const randomWidth = 12 + Math.random() * 8;
    const randomDepth = 2 + Math.random() * 2;
    const randomOpacity = 0.12 + Math.random() * 0.08; // Slightly reduced opacity

    return (
      <Cloud
        key={angle}
        position={[x, randomHeight, z]}
        opacity={randomOpacity}
        speed={randomSpeed}
        width={randomWidth}
        depth={randomDepth}
        segments={20}
        color="#b4c4e0"
        depthWrite={false}
        transparent
        renderOrder={-1}
      />
    );
  };

  const createCloudRing = (baseRadius: number, count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * Math.PI * 2) / count;
      const radiusVariation = Math.random() * 5;
      return createCloud(angle, baseRadius + radiusVariation);
    });
  };

  return (
    <group ref={groupRef}>
      {createCloudRing(35, 8)}
      {createCloudRing(28, 6)}
      {createCloudRing(42, 10)}
    </group>
  );
}