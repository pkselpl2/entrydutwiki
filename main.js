// main.js: users.json 읽어서 검색/필터/정렬 제공
const DATA_URL = "data/users.json";

let users = [];
let allTags = new Set();

const qEl = document.getElementById("query");
const tagEl = document.getElementById("tagFilter");
const sortEl = document.getElementById("sortBy");
const resultsEl = document.getElementById("results");
const emptyEl = document.getElementById("empty");
const resetBtn = document.getElementById("resetBtn");

async function loadData(){
  try{
    const res = await fetch(DATA_URL);
    users = await res.json();
    users.forEach(u=>{
      (u.tags||[]).forEach(t=> allTags.add(t));
    });
    populateTagFilter();
    render(users);
  }catch(err){
    resultsEl.innerHTML = `<div class="empty">데이터를 불러오지 못했습니다. (${err})</div>`;
  }
}

function populateTagFilter(){
  const tags = Array.from(allTags).sort((a,b)=>a.localeCompare(b,'ko'));
  tags.forEach(t=>{
    const opt = document.createElement("option");
    opt.value = t; opt.textContent = t;
    tagEl.appendChild(opt);
  });
}

function render(list){
  resultsEl.innerHTML = "";
  if(!list.length){
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  list.forEach(u=>{
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="title">${escapeHtml(u.name)} ${u.nick?`<small style="font-weight:400">(${escapeHtml(u.nick)})</small>`:''}</div>
        <div class="meta">프로젝트: ${u.projects?.length||0} · 가입: ${u.joined || '정보없음'}</div>
        <div class="desc">${escapeHtml(u.bio || '')}</div>
        <div class="tags">${(u.tags||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
      </div>
      <div class="actions">
        ${u.entryUrl? `<a class="btn" href="${u.entryUrl}" target="_blank" rel="noopener">엔트리 프로필</a>` : ''}
        ${u.projects && u.projects.length? `<a class="btn" href="${u.projects[0].url}" target="_blank" rel="noopener">대표 프로젝트</a>` : ''}
      </div>
    `;
    resultsEl.appendChild(card);
  });
}

function escapeHtml(s = '') {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;');
}

// 검색 + 필터 로직 (간단한 퍼지매칭)
function searchAndFilter(){
  const q = qEl.value.trim().toLowerCase();
  const tag = tagEl.value;
  let out = users.filter(u=>{
    if(tag && !(u.tags||[]).includes(tag)) return false;
    if(!q) return true;
    // 검색 대상: name, nick, bio, project names, tags
    if((u.name||'').toLowerCase().includes(q)) return true;
    if((u.nick||'').toLowerCase().includes(q)) return true;
    if((u.bio||'').toLowerCase().includes(q)) return true;
    if((u.tags||[]).some(t=>t.toLowerCase().includes(q))) return true;
    if((u.projects||[]).some(p=> (p.name||'').toLowerCase().includes(q))) return true;
    return false;
  });

  const sortBy = sortEl.value;
  if(sortBy === "name"){
    out.sort((a,b)=> (a.name||'').localeCompare(b.name||'','ko'));
  }else if(sortBy === "projects"){
    out.sort((a,b)=> (b.projects?.length||0) - (a.projects?.length||0));
  } else { // recent (기본)
    out.sort((a,b)=> new Date(b.added||b.joined||0) - new Date(a.added||a.joined||0));
  }

  render(out);
}

qEl.addEventListener("input", debounce(searchAndFilter, 180));
tagEl.addEventListener("change", searchAndFilter);
sortEl.addEventListener("change", searchAndFilter);
resetBtn.addEventListener("click", ()=>{
  qEl.value = "";
  tagEl.value = "";
  sortEl.value = "recent";
  searchAndFilter();
});

// 유틸
function debounce(fn, ms=200){
  let t;
  return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); };
}

// 초기 로드
loadData();
