import React, { useEffect, useRef } from 'react';
import { Satellite, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { EARTH_BG_URL } from '../../config/assets';

export const EarthVisual = ({ headline, highlightText, subtitle, features, quote }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create geospatial network nodes
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(60, 146, 197, ${0.25 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9, 122, 254, ${node.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#097AFE';
        ctx.fill();
        ctx.shadowBlur = 0;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="visual-panel">
      {/* Background Satellite Earth Image */}
      <img
        src={EARTH_BG_URL}
        alt="OrbitIQ Earth Remote Sensing View"
        className="visual-bg-image"
      />
      
      {/* Overlay gradient */}
      <div className="visual-overlay" />

      {/* Geospatial network canvas animation overlay */}
      <canvas ref={canvasRef} className="visual-canvas" />

      {/* Top Content Area */}
      <div className="visual-content-top">
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(9, 122, 254, 0.15)',
            border: '1px solid var(--sq-blue)',
            borderRadius: '20px',
            color: 'var(--sq-cyan)',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '24px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Satellite size={14} className="spin-slow" />
          <span>GEOSPATIAL REMOTE SENSING AI</span>
        </div>

        <h1 className="hero-heading">
          {headline}{' '}
          {highlightText && <span className="highlight">{highlightText}</span>}
        </h1>

        <p className="subtitle" style={{ maxWidth: '440px' }}>
          {subtitle}
        </p>

        {features && features.length > 0 && (
          <div className="feature-row">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-badge">
                {idx === 0 && <Activity size={14} />}
                {idx === 1 && <Cpu size={14} />}
                {idx === 2 && <ShieldCheck size={14} />}
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Quote Area */}
      <div className="visual-content-bottom">
        {quote && (
          <div className="quote-box">
            <Sparkles size={16} />
            <span>&quot;{quote}&quot;</span>
          </div>
        )}
      </div>
    </div>
  );
};
