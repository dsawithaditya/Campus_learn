import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const STAT_DOMAINS = [
  {
    key: 'TECH',
    label: 'Tech & Code',
    guild: 'The Systems Guild',
    color: '#f5b945',
    pattern: '/patterns/stats-bg-char.webp',
  },
  {
    key: 'ARTS',
    label: 'Design & Arts',
    guild: 'The Spatial Designers',
    color: '#ff6b4a',
    pattern: '/patterns/stats-bg-str.webp',
  },
  {
    key: 'MUSIC',
    label: 'Music & Stage',
    guild: 'The Sonic Architects',
    color: '#4ecb8a',
    pattern: '/patterns/stats-bg-wis.webp',
  },
  {
    key: 'SPORTS',
    label: 'Sports & Esports',
    guild: 'The Athletic Vanguard',
    color: '#5b8def',
    pattern: '/patterns/stats-bg-int.webp',
  },
];

const BODY_COPY =
  'Click or hover to drop orbs and explore campus skill momentum.';

const MIDLINE_RATIO = 0.56;
const TARGET_BALL_AREA_DIVISOR = 25;
const POINTS_PER_BALL = 4;
const MAX_SCORE = 100;
const INITIAL_MIN_BALLS = 5;
const INITIAL_MAX_BALLS = 8;
const DIVIDER_THICKNESS = 8;
const HOLD_SPAWN_INTERVAL_MS = 143;
const DIE_DURATION_SEC = 0.38;
const POP_DURATION_SEC = 0.42;
const FALLING_ORB_COLOR = '#0859D4';

