"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import BordeauxTemplate from '../../../components/templates/BordeauxTemplate';

const templates = [
  { id: 'bordeaux', name: 'Bordeaux Elegant', tag: 'ELEGANT', desc: 'Deep and majestic elegance.', video: 'https://www.wooowinvites.com/assets/kissing-couple-theme-m4dGzKxs.mp4', envelope: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/dd56b19a36d2302d980bcafece0a9b05/manifest/video.m3u8', partner1: 'Emma', partner2: 'Liam' },
  { id: 'champagne', name: 'Champagne', tag: 'ROMANTIC', desc: 'Royal sophistication.', video: 'https://www.wooowinvites.com/assets/palm-zoom-theme-DTmwX1Yh.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1774273219231.mp4', partner1: 'Ava', partner2: 'William' },
  { id: 'ivory', name: 'Ivory', tag: 'MINIMAL', desc: 'Pure and delicate.', video: 'https://www.wooowinvites.com/assets/sea-view-theme-CqN1unYE.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1777314873141.mp4', partner1: 'Olivia', partner2: 'Noah' },
  { id: 'sage', name: 'Sage', tag: 'NATURAL', desc: 'Organic and refined.', video: 'https://www.wooowinvites.com/assets/sea-theme-animation-D5DLPcRz.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1777312876430.mp4', partner1: 'Charlotte', partner2: 'Elijah' },
  { id: 'terracotta', name: 'Terracotta', tag: 'WARM', desc: 'Sun-kissed warmth.', video: 'https://www.wooowinvites.com/assets/just-married-car-theme-BhahCrzF.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1777287974328.mp4', partner1: 'Sophia', partner2: 'James' },
  { id: 'royalbordeaux', name: 'Royal Bordeaux', tag: 'DRAMATIC', desc: 'Intense and noble.', video: 'https://www.wooowinvites.com/assets/castle-theme-DW5muDbc.mp4', envelope: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/dd56b19a36d2302d980bcafece0a9b05/manifest/video.m3u8', partner1: 'Isabella', partner2: 'Oliver' },
  { id: 'royalblue', name: 'Royal Blue', tag: 'ELEGANT', desc: 'Deep blue elegance.', video: 'https://www.wooowinvites.com/assets/royal-heritage-theme-Czr23y-Y.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1774273219231.mp4', partner1: 'Mia', partner2: 'Benjamin' },
  { id: 'chocolate', name: 'Chocolate', tag: 'WARM', desc: 'Rich warmth and character.', video: 'https://www.wooowinvites.com/assets/seaview-balcony-theme-X8-zUaoe.mp4', envelope: 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/98032531-8029-42fd-8ba2-3f50d3ab7f3a/opening-animation-1777314873141.mp4', partner1: 'Amelia', partner2: 'Lucas' },
  { id: 'rosebow', name: 'Rose Bow', tag: 'ROMANTIC', desc: 'A delicate ribbon opening.', video: 'https://maldives-demo.thedigitalyes.com/__l5e/assets-v1/ca66d869-63f5-40cc-8421-1b0df31922c2/rs-bow-v2.mp4', envelope: 'https://maldives-demo.thedigitalyes.com/__l5e/assets-v1/ca66d869-63f5-40cc-8421-1b0df31922c2/rs-bow-v2.mp4', partner1: 'Chloe', partner2: 'Sam' },
  { id: 'majestic', name: 'Majestic', tag: 'ELEGANT', desc: 'A regal and majestic entrance.', video: 'https://www.wooowinvites.com/assets/royal-heritage-theme-Czr23y-Y.mp4', envelope: 'https://majestic-template.thedigitalyes.com/assets/intro-video-Dhn3t98e.mp4', partner1: 'Victoria', partner2: 'Arthur' },
];

export default function TemplateDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const tpl = templates.find(t => t.id === id);

  if (!tpl) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Design template not found</h2>
        <button onClick={() => router.push('/templates')} style={{ padding: '0.8rem 1.5rem', marginTop: '1rem', cursor: 'pointer' }}>
          Back to Catalog
        </button>
      </div>
    );
  }

  const handleSelect = () => {
    localStorage.setItem('selectedTemplate', tpl.id);
    router.push('/checkout');
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
      
      {/* Floating Header Banner for Preview */}
      <div style={{
        position: 'fixed', top: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, display: 'flex', alignItems: 'center', gap: '1.25rem',
        padding: '0.65rem 1.25rem', borderRadius: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.05)', width: 'max-content', maxWidth: '90%'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingRight: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--font-body)' }}>
            Design: <span style={{ color: '#6b363e' }}>{tpl.name}</span>
          </span>
          <span style={{ fontSize: '0.6rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
            Live Preview
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => router.push('/templates')}
            style={{
              padding: '0.5rem 1.1rem', borderRadius: '20px', border: '1px solid #ddd',
              backgroundColor: '#fff', color: '#555', cursor: 'pointer',
              fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s',
              fontFamily: 'var(--font-body)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
          >
            Exit
          </button>
          <button 
            onClick={handleSelect}
            style={{
              padding: '0.5rem 1.1rem', borderRadius: '20px', border: 'none',
              backgroundColor: '#6b363e', color: '#fff', cursor: 'pointer',
              fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(107,54,62,0.2)', fontFamily: 'var(--font-body)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Choose Design
          </button>
        </div>
      </div>

      {/* Main Template Content rendering full screen */}
      <BordeauxTemplate 
        editMode={false}
        heroHeight="100vh"
        data={{
          themeId: tpl.id,
          partner1: tpl.partner1,
          partner2: tpl.partner2,
          videos: {
            envelope: tpl.envelope,
            hero: tpl.video
          },
          sections: { showIntro: true, showVenue: true, showSchedule: true, showBoardingPass: true, showRSVP: true, showGallery: true }
        }}
      />
    </div>
  );
}
