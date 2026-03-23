/**
 * KATHLEEN MCGINN ART — HERO ANIMATION
 *
 * Sequence:
 *  0.0s  Gallery background breathes in
 *  0.6s  Cross vertical arm descends (beam of light)
 *  2.6s  Cross horizontal arm sweeps across
 *  3.8s  Cross held — spotlight rests on it
 *  5.0s  Cross begins to fade — easel emerges from its form
 *  5.2s  Apex pin materializes at the top of the cross
 *  5.5s  Top crossbar extends
 *  5.8s  Center post draws downward through the cross space
 *  6.1s  Left leg spreads from apex
 *  6.3s  Right leg spreads from apex
 *  7.9s  Foot caps settle
 *  8.2s  Lower brace draws across
 *  8.7s  Ledge draws across — the resting place
 *  9.0s  Canvas descends onto the ledge
 *  9.8s  Painting wipes upward, spotlight brightens
 * 12.5s  Signature rises in
 * 13.9s+ Idle float begins
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
    el.style.opacity = '1';
    return len;
  }

  /* ── Main timeline ─────────────────────── */
  function runTimeline () {
    const bg        = document.querySelector('.gallery-bg');
    const spotlight = document.querySelector('.gallery-spotlight');
    const canvasW   = document.querySelector('.canvas-wrapper');
    const sigW      = document.querySelector('.signature-wrapper');
    const revMask   = document.querySelector('.canvas-reveal-mask');

    /* Cross elements */
    const crossV = document.getElementById('cross-v');
    const crossH = document.getElementById('cross-h');

    /* Easel elements */
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

    /* Set up stroke-draw for all lines */
    prepLine(crossV);
    prepLine(crossH);
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

    /* ── 1 — Gallery wall breathes in, warm and slow ── */
    tl.to(bg, {
      opacity: 1,
      duration: 2.8,
      ease: 'power2.inOut',
    }, 0);

    /* ── 2 — CROSS: vertical arm descends like a beam ── */
    tl.to(crossV, {
      strokeDashoffset: 0,
      duration: 2.0,
      ease: 'power2.inOut',
    }, 0.6);

    /* ── 3 — CROSS: horizontal arm sweeps left to right ── */
    tl.to(crossH, {
      strokeDashoffset: 0,
      duration: 1.3,
      ease: 'power2.inOut',
    }, 2.8);

    /* ── 4 — Spotlight rests gently on the cross ── */
    tl.to(spotlight, {
      opacity: 0.50,
      duration: 1.4,
      ease: 'power2.inOut',
    }, 3.5);

    /* ── 5 — TRANSFORMATION: cross fades, easel emerges ── */
    /* Cross dissolves */
    tl.to([crossV, crossH], {
      opacity: 0,
      duration: 1.8,
      ease: 'power2.inOut',
    }, 5.0);

    /* Spotlight dims briefly during the change */
    tl.to(spotlight, {
      opacity: 0.12,
      duration: 1.0,
      ease: 'power2.inOut',
    }, 5.0);

    /* Apex pin appears at the top — origin point of the cross */
    tl.to(apex, {
      opacity: 1,
      duration: 0.50,
      ease: 'back.out(2)',
      transformOrigin: 'center center',
    }, 5.2);

    /* Top crossbar extends from center */
    tl.to(topbar, {
      strokeDashoffset: 0,
      duration: 0.65,
      ease: 'power2.inOut',
    }, 5.6);

    /* Center post draws downward — through the same axis as the cross */
    tl.to(post, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.inOut',
    }, 5.9);

    /* Left leg spreads from the apex — slow, deliberate */
    tl.to(legL, {
      strokeDashoffset: 0,
      duration: 2.1,
      ease: 'power2.out',
    }, 6.2);

    /* Right leg spreads, slight stagger */
    tl.to(legR, {
      strokeDashoffset: 0,
      duration: 2.1,
      ease: 'power2.out',
    }, 6.5);

    /* Foot caps settle at the base */
    tl.to([footL, footR, footC], {
      opacity: 1,
      duration: 0.45,
      stagger: 0.12,
      ease: 'back.out(2)',
      transformOrigin: 'center center',
    }, 8.0);

    /* Lower brace draws across */
    tl.to(brace, {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: 'power2.inOut',
    }, 8.4);

    /* Ledge rail — the resting place — draws across */
    tl.to(ledge, {
      strokeDashoffset: 0,
      duration: 0.95,
      ease: 'power2.inOut',
    }, 9.0);

    /* Ledge end caps appear */
    tl.to([capL, capR], {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    }, 9.85);

    /* ── 6 — Canvas descends onto the ledge ── */
    gsap.set(canvasW, { opacity: 0, y: -30 });
    tl.to(canvasW, {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: 'power3.out',
    }, 9.2);

    /* Micro-settle: tiny bounce when it lands on the ledge */
    tl.to(canvasW, { y: 6,  duration: 0.20, ease: 'power1.inOut' }, 10.4);
    tl.to(canvasW, { y: 0,  duration: 0.28, ease: 'power2.out'   }, 10.6);

    /* ── 7 — Painting wipes upward, slowly revealed ── */
    tl.to(revMask, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 2.2,
      ease: 'power2.inOut',
    }, 9.9);

    /* Spotlight returns and brightens behind the painting */
    tl.to(spotlight, {
      opacity: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 10.2);

    /* ── 8 — Signature rises in, unhurried ── */
    tl.to(sigW, {
      opacity: 1,
      y: 0,
      duration: 1.6,
      ease: 'power3.out',
    }, 12.5);
  }

  /* ── Idle state: subtle breathing float ─── */
  function startIdle () {
    const canvasW   = document.querySelector('.canvas-wrapper');
    const sigW      = document.querySelector('.signature-wrapper');
    const spotlight = document.querySelector('.gallery-spotlight');

    if (canvasW) {
      gsap.to(canvasW, {
        y: -5,
        duration: 5.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    if (sigW) {
      gsap.to(sigW, {
        y: -3,
        duration: 5.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      });
    }

    if (spotlight) {
      gsap.to(spotlight, {
        opacity: 0.76,
        duration: 7.0,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }
  }

})();
