import{a as m,S as u,i}from"./assets/vendor-YT4DRQk6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const g="41070058-40428010ccfde7f145f4a0888",p="https://pixabay.com/api/";async function y(s){try{return(await m.get(p,{params:{key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(r){return console.error("Error fetching images:",r),[]}}const l=document.querySelector(".gallery");function h(s){if(l.innerHTML="",s.length===0)return;const r=s.map(o=>`
    <a href="${o.largeImageURL}" class="gallery-item">
      <img src="${o.webformatURL}" alt="${o.tags}" />
      <div class="info">
        <p>Likes: ${o.likes}</p>
        <p>Views: ${o.views}</p>
        <p>Comments: ${o.comments}</p>
        <p>Downloads: ${o.downloads}</p>
      </div>
    </a>
  `).join("");l.innerHTML=r,new u(".gallery a").refresh()}const f=document.getElementById("search-form"),d=document.querySelector(".gallery"),c=document.querySelector(".loader");(!f||!d||!c)&&console.error("not found");f.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.elements["search-input"].value.trim();if(!r){i.error({message:"Введіть запит!"});return}d.innerHTML="",c.classList.remove("hidden");try{const n=await y(r);console.log("Fetched images:",n),n.length===0?i.error({message:"Sorry, there are no images matching your search query. Please try again!"}):(h(n),new u(".gallery a"))}catch(n){console.error("Error during fetching:",n),i.error({message:"Sorry, there was an error fetching images. Please try again!"})}finally{c.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
