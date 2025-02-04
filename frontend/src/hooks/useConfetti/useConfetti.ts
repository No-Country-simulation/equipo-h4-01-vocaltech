import confetti, { Options } from 'canvas-confetti';

type Preset = 'default' | 'fireworks' | 'rain';

export const useConfetti = () => {
  const presets: Record<Preset, Options[]> = {
    default: [
      { spread: 26, startVelocity: 55 },
      { spread: 60 },
      { spread: 100, decay: 0.91, scalar: 0.8 },
      { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
      { spread: 120, startVelocity: 45 }
    ],
    fireworks: [
      { particleCount: 100, spread: 70, origin: { y: 0.6 } },
      {
        particleCount: 150,
        spread: 100,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    ],
    rain: [
      { angle: 60, spread: 55, particleCount: 100, origin: { x: 0 } },
      { angle: 120, spread: 55, particleCount: 100, origin: { x: 1 } }
    ]
  };

  const fire = (preset: Preset = 'default') => {
    const configs = presets[preset];
    configs.forEach(config => {
      confetti({
        ...config,
        origin: { y: 0.7 },
        zIndex: 9999,
        disableForReducedMotion: true,
        decay: 0.9
      });
    });
  };

  return fire;
};
