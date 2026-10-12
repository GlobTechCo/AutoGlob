(function(){
 'use strict';
 var key='autoglob_theme';
 var root=document.documentElement;
 var sun='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
 var moon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>';
 function updateButton(button){
  var dark=root.dataset.theme==='dark';
  button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
  button.setAttribute('title',dark?'Light theme':'Dark theme');
  button.setAttribute('aria-pressed',dark?'true':'false');
  button.innerHTML=dark?sun:moon;
 }
 function setup(){
  var actions=document.querySelector('.header-actions');
  if(!actions)return;
  var button=document.createElement('button');
  button.type='button';button.className='icon-btn theme-toggle';button.id='themeToggle';
  button.addEventListener('click',function(){
   root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
   try{localStorage.setItem(key,root.dataset.theme);}catch(e){}
   updateButton(button);
  });
  var menu=actions.querySelector('.nav-toggle');
  actions.insertBefore(button,menu);updateButton(button);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
 window.addEventListener('storage',function(e){
  if(e.key===key&&(e.newValue==='dark'||e.newValue==='light')){
   root.dataset.theme=e.newValue;var button=document.getElementById('themeToggle');if(button)updateButton(button);
  }
 });
})();
