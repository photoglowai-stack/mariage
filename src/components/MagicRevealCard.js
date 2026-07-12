"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function MagicRevealCard({
  frontTitle = "Hold to Discover",
  revealTitle = "Gregory & Isabelle",
  revealSubtitle = "Request the honor of your presence",
  revealDate = "May 27, 2026",
  accentColor = '#c5975b',
  bgColor = '#0f0f0f',
  textColor = '#fff',
}) {
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef(null);
  const holdDuration = 2000; // 2s to fully reveal
  const stepMs = 30;

  const startHold = useCallback(() => {
    if (isRevealed) return;
    setIsHolding(true);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + (stepMs / holdDuration) * 100;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setIsRevealed(true);
          setIsHolding(false);
          return 100;
        }
        return next;
      });
    }, stepMs);
  }, [isRevealed, holdDuration]);

  const stopHold = useCallback(() => {
    if (isRevealed) return;
    setIsHolding(false);
    clearInterval(intervalRef.current);
    // Smoothly retract if not fully revealed
    const retract = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(retract);
          return 0;
        }
        return prev - 3;
      });
    }, 20);
  }, [isRevealed]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Radial wipe angle based on progress
  const clipAngle = (progress / 100) * 360;

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes cardRevealIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        background: bgColor,
        padding: '4rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Sparkle particles */}
        {isHolding && Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            width: '4px', height: '4px',
            backgroundColor: accentColor,
            borderRadius: '50%',
            animation: `sparkle ${0.8 + Math.random() * 0.8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 0.5}s`,
          }} />
        ))}

        {!isRevealed ? (
          <>
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: textColor,
              opacity: 0.4,
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}>
              Something special
            </p>

            {/* Central hold button */}
            <div
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              style={{
                width: '140px', height: '140px',
                borderRadius: '50%',
                margin: '0 auto 2rem',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'none',
              }}
            >
              {/* Outer pulsing ring */}
              {isHolding && (
                <div style={{
                  position: 'absolute', inset: '-10px',
                  borderRadius: '50%',
                  border: `2px solid ${accentColor}`,
                  animation: 'ringPulse 1s ease-out infinite',
                }} />
              )}

              {/* Progress ring using conic gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                background: `conic-gradient(${accentColor} ${clipAngle}deg, rgba(255,255,255,0.08) ${clipAngle}deg)`,
                padding: '3px',
                transition: isHolding ? 'none' : 'background 0.3s ease',
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  background: bgColor,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                }}>
                  {/* Fingerprint / hold icon */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{
                    transition: 'transform 0.3s ease',
                    transform: isHolding ? 'scale(0.9)' : 'scale(1)',
                  }}>
                    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                    <path d="M2 12a10 10 0 0 1 18-6" />
                    <path d="M2 16h.01" />
                    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                    <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                    <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
                  </svg>
                  <span style={{
                    fontSize: '0.55rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: textColor,
                    opacity: 0.5,
                    fontWeight: 600,
                  }}>
                    {isHolding ? 'Keep holding...' : 'Hold'}
                  </span>
                </div>
              </div>
            </div>

            <h2 style={{
              fontFamily: "'Harmond', 'Zen Old Mincho', serif",
              fontSize: '1.8rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: textColor,
              marginBottom: '0.5rem',
              letterSpacing: '1px',
            }}>
              {frontTitle}
            </h2>

            <p style={{
              fontSize: '0.7rem',
              color: textColor,
              opacity: 0.35,
            }}>
              Press and hold the circle above
            </p>
          </>
        ) : (
          /* Revealed Content */
          <div style={{
            animation: 'cardRevealIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
          }}>
            {/* Golden divider */}
            <div style={{
              width: '50px', height: '1px',
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              margin: '0 auto 2rem',
            }} />

            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: accentColor,
              marginBottom: '1rem',
              fontWeight: 500,
              animation: 'floatUp 0.6s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}>
              Together with their families
            </p>

            <h2 style={{
              fontFamily: "'Harmond', 'Zen Old Mincho', serif",
              fontSize: '2.8rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: textColor,
              marginBottom: '0.5rem',
              animation: 'floatUp 0.6s ease forwards',
              animationDelay: '0.4s',
              opacity: 0,
              lineHeight: 1.2,
            }}>
              {revealTitle}
            </h2>

            <p style={{
              fontSize: '0.85rem',
              color: textColor,
              opacity: 0,
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              animation: 'floatUp 0.6s ease forwards',
              animationDelay: '0.6s',
            }}>
              {revealSubtitle}
            </p>

            <div style={{
              display: 'inline-block',
              padding: '0.6rem 2rem',
              border: `1px solid ${accentColor}44`,
              borderRadius: '30px',
              animation: 'floatUp 0.6s ease forwards',
              animationDelay: '0.8s',
              opacity: 0,
            }}>
              <span style={{
                fontFamily: "'Harmond', 'Zen Old Mincho', serif",
                fontSize: '1.1rem',
                color: accentColor,
                letterSpacing: '2px',
              }}>
                {revealDate}
              </span>
            </div>

            {/* Golden divider */}
            <div style={{
              width: '50px', height: '1px',
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              margin: '2rem auto 0',
              animation: 'floatUp 0.6s ease forwards',
              animationDelay: '1s',
              opacity: 0,
            }} />
          </div>
        )}
      </div>
    </>
  );
}
