const THREE_CDN =
  "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js";

let threePromise;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getViewportScale() {
  return window.innerWidth < 768 ? 0.75 : 1;
}

function lazyInit(element, callback, rootMargin = "120px") {
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      observer.disconnect();
      callback();
    },
    { rootMargin }
  );

  observer.observe(element);
}

function loadThree() {
  if (!threePromise) {
    threePromise = import(THREE_CDN);
  }
  return threePromise;
}

async function initHeroScene() {
  const mount = document.getElementById("hero-globe-canvas");
  if (!mount || prefersReducedMotion()) return;

  try {
    const THREE = await loadThree();
    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const root = new THREE.Group();
    scene.add(root);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0x4fc2ff,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      })
    );
    root.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.22, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x8368ff,
        transparent: true,
        opacity: 0.08,
      })
    );
    root.add(atmosphere);

    const scale = getViewportScale();
    const nodeCount = Math.round(92 * scale);
    const positions = [];
    const nodes = [];

    for (let index = 0; index < nodeCount; index += 1) {
      const phi = Math.acos(-1 + (2 * index) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2.04;

      const point = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );

      nodes.push(point);
      positions.push(point.x, point.y, point.z);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const points = new THREE.Points(
      pointsGeometry,
      new THREE.PointsMaterial({
        color: 0x7ff7ff,
        size: 0.06,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
      })
    );
    root.add(points);

    const lineSegments = [];
    for (let index = 0; index < nodes.length; index += 7) {
      const start = nodes[index];
      const end = nodes[(index + 13) % nodes.length];
      lineSegments.push(
        start.x,
        start.y,
        start.z,
        end.x,
        end.y,
        end.z
      );
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lineSegments, 3)
    );

    const lines = new THREE.LineSegments(
      linesGeometry,
      new THREE.LineBasicMaterial({
        color: 0x6d8eff,
        transparent: true,
        opacity: 0.28,
      })
    );
    root.add(lines);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.016, 8, 120),
      new THREE.MeshBasicMaterial({
        color: 0x4fc2ff,
        transparent: true,
        opacity: 0.35,
      })
    );
    ring.rotation.x = Math.PI / 2.8;
    ring.rotation.y = Math.PI / 5;
    root.add(ring);

    const pulseNodes = [];
    const pulseGeometry = new THREE.SphereGeometry(0.075, 10, 10);
    const pulseIndexes = [2, 19, 43, 61];
    pulseIndexes.forEach((value, order) => {
      const node = nodes[value % nodes.length];
      const mesh = new THREE.Mesh(
        pulseGeometry,
        new THREE.MeshBasicMaterial({
          color: order % 2 === 0 ? 0x7ff7ff : 0xff6f8f,
          transparent: true,
          opacity: 0.95,
        })
      );
      mesh.position.copy(node);
      pulseNodes.push(mesh);
      root.add(mesh);
    });

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    let frameId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      frameId = window.requestAnimationFrame(render);

      const elapsed = clock.getElapsedTime();
      root.rotation.y = elapsed * 0.18;
      root.rotation.x = Math.sin(elapsed * 0.22) * 0.16;
      ring.rotation.z = elapsed * 0.24;

      pulseNodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(elapsed * 1.8 + index) * 0.22;
        node.scale.setScalar(pulse);
      });

      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const nextWidth = entry.contentRect.width || 640;
      const nextHeight = entry.contentRect.height || 520;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });

    resizeObserver.observe(mount);
    render();

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          window.cancelAnimationFrame(frameId);
          return;
        }
        render();
      },
      { passive: true }
    );
  } catch (error) {
    mount.classList.add("hero-canvas--fallback");
  }
}

function drawThreatMapFrame(context, width, height, time) {
  context.clearRect(0, 0, width, height);

  context.save();
  context.fillStyle = "rgba(8, 18, 38, 0.92)";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(111, 148, 255, 0.09)";
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += width / 12) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += height / 7) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  const continents = [
    [
      [0.11, 0.32],
      [0.2, 0.18],
      [0.25, 0.2],
      [0.24, 0.39],
      [0.19, 0.52],
      [0.12, 0.44],
    ],
    [
      [0.43, 0.23],
      [0.54, 0.19],
      [0.6, 0.28],
      [0.58, 0.47],
      [0.48, 0.5],
      [0.41, 0.35],
    ],
    [
      [0.61, 0.24],
      [0.8, 0.2],
      [0.9, 0.31],
      [0.88, 0.48],
      [0.74, 0.56],
      [0.63, 0.43],
    ],
  ];

  continents.forEach((polygon, index) => {
    context.beginPath();
    polygon.forEach(([px, py], pointIndex) => {
      const x = px * width;
      const y = py * height;
      if (pointIndex === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.fillStyle =
      index === 1 ? "rgba(123, 108, 255, 0.14)" : "rgba(79, 194, 255, 0.1)";
    context.strokeStyle = "rgba(127, 208, 255, 0.24)";
    context.fill();
    context.stroke();
  });

  const nodes = [
    { x: 0.18, y: 0.32, label: "Virginia" },
    { x: 0.28, y: 0.44, label: "Sao Paulo" },
    { x: 0.49, y: 0.24, label: "Frankfurt" },
    { x: 0.56, y: 0.3, label: "Dubai" },
    { x: 0.66, y: 0.36, label: "Bengaluru" },
    { x: 0.76, y: 0.28, label: "Singapore" },
    { x: 0.86, y: 0.47, label: "Sydney" },
  ];

  context.strokeStyle = "rgba(102, 205, 255, 0.2)";
  context.lineWidth = 1.2;
  for (let index = 0; index < nodes.length - 1; index += 1) {
    const start = nodes[index];
    const end = nodes[index + 1];
    context.beginPath();
    context.moveTo(start.x * width, start.y * height);
    context.quadraticCurveTo(
      width * 0.5,
      height * (0.18 + index * 0.02),
      end.x * width,
      end.y * height
    );
    context.stroke();
  }

  nodes.forEach((node, index) => {
    const x = node.x * width;
    const y = node.y * height;
    const pulse = 6 + Math.sin(time * 0.002 + index) * 2.5;

    context.beginPath();
    context.arc(x, y, pulse, 0, Math.PI * 2);
    context.fillStyle = "rgba(79, 194, 255, 0.08)";
    context.fill();

    context.beginPath();
    context.arc(x, y, 3.4, 0, Math.PI * 2);
    context.fillStyle = index % 3 === 0 ? "#ff6f8f" : "#7ff7ff";
    context.shadowBlur = 12;
    context.shadowColor = context.fillStyle;
    context.fill();
    context.shadowBlur = 0;

    context.font = "12px JetBrains Mono, monospace";
    context.fillStyle = "rgba(218, 229, 255, 0.75)";
    context.fillText(node.label, x + 8, y - 8);
  });

  context.restore();
}

function initThreatMap() {
  const canvas = document.getElementById("threat-map-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  let animationFrame = 0;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const render = (time) => {
    drawThreatMapFrame(context, canvas.clientWidth, canvas.clientHeight, time);
    if (!prefersReducedMotion()) {
      animationFrame = window.requestAnimationFrame(render);
    }
  };

  resize();
  render(0);
  window.addEventListener("resize", resize, { passive: true });

  if (prefersReducedMotion()) return;
  animationFrame = window.requestAnimationFrame(render);

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }
      animationFrame = window.requestAnimationFrame(render);
    },
    { passive: true }
  );
}

export function initVisuals() {
  lazyInit(document.getElementById("hero-globe-canvas"), initHeroScene);
  lazyInit(document.getElementById("threat-map-canvas"), initThreatMap, "80px");
}
