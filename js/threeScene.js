// threeScene.js
(function(){
  // wait until Three is available
  function ready(cb) {
    if (window.THREE) return cb();
    setTimeout(()=>ready(cb), 50);
  }

  ready(function(){
    const root = document.getElementById('three-root');
    if(!root) return;

    const w = () => root.clientWidth || window.innerWidth;
    const h = () => Math.max(root.clientHeight || window.innerHeight * 0.7, 400);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w()/h(), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    root.appendChild(renderer.domElement);

    // ambient
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pLight = new THREE.PointLight(0xfff1c0, 1.2, 50);
    pLight.position.set(5,5,5);
    scene.add(pLight);

    // hive geometry: layered hex-like structure using lathe or icosahedron + rings
    const mainGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const mat = new THREE.MeshStandardMaterial({ color:0xffd54f, metalness:0.7, roughness:0.2 });
    const main = new THREE.Mesh(mainGeo, mat);
    scene.add(main);

    // little bees (points)
    const beeGroup = new THREE.Group();
    for(let i=0;i<40;i++){
      const g = new THREE.SphereGeometry(0.03, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const b = new THREE.Mesh(g, m);
      const angle = Math.random()*Math.PI*2;
      const radius = 1.9 + Math.random()*1.1;
      b.position.set(Math.cos(angle)*radius, (Math.random()-0.5)*0.8, Math.sin(angle)*radius);
      beeGroup.add(b);
    }
    scene.add(beeGroup);

    camera.position.set(0,0,5);

    // subtle hover parallax
    let mouseX=0, mouseY=0;
    window.addEventListener('mousemove', (e)=> {
      const nx = (e.clientX - window.innerWidth/2) / window.innerWidth;
      const ny = (e.clientY - window.innerHeight/2) / window.innerHeight;
      mouseX = nx * 0.4;
      mouseY = ny * -0.3;
    });

    // resize
    window.addEventListener('resize', ()=> {
      renderer.setSize(w(), h());
      camera.aspect = w()/h();
      camera.updateProjectionMatrix();
    });

    // animation
    const clock = new THREE.Clock();
    function animate(){
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      main.rotation.y += 0.006 + mouseX*0.01;
      main.rotation.x = Math.sin(t*0.25)*0.08 + mouseY*0.1;

      // bees orbit
      beeGroup.children.forEach((b, i) => {
        const s = 0.8 + Math.sin(t*0.6 + i)*0.2;
        b.position.x *= 0.999;
        const ang = Math.atan2(b.position.z, b.position.x) + 0.01 + Math.sin(i)*0.001;
        const rad = Math.hypot(b.position.x, b.position.z);
        b.position.x = Math.cos(ang) * rad;
        b.position.z = Math.sin(ang) * rad;
        b.scale.setScalar(s);
      });

      renderer.render(scene, camera);
    }
    animate();
  });
})();
