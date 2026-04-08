import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function generateContinentPoints(radius: number, density: number): { positions: Float32Array; sizes: Float32Array } {
  const points: number[] = [];
  const sizes: number[] = [];
  const continents = [
    { latMin: 25, latMax: 70, lonMin: -130, lonMax: -60, fill: 0.7 },
    { latMin: -55, latMax: 10, lonMin: -80, lonMax: -35, fill: 0.6 },
    { latMin: 35, latMax: 70, lonMin: -10, lonMax: 40, fill: 0.7 },
    { latMin: -35, latMax: 35, lonMin: -18, lonMax: 52, fill: 0.65 },
    { latMin: 10, latMax: 70, lonMin: 40, lonMax: 140, fill: 0.55 },
    { latMin: -40, latMax: -12, lonMin: 115, lonMax: 155, fill: 0.55 },
    { latMin: 15, latMax: 40, lonMin: 25, lonMax: 60, fill: 0.5 },
    { latMin: -10, latMax: 20, lonMin: 95, lonMax: 140, fill: 0.35 },
  ];
  for (const c of continents) {
    const count = density * c.fill;
    for (let i = 0; i < count; i++) {
      const lat = (c.latMin + Math.random() * (c.latMax - c.latMin)) * (Math.PI / 180);
      const lon = (c.lonMin + Math.random() * (c.lonMax - c.lonMin)) * (Math.PI / 180);
      points.push(radius * Math.cos(lat) * Math.cos(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.sin(lon));
      sizes.push(0.08 + Math.random() * 0.14);
    }
  }
  return { positions: new Float32Array(points), sizes: new Float32Array(sizes) };
}

function generateGridLines(radius: number): Float32Array[] {
  const lines: Float32Array[] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: number[] = [];
    const latR = lat * (Math.PI / 180);
    for (let i = 0; i <= 64; i++) {
      const lon = (i / 64) * Math.PI * 2;
      pts.push(radius * Math.cos(latR) * Math.cos(lon), radius * Math.sin(latR), radius * Math.cos(latR) * Math.sin(lon));
    }
    lines.push(new Float32Array(pts));
  }
  for (let lon = 0; lon < 360; lon += 30) {
    const pts: number[] = [];
    const lonR = lon * (Math.PI / 180);
    for (let i = 0; i <= 64; i++) {
      const lat = ((i / 64) * Math.PI) - Math.PI / 2;
      pts.push(radius * Math.cos(lat) * Math.cos(lonR), radius * Math.sin(lat), radius * Math.cos(lat) * Math.sin(lonR));
    }
    lines.push(new Float32Array(pts));
  }
  return lines;
}

function generateConnectionArcs(radius: number, count: number): Float32Array[] {
  const arcs: Float32Array[] = [];
  const cities = [
    { lat: 23.8, lon: 90.4 }, { lat: 25.2, lon: 55.3 }, { lat: 51.5, lon: -0.1 },
    { lat: 40.7, lon: -74.0 }, { lat: 35.7, lon: 139.7 }, { lat: 1.3, lon: 103.8 },
    { lat: -33.9, lon: 151.2 }, { lat: 48.9, lon: 2.3 },
  ];
  for (let n = 0; n < count; n++) {
    const a = cities[n % cities.length];
    const b = cities[(n + 1 + Math.floor(n / cities.length)) % cities.length];
    const pts: number[] = [];
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      const lat = (a.lat + (b.lat - a.lat) * t) * (Math.PI / 180);
      const lon = (a.lon + (b.lon - a.lon) * t) * (Math.PI / 180);
      const r = radius + 1 + Math.sin(t * Math.PI) * 3;
      pts.push(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon));
    }
    arcs.push(new Float32Array(pts));
  }
  return arcs;
}

function generateOrbitRing(radius: number, segments: number, tilt: number, phase: number): Float32Array {
  const points: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = z * Math.sin(tilt);
    const zr = z * Math.cos(tilt);
    points.push(x * Math.cos(phase) - zr * Math.sin(phase), y, x * Math.sin(phase) + zr * Math.cos(phase));
  }
  return new Float32Array(points);
}

function generateStarField(count: number, spread: number): Float32Array {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    pts.push((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread);
  }
  return new Float32Array(pts);
}

