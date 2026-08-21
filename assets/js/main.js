(function(){

/* ── NAVBAR SCROLL EFFECT ── */
var navbar = document.getElementById('navbar');
function onScroll(){
  var y = window.scrollY;
  if(y > 20){ navbar.classList.add('scrolled'); }
  else { navbar.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll, {passive:true});

/* ── HAMBURGER / DRAWER ── */
var hamburger = document.getElementById('hamburger');
var drawer = document.getElementById('nav-drawer');

if(hamburger){
  hamburger.addEventListener('click', function(e){
    e.stopPropagation();
    var open = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
}

document.addEventListener('click', function(e){
  if(!e.target.closest('.navbar')){
    if(drawer) drawer.classList.remove('open');
    if(hamburger){ hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
  }
});

/* ── SMOOTH SCROLL for all nav links ── */
document.querySelectorAll('[data-scroll]').forEach(function(a){
  a.addEventListener('click', function(e){
    e.preventDefault();
    var id = this.getAttribute('data-scroll');
    var target = document.getElementById(id);
    if(target){target.scrollIntoView({behavior:'smooth'});}    
    if(drawer) drawer.classList.remove('open');
    if(hamburger){ hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
  });
});

/* ── VIEW PROGRAM BUTTON (removed inline onclick) ── */
var viewBtn = document.querySelector('button.btn');
if(viewBtn){
  viewBtn.addEventListener('click', function(){
    var target = document.getElementById('program');
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
}

/* ── POPUP (attach handlers instead of inline onclick) ── */
function openPopup(e){
  e.stopPropagation();
  var popup = document.getElementById('popup');
  if(popup){ popup.style.display='flex'; document.body.style.overflow='hidden'; }
}
function closePopup(e){
  e.stopPropagation();
  var popup = document.getElementById('popup');
  if(popup){ popup.style.display='none'; document.body.style.overflow=''; }
}

document.querySelectorAll('.flyer-card').forEach(function(card){ card.addEventListener('click', openPopup); });

var popupEl = document.getElementById('popup');
if(popupEl){
  popupEl.addEventListener('click', function(e){
    // close when clicking outside the image or on the close button
    if(e.target === popupEl || e.target.classList.contains('popup-close')){ closePopup(e); }
  });
}

document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closePopup(e); });

/* ── SLIDE ANIMATION ON SOCIAL LINKS ── */
document.querySelectorAll('a.social-link').forEach(function(link){
  link.addEventListener('click', function(e){
    var href = this.href;
    var tgt = this.target;
    if(!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    e.preventDefault();
    var overlay = document.getElementById('slide-overlay');
    if(!overlay) return;
    overlay.classList.remove('slide-go');
    void overlay.offsetWidth;
    overlay.classList.add('slide-go');
    setTimeout(function(){
      if(tgt==='_blank'){ window.open(href,'_blank'); }
      else { window.location.href=href; }
      setTimeout(function(){ overlay.classList.remove('slide-go'); },200);
    },340);
  });
});

/* ── SECURITY CHECK OVERLAY HIDE ON LOAD ── */
window.addEventListener('load', function(){
  setTimeout(function(){
    var el = document.getElementById('security-check');
    if(el){ el.style.display = 'none'; }
  }, 1500);
});

})();
