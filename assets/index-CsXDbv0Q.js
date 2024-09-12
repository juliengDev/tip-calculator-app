(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=c(o);fetch(o.href,s)}})();const f=document.getElementById("bill"),r=document.getElementById("people"),i=document.getElementById("custom"),u=document.querySelector(".calculator__input__selection__container"),b=document.getElementById("tip-per-person"),v=document.getElementById("total-per-person"),d=document.querySelector(".calculator__result__button"),l=document.querySelector(".calculator__input__number__people-error"),n={billAmount:0,tipPercentage:0,numberOfPeople:1},P=t=>Math.max(0,parseFloat(t)||0),g=t=>Math.max(0,parseInt(t,10)||0),L=t=>{const e=t.billAmount*(t.tipPercentage/100),c=t.billAmount+e,a=t.numberOfPeople>0?e/t.numberOfPeople:0,o=t.numberOfPeople>0?c/t.numberOfPeople:0;return{tipPerPerson:a,totalPerPerson:o}},h=(t,e)=>{b&&(b.textContent=`$${t.toFixed(2)}`),v&&(v.textContent=`$${e.toFixed(2)}`),$()},m=()=>{const{tipPerPerson:t,totalPerPerson:e}=L(n);h(t,e),console.log(`
    Montant de la note: ${n.billAmount.toFixed(2)} $
    Pourcentage de pourboire: ${n.tipPercentage.toFixed(2)}%
    Nombre de personnes: ${n.numberOfPeople}
    Pourboire par personne: ${t.toFixed(2)} $
    Total par personne: ${e.toFixed(2)} $
  `)},y=t=>{const e=t.target;n.billAmount=P((e==null?void 0:e.value)||"0"),m()},O=t=>{var c;const e=t.target;(e==null?void 0:e.tagName)==="BUTTON"&&((c=e.textContent)!=null&&c.includes("%"))&&(u.querySelectorAll("button").forEach(o=>o.classList.remove("selected")),e.classList.add("selected"),n.tipPercentage=P(e.textContent.replace("%","")),i&&(i.value=""),m())},_=t=>{const e=t.target,c=P((e==null?void 0:e.value)||"0");n.tipPercentage=Math.min(100,c),u.querySelectorAll("button").forEach(o=>o.classList.remove("selected")),m()},x=t=>{const e=t.target,c=g((e==null?void 0:e.value)||"0");n.numberOfPeople=Math.max(0,c),n.numberOfPeople===0?(l==null||l.classList.remove("hidden"),r==null||r.classList.add("error")):(l==null||l.classList.add("hidden"),r==null||r.classList.remove("error")),m()},A=()=>{n.billAmount=0,n.tipPercentage=0,n.numberOfPeople=1,f&&(f.value=""),r&&(r.value=""),i&&(i.value=""),u.querySelectorAll("button").forEach(e=>e.classList.remove("selected")),l==null||l.classList.add("hidden"),r==null||r.classList.remove("error"),m(),console.log("Calculator reset")},$=()=>{d&&(n.billAmount>0||n.tipPercentage>0||n.numberOfPeople>1?d.classList.add("active"):d.classList.remove("active"))};f==null||f.addEventListener("input",y);u==null||u.addEventListener("click",O);i==null||i.addEventListener("input",_);r==null||r.addEventListener("input",x);d==null||d.addEventListener("click",A);m();
//# sourceMappingURL=index-CsXDbv0Q.js.map
