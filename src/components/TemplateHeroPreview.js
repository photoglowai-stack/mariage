"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function TemplateHeroPreview({ partner1 = "Emma", partner2 = "Liam", videoSrc, envelopeSrc, showEnvelope = false, isImage = false }) {
  const [envelopeDismissed, setEnvelopeDismissed] = useState(!showEnvelope);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [envelopeReady, setEnvelopeReady] = useState(false);
  const [envelopeFailed, setEnvelopeFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const previewRef = useRef(null);
  const heroVideoRef = useRef(null);
  const envelopeVideoRef = useRef(null);

  const handleEnvelopeError = useCallback(() => {
    setEnvelopeFailed(true);
    // A broken preview should never hide the template beneath it.
    setTimeout(() => setEnvelopeDismissed(true), 700);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '80px 0px' }
    );
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || isImage) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isImage]);

  useEffect(() => {
    if (isVisible && showEnvelope && envelopeSrc && !envelopeDismissed) {
      const video = envelopeVideoRef.current;
      if (!video) return;

      setEnvelopeReady(false);
      setEnvelopeOpen(false);
      setEnvelopeFailed(false);
      let hls;
      let cancelled = false;
      const loadEnvelope = async () => {
        if (envelopeSrc.endsWith('.m3u8')) {
          const { default: Hls } = await import('hls.js');
          if (cancelled) return;
          if (Hls.isSupported()) {
            hls = new Hls({ startLevel: -1, capLevelToPlayerSize: true });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (data.fatal) handleEnvelopeError();
            });
            hls.loadSource(envelopeSrc);
            hls.attachMedia(video);
          } else {
            video.src = envelopeSrc;
            video.load();
          }
        } else {
          video.src = envelopeSrc;
          video.load();
        }
      };

      loadEnvelope();

      return () => {
        cancelled = true;
        if (hls) hls.destroy();
      };
    }
  }, [isVisible, showEnvelope, envelopeSrc, envelopeDismissed, handleEnvelopeError]);

  useEffect(() => {
    if (!isVisible || !showEnvelope || !envelopeSrc || !envelopeReady || envelopeDismissed) return undefined;

    const timer = setTimeout(() => {
      setEnvelopeOpen(true);
      envelopeVideoRef.current?.play().catch(() => {});
    }, 250);

    return () => clearTimeout(timer);
  }, [isVisible, showEnvelope, envelopeSrc, envelopeReady, envelopeDismissed]);

  const handleVideoEnded = () => {
    setEnvelopeDismissed(true);
  };

  return (
    <div ref={previewRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#111', containerType: 'inline-size' }}>
      {/* ENVELOPE OVERLAY */}
      {!envelopeDismissed && envelopeSrc && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#F7F5F0', zIndex: 100, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transition: 'opacity 1s ease-in-out, visibility 1s',
          opacity: envelopeDismissed ? 0 : 1,
          visibility: envelopeDismissed ? 'hidden' : 'visible'
        }}>
          {!envelopeOpen && !envelopeFailed && (
            <span style={{ position: 'relative', zIndex: 1, color: '#6b363e', fontFamily: 'var(--font-heading, serif)', fontSize: '0.9em', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Opening invitation
            </span>
          )}
          <video 
            ref={envelopeVideoRef}
            muted
            playsInline
            onLoadedData={() => setEnvelopeReady(true)}
            onEnded={handleVideoEnded}
            onError={handleEnvelopeError}
            preload="metadata"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: envelopeReady ? 1 : 0, transition: 'opacity 250ms ease' }}
          />
        </div>
      )}

      {isImage ? (
        <img src={videoSrc} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <video
          ref={heroVideoRef}
          src={isVisible ? videoSrc : undefined}
          autoPlay={isVisible}
          loop={videoSrc !== envelopeSrc}
          muted
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: videoFailed ? 0 : 1, transition: 'opacity 250ms ease' }}
        />
      )}
      {videoFailed && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #7d5b5d, #211c1d)' }} />}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', paddingTop: '3em', fontSize: '3.8cqw' }}>
        <h3 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.6em', letterSpacing: '0.1em', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          {partner1.toUpperCase()}<br/>
          <span style={{ fontSize: '1.2em', fontStyle: 'italic', fontWeight: 300 }}>&amp;</span><br/>
          {partner2.toUpperCase()}
        </h3>
        <div style={{ marginTop: '1.5em' }}>
          <p style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '0.85em', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Wedding Day</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em', margin: '0.5em 0' }}>
            <div style={{ height: '1px', width: '2em', backgroundColor: '#fff', opacity: 0.8 }}></div>
            <div style={{ width: '0.3em', height: '0.3em', backgroundColor: '#fff', transform: 'rotate(45deg)', opacity: 0.8 }}></div>
            <div style={{ height: '1px', width: '2em', backgroundColor: '#fff', opacity: 0.8 }}></div>
          </div>
          <p style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '0.75em', letterSpacing: '0.2em', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>OCT 15, 2026</p>
        </div>
      </div>
    </div>
  );
}
