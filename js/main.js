/**
 * KATHLEEN MCGINN ART — HERO ANIMATION
 * Orchestrated with GSAP for premium gallery-grade reveal
 *
 * Animation sequence:
 *   1. Background atmosphere fades in
 *   2. Easel apex + topbar materialize (top of easel)
 *   3. Legs spread open from apex with staggered, organic timing
 *   4. Cross brace slides in horizontally
 *   5. Ledge rail extends (canvas resting surface)
 *   6. Canvas + mat drops onto ledge with subtle settle
 *   7. Painting reveals from bottom with a gentle wipe
 *   8. Signature logo rises and fades in below
 *   9. Subtle idle float begins (breathing life into the composition)
 */

;(function () {
  'use strict';

  /* ── Guard: wait for DOM ─────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init () {
    /* Abort the whole animation if GSAP failed to load */
    if (typeof gsap === 'undefined') {
      console.warn('[McGinnHero] GSAP not loaded — showing static state.');
      showStaticFallback();
      return;
    }

    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      showStaticFallback();
      return;
    }

    buildTimeline();
  }

  /* ── Static fallback (no animation) ────────── */
  function showStaticFallback () {
    const els = document.querySelectorAll(
      '.easel-leg, .easel-brace, .easel-ledge, .easel-topbar, .easel-apex, .easel-ledge-cap, .easel-foot'
    );
    els.forEach(el => { el.style.opacity = '1'; });

    const canvasWrapper   = document.querySelector('.canvas-wrapper');
    const signatureWrapper = document.querySelector('.signature-wrapper');
    const mask            = document.querySelector('.canvas-reveal-mask');

    if (canvasWrapper)    { canvasWrapper.style.opacity = '1'; }
    if (signatureWrapper) { signatureWrapper.style.opacity = '1'; signatureWrapper.style.transform = 'translateY(0)'; }
    if (mask)             { mask.style.clipPath = 'inset(0% 0 0 0)'; }
  }

  /* ── Main timeline ──────────────────────── */
  function buildTimeline () {
    /* Selectors */
    const canvasWrapper   = document.querySelector('.canvas-wrapper');
    const signatureWrapper = document.querySelector('.signature-wrapper');
    const revealMask      = document.querySelector('.canvas-reveal-mask');
    const galleryBg       = document.querySelector('.gallery-bg');
    const spotlight       = document.querySelector('.gallery-spotlight');

    /* Easel SVG element references */
    const apex       = document.querySelector('.easel-apex');
    const topbar     = document.querySelector('.easel-topbar');
    const legLeft    = document.querySelector('.easel-leg-left');
    const legRight   = document.querySelector('.easel-leg-right');
    const legBack    = document.querySelector('.easel-leg-back');
    const brace      = document.querySelector('.easel-brace');
    const ledge      = document.querySelector('.easel-ledge');
    const ledgeCaps  = document.querySelectorAll('.easel-ledge-cap');
    const feet       = document.querySelectorAll('.easel-foot');

    /* ── Set initial states ───────────────── */

    /* Background starts invisible */
    gsap.set(galleryBg, { opacity: 0 });
    gsap.set(spotlight, { opacity: 0 });

    /* All easel parts: start at origin point (apex) with scale 0 */
    gsap.set([apex, topbar], { opacity: 0, scale: 0, transformOrigin: 'center center' });
    gsap.set(ledgeCaps, { opacity: 0, scale: 0 });
    gsap.set(feet, { opacity: 0, scale: 0 });

    /* Legs: collapse to their top anchor point (the apex at 200,80) */
    gsap.set(legLeft,  { opacity: 0, scaleY: 0, transformOrigin: '200px 80px' });
    gsap.set(legRight, { opacity: 0, scaleY: 0, transformOrigin: '200px 80px' });
    gsap.set(legBack,  { opacity: 0, scaleY: 0, transformOrigin: '200px 90px' });

    /* Brace: collapsed to center */
    gsap.set(brace, { opacity: 0, scaleX: 0, transformOrigin: '200px 380px' });

    /* Ledge: collapsed to center */
    gsap.set(ledge, { opacity: 0, scaleX: 0, transformOrigin: '200px 130px' });

    /* Canvas: positioned above, invisible, ready to drop */
    gsap.set(canvasWrapper, { opacity: 0, y: -20 });

    /* Reveal mask starts fully clipped */
    if (revealMask) gsap.set(revealMask, { clipPath: 'inset(100% 0 0 0)' });

    /* Signature: positioned below, invisible */
    gsap.set(signatureWrapper, { opacity: 0, y: 16 });

    /* ── Master timeline ─────────────────── */
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      onComplete: beginIdleState,
    });

    /* 1. Fade in warm gallery atmosphere */
    tl.to(galleryBg, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut',
    }, 0);

    /* 2. Apex materializes — the pin at the top of the easel */
    tl.to(apex, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'back.out(1.8)',
    }, 0.5);

    /* 3. Top crossbar extends from apex */
    tl.to(topbar, {
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      duration: 0.4,
      ease: 'power2.out',
    }, 0.72);

    /* 4. Legs spread open from the apex — staggered, organic */
    /* Back support first (subtle, behind the others) */
    tl.to(legBack, {
      opacity: 0.85,
      scaleY: 1,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.90);

    /* Front legs splay open with a slight stagger */
    tl.to(legLeft, {
      opacity: 1,
      scaleY: 1,
      duration: 1.05,
      ease: 'power3.out',
    }, 0.96);

    tl.to(legRight, {
      opacity: 1,
      scaleY: 1,
      duration: 1.05,
      ease: 'power3.out',
    }, 1.04);

    /* Foot caps settle into place */
    tl.to(feet, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: 0.07,
      ease: 'back.out(2)',
    }, 1.80);

    /* 5. Cross brace slides in */
    tl.to(brace, {
      opacity: 1,
      scaleX: 1,
      duration: 0.55,
      ease: 'power2.out',
    }, 1.88);

    /* 6. Ledge rail extends */
    tl.to(ledge, {
      opacity: 1,
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out',
    }, 2.20);

    tl.to(ledgeCaps, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      stagger: 0.08,
      ease: 'back.out(2)',
    }, 2.52);

    /* 7. Canvas descends onto the ledge */
    tl.to(canvasWrapper, {
      opacity: 1,
      y: 0,
      duration: 0.80,
      ease: 'power3.out',
    }, 2.70);

    /* Subtle settle bounce at the end of the drop */
    tl.to(canvasWrapper, {
      y: 3,
      duration: 0.18,
      ease: 'power1.inOut',
    }, 3.46);
    tl.to(canvasWrapper, {
      y: 0,
      duration: 0.22,
      ease: 'power2.out',
    }, 3.64);

    /* 8. Painting reveals upward (wipe from bottom) */
    tl.to(revealMask, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.20,
      ease: 'power2.inOut',
    }, 3.30);

    /* 9. Spotlight brightens as painting emerges */
    tl.to(spotlight, {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.inOut',
    }, 3.50);

    /* 10. Signature rises and fades in */
    tl.to(signatureWrapper, {
      opacity: 1,
      y: 0,
      duration: 0.90,
      ease: 'power3.out',
    }, 4.80);

    /* ── END of main sequence ─────────────── */
  }

  /* ── Idle float after reveal ─────────────── */
  function beginIdleState () {
    const canvasWrapper    = document.querySelector('.canvas-wrapper');
    const signatureWrapper = document.querySelector('.signature-wrapper');
    const spotlight        = document.querySelector('.gallery-spotlight');

    /* Very subtle floating — barely perceptible, just alive */
    if (canvasWrapper) {
      gsap.to(canvasWrapper, {
        y: -5,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    /* Signature floats in sync but lagged slightly for natural feel */
    if (signatureWrapper) {
      gsap.to(signatureWrapper, {
        y: -3,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.4,
      });
    }

    /* Spotlight breathes very subtly */
    if (spotlight) {
      gsap.to(spotlight, {
        opacity: 0.82,
        duration: 5.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.0,
      });
    }
  }

})();
