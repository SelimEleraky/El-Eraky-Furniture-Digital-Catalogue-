'use strict';
const $ = selector => document.querySelector(selector);
const state = { room:'All', style:'All', query:'', sort:'catalogue', savedOnly:false, limit:18 };
const storageKey='eleraky-saved-v1';
let saved = new Set();
try { const stored=JSON.parse(localStorage.getItem(storageKey)||'[]'); if(Array.isArray(stored)) saved=new Set(stored.filter(id=>PRODUCTS.some(p=>p.id===id))); } catch (_) {}
let currentProduct=null, imageIndex=0, lastFocus=null;
const detail=$('#product-dialog'), lightbox=$('#image-dialog');
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function saveState(){try{localStorage.setItem(storageKey,JSON.stringify([...saved]));}catch(_){}updateSaved();}
function updateSaved(){
 $('#saved-count').textContent=saved.size;
 $('#saved-toggle').setAttribute('aria-pressed',String(state.savedOnly));
 document.querySelectorAll('[data-save]').forEach(b=>{const yes=saved.has(b.dataset.save);b.textContent=yes?'♥':'♡';b.setAttribute('aria-pressed',String(yes));const p=PRODUCTS.find(p=>p.id===b.dataset.save);b.setAttribute('aria-label',`${yes?'Remove':'Save'} ${p.name}${yes?' from saved pieces':''}`);});
 if(currentProduct){$('#save-product').textContent=saved.has(currentProduct.id)?'Saved to your pieces ♥':'Save piece ♡';$('#save-product').setAttribute('aria-pressed',String(saved.has(currentProduct.id)));}
}
function toggleSaved(id){saved.has(id)?saved.delete(id):saved.add(id);saveState();if(state.savedOnly)render();}
function populateStyles(){const styles=[...new Set(PRODUCTS.filter(p=>state.room==='All'||p.room===state.room).map(p=>p.style))].sort();if(!styles.includes(state.style))state.style='All';$('#style').innerHTML='<option value="All">All styles</option>'+styles.map(s=>`<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');$('#style').value=state.style;}
function filteredProducts(){const q=state.query.toLocaleLowerCase().trim();const items=PRODUCTS.filter(p=>(state.room==='All'||p.room===state.room)&&(state.style==='All'||p.style===state.style)&&(!state.savedOnly||saved.has(p.id))&&(!q||[p.name,p.type,p.code,p.style,p.finish,p.room,p.description].join(' ').toLocaleLowerCase().includes(q)));if(state.sort!=='catalogue')items.sort((a,b)=>(state.sort==='az'?1:-1)*a.name.localeCompare(b.name));return items;}
function render(){const list=filteredProducts(),visible=list.slice(0,state.limit);
 $('#product-grid').innerHTML=visible.map(p=>`<article class="product-card"><button class="favourite" data-save="${p.id}" aria-label="Save ${escapeHTML(p.name)}" aria-pressed="false">♡</button><button class="product-image" data-open="${p.id}" aria-label="View ${escapeHTML(p.name+' — '+p.type)}"><img src="${p.thumbnail}" alt="${escapeHTML(p.name+' — '+p.type)}" loading="lazy" decoding="async" width="640" height="427"><span class="view-label">Discover piece ↗</span></button><div class="card-meta"><button class="card-name" data-open="${p.id}">${escapeHTML(p.name)}</button><span class="card-code">${p.code}</span></div><p class="card-type">${escapeHTML(p.type)}</p><span class="card-style">${escapeHTML(p.style)}</span></article>`).join('');
 $('#results-count').textContent=`${list.length} ${state.savedOnly?'saved ':''}${list.length===1?'piece':'pieces'}${state.room==='All'?' in the collection':' · '+state.room}`;
 $('#shown-count').textContent=list.length?`Showing ${visible.length} of ${list.length} pieces`:'';
 $('#load-more').hidden=visible.length>=list.length;$('#empty-state').hidden=!!list.length;
 $('#empty-message').textContent=state.savedOnly?'Save pieces with the heart button to gather inspiration here. Try clearing filters if a saved piece is hidden.':'Try another name or a different filter.';
 $('#clear-filters').hidden=state.room==='All'&&state.style==='All'&&!state.query&&!state.savedOnly&&state.sort==='catalogue';
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===state.room);b.setAttribute('aria-pressed',String(b.dataset.filter===state.room));});updateSaved();
}
function chooseRoom(room){state.room=room;state.limit=18;state.savedOnly=false;state.style='All';state.query='';$('#search').value='';populateStyles();render();}
function reset(){Object.assign(state,{room:'All',style:'All',query:'',sort:'catalogue',savedOnly:false,limit:18});$('#search').value='';$('#sort').value='catalogue';populateStyles();render();}
function showImage(index){if(!currentProduct)return;imageIndex=(index+currentProduct.images.length)%currentProduct.images.length;$('#detail-image').src=currentProduct.images[imageIndex];$('#detail-image').alt=`${currentProduct.name} — ${currentProduct.type}, photograph ${imageIndex+1}`;$('#image-count').textContent=`${imageIndex+1} / ${currentProduct.images.length}`;document.querySelectorAll('[data-image]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.image)===imageIndex);b.setAttribute('aria-pressed',String(Number(b.dataset.image)===imageIndex));});$('#prev-image').disabled=currentProduct.images.length<2;$('#next-image').disabled=currentProduct.images.length<2;}
function openProduct(id,updateHash=true){const p=PRODUCTS.find(p=>p.id===id);if(!p)return;lastFocus=document.activeElement;currentProduct=p;$('#detail-name').textContent=p.name;$('#detail-eyebrow').textContent=`${p.room} / ${p.style}`;$('#detail-type').textContent=p.type;$('#detail-description').textContent=p.description;$('#detail-size').textContent=p.size;$('#detail-finish').textContent=p.finish;$('#detail-source').textContent=`Collection 2026 · ${p.code} · Catalogue page ${p.page}`;$('#share-status').textContent='';$('#enquire-product').href='https://wa.me/201550068051?text='+encodeURIComponent(`Hello El Eraky Furniture, I would like to enquire about ${p.name} — ${p.type} (${p.code}) from your 2026 collection. Please share pricing, customisation options and delivery details.`);$('#thumbnails').innerHTML=p.images.map((src,i)=>`<button data-image="${i}" aria-label="Show photograph ${i+1}" aria-pressed="false"><img src="${src}" alt="" loading="lazy"></button>`).join('');showImage(0);updateSaved();if(!detail.open){detail.showModal();document.body.classList.add('modal-open');}detail.scrollTop=0;if(updateHash)history.replaceState(null,'','#piece='+encodeURIComponent(p.id));}
function clearProductHash(){if(location.hash.startsWith('#piece='))history.replaceState(null,'',location.pathname+location.search+'#collection');}
function syncHash(){if(location.hash.startsWith('#piece=')){const id=decodeURIComponent(location.hash.slice(7));openProduct(id,false);}else if(detail.open)detail.close();}
$('#product-grid').addEventListener('click',e=>{const save=e.target.closest('[data-save]'),open=e.target.closest('[data-open]');if(save)toggleSaved(save.dataset.save);else if(open)openProduct(open.dataset.open);});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>chooseRoom(b.dataset.filter)));
 document.querySelectorAll('[data-room]').forEach(a=>a.addEventListener('click',()=>chooseRoom(a.dataset.room)));
$('#search').addEventListener('input',e=>{state.query=e.target.value;state.limit=18;render();});
$('#style').addEventListener('change',e=>{state.style=e.target.value;state.limit=18;render();});
$('#sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
$('#clear-filters').addEventListener('click',reset);$('#reset-empty').addEventListener('click',reset);
$('#load-more').addEventListener('click',()=>{const oldCount=Math.min(state.limit,filteredProducts().length);state.limit+=18;render();const next=$('#product-grid').children[oldCount];if(next)next.querySelector('[data-open]').focus({preventScroll:true});});
$('#saved-toggle').addEventListener('click',()=>{const enabled=!state.savedOnly;reset();state.savedOnly=enabled;render();$('#collection').scrollIntoView({behavior:'smooth'});});
$('#thumbnails').addEventListener('click',e=>{const button=e.target.closest('[data-image]');if(button)showImage(Number(button.dataset.image));});
$('#prev-image').addEventListener('click',()=>showImage(imageIndex-1));$('#next-image').addEventListener('click',()=>showImage(imageIndex+1));
$('#close-detail').addEventListener('click',()=>detail.close());detail.addEventListener('close',()=>{document.body.classList.remove('modal-open');clearProductHash();if(lastFocus&&lastFocus.isConnected)lastFocus.focus({preventScroll:true});});
$('#save-product').addEventListener('click',()=>{if(currentProduct)toggleSaved(currentProduct.id);});
$('#zoom-image').addEventListener('click',()=>{$('#full-image').src=currentProduct.images[imageIndex];$('#full-image').alt=$('#detail-image').alt;lightbox.showModal();});$('#close-image').addEventListener('click',()=>lightbox.close());
[detail,lightbox].forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
detail.addEventListener('keydown',e=>{if(lightbox.open||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();showImage(imageIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showImage(imageIndex-1);}});
$('#share-product').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('#share-status').textContent='Link copied. Ready to share.';}catch(_){$('#share-status').textContent='Copy the address from your browser to share this piece.';}});
window.addEventListener('hashchange',syncHash);window.addEventListener('storage',e=>{if(e.key===storageKey){try{const ids=JSON.parse(e.newValue||'[]');if(Array.isArray(ids))saved=new Set(ids.filter(id=>PRODUCTS.some(p=>p.id===id)));}catch(_){}render();}});
$('#year').textContent=new Date().getFullYear();populateStyles();render();syncHash();
