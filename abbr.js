function $(id){return document.getElementById(id);}
function qs(selector){return document.querySelector(selector);}
function qsa(selector){return document.querySelectorAll(selector);}
function ce(tag){return document.createElement(tag);}
function wrap(num,min,max){let r=max-min+1;while(num>max){num-=r;}while(num<min){num+=r;}return num;}
function clamp(num,min,max){return Math.min(Math.max(num,min),max);}
function within(num,min,max){return num>=min&&num<=max;}