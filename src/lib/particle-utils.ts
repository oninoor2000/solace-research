import type { RefObject } from "react";

/**
 * Particle interface
 */
export interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  speed: number;
  angle: number;
  velocity: number;
}

/**
 * Position interface for pixel coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Debounce function to limit function calls
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Extract pixel positions from text rendering
 * @param width Canvas width
 * @param height Canvas height
 * @param text Text to render
 * @param gap Sampling gap (default: 4)
 * @returns Array of positions where pixels are visible
 */
export function getTextPixelPositions(
  width: number,
  height: number,
  text: string,
  gap: number = 4
): Position[] {
  // Create off-screen canvas
  const offCanvas = document.createElement("canvas");
  const offCtx = offCanvas.getContext("2d");
  if (!offCtx) return [];

  offCanvas.width = width;
  offCanvas.height = height;

  // Draw text
  const fontSize = Math.min(width / 4, 200);
  offCtx.font = `bold ${fontSize}px "Syne", sans-serif`;
  offCtx.textAlign = "center";
  offCtx.fillStyle = "white";
  offCtx.fillText(text, width / 2, height / 2);

  // Sample pixels
  const imageData = offCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const positions: Position[] = [];

  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const index = (y * width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha > 128) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
}

/**
 * Create particles from positions
 * @param positions Target positions for particles
 * @param canvasWidth Canvas width for random initial positions
 * @param canvasHeight Canvas height for random initial positions
 * @returns Array of particles
 */
export function createParticles(
  positions: Position[],
  canvasWidth: number,
  canvasHeight: number
): Particle[] {
  return positions.map((pos) => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    targetX: pos.x,
    targetY: pos.y,
    originX: Math.random() * canvasWidth,
    originY: Math.random() * canvasHeight,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.01,
    angle: Math.random() * Math.PI * 2,
    velocity: Math.random() * 2 + 1,
  }));
}

/**
 * Update particle target positions intelligently
 * Handles cases where particle count doesn't match position count
 * @param particles Current particles array
 * @param newPositions New target positions
 */
export function updateParticleTargets(
  particles: Particle[],
  newPositions: Position[]
): void {
  if (particles.length === 0 || newPositions.length === 0) return;

  if (particles.length <= newPositions.length) {
    // More positions than particles - assign first N positions
    particles.forEach((particle, i) => {
      particle.targetX = newPositions[i].x;
      particle.targetY = newPositions[i].y;
    });
  } else {
    // More particles than positions - distribute evenly
    particles.forEach((particle, i) => {
      const targetIndex = i % newPositions.length;
      particle.targetX = newPositions[targetIndex].x;
      particle.targetY = newPositions[targetIndex].y;
    });
  }
}

/**
 * Initialize particles for the canvas
 * @param canvas The canvas element
 * @param particlesRef The reference to the particles array
 * @param text Text to render (default: "SOLACE")
 */
export function initParticles(
  canvas: HTMLCanvasElement,
  particlesRef: RefObject<Particle[]>,
  text: string = "SOLACE"
): Position[] {
  const positions = getTextPixelPositions(canvas.width, canvas.height, text);

  const particles = createParticles(
    positions,
    canvas.offsetWidth,
    canvas.offsetHeight
  );

  particlesRef.current = particles;
  return positions;
}
