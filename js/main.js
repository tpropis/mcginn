/**
 * KATHLEEN MCGINN ART — HERO ANIMATION
 *
 * Uses stroke-dashoffset technique for SVG line draws:
 * Each line's dasharray = dashoffset = its full length.
 * Animating dashoffset → 0 draws the line naturally.
 *
 * Sequence:
 *  0.0s  Background atmosphere fades in
 *  0.6s  Apex pin appears
 *  0.8s  Top crossbar extends
 *  1.0s  Center post draws downward  (vertical of the cross)
 *  1.2s  Left + right legs spread from apex
 *  2.1s  Foot caps pop in
 *  2.3s  Lower brace draws across
 *  2.6s  Ledge draws across         (horizontal of the cross)
 *  2.9s  Canvas drops onto ledge + settle
 *  3.2s  Painting wipes up, spotlight brightens
 *  4.8s  Signature rises in
 *  5.6s+ Idle float begins
 */

;(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init () {
    if (typeof gsap === 'undefined') { showFallback(); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { showFallback(); return; }
    runTimeline();
  }

  /* ── Instant static reveal (no animation) ─ */
  function showFallback () {
    document.querySelectorAll(
      '#e-leg-l, #e-leg-r, #e-post, #e-ledge, #e-brace, #e-topbar,' +
      '#e-apex, #e-cap-l, #e-cap-r, #e-foot-l, #e-foot-r, #e-foot-c'
    ).forEach(el => { el.style.opacity = '1'; });

    const cw  = document.querySelector('.canvas-wrapper');
    const sw  = document.querySelector('.signature-wrapper');
    const rm  = document.querySelector('.canvas-reveal-mask');
    const bg  = document.querySelector('.gallery-bg');
    const sl  = document.querySelector('.gallery-spotlight');

    if (bg)  bg.style.opacity  = '1';
    if (sl)  sl.style.opacity  = '1';
    if (cw)  cw.style.opacity  = '1';
    if (sw)  { sw.style.opacity = '1'; sw.style.transform = 'translateY(0)'; }
    if (rm)  rm.style.clipPath  = 'inset(0% 0 0 0)';
  }

  /* ── Prepare a line for stroke-draw animation ─ */
  function prepLine (el) {
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray  = len;
    el.style.strokeDashoffset = len;
    el.style.opacity = '1';   /* visible, but offset makes it invisible */
    return len;
  }

  /* ── Main timeline ─────────────────────── */
  function runTimeline () {
    /* Elements */
    const bg        = document.querySelector('.gallery-bg');
    const spotlight = document.querySelector('.gallery-spotlight');
    const canvasW   = document.querySelector('.canvas-wrapper');
    const sigW      = document.querySelector('.signature-wrapper');
    const revMask   = document.querySelector('.canvas-reveal-mask');

    const apex   = document.getElementById('e-apex');
    const topbar = document.getElementById('e-topbar');
    const legL   = document.getElementById('e-leg-l');
    const legR   = document.getElementById('e-leg-r');
    const post   = document.getElementById('e-post');
    const ledge  = document.getElementById('e-ledge');
    const brace  = document.getElementById('e-brace');
    const capL   = document.getElementById('e-cap-l');
    const capR   = document.getElementById('e-cap-r');
    const footL  = document.getElementById('e-foot-l');
    const footR  = document.getElementById('e-foot-r');
    const footC  = document.getElementById('e-foot-c');

    /* Measure and set up lines for stroke-draw */
    prepLine(topbar);
    prepLine(legL);
    prepLine(legR);
    prepLine(post);
    prepLine(ledge);
    prepLine(brace);

    /* ── Build GSAP timeline ────────────── */
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: startIdle,
    });

    /* 1 — Gallery background fades in */
    tl.to(bg, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut',
    }, 0);

    /* 2 — Apex hinge pin materializes */
    tl.to(apex, {
      opacity: 1,
      scale: 1,
      duration: 0.32,
      ease: 'back.out(2)',
    }, 0.55);

    /* 3 — Top crossbar draws out from center */
    tl.to(topbar, {
      strokeDashoffset: 0,
      duration: 0.38,
      ease: 'power2.inOut',
    }, 0.78);

    /* 4 — Center post draws downward  ← VERTICAL of the cross */
    tl.to(post, {
      strokeDashoffset: 0,
      duration: 1.10,
      ease: 'power2.inOut',
    }, 1.00);

    /* 5 — Left leg draws from apex downward */
    tl.to(legL, {
      strokeDashoffset: 0,
      duration: 1.05,
      ease: 'power2.out',
    }, 1.18);

    /* 6 — Right leg draws from apex downward (slight stagger) */
    tl.to(legR, {
      strokeDashoffset: 0,
      duration: 1.05,
      ease: 'power2.out',
    }, 1.28);

    /* 7 — Foot caps pop in */
    tl.to([footL, footR, footC], {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      stagger: 0.08,
      ease: 'back.out(2)',
      transformOrigin: 'center center',
    }, 2.10);

    /* 8 — Lower brace draws across  */
    tl.to(brace, {
      strokeDashoffset: 0,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 2.26);

    /* 9 — Ledge rail draws across  ← HORIZONTAL of the cross */
    tl.to(ledge, {
      strokeDashoffset: 0,
      duration: 0.50,
      ease: 'power2.inOut',
    }, 2.62);

    /* Ledge end caps appear */
    tl.to([capL, capR], {
      opacity: 1,
      duration: 0.22,
      ease: 'power2.out',
    }, 3.00);

    /* 10 — Canvas mat descends onto the ledge */
    gsap.set(canvasW, { opacity: 0, y: -22 });
    tl.to(canvasW, {
      opacity: 1,
      y: 0,
      duration: 0.78,
      ease: 'power3.out',
    }, 2.90);

    /* Micro-settle: tiny bounce when it lands */
    tl.to(canvasW, { y: 4,  duration: 0.16, ease: 'power1.inOut' }, 3.62);
    tl.to(canvasW, { y: 0,  duration: 0.20, ease: 'power2.out'   }, 3.78);

    /* 11 — Painting wipes upward from bottom */
    tl.to(revMask, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.20,
      ease: 'power2.inOut',
    }, 3.22);

    /* Spotlight brightens behind the painting */
    tl.to(spotlight, {
      opacity: 1,
      duration: 1.50,
      ease: 'power2.inOut',
    }, 3.40);

    /* 12 — Signature rises in */
    tl.to(sigW, {
      opacity: 1,
      y: 0,
      duration: 0.90,
      ease: 'power3.out',
    }, 4.80);
  }

  /* ── Idle state: subtle breathing float ─── */
  function startIdle () {
    const canvasW   = document.querySelector('.canvas-wrapper');
    const sigW      = document.querySelector('.signature-wrapper');
    const spotlight = document.querySelector('.gallery-spotlight');

    /* Canvas floats very gently — barely visible, just alive */
    if (canvasW) {
      gsap.to(canvasW, {
        y: -5,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    /* Signature floats in sympathy, slightly delayed */
    if (sigW) {
      gsap.to(sigW, {
        y: -3,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }

    /* Spotlight breathes — almost imperceptible */
    if (spotlight) {
      gsap.to(spotlight, {
        opacity: 0.78,
        duration: 6.0,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }
  }

})();
