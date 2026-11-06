import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 8 Skill Categories safely positioned so they are never clipped or cut off
const CATEGORIES = [
  {
    id: 'tech',
    name: 'Tech & Coding',
    desc: 'Web dev, DSA, microchips & AI',
    color: '#38BDF8',
    glowColor: 0x38bdf8,
    pos: [-4.2, 2.1, 0.2], // Top Left
    scale: 0.94,
  },
  {
    id: 'singing',
    name: 'Singing & Vocals',
    desc: 'Vocal ranges, pitch & stage mic',
    color: '#F472B6',
    glowColor: 0xf472b6,
    pos: [0.0, 2.35, 0.3], // Top Center
    scale: 0.94,
  },
  {
    id: 'music',
    name: 'Music Production',
    desc: 'FL Studio, beats, mixing & studio gear',
    color: '#A78BFA',
    glowColor: 0xa78bfa,
    pos: [4.2, 2.1, 0.2], // Top Right
    scale: 0.94,
  },
  {
    id: 'dance',
    name: 'Dance & Choreography',
    desc: 'Ballet, hip-hop, pirouettes & rhythms',
    color: '#C084FC',
    glowColor: 0xc084fc,
    pos: [-4.6, 0.15, 0.3], // Center Left
    scale: 0.94,
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    desc: 'Dumbbells, track sprints & basketball',
    color: '#34D399',
    glowColor: 0x34d399,
    pos: [4.6, 0.2, 0.2], // Center Right
    scale: 0.94,
  },
  {
    id: 'art',
    name: 'Art & Design',
    desc: 'Painter palette, UI/UX & illustration',
    color: '#FB923C',
    glowColor: 0xfb923c,
    pos: [-3.8, -1.75, 0.2], // Bottom Left (Safe from bottom edge)
    scale: 0.92,
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    desc: 'Cinematic reels, lenses & camera gear',
    color: '#2DD4BF',
    glowColor: 0x2dd4bf,
    pos: [0.0, -1.85, 0.2], // Bottom Center (Safe from bottom edge)
    scale: 0.92,
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    desc: 'Gamepads, RGB rigs & trophy cups',
    color: '#F87171',
    glowColor: 0xf87171,
    pos: [3.8, -1.7, 0.3], // Bottom Right (Safe from bottom edge)
    scale: 0.92,
  },
];

// Helper: True 3D Rounded Box with fully curved fillet edges on all axes
function createRoundedBoxGeometry(w, h, d, r = 0.1, bevelSegments = 5) {
  const shape = new THREE.Shape();
  const radius = Math.min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01);
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const extrudeSettings = {
    depth: Math.max(0.01, d - radius * 2),
    bevelEnabled: true,
    bevelSegments: bevelSegments,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  return geo;
}

