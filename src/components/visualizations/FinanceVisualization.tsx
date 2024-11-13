import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FinanceVisualizationProps {
  detailsType: 'moneyIn' | 'moneyOut' | null;
}

export function FinanceVisualization({ detailsType }: FinanceVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawBar = (x: number, y: number, height: number, color: string) => {
      const barWidth = 30;
      
      // Draw the glowing bar
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;

      // Main bar
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + barWidth, y);
      ctx.lineTo(x + barWidth, y - height);
      ctx.lineTo(x, y - height);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(68, 255, 136, 0.1)';
      ctx.lineWidth = 1;

      // Draw horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = canvas.height - (i * canvas.height / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw vertical grid lines
      for (let i = 0; i <= 4; i++) {
        const x = i * canvas.width / 4;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw value labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '10px Inter';
      ctx.textAlign = 'right';
      
      const values = ['0', '94', '188', '282'];
      values.forEach((value, i) => {
        const y = canvas.height - (i * canvas.height / 4);
        ctx.fillText(value, 25, y - 5);
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid first
      drawGrid();

      const centerX = canvas.width / 2 - 45;
      const bottomY = canvas.height - 30;
      
      // Draw bars
      const moneyInHeight = 150;
      const moneyOutHeight = 50;
      const balanceHeight = 100;

      ctx.globalAlpha = detailsType === 'moneyOut' ? 0.3 : 1;
      drawBar(centerX, bottomY, moneyInHeight, '#4488ff');
      
      ctx.globalAlpha = detailsType === 'moneyIn' ? 0.3 : 1;
      drawBar(centerX + 30, bottomY, moneyOutHeight, '#ff4444');
      
      ctx.globalAlpha = detailsType ? 0.3 : 1;
      drawBar(centerX + 60, bottomY, balanceHeight, '#44ff88');
      
      ctx.globalAlpha = 1;
    };

    // Set canvas size with high DPI support
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      render();
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [detailsType]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}