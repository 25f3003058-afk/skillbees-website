/* vendor.js — loads GSAP + ScrollTrigger + Three (production CDNs) */
(function(){
  // GSAP + ScrollTrigger
  var s1 = document.createElement('script');
  s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
  document.head.appendChild(s1);

  var s2 = document.createElement('script');
  s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
  document.head.appendChild(s2);

  // three.js (r150+ recommended)
  var s3 = document.createElement('script');
  s3.src = "https://unpkg.com/three@0.150.1/build/three.min.js";
  document.head.appendChild(s3);

  // optional: OrbitControls for debugging (remove in prod)
  var s4 = document.createElement('script');
  s4.src = "https://unpkg.com/three@0.150.1/examples/js/controls/OrbitControls.js";
  document.head.appendChild(s4);
})();
