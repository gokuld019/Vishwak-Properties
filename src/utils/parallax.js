import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* IMAGE PARALLAX */
export const imageParallax = (el, strength = 15) => {
  if (!el) return;
  gsap.to(el, {
    yPercent: strength,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

/* FLOAT IN */
export const floatIn = (el) => {
  if (!el) return;
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
  });
};

/* TEXT REVEAL */
export const textReveal = (el, dir = "left") => {
  if (!el) return;
  gsap.from(el, {
    x: dir === "left" ? -80 : 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
  });
};
