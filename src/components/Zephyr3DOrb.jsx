import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedural studio softbox environment map tuned for B&W + Blaze Orange & Amber luxury reflections
function createStudioEnvironment(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Ambient deep charcoal gradient (#0A0A0A base)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#0a0a0a');
  bgGrad.addColorStop(0.35, '#141416');
  bgGrad.addColorStop(0.5, '#221d18'); // warm ember horizon fill
  bgGrad.addColorStop(0.65, '#141416');
  bgGrad.addColorStop(1, '#080808');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Softbox 1: Overhead key softbox (champagne white / silver rim)
  const g1 = ctx.createRadialGradient(512, 90, 10, 512, 90, 240);
  g1.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  g1.addColorStop(0.4, 'rgba(255, 245, 235, 0.6)');
  g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g1;
  ctx.fillRect(200, 0, 624, 280);

  // Softbox 2: Left rim light (Vibrant Blaze Orange #FF6B00 reflection)
  const g2 = ctx.createRadialGradient(160, 256, 5, 160, 256, 230);
  g2.addColorStop(0, 'rgba(255, 107, 0, 0.95)');
  g2.addColorStop(0.4, 'rgba(245, 158, 11, 0.5)');
  g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 60, 360, 380);

  // Softbox 3: Right rim light (Luminous Amber #F59E0B reflection)
  const g3 = ctx.createRadialGradient(864, 256, 5, 864, 256, 230);
  g3.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
  g3.addColorStop(0.4, 'rgba(255, 180, 50, 0.45)');
  g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g3;
  ctx.fillRect(664, 60, 360, 380);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  texture.dispose();
  pmremGenerator.dispose();

  return envMap;
}