export function SkillCamp3DScene({ onSelectCategory }) {
  const containerRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 15.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- 2. Advanced Studio Lighting for Claymorphic 3D Toys ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Warm Sun Key Light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    keyLight.position.set(9, 14, 11);
    scene.add(keyLight);

    // Soft Lavender Fill Light
    const fillLight = new THREE.DirectionalLight(0xc7d2fe, 1.8);
    fillLight.position.set(-11, -5, 9);
    scene.add(fillLight);

    // Vibrant Pink/Magenta Rim Light from behind
    const backRimLight = new THREE.DirectionalLight(0xf472b6, 2.0);
    backRimLight.position.set(2, 9, -9);
    scene.add(backRimLight);

    // Warm Peach Ground Bounce
    const bounceLight = new THREE.DirectionalLight(0xfef3c7, 1.2);
    bounceLight.position.set(0, -10, 6);
    scene.add(bounceLight);

    // --- Materials Helpers (High-Gloss Clay / Toy Finish) ---
    const createToyClayMaterial = (color, roughness = 0.24, clearcoat = 0.6) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness: 0.04,
        clearcoat,
        clearcoatRoughness: 0.12,
        sheen: 0.5,
        sheenRoughness: 0.25,
        sheenColor: new THREE.Color(0xffffff),
      });
    };

    const goldMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xfbbf24),
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1f5f9),
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 0.9,
    });

    // Helper: Soft circular contact shadow beneath models
    const createContactShadow = (radius = 0.9, opacity = 0.18) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, `rgba(15, 23, 42, ${opacity})`);
      grad.addColorStop(0.5, `rgba(15, 23, 42, ${opacity * 0.4})`);
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const geo = new THREE.PlaneGeometry(radius * 2, radius * 2);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const shadow = new THREE.Mesh(geo, mat);
      shadow.rotation.x = -Math.PI / 2;
      return shadow;
    };

    // --- 3. Build Curved & Polished Procedural 3D Models ---
    const categoryGroups = [];
    const interactiveMeshes = [];

    // ==========================================
    // Model 1: Tech & Coding (Rounded Laptop & Chip)
    // ==========================================
    const buildTechModel = () => {
      const group = new THREE.Group();

      // Rounded Laptop Base
      const baseGeo = createRoundedBoxGeometry(2.1, 0.14, 1.5, 0.12, 6);
      const baseMat = createToyClayMaterial(0x1e293b, 0.3); // deep rounded clay slate
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      group.add(baseMesh);

      // Keyboard area with soft teal rounded keys
      const kbGeo = createRoundedBoxGeometry(1.8, 0.04, 0.8, 0.08, 4);
      const kbMat = createToyClayMaterial(0x0f172a, 0.25);
      const kbMesh = new THREE.Mesh(kbGeo, kbMat);
      kbMesh.position.set(0, 0.08, -0.16);
      group.add(kbMesh);

      // Trackpad
      const padGeo = createRoundedBoxGeometry(0.65, 0.02, 0.4, 0.05, 4);
      const padMat = createToyClayMaterial(0x38bdf8, 0.2);
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padMesh.position.set(0, 0.08, 0.45);
      group.add(padMesh);

      // Rounded Laptop Screen Lid (tilted back 110 deg)
      const screenPivot = new THREE.Group();
      screenPivot.position.set(0, 0.07, -0.72);

      const lidGeo = createRoundedBoxGeometry(2.1, 1.45, 0.1, 0.12, 6);
      const lidMat = createToyClayMaterial(0x2563eb, 0.22); // vibrant electric blue
      const lidMesh = new THREE.Mesh(lidGeo, lidMat);
      lidMesh.position.set(0, 0.72, 0);

      // Glowing Cyan Display Surface with curved corners
      const screenGeo = createRoundedBoxGeometry(1.88, 1.25, 0.02, 0.06, 4);
      const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0.72, 0.06);

      // Glowing Neon Pink/White `</>` Code Logo on Screen
      const codeGroup = new THREE.Group();
      codeGroup.position.set(0, 0.72, 0.09);

      const bracketMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 }); // vibrant pink
      const slashMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      // `<`
      const b1 = new THREE.Mesh(createRoundedBoxGeometry(0.38, 0.07, 0.04, 0.03, 3), bracketMat);
      b1.rotation.z = Math.PI / 4;
      b1.position.set(-0.38, 0.12, 0);
      const b2 = new THREE.Mesh(createRoundedBoxGeometry(0.38, 0.07, 0.04, 0.03, 3), bracketMat);
      b2.rotation.z = -Math.PI / 4;
      b2.position.set(-0.38, -0.12, 0);

      // `/`
      const slash = new THREE.Mesh(createRoundedBoxGeometry(0.55, 0.07, 0.04, 0.03, 3), slashMat);
      slash.rotation.z = Math.PI / 6;
      slash.position.set(0, 0, 0);

      // `>`
      const b3 = new THREE.Mesh(createRoundedBoxGeometry(0.38, 0.07, 0.04, 0.03, 3), bracketMat);
      b3.rotation.z = -Math.PI / 4;
      b3.position.set(0.38, 0.12, 0);
      const b4 = new THREE.Mesh(createRoundedBoxGeometry(0.38, 0.07, 0.04, 0.03, 3), bracketMat);
      b4.rotation.z = Math.PI / 4;
      b4.position.set(0.38, -0.12, 0);

      codeGroup.add(b1, b2, slash, b3, b4);
      screenPivot.add(lidMesh, screenMesh, codeGroup);
      screenPivot.rotation.x = -0.32; // Open lid
      group.add(screenPivot);

      // Floating Curved CPU Chip
      const chipGroup = new THREE.Group();
      chipGroup.position.set(1.5, 0.8, 0.3);
      const chipBody = new THREE.Mesh(
        createRoundedBoxGeometry(0.7, 0.14, 0.7, 0.1, 4),
        createToyClayMaterial(0x7c3aed, 0.2) // royal purple
      );
      const chipCore = new THREE.Mesh(
        createRoundedBoxGeometry(0.38, 0.16, 0.38, 0.06, 4),
        goldMat
      );
      chipGroup.add(chipBody, chipCore);

      // 8 Gold Rounded Pins on CPU sides
      for (let i = 0; i < 4; i++) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 12), goldMat);
        pin.rotation.z = Math.PI / 2;
        pin.position.set(-0.42, 0, -0.22 + i * 0.15);
        const pinR = pin.clone();
        pinR.position.x = 0.42;
        chipGroup.add(pin, pinR);
      }

      // Puffy Floating 3D Binary Numbers 0 and 1
      const zero = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.08, 16, 28),
        createToyClayMaterial(0x38bdf8, 0.2)
      );
      zero.position.set(-1.3, 1.0, 0.4);
      zero.rotation.y = 0.4;
      zero.rotation.x = 0.2;

      const one = new THREE.Mesh(
        createRoundedBoxGeometry(0.12, 0.45, 0.12, 0.05, 4),
        createToyClayMaterial(0x38bdf8, 0.2)
      );
      one.position.set(-1.15, 0.45, 0.55);

      // Shadow
      const shadow = createContactShadow(1.4, 0.22);
      shadow.position.y = -0.15;
      group.add(shadow, chipGroup, zero, one);

      group.rotation.set(0.22, 0.38, -0.06);
      return group;
    };

    // ==========================================
    // Model 2: Singing & Vocals (Vintage Mic & Notes)
    // ==========================================
    const buildSingingModel = () => {
      const group = new THREE.Group();

      const micHead = new THREE.Group();
      const pinkMicMat = createToyClayMaterial(0xf472b6, 0.22); // pastel candy rose

      // Rounded Capsule Grille (Hemisphere top + Cylinder + Hemisphere bottom)
      const cylGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.75, 32);
      const cylMesh = new THREE.Mesh(cylGeo, pinkMicMat);
      const topCap = new THREE.Mesh(new THREE.SphereGeometry(0.44, 32, 24), pinkMicMat);
      topCap.position.y = 0.375;
      const botCap = new THREE.Mesh(new THREE.SphereGeometry(0.44, 32, 24), pinkMicMat);
      botCap.position.y = -0.375;

      // Chrome Ring Bands
      const band1 = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.045, 16, 36), chromeMat);
      band1.rotation.x = Math.PI / 2;
      const band2 = band1.clone();
      band2.position.y = 0.22;
      const band3 = band1.clone();
      band3.position.y = -0.22;

      micHead.add(cylMesh, topCap, botCap, band1, band2, band3);

      // Swivel Mount U-Bracket
      const uBracket = new THREE.Mesh(
        new THREE.TorusGeometry(0.66, 0.07, 16, 36, Math.PI),
        goldMat
      );
      uBracket.rotation.z = Math.PI;
      uBracket.position.y = -0.22;

      // Chrome Pole and Rounded Heavy Table Base
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.7, 24), chromeMat);
      pole.position.y = -0.95;

      const baseGeo = createRoundedBoxGeometry(1.2, 0.16, 1.2, 0.15, 6);
      const baseMesh = new THREE.Mesh(baseGeo, createToyClayMaterial(0xfb7185, 0.25));
      baseMesh.position.y = -1.35;

      group.add(micHead, uBracket, pole, baseMesh);

      // 3D Puffy Musical Notes ♪
      const noteMat = createToyClayMaterial(0xf472b6, 0.18);
      const note1 = new THREE.Group();
      const nHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 16), noteMat);
      nHead.scale.set(1.25, 0.85, 0.85);
      const nStem = new THREE.Mesh(createRoundedBoxGeometry(0.05, 0.42, 0.05, 0.02, 3), noteMat);
      nStem.position.set(0.12, 0.2, 0);
      const nFlag = new THREE.Mesh(createRoundedBoxGeometry(0.18, 0.08, 0.05, 0.03, 3), noteMat);
      nFlag.position.set(0.2, 0.38, 0);
      note1.add(nHead, nStem, nFlag);
      note1.position.set(0.85, 0.5, 0.35);
      note1.rotation.z = -0.25;

      const note2 = note1.clone();
      note2.position.set(-0.8, 0.8, -0.15);
      note2.rotation.z = 0.35;

      const shadow = createContactShadow(1.1, 0.2);
      shadow.position.y = -1.45;
      group.add(shadow, note1, note2);

      group.rotation.set(0.12, -0.22, 0.08);
      return group;
    };

    // ==========================================
    // Model 3: Music Production (Studio Headphones & Mixer)
    // ==========================================
    const buildMusicModel = () => {
      const group = new THREE.Group();

      // Curved Studio Headphones
      const hpGroup = new THREE.Group();
      hpGroup.position.set(0, 0.6, 0);

      // Thick Puffy Rainbow Headband Arch
      const bandCurve = new THREE.Mesh(
        new THREE.TorusGeometry(0.92, 0.12, 20, 40, Math.PI),
        createToyClayMaterial(0xa78bfa, 0.22) // lilac clay
      );
      hpGroup.add(bandCurve);

      // Plush Cushioned Earcups with Rounded Fillets
      const cupMat = createToyClayMaterial(0xc4b5fd, 0.2);
      const cushionMat = createToyClayMaterial(0x6366f1, 0.3); // deep indigo

      const leftCup = new THREE.Group();
      const cupBody = new THREE.Mesh(
        createRoundedBoxGeometry(0.45, 0.45, 0.25, 0.12, 5),
        cupMat
      );
      cupBody.rotation.y = Math.PI / 2;

      const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.11, 16, 28), cushionMat);
      cushion.rotation.y = Math.PI / 2;
      cushion.position.x = 0.12;

      leftCup.add(cupBody, cushion);
      leftCup.position.set(-0.95, 0, 0);

      const rightCup = leftCup.clone();
      rightCup.position.set(0.95, 0, 0);
      rightCup.scale.set(-1, 1, 1);

      hpGroup.add(leftCup, rightCup);
      group.add(hpGroup);

      // DJ Sound Mixer Board with Rounded Beveled Edges
      const mixerGeo = createRoundedBoxGeometry(2.0, 0.22, 1.35, 0.14, 6);
      const mixerBase = new THREE.Mesh(mixerGeo, createToyClayMaterial(0x7c3aed, 0.25));
      mixerBase.position.set(0, -0.65, 0.2);
      mixerBase.rotation.x = 0.25;

      // 3 Equalizer Slider Knobs in Gold and Coral
      const s1 = new THREE.Mesh(createRoundedBoxGeometry(0.12, 0.18, 0.1, 0.04, 3), goldMat);
      s1.position.set(-0.45, -0.5, 0.35);
      const s2 = new THREE.Mesh(createRoundedBoxGeometry(0.12, 0.18, 0.1, 0.04, 3), createToyClayMaterial(0xf43f5e));
      s2.position.set(0, -0.58, 0.35);
      const s3 = new THREE.Mesh(createRoundedBoxGeometry(0.12, 0.18, 0.1, 0.04, 3), goldMat);
      s3.position.set(0.45, -0.48, 0.35);

      // Glowing Audio Waveform bar
      const waveBar = new THREE.Mesh(
        createRoundedBoxGeometry(1.3, 0.09, 0.04, 0.03, 3),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      waveBar.position.set(0, -0.38, 0.4);

      const shadow = createContactShadow(1.5, 0.2);
      shadow.position.set(0, -0.85, 0.2);
      group.add(shadow, mixerBase, s1, s2, s3, waveBar);

      group.rotation.set(0.15, -0.28, 0.06);
      return group;
    };

    // ==========================================
    // Model 4: Dance & Choreography (Ballerina & Spiral Ribbon)
    // ==========================================
    const buildDanceModel = () => {
      const group = new THREE.Group();
      const skinMat = createToyClayMaterial(0xfbcfe8, 0.3); // soft rose skin
      const dressMat = createToyClayMaterial(0xc084fc, 0.2); // lilac silk

      // Rounded Head with Ballerina Hair Bun
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 20), skinMat);
      head.position.y = 0.9;
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 16), dressMat);
      bun.position.set(0, 1.12, -0.09);

      // Graceful Torso
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.15, 0.48, 24), dressMat);
      torso.position.y = 0.55;

      // Fluffy Flared Double Tutu Skirt
      const tutuGeo = new THREE.CylinderGeometry(0.8, 0.22, 0.3, 32, 2, true);
      const tutu = new THREE.Mesh(tutuGeo, dressMat);
      tutu.position.y = 0.38;
      tutu.rotation.x = Math.PI;

      // Outstretched Curved Arms
      const armCurveL = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.06, 16, 28, Math.PI * 0.75),
        skinMat
      );
      armCurveL.position.set(-0.36, 0.68, 0);
      armCurveL.rotation.z = Math.PI / 4;

      const armCurveR = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.06, 16, 28, Math.PI * 0.75),
        skinMat
      );
      armCurveR.position.set(0.36, 0.68, 0);
      armCurveR.rotation.z = -Math.PI / 4;

      // Pirouette Pointe Legs
      const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.045, 0.8, 20), skinMat);
      leg1.position.set(-0.08, -0.16, 0);
      const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.045, 0.72, 20), skinMat);
      leg2.position.set(0.18, 0.02, 0.22);
      leg2.rotation.x = 0.65;
      leg2.rotation.z = -0.32;

      group.add(head, bun, torso, tutu, armCurveL, armCurveR, leg1, leg2);

      // Flowing 3D Spiral Ribbon Coils
      const ribbonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.2, -0.8, 0.35),
        new THREE.Vector3(-0.85, -0.2, -0.45),
        new THREE.Vector3(0.1, 0.35, 0.65),
        new THREE.Vector3(0.95, 0.85, -0.25),
        new THREE.Vector3(1.15, 1.3, 0.45),
      ]);
      const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 40, 0.06, 10, false);
      const ribbonMesh = new THREE.Mesh(ribbonGeo, createToyClayMaterial(0xf472b6, 0.2));
      group.add(ribbonMesh);

      const shadow = createContactShadow(1.1, 0.18);
      shadow.position.y = -0.7;
      group.add(shadow);

      group.rotation.set(0.1, 0.18, -0.08);
      return group;
    };

    // ==========================================
    // Model 5: Sports & Fitness (Rounded Dumbbell & Basketball)
    // ==========================================
    const buildSportsModel = () => {
      const group = new THREE.Group();

      // Rounded Hex Dumbbell
      const dbGroup = new THREE.Group();
      const weightMat = createToyClayMaterial(0x34d399, 0.22); // pastel emerald

      const wGeo = createRoundedBoxGeometry(0.5, 0.8, 0.8, 0.18, 5);
      const w1 = new THREE.Mesh(wGeo, weightMat);
      w1.position.x = -0.65;
      const w2 = new THREE.Mesh(wGeo, weightMat);
      w2.position.x = 0.65;

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.15, 24), chromeMat);
      handle.rotation.z = Math.PI / 2;

      dbGroup.add(w1, w2, handle);
      dbGroup.position.set(-0.35, 0.45, 0.1);
      dbGroup.rotation.set(0.35, 0.2, 0.5);

      // Sports Stopwatch
      const swGroup = new THREE.Group();
      const swBody = new THREE.Mesh(
        createRoundedBoxGeometry(0.9, 0.9, 0.2, 0.35, 5),
        createToyClayMaterial(0x059669, 0.2)
      );
      const swFace = new THREE.Mesh(new THREE.CircleGeometry(0.36, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      swFace.position.z = 0.12;

      const needle = new THREE.Mesh(createRoundedBoxGeometry(0.04, 0.24, 0.02, 0.01, 2), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      needle.position.set(0.04, 0.08, 0.14);
      needle.rotation.z = -0.45;

      const topPusher = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.2, 16), goldMat);
      topPusher.position.y = 0.55;

      swGroup.add(swBody, swFace, needle, topPusher);
      swGroup.position.set(0.85, -0.05, 0.25);

      // Textured Orange Basketball
      const ballMat = createToyClayMaterial(0xf97316, 0.35);
      const basketball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 28), ballMat);
      basketball.position.set(-0.25, -0.65, 0.35);

      // Curved rubber ribs
      const rib1 = new THREE.Mesh(new THREE.TorusGeometry(0.505, 0.025, 12, 36), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
      const rib2 = rib1.clone();
      rib2.rotation.y = Math.PI / 2;
      basketball.add(rib1, rib2);

      const shadow = createContactShadow(1.6, 0.2);
      shadow.position.y = -1.15;
      group.add(shadow, dbGroup, swGroup, basketball);

      group.rotation.set(0.1, -0.2, 0.05);
      return group;
    };

    // ==========================================
    // Model 6: Art & Design (Rounded Palette & Chubby Brush)
    // ==========================================
    const buildArtModel = () => {
      const group = new THREE.Group();

      // Thick Rounded Artist Palette with Smooth Bevels
      const paletteShape = new THREE.Shape();
      paletteShape.absarc(0, 0, 0.95, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      hole.absarc(0.42, -0.32, 0.22, 0, Math.PI * 2, true);
      paletteShape.holes.push(hole);

      const paletteGeo = new THREE.ExtrudeGeometry(paletteShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.09,
        bevelThickness: 0.09,
      });
      paletteGeo.center();

      const paletteMat = createToyClayMaterial(0xfef08a, 0.3); // warm banana clay
      const paletteMesh = new THREE.Mesh(paletteGeo, paletteMat);
      group.add(paletteMesh);

      // 5 Glossy Paint Droplets
      const paintColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6];
      const angles = [0.75, 1.35, 2.05, 2.75, 3.45];
      paintColors.forEach((col, idx) => {
        const blobGeo = new THREE.SphereGeometry(0.18, 20, 16);
        blobGeo.scale(1, 0.55, 1);
        const blobMesh = new THREE.Mesh(blobGeo, createToyClayMaterial(col, 0.15, 0.9));
        const a = angles[idx];
        blobMesh.position.set(Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0.16);
        group.add(blobMesh);
      });

      // Chubby Slanted Paintbrush
      const brushGroup = new THREE.Group();
      const bHandle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.045, 1.3, 20),
        createToyClayMaterial(0xd97706, 0.3)
      );
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 20), chromeMat);
      ferrule.position.y = 0.72;
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.26, 20),
        createToyClayMaterial(0x3b82f6, 0.15, 0.9)
      );
      tip.position.y = 0.9;
      brushGroup.add(bHandle, ferrule, tip);
      brushGroup.position.set(0.12, 0.2, 0.35);
      brushGroup.rotation.set(0.2, 0.4, 0.85);

      const shadow = createContactShadow(1.3, 0.2);
      shadow.position.y = -0.3;
      group.add(shadow, brushGroup);

      group.rotation.set(0.32, 0.28, -0.18);
      return group;
    };

    // ==========================================
    // Model 7: Photography & Video (Rounded Retro Camera)
    // ==========================================
    const buildPhotographyModel = () => {
      const group = new THREE.Group();

      // Rounded Camera Body
      const bodyGeo = createRoundedBoxGeometry(1.75, 1.2, 0.8, 0.16, 6);
      const bodyMat = createToyClayMaterial(0xf97316, 0.24); // warm coral/peach clay
      const cameraBody = new THREE.Mesh(bodyGeo, bodyMat);

      // Silver Top Plate with Rounded Chamfer
      const topGeo = createRoundedBoxGeometry(1.78, 0.28, 0.82, 0.1, 5);
      const topPlate = new THREE.Mesh(topGeo, chromeMat);
      topPlate.position.y = 0.64;

      // Shutter Button & Knurled Dial
      const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 20), goldMat);
      shutterBtn.position.set(-0.55, 0.82, 0);

      // Viewfinder
      const vf = new THREE.Mesh(
        createRoundedBoxGeometry(0.34, 0.22, 0.18, 0.05, 4),
        createToyClayMaterial(0x0f172a, 0.3)
      );
      vf.position.set(0, 0.8, 0);

      // Multi-Ring Glossy Camera Lens
      const lensGroup = new THREE.Group();
      lensGroup.position.set(0, 0, 0.48);

      const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.55, 32), chromeMat);
      lensBarrel.rotation.x = Math.PI / 2;

      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.05, 16, 36), createToyClayMaterial(0x1e293b, 0.2));
      outerRing.position.z = 0.28;

      const glass = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 32, 24),
        new THREE.MeshPhysicalMaterial({
          color: 0x0f172a,
          roughness: 0.08,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
        })
      );
      glass.position.z = 0.22;

      lensGroup.add(lensBarrel, outerRing, glass);

      // Cinema Film Reel
      const filmReel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.14, 24),
        createToyClayMaterial(0x475569, 0.25)
      );
      filmReel.rotation.x = 0.55;
      filmReel.position.set(0.95, -0.45, 0.35);

      const shadow = createContactShadow(1.4, 0.22);
      shadow.position.y = -0.75;

      group.add(shadow, cameraBody, topPlate, shutterBtn, vf, lensGroup, filmReel);
      group.rotation.set(0.12, -0.25, 0.05);
      return group;
    };

    // ==========================================
    // Model 8: Gaming & Esports (Rounded Gamepad & Trophy)
    // ==========================================
    const buildGamingModel = () => {
      const group = new THREE.Group();

      // Ergonomic Gamepad Body with Rounded Bevels
      const bodyGeo = createRoundedBoxGeometry(1.7, 0.85, 0.5, 0.22, 6);
      const bodyMat = createToyClayMaterial(0x1e1b4b, 0.25); // dark violet gamer clay
      const mainBody = new THREE.Mesh(bodyGeo, bodyMat);

      // Rounded Grips
      const gripGeo = createRoundedBoxGeometry(0.5, 0.95, 0.45, 0.2, 5);
      const gripL = new THREE.Mesh(gripGeo, bodyMat);
      gripL.position.set(-0.85, -0.38, 0);
      gripL.rotation.z = -0.32;

      const gripR = new THREE.Mesh(gripGeo, bodyMat);
      gripR.position.set(0.85, -0.38, 0);
      gripR.rotation.z = 0.32;

      // Illuminated Thumbsticks (Blue & Pink)
      const stickMatL = new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, roughness: 0.15, clearcoat: 0.8 });
      const stickL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.13, 0.18, 24), stickMatL);
      stickL.position.set(-0.38, -0.16, 0.28);

      const stickMatR = new THREE.MeshPhysicalMaterial({ color: 0xf472b6, roughness: 0.15, clearcoat: 0.8 });
      const stickR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.13, 0.18, 24), stickMatR);
      stickR.position.set(0.38, -0.16, 0.28);

      // Neon D-Pad Cross with Rounded Caps
      const dpadH = new THREE.Mesh(createRoundedBoxGeometry(0.38, 0.11, 0.1, 0.04, 3), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
      dpadH.position.set(-0.48, 0.16, 0.26);
      const dpadV = new THREE.Mesh(createRoundedBoxGeometry(0.11, 0.38, 0.1, 0.04, 3), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
      dpadV.position.set(-0.48, 0.16, 0.26);

      // 4 Action Buttons (Y, A, X, B)
      const btnGeo = new THREE.SphereGeometry(0.07, 16, 12);
      const bY = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      bY.position.set(0.48, 0.28, 0.27);
      const bA = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0x22c55e }));
      bA.position.set(0.48, 0.04, 0.27);
      const bX = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
      bX.position.set(0.36, 0.16, 0.27);
      const bB = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      bB.position.set(0.6, 0.16, 0.27);

      group.add(mainBody, gripL, gripR, stickL, stickR, dpadH, dpadV, bY, bA, bX, bB);

      // Golden Victory Trophy Cup
      const trophyGroup = new THREE.Group();
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.16, 0.55, 24), goldMat);
      const base = new THREE.Mesh(
        createRoundedBoxGeometry(0.55, 0.24, 0.55, 0.08, 4),
        createToyClayMaterial(0x334155, 0.2)
      );
      base.position.y = -0.4;

      const handleL = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 14, 24, Math.PI), goldMat);
      handleL.rotation.y = Math.PI / 2;
      handleL.position.set(-0.38, 0.08, 0);

      const handleR = handleL.clone();
      handleR.position.x = 0.38;
      handleR.rotation.y = -Math.PI / 2;

      trophyGroup.add(cup, base, handleL, handleR);
      trophyGroup.position.set(1.15, 0.55, 0.25);
      trophyGroup.rotation.set(0.18, -0.42, 0.18);

      const shadow = createContactShadow(1.5, 0.22);
      shadow.position.y = -0.95;

      group.add(shadow, trophyGroup);
      group.rotation.set(0.2, -0.32, 0.14);
      return group;
    };

    // Map builders
    const modelBuilders = [
      buildTechModel,
      buildSingingModel,
      buildMusicModel,
      buildDanceModel,
      buildSportsModel,
      buildArtModel,
      buildPhotographyModel,
      buildGamingModel,
    ];

    // Instantiate and anchor all 8 models
    CATEGORIES.forEach((cat, idx) => {
      const builder = modelBuilders[idx];
      const model = builder();

      // Wrap in an interaction container with bounding raycaster sphere
      const containerGroup = new THREE.Group();
      containerGroup.position.set(...cat.pos);
      containerGroup.scale.setScalar(cat.scale);

      // Invisible hit sphere for reliable click & hover detection
      const hitSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.65, 12, 12),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitSphere.userData = { categoryId: cat.id, index: idx };
      containerGroup.add(hitSphere);
      interactiveMeshes.push(hitSphere);

      containerGroup.add(model);
      scene.add(containerGroup);

      categoryGroups.push({
        group: containerGroup,
        model,
        basePos: new THREE.Vector3(...cat.pos),
        baseScale: cat.scale,
        baseRot: model.rotation.clone(),
        floatPhase: idx * 0.78,
        bounceSpring: 0,
        spinAnim: 0,
        id: cat.id,
      });
    });

    // --- 4. Floating Decorative 3D Puffy Stars & Pastel Candies ---
    const starShape = new THREE.Shape();
    const starPts = 4;
    for (let i = 0; i < starPts * 2; i++) {
      const r = i % 2 === 0 ? 0.38 : 0.14;
      const angle = (i * Math.PI) / starPts;
      if (i === 0) starShape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else starShape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    const starGeo = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    starGeo.center();

    const starColors = [0xfacc15, 0xf472b6, 0x60a5fa, 0x34d399, 0xa78bfa];
    const decorParticles = [];

    for (let i = 0; i < 28; i++) {
      const col = starColors[i % starColors.length];
      let mesh;
      if (i % 2 === 0) {
        mesh = new THREE.Mesh(starGeo, createToyClayMaterial(col, 0.2, 0.8));
      } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 14), createToyClayMaterial(col, 0.15, 0.9));
      }

      const x = (Math.random() - 0.5) * 16.5;
      const y = (Math.random() - 0.5) * 9.5;
      const z = (Math.random() - 0.5) * 3.5 - 0.2;

      mesh.position.set(x, y, z);
      scene.add(mesh);
      decorParticles.push({
        mesh,
        baseY: y,
        speed: 0.6 + Math.random() * 0.7,
        rotSpeed: (Math.random() - 0.5) * 2.2,
      });
    }

    // --- 5. Raycasting, Mouse Move & Click Interactions ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let currentHovered = null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      setMousePos({ x: e.clientX, y: e.clientY });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const catId = hit.userData.categoryId;
        if (currentHovered !== catId) {
          currentHovered = catId;
          const found = CATEGORIES.find((c) => c.id === catId);
          setHoveredCategory(found || null);
          container.style.cursor = 'pointer';
        }
      } else {
        if (currentHovered !== null) {
          currentHovered = null;
          setHoveredCategory(null);
          container.style.cursor = 'default';
        }
      }
    };

    const handleClick = (e) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const catId = hit.userData.categoryId;
        const item = categoryGroups.find((g) => g.id === catId);

        if (item) {
          // Trigger energetic 3D Squash & Stretch + 360 Spin
          item.bounceSpring = 1.0;
          item.spinAnim = Math.PI * 2;

          if (onSelectCategory) {
            onSelectCategory(catId);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // --- 6. Scrolling Animation / Parallax ---
    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 7. Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax tilt based on mouse position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.7, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.45, 0.05);
      camera.lookAt(0, 0, 0);

      // Downward parallax on scroll, safely bounded so models never get cut off at bottom
      const scrollDownOffset = Math.min(scrollY * 0.002, 0.45);

      // Animate each of the 8 3D models
      categoryGroups.forEach((item) => {
        const isHovered = currentHovered === item.id;

        // Gentle floating oscillation
        const floatY = Math.sin(elapsedTime * 1.6 + item.floatPhase) * 0.14;
        const floatRot = Math.cos(elapsedTime * 1.3 + item.floatPhase) * 0.07;

        // All 3D icons move DOWN as you scroll down, securely within view
        item.group.position.y = item.basePos.y + floatY - scrollDownOffset;

        // Spread slightly outwards for depth
        const scrollSpreadX = Math.sign(item.basePos.x) * Math.min(scrollY * 0.001, 0.25);
        item.group.position.x = item.basePos.x + scrollSpreadX;

        // Spring Bounce & Spin decay
        if (item.bounceSpring > 0.001) {
          item.bounceSpring *= 0.88;
        } else {
          item.bounceSpring = 0;
        }

        if (item.spinAnim > 0.01) {
          item.spinAnim *= 0.85;
        } else {
          item.spinAnim = 0;
        }

        // Scale: Base scale * hover boost * bounce impact
        const targetScale = item.baseScale * (isHovered ? 1.25 : 1.0) + item.bounceSpring * 0.45;
        item.group.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.14
        );

        // Rotation: Base + float + hover tilt + spin
        item.model.rotation.y = item.baseRot.y + floatRot + (isHovered ? mouse.x * 0.5 : 0) + item.spinAnim;
        item.model.rotation.x = item.baseRot.x + (isHovered ? -mouse.y * 0.4 : 0);
      });

      // Animate floating decorative stars & candy down with scroll as well
      decorParticles.forEach((p, idx) => {
        p.mesh.position.y = p.baseY + Math.sin(elapsedTime * p.speed + idx) * 0.28 - scrollDownOffset;
        p.mesh.rotation.z += 0.01 * p.rotSpeed;
        p.mesh.rotation.y += 0.006;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectCategory]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      {/* Three.js Canvas container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
