// ShaDGramers : menu du téléphone, apparitions au défilement, inclinaisons en 3D.
// Aucun cookie, aucune mesure d'audience, rien n'est chargé depuis un autre site.
// Sans ce script, tout le contenu reste affiché, immobile.
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  // Menu du téléphone
  var bouton = document.querySelector('.menu-bouton');
  var nav = document.getElementById('menu');
  if (bouton && nav) {
    var regler = function (ouvert) {
      bouton.setAttribute('aria-expanded', String(ouvert));
      bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('ouvert', ouvert);
    };
    bouton.addEventListener('click', function () {
      regler(bouton.getAttribute('aria-expanded') !== 'true');
    });
    // Un lien du menu : le menu se replie d'un coup, avant le saut vers la section,
    // sinon la page s'arrête trop bas (le menu ouvert allongeait le haut de page).
    nav.addEventListener('click', function (e) {
      if (!e.target.closest('a')) return;
      nav.style.transition = 'none';
      regler(false);
      void nav.offsetHeight;
      window.requestAnimationFrame(function () { nav.style.transition = ''; });
    });
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        regler(false);
        bouton.focus();
      }
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  doc.classList.add('anime');

  // Apparitions au défilement
  var aReveler = document.querySelectorAll('[data-revele]');
  if ('IntersectionObserver' in window) {
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          observateur.unobserve(entree.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    aReveler.forEach(function (el) { observateur.observe(el); });
  } else {
    aReveler.forEach(function (el) { el.classList.add('visible'); });
  }

  // Les écrans de SIPA se redressent quand la carte monte vers le milieu de l'écran
  var groupe = document.querySelector('.groupe-telephones');
  if (groupe) {
    var prevu = false;
    var suivre = function () {
      prevu = false;
      var r = groupe.getBoundingClientRect();
      var h = window.innerHeight;
      var p = (h - r.top) / (h / 2 + r.height / 2);
      groupe.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
    };
    var demander = function () {
      if (!prevu) {
        prevu = true;
        window.requestAnimationFrame(suivre);
      }
    };
    window.addEventListener('scroll', demander, { passive: true });
    window.addEventListener('resize', demander);
    suivre();
  }

  // Inclinaison à la souris, sur ordinateur seulement
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var incliner = function (zone, cible, force) {
    if (!zone || !cible) return;
    zone.addEventListener('pointermove', function (e) {
      var r = zone.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      cible.style.setProperty('--incl-y', (x * force).toFixed(2) + 'deg');
      cible.style.setProperty('--incl-x', (-y * force).toFixed(2) + 'deg');
    });
    zone.addEventListener('pointerleave', function () {
      cible.style.removeProperty('--incl-x');
      cible.style.removeProperty('--incl-y');
    });
  };

  incliner(document.querySelector('.hero'), document.querySelector('.symbole-3d'), 30);
  incliner(document.querySelector('.projet'), groupe, 10);
  document.querySelectorAll('.video-case').forEach(function (c) {
    incliner(c, c.querySelector('.video'), 12);
  });
})();
