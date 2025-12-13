'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let points: Point[] = [];
        const connectionDistance = 180; // Increased from 150

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            points = [];
            const { width, height } = canvas;
            // Adjust point count based on screen size
            // Increase density slightly: 20000 instead of 25000
            const count = Math.floor((width * height) / 20000);

            for (let i = 0; i < count; i++) {
                points.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initial setup
        handleResize();

        const draw = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = resolvedTheme === 'dark';

            // Style configuration
            // Slightly more visible particles
            const particleColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
            const lineColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ';

            // Update and draw points
            points.forEach((point, i) => {
                // Move
                point.x += point.vx;
                point.y += point.vy;

                // Bounce off edges
                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2); // Increased radius from 1.5 to 2.5
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Connect to other points
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const dx = point.x - p2.x;
                    const dy = point.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `${lineColor}${opacity * 0.2})`; // Increased opacity
                        ctx.lineWidth = 1.2; // Increased line width
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const dx = point.x - mouseRef.current.x;
                const dy = point.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 220) { // Increased interaction range
                    const opacity = 1 - dist / 220;
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.strokeStyle = `${lineColor}${opacity * 0.4})`; // Increased opacity
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resolvedTheme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}
