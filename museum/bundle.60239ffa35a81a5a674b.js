(()=>{var e={543:()=>{const e=document.querySelector(".video__player"),t=document.querySelector(".video__content"),o=document.querySelector(".video__big-play"),s=document.querySelector(".video__play"),n=document.querySelector(".video__progress"),l=document.querySelector(".video__volume"),r=document.querySelector(".video__volume-level"),a=document.querySelector(".video__zoom");let c,u=!0,d=0,i=1;t.addEventListener("click",(e=>(e=>{e.target.classList.contains("video__content"),t.paused?(t.play(),o.style.display="none",s.style.backgroundImage="url('./assets/svg/pause.svg')"):(t.pause(),o.style.display="inline-block",s.style.backgroundImage="url('./assets/svg/play.svg')")})(e))),t.addEventListener("ended",(()=>{p(1)})),o.addEventListener("click",(()=>{t.paused&&(t.play(),o.style.display="none",s.style.backgroundImage="url('./assets/svg/pause.svg')")}));const g=()=>{t.paused?(t.play(),s.style.backgroundImage="url('./assets/svg/pause.svg')",o.style.display="none"):(t.pause(),s.style.backgroundImage="url('./assets/svg/play.svg')",o.style.display="inline-block")};s.addEventListener("click",(()=>g())),t.addEventListener("timeupdate",(()=>(()=>{if(!u)return;const e=t.currentTime/t.duration*100;n.value=e,n.style.background=`-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${e}%, #710707), color-stop(${e}%, #fff), to(#fff))`,n.style.background=`linear-gradient(left, #710707 0%, #710707 ${e}%, #fff ${e}%, #fff 100%)`})())),n.addEventListener("mousedown",(()=>{u=!1})),n.addEventListener("mouseup",(()=>(t.currentTime=t.duration*(d/100),void(u=!0)))),n.addEventListener("input",(()=>(d=n.value,n.style.background=`-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${d}%, #710707), color-stop(${d}%, #fff), to(#fff))`,void(n.style.background=`linear-gradient(left, #710707 0%, #710707 ${d}%, #fff ${d}%, #fff 100%)`))));const v=()=>{r.value>0&&(c=r.value),t.muted?f(c):f(0)};l.addEventListener("click",(()=>v()));const f=(e=r.value)=>{const o=e;t.volume=o/10,r.style.background=`-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${10*o}%, #710707), color-stop(${10*o}%, #fff), to(#fff))`,r.style.background=`linear-gradient(left, #710707 0%, #710707 ${10*o}%, #fff ${10*o}%, #fff 100%)`,0===t.volume?(t.muted=!0,r.value=e,l.style.backgroundImage='url("./assets/svg/mute.svg")'):(t.muted=!1,r.value=e,l.style.backgroundImage='url("./assets/svg/volume.svg")')};r.addEventListener("input",(()=>f()));const y=()=>{document.fullscreenElement?(document.exitFullscreen(),a.style.backgroundImage='url("./assets/svg/zoom.svg")'):(e.requestFullscreen(),a.style.backgroundImage='url("./assets/svg/fullscreen_exit.svg")')};a.addEventListener("click",(()=>y())),document.addEventListener("fullscreenchange",(e=>{document.fullscreenElement||(a.style.backgroundImage='url("./assets/svg/zoom.svg")',t.style.height="735px"),document.fullscreenElement&&(t.style.height="100%")}));const p=(l=0)=>{let r=t.getAttribute("src");r=r.split(".");let a=+r[1][r[1].length-1];a+=l,a>4&&(a=0),a<0&&(a=4),r[1]=r[1].slice(0,-1)+a,r=r.join("."),t.setAttribute("src",r);let c=document.createElement("video"),u=t.getAttribute("poster");c.setAttribute("poster",u),c.classList.add("video__content","video__content--opacity"),e.append(c),setTimeout((()=>{c.remove()}),300);let d=t.getAttribute("poster");d=d.split("."),d[1]=d[1].slice(0,-1)+a,d=d.join("."),t.setAttribute("poster",d),o.style.display="inline-block",setTimeout((()=>{n.value=0,n.style.background="-webkit-gradient(linear, left top, right top, from(#710707), color-stop(0%, #710707), color-stop(0%, #fff), to(#fff))",n.style.background="linear-gradient(left, #710707 0%, #710707 0%, #fff 0%, #fff 100%)",s.style.backgroundImage="url('./assets/svg/play.svg')",o.style.display="inline-block"}),0)};checkHotkeys=e=>{switch(e.code){case"Space":g(),e.target===document.body&&e.preventDefault();break;case"KeyM":v();break;case"Comma":t.playbackRate<=.25||(t.playbackRate=i-=.25);break;case"Period":t.playbackRate>=2||(t.playbackRate=i+=.25);break;case"KeyF":y();break;case"KeyK":g();break;case"KeyJ":t.currentTime-=10;break;case"KeyL":t.currentTime+=10;break;case"KeyN":p(1);break;case"KeyP":p(-1)}},document.addEventListener("keydown",(e=>checkHotkeys(e))),document.querySelector(".video__buttonPrev").addEventListener("click",(()=>p(-1))),document.querySelector(".video__buttonNext").addEventListener("click",(()=>p(1))),console.log("   Стилизовал и добавил функциональности видеоплееру из задания Museum stage 1 + 10 баллов"),console.log("----------"),console.log("   Обязательный дополнительный фукционал: + 10 баллов\nУправление плеером с клавиатуры:\n1) клавиша Пробел — пауза\n2) Клавиша M (англ) — отключение/включение звука\n3) Клавиша > — ускорение воспроизведения ролика\n4) Клавиша < — замедление воспроизведения ролика\n5) Клавиша F — включение/выключение полноэкранного режим\nГорячие клавиши должны работать так же, как работают эти клавиши в YouTube видео"),console.log("----------"),console.log("   Дополнительный функционал на выбор: + 10 баллов\nДобавить поддержку других горячих клавиш из тех, которые поддерживаются в YouTube видео - 2 балла за каждую дополнительную горячую клавишу.\nЧтобы получить список всех горячих клавиш, откройте любоое YouTube видео и нажмите комбинацию клавиш Shift + /\n1) клавиша K Приостановить или продолжить воспроизведение\n2) клавиша J Перемотать ролик на 10 секунд назад\n3) клавиша L Перемотать ролик на 10 секунд вперед\n4) клавиша N Перейти к следующему видео\n5) клавиша P Перейти к предыдущему видео\n"),console.log("----------"),console.log("   Дополнительный функционал на выбор: + 10 баллов\nДобавить возможность перелистывания видео или слайдер видео Демо (в демо вместо картинок используйте видео)\n"),console.log("----------"),console.log("Результат: 40 баллов")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var l=t[s]={exports:{}};return e[s](l,l.exports,o),l.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";o(543)})()})();