"use client";

import React, { useState, useEffect, useRef } from 'react';

const FlipDigit = ({ value, label, accentColor }) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setPrevVal(currentVal);
      setFlipping(true);
      const t = setTimeout(() => {
        setCurrentVal(value);
        setFlipping(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, currentVal]);

  const padded = String(currentVal).padStart(2, '0');
  const paddedPrev = String(prevVal).padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        position: 'relative',
        width: '60px',
        height: '76px',
        perspective: '300px',
      }}>
        {/* Static bottom half - shows new value */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: '76px',
            marginTop: '-38px',
            fontFamily: "'Inter', 'SF Mono', monospace",
          }}>{padded}</span>
        </div>

        {/* Static top half - shows old or new value */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)',
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: flipping ? 0 : 1,
        }}>
          <span style={{
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: '76px',
            fontFamily: "'Inter', 'SF Mono', monospace",
          }}>{padded}</span>
        </div>

        {/* Flip animation - top half falling down */}
        {flipping && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)',
            borderRadius: '8px 8px 0 0',
            overflow: 'hidden',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            zIndex: 3,
            transformOrigin: 'bottom',
            animation: 'flipDown 0.6s ease-in forwards',
            backfaceVisibility: 'hidden',
          }}>
            <span style={{
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#fff',
              lineHeight: '76px',
              fontFamily: "'Inter', 'SF Mono', monospace",
            }}>{paddedPrev}</span>
          </div>
        )}

        {/* Side shadow lines */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: '1px',
          background: 'rgba(0,0,0,0.4)', zIndex: 4,
        }} />
      </div>
      <span style={{
        fontSize: '0.6rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontWeight: 600,
        opacity: 0.5,
        color: accentColor || '#c5975b',
      }}>{label}</span>
    </div>
  );
};

export default function FlipCountdown({ targetDate = '2026-05-27', accentColor = '#c5975b', bgColor = '#0f0f0f', textColor = '#fff' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate + 'T14:00:00');
    
    const update = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <style>{`
        @keyframes flipDown {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
        @keyframes countdownPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
      <div style={{
        background: bgColor,
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative line */}
        <div style={{
          width: '40px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          margin: '0 auto 1.5rem',
        }} />

        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: textColor,
          opacity: 0.5,
          marginBottom: '0.8rem',
          fontWeight: 500,
        }}>
          Counting down to
        </p>

        <h2 style={{
          fontFamily: "'Harmond', 'Zen Old Mincho', serif",
          fontSize: '2.2rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: textColor,
          marginBottom: '2rem',
          letterSpacing: '1px',
        }}>
          Our Forever
        </h2>

        {/* Flip digits */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          color: textColor,
        }}>
          <FlipDigit value={timeLeft.days} label="Days" accentColor={accentColor} />
          <div style={{
            display: 'flex', alignItems: 'center', paddingBottom: '1.5rem',
            fontSize: '1.5rem', color: accentColor, fontWeight: 700,
            animation: 'countdownPulse 1s ease-in-out infinite',
          }}>:</div>
          <FlipDigit value={timeLeft.hours} label="Hours" accentColor={accentColor} />
          <div style={{
            display: 'flex', alignItems: 'center', paddingBottom: '1.5rem',
            fontSize: '1.5rem', color: accentColor, fontWeight: 700,
            animation: 'countdownPulse 1s ease-in-out infinite',
          }}>:</div>
          <FlipDigit value={timeLeft.minutes} label="Min" accentColor={accentColor} />
          <div style={{
            display: 'flex', alignItems: 'center', paddingBottom: '1.5rem',
            fontSize: '1.5rem', color: accentColor, fontWeight: 700,
            animation: 'countdownPulse 1s ease-in-out infinite',
          }}>:</div>
          <FlipDigit value={timeLeft.seconds} label="Sec" accentColor={accentColor} />
        </div>

        {/* Bottom decorative line */}
        <div style={{
          width: '40px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          margin: '2rem auto 0',
        }} />
      </div>
    </>
  );
}