const continentVS = `
  attribute float size;
  uniform float uTime;
  varying float vAlpha;
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float wave = sin(uTime * 0.8 + position.x * 0.3 + position.z * 0.3) * 0.5 + 0.5;
    vAlpha = 0.7 + 0.3 * wave;
    gl_PointSize = size * (250.0 / length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

const continentFS = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  varying float vAlpha;
  varying vec3 vPos;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    float bloom = exp(-d * 4.0) * 0.6;
    float mix_f = sin(uTime * 0.3 + vPos.y * 0.2) * 0.5 + 0.5;
    vec3 col = mix(uColor1, uColor2, mix_f);
    gl_FragColor = vec4(col, vAlpha * (glow + bloom));
  }
`;

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const atmo1Ref = useRef<THREE.Mesh>(null);
  const atmo2Ref = useRef<THREE.Mesh>(null);
  const dot1Ref = useRef<THREE.Mesh>(null);
  const dot2Ref = useRef<THREE.Mesh>(null);
  const dot3Ref = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Electric blue palette: #3b82f6 → #60a5fa → #93c5fd
  const { positions, sizes } = useMemo(() => generateContinentPoints(10, 1800), []);
  const continentGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, sizes]);

  const gridLines = useMemo(() => generateGridLines(10).map(pts => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.1 }));
  }), []);

  const arcs = useMemo(() => generateConnectionArcs(10, 8).map(pts => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.4 }));
  }), []);

  const orbits = useMemo(() => [
    (() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(generateOrbitRing(13.5, 200, 0.25, 0), 3)); return new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.25 })); })(),
    (() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(generateOrbitRing(15, 200, -0.4, 1.0), 3)); return new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18 })); })(),
    (() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(generateOrbitRing(17, 200, 0.15, 2.2), 3)); return new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.1 })); })(),
  ], []);

  const starGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(generateStarField(600, 120), 3));
    return g;
  }, []);

  const shaderMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: continentVS,
    fragmentShader: continentFS,
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x60a5fa) },
      uColor2: { value: new THREE.Color(0x93c5fd) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { scroll.current = window.scrollY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = groupRef.current;
    if (!g) return;

    g.rotation.x += (mouse.current.y * 0.12 - g.rotation.x) * 0.02;
    g.rotation.y += (mouse.current.x * 0.15 + t * 0.06 - g.rotation.y) * 0.02;
    g.scale.setScalar(Math.max(1 - scroll.current * 0.00015, 0.65));

    shaderMat.uniforms.uTime.value = t;

    if (atmo1Ref.current) {
      atmo1Ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.025);
      (atmo1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 0.4) * 0.04;
    }
    if (atmo2Ref.current) {
      atmo2Ref.current.scale.setScalar(1 + Math.sin(t * 0.3 + 1) * 0.015);
      (atmo2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 0.35) * 0.02;
    }

    arcs.forEach((arc, i) => {
      (arc.material as THREE.LineBasicMaterial).opacity = 0.25 + Math.sin(t * 1.2 + i * 1.8) * 0.2;
    });

    if (starsRef.current) {
      (starsRef.current.material as THREE.PointsMaterial).opacity = 0.5 + Math.sin(t * 0.7) * 0.15;
      starsRef.current.rotation.y = t * 0.003;
    }

    orbits[0].rotation.y = t * 0.04;
    orbits[1].rotation.y = -t * 0.025;
    orbits[2].rotation.y = t * 0.015;

    if (dot1Ref.current) {
      const a = t * 0.35;
      dot1Ref.current.position.set(13.5 * Math.cos(a), 13.5 * Math.sin(0.25) * Math.sin(a), 13.5 * Math.cos(0.25) * Math.sin(a));
    }
    if (dot2Ref.current) {
      const a = -t * 0.2 + 1.0;
      dot2Ref.current.position.set(15 * Math.cos(a) * Math.cos(1.0) - 15 * Math.sin(a) * Math.cos(-0.4) * Math.sin(1.0), 15 * Math.sin(a) * Math.sin(-0.4), 15 * Math.cos(a) * Math.sin(1.0) + 15 * Math.sin(a) * Math.cos(-0.4) * Math.cos(1.0));
    }
    if (dot3Ref.current) {
      const a = t * 0.28 + 2.5;
      dot3Ref.current.position.set(17 * Math.cos(a), 17 * Math.sin(0.15) * Math.sin(a), 17 * Math.cos(0.15) * Math.sin(a));
    }
  });

  return (
    <>
      <points ref={starsRef} geometry={starGeo}>
        <pointsMaterial size={0.15} color={0x93c5fd} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
      </points>
      <group ref={groupRef}>
        <points geometry={continentGeo} material={shaderMat} />
        {gridLines.map((l, i) => <primitive key={`g${i}`} object={l} />)}
        {arcs.map((a, i) => <primitive key={`a${i}`} object={a} />)}
        <mesh ref={atmo1Ref}>
          <sphereGeometry args={[10.4, 64, 64]} />
          <meshBasicMaterial color={0x60a5fa} transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
        <mesh ref={atmo2Ref}>
          <sphereGeometry args={[11.5, 64, 64]} />
          <meshBasicMaterial color={0x3b82f6} transparent opacity={0.06} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[13, 48, 48]} />
          <meshBasicMaterial color={0x2563eb} transparent opacity={0.025} side={THREE.BackSide} />
        </mesh>
        {orbits.map((o, i) => <primitive key={`o${i}`} object={o} />)}
        <mesh ref={dot1Ref}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color={0x93c5fd} transparent opacity={1} />
        </mesh>
        <mesh ref={dot2Ref}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color={0x60a5fa} transparent opacity={0.9} />
        </mesh>
        <mesh ref={dot3Ref}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color={0x3b82f6} transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

export default function SpatialBackground() {
  return (
    <div className="fixed inset-0 -z-10" id="bg-canvas">
      <Canvas camera={{ position: [0, 0, 35], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]} style={{ background: 'transparent' }}>
        <Globe />
      </Canvas>
    </div>
  );
}
