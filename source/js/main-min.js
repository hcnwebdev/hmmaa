function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}var easeInOutQuad=function(t,e,n,o){return(t/=o/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},jumper=function(){var t,e,n,o,r,c,u,i,a,l,d,f;function s(){return window.scrollY||window.pageYOffset}function m(t){return t.getBoundingClientRect().top+e}function p(n){a||(a=n),d=r(l=n-a,e,u,i),window.scrollTo(0,d),l<i?window.requestAnimationFrame(p):function(){window.scrollTo(0,e+u),t&&c&&(t.setAttribute("tabindex","-1"),t.focus());"function"==typeof f&&f();a=!1}()}return function(a){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(i=l.duration||1e3,o=l.offset||0,f=l.callback,r=l.easing||easeInOutQuad,c=l.a11y||!1,e=s(),_typeof(a)){case"number":t=void 0,c=!1,n=e+a;break;case"object":n=m(t=a);break;case"string":t=document.querySelector(a),n=m(t)}switch(u=n-e+o,_typeof(l.duration)){case"number":i=l.duration;break;case"function":i=l.duration(u)}window.requestAnimationFrame(p)}},singleton=jumper(),topBtn=document.querySelector(".js-top-btn"),whatBtn=document.querySelector(".js-what-btn"),whoBtn=document.querySelector(".js-who-btn"),contactBtn=document.querySelector(".js-contact-btn"),toggler=document.querySelector(".toggler"),jumpTime=1e3;topBtn.addEventListener("click",(function(t){t.preventDefault(),singleton(".header",{duration:jumpTime}),toggler.checked=!1})),whatBtn.addEventListener("click",(function(t){t.preventDefault(),singleton("#we_do",{duration:jumpTime}),toggler.checked=!1})),whoBtn.addEventListener("click",(function(t){t.preventDefault(),singleton("#we_are",{duration:jumpTime}),toggler.checked=!1})),contactBtn.addEventListener("click",(function(t){t.preventDefault(),singleton("#contact",{duration:jumpTime}),toggler.checked=!1}));