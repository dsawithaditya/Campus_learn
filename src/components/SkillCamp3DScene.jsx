import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

// 8 Skill Categories matching the exact prompt and reference design
const CATEGORIES = [
  {
    id: 'tech',
    name: 'Tech & Coding',
    desc: 'Web dev, DSA, microchips & AI',
    color: '#38BDF8',
    glowColor: 0x38bdf8,
    pos: [-4.6, 2.2, 0], // Top Left
    scale: 0.95,
  },
  {
    id: 'singing',
    name: 'Singing & Vocals',
    desc: 'Vocal ranges, pitch & stage mic',
    color: '#F472B6',
    glowColor: 0xf472b6,
    pos: [0.2, 3.2, 0.2], // Top Center
    scale: 0.95,
  },
  {
    id: 'music',
    name: 'Music Production',
    desc: 'FL Studio, beats, mixing & studio gear',
    color: '#A78BFA',
    glowColor: 0xa78bfa,
    pos: [4.8, 2.6, 0.1], // Top Right
    scale: 0.95,
  },
  {
    id: 'dance',
    name: 'Dance & Choreography',
    desc: 'Ballet, hip-hop, pirouettes & rhythms',
    color: '#C084FC',
    glowColor: 0xc084fc,
    pos: [-5.2, -0.4, 0.2], // Center Left
    scale: 0.95,
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    desc: 'Dumbbells, track sprints & basketball',
    color: '#34D399',
    glowColor: 0x34d399,
    pos: [5.1, 0.2, 0.1], // Center Right
    scale: 0.95,
  },
  {
    id: 'art',
    name: 'Art & Design',
    desc: 'Painter palette, UI/UX & illustration',
    color: '#FB923C',
    glowColor: 0xfb923c,
    pos: [-4.5, -2.8, 0], // Bottom Left
    scale: 0.95,
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    desc: 'Cinematic reels, lenses & camera gear',
    color: '#2DD4BF',
    glowColor: 0x2dd4bf,
    pos: [-0.2, -3.2, 0.1], // Bottom Center
    scale: 0.95,
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    desc: 'Gamepads, RGB rigs & trophy cups',
    color: '#F87171',
    glowColor: 0xf87171,
    pos: [4.5, -2.6, 0.2], // Bottom Right
    scale: 0.95,
  },
];

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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 14.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. Studio Lighting for Clay / Toy 3D Finish ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.2);
    fillLight.position.set(-10, -6, 8);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xffd1dc, 1.4);
    backRimLight.position.set(0, 10, -8);
    scene.add(backRimLight);

    // --- Materials Helpers ---
    const createClayMaterial = (color, roughness = 0.35, metalness = 0.08) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness,
        clearcoat: 0.35,
        clearcoatRoughness: 0.2,
      });
    };

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffcb45,
      metalness: 0.75,
      roughness: 0.25,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.15,
    });

    // --- 3. Build Procedural 3D Models ---
    const categoryGroups = [];
    const interactiveMeshes = [];

    // Model 1: Tech & Coding (Laptop, Binary bits & Microchip)
    const buildTechModel = () => {
      const group = new THREE.Group();

      // Laptop Base
      const baseMat = createClayMaterial(0x334155, 0.4);
      const baseGeo = new THREE.BoxGeometry(1.9, 0.1, 1.4);
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      group.add(baseMesh);

      // Keyboard area
      const kbGeo = new THREE.BoxGeometry(1.6, 0.04, 0.7);
      const kbMat = createClayMaterial(0x1e293b);
      const kbMesh = new THREE.Mesh(kbGeo, kbMat);
      kbMesh.position.set(0, 0.06, -0.15);
      group.add(kbMesh);

      // Trackpad
      const padGeo = new THREE.BoxGeometry(0.6, 0.02, 0.35);
      const padMat = createClayMaterial(0x475569);
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padMesh.position.set(0, 0.06, 0.4);
      group.add(padMesh);

      // Laptop Screen (Tilted)
      const screenPivot = new THREE.Group();
      screenPivot.position.set(0, 0.05, -0.7);

      const lidMat = createClayMaterial(0x2563eb, 0.35);
      const lidGeo = new THREE.BoxGeometry(1.9, 1.3, 0.08);
      const lidMesh = new THREE.Mesh(lidGeo, lidMat);
      lidMesh.position.set(0, 0.65, 0);

      // Glowing Screen Display with </> symbol
      const displayMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const displayGeo = new THREE.BoxGeometry(1.7, 1.1, 0.02);
      const displayMesh = new THREE.Mesh(displayGeo, displayMat);
      displayMesh.position.set(0, 0.65, 0.05);

      // 3D Bracket `<`
      const bracketMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.38), bracketMat);
      b1.rotation.z = Math.PI / 4;
      b1.position.set(-0.35, 0.75, 0.08);
      const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.38), bracketMat);
      b2.rotation.z = -Math.PI / 4;
      b2.position.set(-0.35, 0.55, 0.08);

      // 3D Slash `/`
      const slash = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), bracketMat);
      slash.rotation.z = Math.PI / 6;
      slash.position.set(0, 0.65, 0.08);

      // 3D Bracket `>`
      const b3 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.38), bracketMat);
      b3.rotation.z = -Math.PI / 4;
      b3.position.set(0.35, 0.75, 0.08);
      const b4 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.38), bracketMat);
      b4.rotation.z = Math.PI / 4;
      b4.position.set(0.35, 0.55, 0.08);

      screenPivot.add(lidMesh, displayMesh, b1, b2, slash, b3, b4);
      screenPivot.rotation.x = -0.3; // Open 110 deg
      group.add(screenPivot);

      // Floating CPU Chip beside laptop
      const chipGroup = new THREE.Group();
      chipGroup.position.set(1.4, 0.7, 0.2);
      const chipBody = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 0.65), createClayMaterial(0x818cf8));
      const core = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.12, 0.35), goldMat);
      chipGroup.add(chipBody, core);

      // Floating binary digits 0 & 1
      const zero = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 12, 24), createClayMaterial(0x60a5fa));
      zero.position.set(-1.2, 0.9, 0.3);
      zero.rotation.y = 0.4;
      const one = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.35), createClayMaterial(0x60a5fa));
      one.position.set(-1.1, 0.4, 0.5);

      group.add(chipGroup, zero, one);
      group.rotation.set(0.25, 0.4, -0.05);
      return group;
    };

    // Model 2: Singing & Vocals (Vintage Mic + Music Notes)
    const buildSingingModel = () => {
      const group = new THREE.Group();

      // Capsule Grille (Sphere top + Cylinder middle + Sphere bottom)
      const micHead = new THREE.Group();
      const grilleMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        metalness: 0.35,
        roughness: 0.3,
      });

      const cylGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.7, 24);
      const cylMesh = new THREE.Mesh(cylGeo, grilleMat);

      const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), grilleMat);
      topSphere.position.y = 0.35;
      const botSphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), grilleMat);
      botSphere.position.y = -0.35;

      // Chrome bands around grille
      const band1 = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.04, 16, 32), chromeMat);
      band1.rotation.x = Math.PI / 2;
      const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.04, 16, 32), chromeMat);
      band2.rotation.x = Math.PI / 2;
      band2.position.y = 0.2;

      micHead.add(cylMesh, topSphere, botSphere, band1, band2);

      // Swivel Mount U-bracket
      const uBracket = new THREE.Mesh(
        new THREE.TorusGeometry(0.6, 0.06, 16, 32, Math.PI),
        createClayMaterial(0xfb7185)
      );
      uBracket.rotation.z = Math.PI;
      uBracket.position.y = -0.2;

      // Stand Neck & Round Base
      const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6), chromeMat);
      standPole.position.y = -0.9;
      const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.12, 24), createClayMaterial(0xf43f5e));
      standBase.position.y = -1.2;

      group.add(micHead, uBracket, standPole, standBase);

      // Floating 3D Musical Notes ♪ ♫
      const noteMat = createClayMaterial(0xf472b6);
      const note1 = new THREE.Group();
      const head1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), noteMat);
      head1.scale.set(1.2, 0.9, 0.8);
      const stem1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35), noteMat);
      stem1.position.set(0.1, 0.18, 0);
      const flag1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.04), noteMat);
      flag1.position.set(0.18, 0.32, 0);
      note1.add(head1, stem1, flag1);
      note1.position.set(0.7, 0.4, 0.3);
      note1.rotation.z = -0.2;

      const note2 = note1.clone();
      note2.position.set(-0.7, 0.6, -0.2);
      note2.rotation.z = 0.3;

      group.add(note1, note2);
      group.rotation.set(0.15, -0.2, 0.1);
      return group;
    };

    // Model 3: Music Production (Studio Headphones & DJ Mixer)
    const buildMusicModel = () => {
      const group = new THREE.Group();

      // Studio Headphones
      const hpGroup = new THREE.Group();
      hpGroup.position.set(0, 0.5, 0);

      // Pastel rainbow headband arch
      const bandCurve = new THREE.Mesh(
        new THREE.TorusGeometry(0.85, 0.09, 16, 32, Math.PI),
        createClayMaterial(0xa78bfa, 0.3)
      );
      hpGroup.add(bandCurve);

      // Earcups
      const earcupMat = createClayMaterial(0xc4b5fd);
      const cushionMat = createClayMaterial(0x7c3aed, 0.4);

      const leftCup = new THREE.Group();
      const cupMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.22, 24), earcupMat);
      cupMeshL.rotation.z = Math.PI / 2;
      const cushionL = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.1, 16, 24), cushionMat);
      cushionL.rotation.y = Math.PI / 2;
      cushionL.position.x = 0.1;
      leftCup.add(cupMeshL, cushionL);
      leftCup.position.set(-0.85, 0, 0);

      const rightCup = leftCup.clone();
      rightCup.position.set(0.85, 0, 0);
      rightCup.scale.set(-1, 1, 1);

      hpGroup.add(leftCup, rightCup);
      group.add(hpGroup);

      // DJ Mixer Console Board
      const mixerBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.18, 1.2),
        createClayMaterial(0x6366f1)
      );
      mixerBase.position.set(0, -0.65, 0.2);
      mixerBase.rotation.x = 0.25;

      // Equalizer Sliders & Soundwave
      const sliderMat = goldMat;
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.08), sliderMat);
      s1.position.set(-0.4, -0.52, 0.3);
      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.08), sliderMat);
      s2.position.set(0, -0.58, 0.3);
      const s3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.08), sliderMat);
      s3.position.set(0.4, -0.5, 0.3);

      // Glowing audio bars (waveform)
      const waveBar = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.08, 0.02),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      waveBar.position.set(0, -0.4, 0.35);

      group.add(mixerBase, s1, s2, s3, waveBar);
      group.rotation.set(0.15, -0.3, 0.05);
      return group;
    };

    // Model 4: Dance & Choreography (Ballerina & Spiral Ribbons)
    const buildDanceModel = () => {
      const group = new THREE.Group();
      const skinMat = createClayMaterial(0xfbcfe8, 0.4);
      const dressMat = createClayMaterial(0xc084fc, 0.3);

      // Head with cute ballet bun
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), skinMat);
      head.position.y = 0.85;
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), dressMat);
      bun.position.set(0, 1.05, -0.08);

      // Torso
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.45, 16), dressMat);
      torso.position.y = 0.52;

      // Flared Tutu Skirt
      const tutu = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.2, 0.28, 24, 1, true),
        dressMat
      );
      tutu.position.y = 0.35;
      tutu.rotation.x = Math.PI; // upside-down flared cone

      // Graceful curved arms
      const armCurveL = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.05, 12, 24, Math.PI * 0.75),
        skinMat
      );
      armCurveL.position.set(-0.35, 0.65, 0);
      armCurveL.rotation.z = Math.PI / 4;

      const armCurveR = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.05, 12, 24, Math.PI * 0.75),
        skinMat
      );
      armCurveR.position.set(0.35, 0.65, 0);
      armCurveR.rotation.z = -Math.PI / 4;

      // Pirouette legs with pointe shoes
      const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.75), skinMat);
      leg1.position.set(-0.08, -0.15, 0);
      const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.65), skinMat);
      leg2.position.set(0.15, 0, 0.2);
      leg2.rotation.x = 0.6; // Arabesque lift
      leg2.rotation.z = -0.3;

      group.add(head, bun, torso, tutu, armCurveL, armCurveR, leg1, leg2);

      // Flowing 3D Spiral Ribbon Coils
      const ribbonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.1, -0.7, 0.3),
        new THREE.Vector3(-0.8, -0.2, -0.4),
        new THREE.Vector3(0.1, 0.3, 0.6),
        new THREE.Vector3(0.9, 0.8, -0.2),
        new THREE.Vector3(1.1, 1.2, 0.4),
      ]);
      const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 32, 0.05, 8, false);
      const ribbonMesh = new THREE.Mesh(ribbonGeo, createClayMaterial(0xf472b6, 0.3));
      group.add(ribbonMesh);

      group.rotation.set(0.1, 0.2, -0.1);
      return group;
    };

    // Model 5: Sports & Fitness (Dumbbell, Stopwatch & Basketball)
    const buildSportsModel = () => {
      const group = new THREE.Group();

      // Dumbbell (Hexagonal pastel ends + silver bar)
      const dbGroup = new THREE.Group();
      const weightMat = createClayMaterial(0x34d399);

      const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 6), weightMat);
      w1.rotation.z = Math.PI / 2;
      w1.position.x = -0.65;

      const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 6), weightMat);
      w2.rotation.z = Math.PI / 2;
      w2.position.x = 0.65;

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1), chromeMat);
      handle.rotation.z = Math.PI / 2;

      dbGroup.add(w1, w2, handle);
      dbGroup.position.set(-0.3, 0.4, 0);
      dbGroup.rotation.set(0.3, 0.2, 0.5);

      // Sports Stopwatch
      const swGroup = new THREE.Group();
      const swBody = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.14, 24), createClayMaterial(0x10b981));
      swBody.rotation.x = Math.PI / 2;
      const swFace = new THREE.Mesh(new THREE.CircleGeometry(0.36, 24), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      swFace.position.z = 0.08;
      const needle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.01), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      needle.position.set(0.04, 0.08, 0.09);
      needle.rotation.z = -0.4;
      const topPusher = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2), goldMat);
      topPusher.position.y = 0.52;

      swGroup.add(swBody, swFace, needle, topPusher);
      swGroup.position.set(0.8, -0.1, 0.2);

      // Textured Basketball
      const ballMat = createClayMaterial(0xf97316, 0.5);
      const basketball = new THREE.Mesh(new THREE.SphereGeometry(0.46, 24, 24), ballMat);
      basketball.position.set(-0.2, -0.65, 0.3);

      // Black rib lines on ball
      const rib1 = new THREE.Mesh(new THREE.TorusGeometry(0.462, 0.02, 12, 32), new THREE.MeshBasicMaterial({ color: 0x18181b }));
      const rib2 = rib1.clone();
      rib2.rotation.y = Math.PI / 2;
      basketball.add(rib1, rib2);

      group.add(dbGroup, swGroup, basketball);
      group.rotation.set(0.1, -0.2, 0);
      return group;
    };

    // Model 6: Art & Design (Painter Palette & Brushes)
    const buildArtModel = () => {
      const group = new THREE.Group();

      // Wooden Artist Palette
      const paletteShape = new THREE.Shape();
      paletteShape.absarc(0, 0, 0.9, 0, Math.PI * 2, false);
      // Thumbhole
      const hole = new THREE.Path();
      hole.absarc(0.4, -0.3, 0.2, 0, Math.PI * 2, true);
      paletteShape.holes.push(hole);

      const paletteGeo = new THREE.ExtrudeGeometry(paletteShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      });
      const paletteMat = createClayMaterial(0xfde047, 0.45);
      const paletteMesh = new THREE.Mesh(paletteGeo, paletteMat);
      group.add(paletteMesh);

      // 5 Vibrant Paint Blobs
      const paintColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6];
      const angles = [0.8, 1.4, 2.1, 2.7, 3.4];
      paintColors.forEach((col, idx) => {
        const blobGeo = new THREE.SphereGeometry(0.15, 16, 12);
        blobGeo.scale(1, 0.5, 1);
        const blobMesh = new THREE.Mesh(blobGeo, createClayMaterial(col, 0.2, 0.1));
        const a = angles[idx];
        blobMesh.position.set(Math.cos(a) * 0.65, Math.sin(a) * 0.65, 0.12);
        group.add(blobMesh);
      });

      // Slanted Artist Paintbrush
      const brushGroup = new THREE.Group();
      const bHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 1.2), createClayMaterial(0xd97706));
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.18), chromeMat);
      ferrule.position.y = 0.65;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 16), createClayMaterial(0x3b82f6));
      tip.position.y = 0.8;
      brushGroup.add(bHandle, ferrule, tip);
      brushGroup.position.set(0.1, 0.2, 0.3);
      brushGroup.rotation.set(0.2, 0.4, 0.8);

      group.add(brushGroup);
      group.rotation.set(0.3, 0.3, -0.2);
      return group;
    };

    // Model 7: Photography & Video (Camera & Film Reel)
    const buildPhotographyModel = () => {
      const group = new THREE.Group();

      // Retro Camera Body
      const bodyMat = createClayMaterial(0xf97316, 0.35); // warm coral
      const bodyGeo = new THREE.BoxGeometry(1.6, 1.1, 0.7);
      const cameraBody = new THREE.Mesh(bodyGeo, bodyMat);

      // Silver top casing
      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.25, 0.72), chromeMat);
      topPlate.position.y = 0.58;

      // Shutter button & dial
      const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15), goldMat);
      shutterBtn.position.set(-0.5, 0.75, 0);

      // Viewfinder
      const vf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.15), createClayMaterial(0x18181b));
      vf.position.set(0, 0.72, 0);

      // Camera Lens with glass element
      const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.5, 24), chromeMat);
      lensBarrel.rotation.x = Math.PI / 2;
      lensBarrel.position.set(0, 0, 0.5);

      const glass = new THREE.Mesh(
        new THREE.SphereGeometry(0.38, 24, 16),
        new THREE.MeshPhysicalMaterial({
          color: 0x1e1b4b,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 1.0,
        })
      );
      glass.position.set(0, 0, 0.7);

      // Film Reel
      const filmReel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 16), createClayMaterial(0x475569));
      filmReel.rotation.x = 0.5;
      filmReel.position.set(0.9, -0.4, 0.3);

      group.add(cameraBody, topPlate, shutterBtn, vf, lensBarrel, glass, filmReel);
      group.rotation.set(0.1, -0.25, 0.05);
      return group;
    };

    // Model 8: Gaming & Esports (Gamepad Controller & Trophy)
    const buildGamingModel = () => {
      const group = new THREE.Group();

      // Ergonomic Gamepad Body
      const bodyMat = createClayMaterial(0x1e1b4b, 0.35); // dark gamer navy
      const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 0.45), bodyMat);

      // Curved Left & Right Grips
      const gripL = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.9, 16), bodyMat);
      gripL.position.set(-0.8, -0.35, 0);
      gripL.rotation.z = -0.3;

      const gripR = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.9, 16), bodyMat);
      gripR.position.set(0.8, -0.35, 0);
      gripR.rotation.z = 0.3;

      // Illuminated Thumbsticks (Blue & Pink)
      const stickMatL = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
      const stickL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.16), stickMatL);
      stickL.position.set(-0.35, -0.15, 0.25);

      const stickMatR = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.2 });
      const stickR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.16), stickMatR);
      stickR.position.set(0.35, -0.15, 0.25);

      // Glowing D-Pad cross
      const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.08), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
      dpadH.position.set(-0.45, 0.15, 0.24);
      const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.36, 0.08), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
      dpadV.position.set(-0.45, 0.15, 0.24);

      // 4 Action Buttons
      const btnGeo = new THREE.SphereGeometry(0.06, 12, 8);
      const bY = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      bY.position.set(0.45, 0.26, 0.25);
      const bA = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0x22c55e }));
      bA.position.set(0.45, 0.04, 0.25);
      const bX = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
      bX.position.set(0.34, 0.15, 0.25);
      const bB = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      bB.position.set(0.56, 0.15, 0.25);

      group.add(mainBody, gripL, gripR, stickL, stickR, dpadH, dpadV, bY, bA, bX, bB);

      // Golden Trophy Cup
      const trophyGroup = new THREE.Group();
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.15, 0.5, 16), goldMat);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.2, 16), createClayMaterial(0x334155));
      base.position.y = -0.35;
      const handleL = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 12, 16, Math.PI), goldMat);
      handleL.rotation.y = Math.PI / 2;
      handleL.position.set(-0.35, 0.05, 0);

      trophyGroup.add(cup, base, handleL);
      trophyGroup.position.set(1.1, 0.5, 0.2);
      trophyGroup.rotation.set(0.2, -0.4, 0.2);

      group.add(trophyGroup);
      group.rotation.set(0.2, -0.3, 0.15);
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
        new THREE.SphereGeometry(1.6, 12, 12),
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

    // --- 4. Floating Decorative 3D Stars & Pastel Candy Particles ---
    const starShape = new THREE.Shape();
    const starPts = 4;
    for (let i = 0; i < starPts * 2; i++) {
      const r = i % 2 === 0 ? 0.35 : 0.12;
      const angle = (i * Math.PI) / starPts;
      if (i === 0) starShape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else starShape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.08, bevelEnabled: false });
    const starColors = [0xfacc15, 0xf472b6, 0x60a5fa, 0x34d399, 0xa78bfa];

    const decorParticles = [];
    for (let i = 0; i < 24; i++) {
      const col = starColors[i % starColors.length];
      let mesh;
      if (i % 2 === 0) {
        mesh = new THREE.Mesh(starGeo, createClayMaterial(col, 0.3));
      } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), createClayMaterial(col, 0.25));
      }

      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 4 - 0.5;

      mesh.position.set(x, y, z);
      scene.add(mesh);
      decorParticles.push({
        mesh,
        baseY: y,
        speed: 0.5 + Math.random() * 0.8,
        rotSpeed: (Math.random() - 0.5) * 2,
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

          // Joyful pastel confetti burst at click position
          const rect = container.getBoundingClientRect();
          const normX = e.clientX / window.innerWidth;
          const normY = e.clientY / window.innerHeight;

          confetti({
            particleCount: 45,
            spread: 70,
            origin: { x: normX, y: normY },
            colors: ['#38BDF8', '#F472B6', '#A78BFA', '#C084FC', '#34D399', '#FB923C'],
            disableForReducedMotion: true,
          });

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
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.6, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.4, 0.05);
      camera.lookAt(0, 0, 0);

      // Scroll parallax factor
      const scrollParallax = scrollY * 0.0035;

      // Animate each of the 8 3D models
      categoryGroups.forEach((item) => {
        const isHovered = currentHovered === item.id;

        // Gentle floating oscillation
        const floatY = Math.sin(elapsedTime * 1.5 + item.floatPhase) * 0.12;
        const floatRot = Math.cos(elapsedTime * 1.2 + item.floatPhase) * 0.06;

        // Scroll divergence: models float outwards smoothly as user scrolls
        const scrollOffsetX = (item.basePos.x / 5) * scrollParallax;
        const scrollOffsetY = (item.basePos.y / 3) * scrollParallax * 0.8;

        item.group.position.x = item.basePos.x + scrollOffsetX;
        item.group.position.y = item.basePos.y + floatY - scrollOffsetY;

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
        const targetScale = item.baseScale * (isHovered ? 1.22 : 1.0) + item.bounceSpring * 0.45;
        item.group.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.12
        );

        // Rotation: Base + float + hover tilt + spin
        item.model.rotation.y = item.baseRot.y + floatRot + (isHovered ? mouse.x * 0.5 : 0) + item.spinAnim;
        item.model.rotation.x = item.baseRot.x + (isHovered ? -mouse.y * 0.4 : 0);
      });

      // Animate floating decorative stars & candy
      decorParticles.forEach((p, idx) => {
        p.mesh.position.y = p.baseY + Math.sin(elapsedTime * p.speed + idx) * 0.25 - scrollParallax * 0.5;
        p.mesh.rotation.z += 0.008 * p.rotSpeed;
        p.mesh.rotation.y += 0.005;
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

      {/* Floating Interactive Hover Tooltip */}
      {hoveredCategory && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200/80 transition-opacity duration-150 animate-bounce-subtle"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 15}px`,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredCategory.color }}
            />
            <p className="font-heading font-extrabold text-xs text-slate-900 tracking-tight">
              {hoveredCategory.name}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {hoveredCategory.desc} • <span className="text-blue-600 font-bold">Click to explore ✦</span>
          </p>
        </div>
      )}
    </div>
  );
}