export function Zephyr3DOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Apply procedural B&W + Blaze Orange studio environment map
    const envMap = createStudioEnvironment(renderer);
    scene.environment = envMap;

    // Main Group containing all 3D orb artifacts
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. Soft Elliptical Ground Contact Shadow & Amber Bounce ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 124);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    sGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.8)');
    sGrad.addColorStop(0.65, 'rgba(255, 107, 0, 0.16)'); // Warm Blaze Orange bounce shadow
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowGeo = new THREE.PlaneGeometry(5.4, 5.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.35;
    scene.add(shadowMesh);

    // --- 2. Outer Crystalline Optical Glass Sphere ---
    const sphereGeo = new THREE.SphereGeometry(2.18, 64, 64);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.02,
      roughness: 0.05,
      transmission: 0.95, // Crystal clear transmission to show Blaze core
      thickness: 1.15,
      ior: 1.51,
      reflectivity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 1.0,
      attenuationColor: new THREE.Color(0xffedd5), // Delicate warm amber depth tint
      attenuationDistance: 4.8,
    });
    const outerSphere = new THREE.Mesh(sphereGeo, glassMaterial);
    mainGroup.add(outerSphere);

    // --- 3. Vibrant Blaze Orange & Amber Fresnel Rim Glow Shader ---
    const rimGlowGeo = new THREE.SphereGeometry(2.19, 64, 64);
    const rimGlowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float fresnel = 1.0 - max(dot(vNormal, vViewDir), 0.0);
          float rim = pow(fresnel, 2.7);
          // Transition from fiery Blaze Orange (#FF6B00) to Golden Amber (#F59E0B) and pure silver rim
          vec3 orangeColor = vec3(1.0, 0.42, 0.0);
          vec3 amberColor = vec3(1.0, 0.72, 0.15);
          vec3 whiteRim = vec3(1.0, 0.96, 0.9);
          vec3 rimColor = mix(orangeColor, amberColor, smoothstep(0.2, 0.7, rim));
          rimColor = mix(rimColor, whiteRim, smoothstep(0.7, 1.0, rim));
          gl_FragColor = vec4(rimColor, rim * 0.92);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const rimGlowMesh = new THREE.Mesh(rimGlowGeo, rimGlowMaterial);
    mainGroup.add(rimGlowMesh);

    // --- 4. Precision Polished Materials ---
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f6,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 1.7,
    });

    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      metalness: 0.94,
      roughness: 0.14,
      envMapIntensity: 1.3,
    });

    const blazeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      emissive: 0xff6b00,
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.2,
    });

    // --- 5. Gyroscopic Inner Mechanism Group ---
    const gyroGroup = new THREE.Group();
    mainGroup.add(gyroGroup);

    // A. Outer Gimbal Ring (Polished Chrome with Blaze Orange tick marks)
    const outerRingGeo = new THREE.TorusGeometry(1.68, 0.045, 32, 120);
    const outerRing = new THREE.Mesh(outerRingGeo, chromeMaterial);
    gyroGroup.add(outerRing);

    // 36 Blaze Orange tick marks
    const notchGeo = new THREE.BoxGeometry(0.016, 0.065, 0.02);
    const notchGroup = new THREE.Group();
    const notchCount = 36;
    for (let i = 0; i < notchCount; i++) {
      const angle = (i / notchCount) * Math.PI * 2;
      const notch = new THREE.Mesh(notchGeo, blazeAccentMaterial);
      notch.position.set(Math.cos(angle) * 1.68, Math.sin(angle) * 1.68, 0);
      notch.rotation.z = angle;
      notchGroup.add(notch);
    }
    outerRing.add(notchGroup);

    // B. Inner Gimbal Ring (Brushed Titanium on counter-axis tilt)
    const innerRingGeo = new THREE.TorusGeometry(1.42, 0.038, 32, 100);
    const innerRing = new THREE.Mesh(innerRingGeo, titaniumMaterial);
    innerRing.rotation.x = Math.PI / 3;
    gyroGroup.add(innerRing);

    // C. Iconic Diagonal Slashed Emblem (Ø symbol matching Zephyr and Navbar)
    const emblemGroup = new THREE.Group();
    const emblemRingGeo = new THREE.TorusGeometry(1.12, 0.048, 32, 100);
    const emblemRing = new THREE.Mesh(emblemRingGeo, chromeMaterial);
    emblemGroup.add(emblemRing);

    const slashGeo = new THREE.CylinderGeometry(0.042, 0.042, 2.5, 32);
    const slashMesh = new THREE.Mesh(slashGeo, chromeMaterial);
    slashMesh.rotation.z = Math.PI / 4;
    emblemGroup.add(slashMesh);
    gyroGroup.add(emblemGroup);

    // D. Luminous Blaze Orange Equator Orbital Laser Track
    const equatorGeo = new THREE.TorusGeometry(1.26, 0.018, 16, 100);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.85,
    });
    const equatorRing = new THREE.Mesh(equatorGeo, equatorMat);
    equatorRing.rotation.x = Math.PI / 2;
    gyroGroup.add(equatorRing);

    // --- 6. Radiant Luminous Blaze Singularity Core ---
    const coreGroup = new THREE.Group();
    gyroGroup.add(coreGroup);

    // Inner Glowing Blaze Orange Sun Core
    const innerCoreGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      emissive: 0xff6b00,
      emissiveIntensity: 2.2, // Glowing vibrant blaze orange
      roughness: 0.15,
      metalness: 0.2,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // Outer Geodesic Icosahedron Cage in Golden Amber
    const cageGeo = new THREE.IcosahedronGeometry(0.64, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: true,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9, // Warm amber cage glow
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // Warm Blaze Orange Omni Point Light emitted from core outwards
    const coreLight = new THREE.PointLight(0xff6b00, 3.2, 9);
    coreLight.position.set(0, 0, 0);
    coreGroup.add(coreLight);

    // Secondary Warm Amber Fill Point Light
    const amberFillLight = new THREE.PointLight(0xf59e0b, 1.8, 6);
    amberFillLight.position.set(0, 0.4, 0.4);
    coreGroup.add(amberFillLight);

    // --- 7. Floating Prismatic Satellites & Ember Shards ---
    const satGroup = new THREE.Group();
    mainGroup.add(satGroup);

    const shardGeo = new THREE.OctahedronGeometry(0.048, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xff6b00,
      emissiveIntensity: 0.75, // Glowing blaze embers
      envMapIntensity: 1.6,
    });

    const satellites = [];
    const satCount = 32;
    for (let i = 0; i < satCount; i++) {
      const mesh = new THREE.Mesh(shardGeo, shardMat);
      const radius = 2.45 + (i % 5) * 0.18;
      const speed = (0.25 + (i % 4) * 0.12) * (i % 2 === 0 ? 1 : -1);
      const phase = (i / satCount) * Math.PI * 2;
      const tilt = ((i % 7) - 3) * 0.18;
      satellites.push({ mesh, radius, speed, phase, tilt });
      satGroup.add(mesh);
    }

    // Micro stardust points with warm champagne & amber tint
    const starCount = 80;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const rad = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = rad * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffe4cc,
      size: 0.032,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    mainGroup.add(starPoints);

    // --- 8. Balanced Key & Rim Studio Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff6b00, 1.4);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // --- 9. Smooth Interactive Controls & Inertia Physics ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        dragVelocityX = deltaX * 0.005;
        dragVelocityY = deltaY * 0.005;
        mainGroup.rotation.y += dragVelocityX;
        mainGroup.rotation.x += dragVelocityY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = y * 0.55;
        targetY = x * 0.75;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousedown', handleMouseDown);

    // --- 10. Animation Loop ---
    let animId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia drag damping
      if (!isDragging) {
        dragVelocityX *= 0.93;
        dragVelocityY *= 0.93;
        mainGroup.rotation.y += dragVelocityX;
        mainGroup.rotation.x += dragVelocityY;

        // Smooth parallax towards mouse target
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        mainGroup.rotation.x += (currentX - mainGroup.rotation.x * 0.15) * 0.035;
        mainGroup.rotation.y += 0.0025; // Continuous subtle rotation
      }

      // Synchronized Differential Mechanics
      gyroGroup.rotation.y = elapsed * 0.14;
      outerRing.rotation.z = Math.sin(elapsed * 0.6) * 0.15;
      innerRing.rotation.y = -elapsed * 0.22;
      innerRing.rotation.z = Math.cos(elapsed * 0.5) * 0.2;
      emblemGroup.rotation.y = elapsed * 0.28;
      emblemGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.18;

      // Core pulsating breathing
      const corePulse = 1.0 + Math.sin(elapsed * 2.5) * 0.09;
      coreGroup.scale.set(corePulse, corePulse, corePulse);
      cageMesh.rotation.y = -elapsed * 0.45;
      cageMesh.rotation.x = elapsed * 0.3;

      // Contact shadow subtle pulse with breathing
      shadowMesh.scale.set(1.0 + Math.sin(elapsed * 2.5) * 0.03, 1.0 + Math.sin(elapsed * 2.5) * 0.03, 1.0);

      // Orbiting satellites animation
      satellites.forEach((sat) => {
        const curAngle = sat.phase + elapsed * sat.speed;
        sat.mesh.position.set(
          Math.cos(curAngle) * sat.radius,
          Math.sin(curAngle) * Math.sin(sat.tilt) * sat.radius * 0.45 + Math.sin(elapsed * 1.2 + sat.phase) * 0.12,
          Math.sin(curAngle) * sat.radius
        );
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.025;
      });

      // Subtle stardust rotation
      starPoints.rotation.y = elapsed * 0.03;
      starPoints.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      envMap.dispose();
      shadowTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      sphereGeo.dispose();
      rimGlowGeo.dispose();
      outerRingGeo.dispose();
      notchGeo.dispose();
      innerRingGeo.dispose();
      emblemRingGeo.dispose();
      slashGeo.dispose();
      equatorGeo.dispose();
      innerCoreGeo.dispose();
      cageGeo.dispose();
      shardGeo.dispose();
      starGeo.dispose();
      glassMaterial.dispose();
      rimGlowMaterial.dispose();
      chromeMaterial.dispose();
      titaniumMaterial.dispose();
      blazeAccentMaterial.dispose();
      equatorMat.dispose();
      innerCoreMat.dispose();
      cageMat.dispose();
      shardMat.dispose();
      starMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    />
  );
}

export default Zephyr3DOrb;
