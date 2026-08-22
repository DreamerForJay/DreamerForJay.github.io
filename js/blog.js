(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const langToggle = document.querySelector('#lang-toggle');
  const qrDialog = document.querySelector('#qr-dialog');
  const copy = {
    en:{subtitle:'Notes on building, competing, and learning in public.',latest:'Latest writing',search:'Search posts',postTitle:'Competition Notes: Learning Beyond the Result',postSummary:'A record of the competition journey, the teamwork behind it, and what I will carry into the next challenge.',readPost:'Read post →',empty:'No posts match your search.',articleIntro:'This LinkedIn post records the people, decisions, and lessons behind a recent competition experience.'},
    zh:{subtitle:'記錄技術實作、比賽與持續學習的過程。',latest:'最新文章',search:'搜尋文章',postTitle:'比賽紀錄：結果之外，我學到的事',postSummary:'記錄一次比賽旅程、背後的團隊合作，以及帶往下一次挑戰的經驗。',readPost:'閱讀文章 →',empty:'找不到符合條件的文章。',articleIntro:'這篇 LinkedIn 貼文記錄近期比賽背後的人、決策與學習。'}
  };
  const updateTheme = () => { const dark=root.dataset.theme==='dark'; if(themeToggle) themeToggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme'); const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=dark?'#030711':'#eff7fb'; };
  root.dataset.theme=localStorage.getItem('portfolio-theme-v2')||'dark'; updateTheme();
  themeToggle?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('portfolio-theme-v2',root.dataset.theme);updateTheme();});
  let lang=localStorage.getItem('portfolio-lang-v3')||'en';
  const setLanguage=(next)=>{lang=next;root.lang=lang==='zh'?'zh-Hant':'en';if(langToggle){langToggle.textContent=lang==='zh'?'EN':'中';langToggle.setAttribute('aria-label',lang==='zh'?'Switch to English':'切換至中文');}document.querySelectorAll('[data-blog-i18n]').forEach(n=>{const v=copy[lang][n.dataset.blogI18n];if(v)n.textContent=v;});document.querySelectorAll('[data-blog-placeholder]').forEach(n=>n.placeholder=copy[lang][n.dataset.blogPlaceholder]);localStorage.setItem('portfolio-lang-v3',lang);};
  setLanguage(lang); langToggle?.addEventListener('click',()=>setLanguage(lang==='zh'?'en':'zh'));
  document.querySelectorAll('#qr-toggle,[data-open-qr]').forEach(n=>n.addEventListener('click',()=>qrDialog?.showModal()));
  qrDialog?.querySelector('.dialog-close')?.addEventListener('click',()=>qrDialog.close());
  qrDialog?.addEventListener('click',e=>{if(e.target===qrDialog)qrDialog.close();});
  const input=document.querySelector('#blog-search'), cards=[...document.querySelectorAll('[data-post]')], buttons=[...document.querySelectorAll('[data-filter]')], empty=document.querySelector('.blog-empty'); let filter='all';
  const apply=()=>{const q=(input?.value||'').trim().toLowerCase();let shown=0;cards.forEach(card=>{const tags=card.dataset.tags||'',hay=(card.dataset.search+' '+card.textContent).toLowerCase(),okTag=filter==='all'||tags.includes(filter),okQuery=!q||hay.includes(q);card.hidden=!(okTag&&okQuery);if(!card.hidden)shown++;});if(empty)empty.hidden=shown!==0;};
  input?.addEventListener('input',apply); buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;buttons.forEach(x=>x.classList.toggle('active',x===b));apply();}));
})();