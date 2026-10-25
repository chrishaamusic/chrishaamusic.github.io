// Minimal JS: sticky nav shadow, mobile menu, footer year.
(function(){var n=document.querySelector('.nav'),t=document.querySelector('.nav__toggle');if(!t)return;
function s(o){n.classList.toggle('is-open',o);t.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
t.addEventListener('click',function(){s(!n.classList.contains('is-open'))});
document.querySelectorAll('.nav__links a').forEach(function(a){a.addEventListener('click',function(){s(false)})});
function f(){n.classList.toggle('is-scrolled',scrollY>40)}addEventListener('scroll',f,{passive:true});f();
var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear()})();