// Back-out spring overshoot curve matching Grail's Bt(e)
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// Draw image with object-fit: cover semantics onto canvas region
function drawImageCover(ctx, img, x, y, w, h) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = w / h;
  let sw;
  let sh;
  let sx;
  let sy;
  if (imgRatio > boxRatio) {
    sh = img.naturalHeight;
    sw = sh * boxRatio;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / boxRatio;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/**
 * Subtle Obsidian + Warm Torch WebGL Backdrop (Grail's totemBackdrop)
 * Keeps the website's signature #070709 obsidian theme while casting a warm cursor glow
 */
const VERT_SRC = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG_SRC = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) { v += valueNoise(p) * amp; p = p * 2.03 + 7.1; amp *= 0.5; }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.05;
  vec2 q = vec2(fbm(p * 1.7 + vec2(0.0, t)), fbm(p * 1.7 + vec2(4.6, -t)));
  vec2 r = vec2(fbm(p * 1.7 + 2.2 * q + vec2(1.7, 9.2)), fbm(p * 1.7 + 2.2 * q + vec2(8.3, 2.8)));
  float n = fbm(p * 1.7 + 2.6 * r);
  n = smoothstep(0.35, 1.0, n);

  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float glow = exp(-dot(p - m, p - m) * 2.4);

  float vig = 1.0 - 0.45 * length(uv - 0.5);
  float field = n * vig;

  vec3 col = vec3(0.972, 0.976, 0.988);
  col -= vec3(0.020, 0.014, 0.004) * field;
  col -= vec3(0.012, 0.006, 0.000) * field * (1.0 - glow);
  col += vec3(-0.045, -0.018, 0.012) * glow * (0.35 + 0.7 * field);
  gl_FragColor = vec4(col, 1.0);
}
`;

function StatsBackdrop({ active }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return undefined;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return undefined;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    let rafId = 0;
    let running = true;
    let timeAcc = 0;
    let lastNow = performance.now() / 1000;
    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };

    const onMouseMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const resize = () => {
      const dpr = 0.5;
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    };
    resize();
    window.addEventListener('resize', resize);

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const loop = () => {
      if (!running) return;
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastNow);
      lastNow = now;

      if (activeRef.current || reducedMotion) {
        timeAcc += reducedMotion ? 0 : dt;
        currentMouse.x += (targetMouse.x - currentMouse.x) * Math.min(1, dt * 3);
        currentMouse.y += (targetMouse.y - currentMouse.y) * Math.min(1, dt * 3);

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(prog);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, timeAcc);
        gl.uniform2f(uMouse, currentMouse.x, currentMouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reducedMotion) {
        rafId = requestAnimationFrame(loop);
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block pointer-events-none z-0"
    />
  );
}

export function Stats({ standalone = true, topContent = null }) {
  const sectionRef = useRef(null);
  const topCanvasRef = useRef(null);
  const gooCanvasRef = useRef(null);
  const countRefs = useRef([]);
  const isIntersectingRef = useRef(false);
  const isActiveRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);

  // Intersection Observer matching Grail's thresholds
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        setInView(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.2) {
          isActiveRef.current = true;
          setEntered(true);
        }
      },
      { threshold: [0, 0.04, 0.2, 0.35] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Matter.js dual-canvas physics & clipping-mask animation
  useEffect(() => {
    const topCanvas = topCanvasRef.current;
    const gooCanvas = gooCanvasRef.current;
    if (!topCanvas || !gooCanvas) return undefined;

    const topCtx = topCanvas.getContext('2d');
    const gooCtx = gooCanvas.getContext('2d');
    if (!topCtx || !gooCtx) return undefined;

    const { Engine, Composite, Bodies, Body, Events } = Matter;
    const engine = Engine.create({ enableSleeping: true });
    engine.gravity.y = 1.4;
    engine.positionIterations = 12;
    engine.velocityIterations = 8;

    let width = 0;
    let height = 0;
    let midlineY = 0;
    let dpr = 1;
    let baseRadius = 24;

    let floorBody = null;
    let leftWallBody = null;
    let rightWallBody = null;
    let dividerBodies = [];
    const getStaticWalls = () =>
      [floorBody, leftWallBody, rightWallBody, ...dividerBodies].filter(Boolean);

    const balls = [];
    const metaMap = new WeakMap();
    const targetScores = [0, 0, 0, 0];
    const displayedScores = [0, 0, 0, 0];
    const toRemove = [];

    const getColumnIndex = (xPos) =>
      Math.min(3, Math.max(0, Math.floor(xPos / (width / 4))));

    const bodyOptions = {
      restitution: 0.3,
      friction: 0.04,
      frictionStatic: 0.2,
      frictionAir: 0.012,
      density: 0.0016,
    };

    const minRadiusScale = 0.6;
    const maxRadiusScale = 1.45;
    const randomRadius = () =>
      baseRadius * (minRadiusScale + Math.random() * (maxRadiusScale - minRadiusScale));

    // Preload the 4 column pattern illustrations
    const patternImages = STAT_DOMAINS.map((d) => {
      const img = new Image();
      img.src = d.pattern;
      return img;
    });

    const removeBall = (body) => {
      Composite.remove(engine.world, body);
      const idx = balls.indexOf(body);
      if (idx >= 0) balls.splice(idx, 1);
      metaMap.delete(body);
    };

    const clearAllBalls = () => {
      for (const b of balls) {
        Composite.remove(engine.world, b);
      }
      balls.length = 0;
    };

    const setupBounds = () => {
      width = topCanvas.clientWidth;
      height = topCanvas.clientHeight;
      if (!width || !height) return;

      dpr = Math.min(2, window.devicePixelRatio || 1.5);
      topCanvas.width = Math.floor(width * dpr);
      topCanvas.height = Math.floor(height * dpr);
      gooCanvas.width = topCanvas.width;
      gooCanvas.height = topCanvas.height;

      midlineY = height * MIDLINE_RATIO;
      const colW = width / 4;
      const colH = height - midlineY;

      baseRadius = Math.max(
        15,
        Math.min(
          48,
          Math.sqrt((0.68 * colW * colH) / (TARGET_BALL_AREA_DIVISOR * Math.PI))
        )
      );

      const existingWalls = getStaticWalls();
      if (existingWalls.length) {
        Composite.remove(engine.world, existingWalls);
      }

      floorBody = Bodies.rectangle(width / 2, height + 40, width + 200, 80, {
        isStatic: true,
      });
      leftWallBody = Bodies.rectangle(-40, height / 2, 80, height * 3, {
        isStatic: true,
      });
      rightWallBody = Bodies.rectangle(width + 40, height / 2, 80, height * 3, {
        isStatic: true,
      });
      dividerBodies = [0.25, 0.5, 0.75].map((ratio) =>
        Bodies.rectangle(
          width * ratio,
          height / 2,
          DIVIDER_THICKNESS,
          height * 2,
          { isStatic: true }
        )
      );

      Composite.add(engine.world, getStaticWalls());
    };

    setupBounds();

    // Pop off and shrink balls that pile above the 50% midline
    const triggerOverflowPopOff = (body) => {
      const meta = metaMap.get(body);
      if (!meta) return;
      meta.dying = true;
      meta.dieT = 0;
      body.isSensor = true;
      const dir = Math.random() < 0.5 ? -1 : 1;
      Body.setVelocity(body, {
        x: dir * (5 + Math.random() * 8),
        y: -(2 + Math.random() * 7),
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);
    };

    // Handle falling ball landing on floor or on an already-landed ball
    const handleCollisionLand = (body, other) => {
      const meta = metaMap.get(body);
      if (!meta || meta.landed || meta.dying) return;
      const otherLanded = other === floorBody || metaMap.get(other)?.landed;
      if (!otherLanded) return;

      if (body.position.y < midlineY) {
        triggerOverflowPopOff(body);
        return;
      }

      const colIdx = getColumnIndex(body.position.x);
      meta.landed = true;
      meta.color = STAT_DOMAINS[colIdx].color;
      meta.idx = colIdx;
      targetScores[colIdx] = Math.min(
        MAX_SCORE,
        targetScores[colIdx] + POINTS_PER_BALL
      );
    };

    Events.on(engine, 'collisionStart', (event) => {
      for (const pair of event.pairs) {
        if (metaMap.has(pair.bodyA)) {
          handleCollisionLand(pair.bodyA, pair.bodyB);
        }
        if (metaMap.has(pair.bodyB)) {
          handleCollisionLand(pair.bodyB, pair.bodyA);
        }
      }
    });

    const pointer = { x: 0, y: 0, inside: false, holding: false };
    let prevPointerX = 0;
    const pointerVel = { x: 0 };

    // Spawn a falling translucent orb from cursor position
    const spawnFallingBall = (px, py) => {
      const r = randomRadius();
      const clampedY = Math.min(py, midlineY - baseRadius * maxRadiusScale * 2);
      const circle = Bodies.circle(px, clampedY, r, bodyOptions);

      Body.setVelocity(circle, {
        x: Math.max(-9, Math.min(9, pointerVel.x * 0.8)),
        y: 1 + Math.random(),
      });

      metaMap.set(circle, {
        landed: false,
        color: FALLING_ORB_COLOR,
        scale: 1,
        dying: false,
        dieT: 0,
        idx: -1,
        popT: POP_DURATION_SEC,
        popDelay: 0,
      });

      balls.push(circle);
      Composite.add(engine.world, circle);
      if (balls.length > 260) {
        removeBall(balls[0]);
      }
    };

    // Seed initial landed balls at the bottom of each of the 4 columns
    const seedInitialPile = () => {
      for (let col = 0; col < 4; col++) {
        const count =
          INITIAL_MIN_BALLS +
          Math.floor(Math.random() * (INITIAL_MAX_BALLS - INITIAL_MIN_BALLS + 1));
        const leftEdge = col * 0.25 * width + 8;
        const rightEdge = (col + 1) * 0.25 * width - 8;
        let curX = leftEdge;
        let curY = height - 8;
        let rowMaxR = 0;

        for (let s = 0; s < count; s++) {
          const r = randomRadius();
          if (curX + r * 2 > rightEdge && curX > leftEdge) {
            curX = leftEdge;
            curY -= rowMaxR * 2 * 0.95;
            rowMaxR = 0;
          }
          const circle = Bodies.circle(curX + r, curY - r, r, bodyOptions);
          metaMap.set(circle, {
            landed: true,
            color: STAT_DOMAINS[col].color,
            scale: 0,
            dying: false,
            dieT: 0,
            idx: col,
            popT: 0,
            popDelay: 0.85 + s * 0.07 + Math.random() * 0.12,
          });
          balls.push(circle);
          Composite.add(engine.world, circle);
          curX += r * 2 + 1;
          rowMaxR = Math.max(rowMaxR, r);
        }
        targetScores[col] = count * POINTS_PER_BALL;
      }
    };

    seedInitialPile();

    const getLocalCoords = (e) => {
      const rect = topCanvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    let nextSpawnAt = 0;

    const onPointerMove = (e) => {
      const pos = getLocalCoords(e);
      pointer.x = pos.x;
      pointer.y = pos.y;
      pointer.inside = true;
    };

    const onPointerEnter = (e) => {
      const pos = getLocalCoords(e);
      pointer.x = pos.x;
      pointer.y = pos.y;
      pointer.inside = true;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      pointer.holding = false;
    };

    const onPointerDown = (e) => {
      const pos = getLocalCoords(e);
      pointer.x = pos.x;
      pointer.y = pos.y;
      pointer.inside = true;
      pointer.holding = true;
      spawnFallingBall(pos.x, pos.y);
      nextSpawnAt = performance.now() + HOLD_SPAWN_INTERVAL_MS;
    };

    const onPointerUp = () => {
      pointer.holding = false;
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (topCanvas.clientWidth !== width || topCanvas.clientHeight !== height) {
          setupBounds();
          clearAllBalls();
          seedInitialPile();
        }
      }, 160);
    };

    topCanvas.addEventListener('pointermove', onPointerMove);
    topCanvas.addEventListener('pointerenter', onPointerEnter);
    topCanvas.addEventListener('pointerleave', onPointerLeave);
    topCanvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    let rafId = 0;
    let lastTime = performance.now();
    let physicsAccumMs = 0;
    let activeElapsedSec = reducedMotion ? 3 : 0;
    const fixedStepMs = 1000 / 60;

    if (reducedMotion) {
      isIntersectingRef.current = true;
      isActiveRef.current = true;
      for (let i = 0; i < 60; i++) Engine.update(engine, fixedStepMs);
      for (const b of balls) {
        const meta = metaMap.get(b);
        if (meta) meta.scale = 1;
      }
      for (let c = 0; c < 4; c++) {
        displayedScores[c] = targetScores[c];
        const el = countRefs.current[c];
        if (el) el.textContent = String(targetScores[c]);
      }
    }

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!isIntersectingRef.current) {
        physicsAccumMs = 0;
        rafId = requestAnimationFrame(tick);
        return;
      }

      pointerVel.x = pointerVel.x * 0.6 + (pointer.x - prevPointerX) * 0.4;
      prevPointerX = pointer.x;

      if ((pointer.holding || pointer.inside) && now >= nextSpawnAt) {
        spawnFallingBall(pointer.x, pointer.y);
        nextSpawnAt =
          now +
          (pointer.holding
            ? HOLD_SPAWN_INTERVAL_MS
            : 500 + Math.random() * 300);
      }

      physicsAccumMs += dt * 1000;
      let steps = 0;
      while (physicsAccumMs >= fixedStepMs && steps < 5) {
        Engine.update(engine, fixedStepMs);
        physicsAccumMs -= fixedStepMs;
        steps++;
      }
      if (physicsAccumMs > fixedStepMs) physicsAccumMs = 0;

      if (isActiveRef.current) {
        activeElapsedSec += dt;
      } else {
        activeElapsedSec = 0;
      }

      // Update dying overflow balls
      for (const b of balls) {
        const meta = metaMap.get(b);
        if (meta && meta.dying) {
          meta.dieT += dt;
          meta.scale = Math.max(0, 1 - meta.dieT / DIE_DURATION_SEC);
          if (meta.scale <= 0) toRemove.push(b);
        }
      }
      if (toRemove.length) {
        for (const b of toRemove) removeBall(b);
        toRemove.length = 0;
      }

      // Pop-in spring animation for initial seeded balls
      if (isActiveRef.current) {
        for (const b of balls) {
          const meta = metaMap.get(b);
          if (!meta || meta.dying || meta.popT >= POP_DURATION_SEC) continue;
          if (meta.popDelay > 0) {
            meta.popDelay -= dt;
            continue;
          }
          meta.popT = Math.min(POP_DURATION_SEC, meta.popT + dt);
          meta.scale = easeOutBack(meta.popT / POP_DURATION_SEC);
        }
      }

      // Smooth tabular score counter interpolation
      if (isActiveRef.current && activeElapsedSec >= 0.15) {
        for (let c = 0; c < 4; c++) {
          if (displayedScores[c] !== targetScores[c]) {
            displayedScores[c] +=
              (targetScores[c] - displayedScores[c]) * Math.min(1, dt * 9);
            if (Math.abs(targetScores[c] - displayedScores[c]) < 0.5) {
              displayedScores[c] = targetScores[c];
            }
            const el = countRefs.current[c];
            if (el) {
              el.textContent = String(Math.round(displayedScores[c]));
            }
          }
        }
      }

      // 1) Draw top canvas: vertical divider lines + falling translucent white orbs
      topCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      topCtx.clearRect(0, 0, width, height);
      topCtx.strokeStyle = 'rgba(29, 29, 31, 0.12)';
      topCtx.lineWidth = 1;

      [0.25, 0.5, 0.75].forEach((ratio, idx) => {
        const prog = Math.min(
          1,
          Math.max(0, (activeElapsedSec - 0.6 - idx * 0.14) / 0.6)
        );
        if (prog <= 0) return;
        const eased = 1 - Math.pow(1 - prog, 3);
        topCtx.beginPath();
        topCtx.moveTo(width * ratio, midlineY);
        topCtx.lineTo(width * ratio, midlineY + (height - midlineY) * eased);
        topCtx.stroke();
      });

      for (const b of balls) {
        const meta = metaMap.get(b);
        if (!meta || meta.landed) continue;
        const r = (b.circleRadius ?? baseRadius) * meta.scale;
        if (r < 0.5) continue;
        topCtx.globalAlpha = meta.dying ? 0.16 * meta.scale : 0.16;
        topCtx.beginPath();
        topCtx.arc(b.position.x, b.position.y, r, 0, Math.PI * 2);
        topCtx.fillStyle = meta.color;
        topCtx.fill();
      }
      topCtx.globalAlpha = 1;

      // 2) Draw goo canvas: clip union of landed circles (radius * 1.09) to reveal column artwork
      gooCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gooCtx.clearRect(0, 0, width, height);

      for (let col = 0; col < 4; col++) {
        const colX = (width / 4) * col;
        gooCtx.save();
        gooCtx.beginPath();
        let hasLanded = false;

        for (const b of balls) {
          const meta = metaMap.get(b);
          if (!meta || !meta.landed || meta.idx !== col) continue;
          const r = (b.circleRadius ?? baseRadius) * 1.09 * meta.scale;
          if (r < 0.5) continue;
          gooCtx.moveTo(b.position.x + r, b.position.y);
          gooCtx.arc(b.position.x, b.position.y, r, 0, Math.PI * 2);
          hasLanded = true;
        }

        if (hasLanded) {
          gooCtx.clip();
          const padTop = baseRadius * maxRadiusScale * 3;
          const img = patternImages[col];
          if (img.complete && img.naturalWidth) {
            drawImageCover(
              gooCtx,
              img,
              colX,
              midlineY - padTop,
              width / 4,
              height - midlineY + padTop
            );
          } else {
            gooCtx.fillStyle = STAT_DOMAINS[col].color;
            gooCtx.fillRect(
              colX,
              midlineY - padTop,
              width / 4,
              height - midlineY + padTop
            );
          }
        }
        gooCtx.restore();
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      topCanvas.removeEventListener('pointermove', onPointerMove);
      topCanvas.removeEventListener('pointerenter', onPointerEnter);
      topCanvas.removeEventListener('pointerleave', onPointerLeave);
      topCanvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className={standalone ? 'relative z-[7]' : 'relative z-[7] h-[190vh] -mb-[80vh]'}>
      <section
        id="stats"
        ref={sectionRef}
        className={`${
          standalone
            ? topContent
              ? 'relative min-h-[760px] sm:h-[680px] rounded-3xl'
              : 'relative h-[78vh] min-h-[560px] rounded-3xl'
            : 'sticky top-0 h-screen min-h-[680px] rounded-3xl'
        } w-full bg-[#F9F9FB] text-[#1D1D1F] overflow-hidden select-none border border-black/[0.08] shadow-[0_20px_60px_rgba(29,29,31,0.06)]`}
      >

      {/* Subtle Crisp Studio WebGL Backdrop */}
      <StatsBackdrop active={inView} />

      {/* Goo Canvas (Clipped Pattern Artwork for Landed Balls) */}
      <canvas
        ref={gooCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block pointer-events-none z-[1]"
      />

      {/* Interactive Physics Canvas (Falling Translucent Orbs + Staggered Divider Lines) */}
      <canvas
        ref={topCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block z-[2]"
        style={{ touchAction: 'pan-y' }}
      />

      {/* Top Content Inside Unified Box */}
      {topContent ? (
        <div className="relative z-[3] pt-5 sm:pt-6 px-4 sm:px-7 pointer-events-none">
          <div className="pointer-events-auto">{topContent}</div>
        </div>
      ) : (
        <div className="relative z-[2] pt-8 sm:pt-10 px-6 sm:px-10 pointer-events-none flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1
            className="m-0 font-display font-bold text-[#1D1D1F] tracking-tight leading-[1.02]"
            style={{ fontSize: 'clamp(32px, 4.4vw, 56px)' }}
          >
            <span className="block overflow-hidden">
              <span
                className="block transition-transform duration-[780ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: entered ? 'translateY(0)' : 'translateY(115%)',
                }}
              >
                Every cohort
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block transition-transform duration-[780ms] delay-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: entered ? 'translateY(0)' : 'translateY(115%)',
                }}
              >
                <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
                  leaves proof.
                </span>
              </span>
            </span>
          </h1>

          <p
            className="m-0 max-w-xs text-xs sm:text-sm leading-relaxed text-[#6E6E73] transition-all duration-[700ms] delay-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            {BODY_COPY}
          </p>
        </div>
      )}

      {/* Accessible Screen-Reader List */}
      <ul className="sr-only">
        {STAT_DOMAINS.map((d) => (
          <li key={d.key}>
            {d.label}, from {d.guild}.
          </li>
        ))}
      </ul>

      {/* 4 Continuous Column Labels & Live Tabular Counters */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 z-[2] pointer-events-none grid grid-cols-4 px-3 sm:px-6 gap-2 sm:gap-4 ${
          topContent ? 'top-[57%] sm:top-[calc(56%-72px)]' : 'top-[57%] sm:top-[calc(56%+8px)]'
        }`}
      >
        {STAT_DOMAINS.map((d, idx) => (
          <div
            key={d.key}
            style={{
              opacity: entered || topContent ? 1 : 0,
              transform: entered || topContent ? 'translateY(0)' : 'translateY(14px)',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${(topContent ? 250 : 750) + idx * 100}ms`,
            }}
            className="flex flex-col gap-0.5 isolate transition-all min-w-0 sm:pl-2"
          >
            <span className="text-[11px] sm:text-[15px] leading-tight text-[#6E6E73] font-medium sm:font-normal line-clamp-2 sm:truncate">
              {d.label}
            </span>
            <span
              ref={(el) => {
                countRefs.current[idx] = el;
              }}
              className="text-lg sm:text-[26px] font-bold leading-[1.08] text-[#1D1D1F] tabular-nums"
            >
              0
            </span>
          </div>
        ))}
      </div>

      {topContent && (
        <span className="pointer-events-none hidden sm:inline-flex absolute bottom-3 right-5 z-[3] font-mono text-[10px] text-[#6E6E73] bg-white/90 px-2.5 py-1 rounded-full border border-black/[0.08] shadow-sm">
          Click columns to drop orbs
        </span>
      )}
    </section>
    </div>
  );
}

export default Stats;
