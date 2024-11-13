import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />
      <ChromaticAberration
        offset={[0.002, 0.002]}
        opacity={0.3}
      />
      <Vignette
        darkness={0.7}
        offset={0.1}
      />
    </EffectComposer>
  );
}