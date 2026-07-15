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

      {/* Main Template Content rendering full screen */}
      <BordeauxTemplate 
        editMode={false}
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
