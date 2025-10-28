// scroll.js — uses GSAP & ScrollTrigger loaded by vendor.js
(function(){
  function ready(cb){
    if (window.gsap && window.ScrollTrigger) return cb();
    setTimeout(()=>ready(cb), 50);
  }

  ready(function(){
    gsap.registerPlugin(ScrollTrigger);

    // simple fade/slide for sections
    gsap.utils.toArray('.section, header, .team-cards .card, .founder-card').forEach(elem => {
      gsap.from(elem, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    // hero image parallax
    gsap.to('.hero-image img', {
      y: -60, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // subtle scale for hero inner
    gsap.to('.hero-inner', {
      scale: 0.98,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // sticky hero 3D root effect (move camera slightly)
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        // dispatch transform to threeScene by setting CSS var (three reads mouse effect only)
        document.documentElement.style.setProperty('--three-variance', progress);
      }
    });

    // smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target) gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 0.8 });
      })
    });

    // set year
    document.getElementById('year').textContent = new Date().getFullYear();
  });
})();
