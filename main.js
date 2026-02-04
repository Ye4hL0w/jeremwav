// DOM Elements
const vinyl = document.getElementById('vinyl');
const video = document.getElementById('hero-video');
const header = document.querySelector('header');

// Vinyl Scroll Effect
let lastScrollTop = 0;
let rotation = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDelta = scrollTop - lastScrollTop;

  // Rotate based on scroll amount
  rotation += scrollDelta * 0.5;

  if (vinyl) {
    vinyl.style.transform = `rotate(${rotation}deg)`;
  }

  // Header scroll effect
  if (header) {
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for Content Reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.content-block').forEach(block => {
  block.style.opacity = '0';
  block.style.transform = 'translateY(50px)';
  block.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(block);
});

// Smooth scroll for anchor links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Ensure video plays
document.addEventListener('DOMContentLoaded', () => {
  if (video) {
    video.play().catch(e => console.log('Autoplay prevented:', e));
    video.playbackRate = 0.85;
  }
});
