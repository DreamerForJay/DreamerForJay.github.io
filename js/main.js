(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const langToggle = document.querySelector("#lang-toggle");
  const qrDialog = document.querySelector("#qr-dialog");
  const qrOpeners = document.querySelectorAll("#qr-toggle, [data-open-qr]");
  const qrClose = qrDialog.querySelector(".dialog-close");

  const translations = {
    zh: {
      available:"OPEN TO COLLABORATION · 2026",surname:"楊杰倫",
      headline:"把問題弄懂，做出能被使用、也能持續改進的產品。",
      intro:"資訊工程學系學生，目前於 TMYTEK 擔任研發實習生。專注 AI 應用、軟體測試、產品開發與技術社群。",
      viewExperience:"查看經歷 ↓",contactMe:"聯絡我 ↗",directoryTitle:"網站目錄",navAbout:"關於我",navExperience:"工作經歷",navEducation:"教育與社群",navProjects:"精選作品",navAvatar:"AI 分身",navContact:"聯絡方式",navAboutSub:"個人簡介與方向",navExperienceSub:"企業與實習經歷",navEducationSub:"社群與專業能力",navProjectsSub:"AI 與工程實作",navAvatarSub:"互動式個人介紹",navContactSub:"社群與電子郵件",
      aboutTitle:"先把問題拆清楚，再把事情做好。",
      aboutBody:"我喜歡把模糊的問題拆解成可以執行、測試與迭代的方案。從企業實習、校園大使到社群與競賽，我累積了跨團隊溝通、內容策劃、測試自動化與產品實作經驗。工作之外，我喜歡拉麵、旅行、馬拉松、登山與各種運動，也樂於探索新科技與太空知識。",
      exp1Role:"Research & Development Intern",exp1Time:"2026 / 07 — 現在",exp1Meta:"實習 · 新竹／板橋 · 現場",
      exp1a:"參與毫米波與通訊技術相關產品研發，協助跨據點的工程協作。",exp1b:"將研究需求轉換為可驗證的技術任務，持續紀錄測試與迭代結果。",
      foxconn:"鴻海精密工業 ↗",exp2Time:"2026 / 03 — 現在",hybrid:"實習 · 混合型",exp2a:"撰寫產業趨勢、AI 與自動化技術內容，讓複雜議題更容易被理解。",exp2b:"協助技術研討會、企業說明會與校園講座，促進學生與企業交流。",exp2c:"蒐集學生對技術議題與職涯發展的回饋，提供活動與人才策略參考。",
      corp104:"104 人力銀行 ↗",careerTeam:"職涯課程組",exp3a:"推廣校園職涯資源、實習與打工機會，負責內容創作與社群經營。",exp3b:"協助全國競賽並審閱超過 600 件作品，參與建立評分標準。",exp3c:"協調企業講師、課程資訊與活動時程，強化產學連結。",
      exp4Meta:"實習 · 中國福建 · 現場",exp4a:"加入多語系顯示器翻譯自動化測試專案。",exp4b:"協助 Python 測試腳本、測試報告、UI／功能／回歸測試與 Bug Tracking。",
      exp5a:"執行系統流程與穩定性測試，整理問題並協助技術展示。",exp5b:"參與 AI Expo Taiwan 2025 與 COMPUTEX 現場推廣。",
      educationSectionLabel:"學歷與社群領導經驗",educationTitle:"國立彰化師範大學",educationMajor:"資訊工程學系 · 2023 — 2027（預計）",educationBody:"以軟體工程、AI 應用與實作為核心，持續透過企業實習和專案驗證所學。",educationCommunityTitle:"學習不只在課堂，也發生在社群與行動裡。",educationCommunityIntro:"資訊工程訓練建立技術底座；社群、活動與領導經驗，讓我學會把人與資源連結起來。",educationMajorShort:"資訊工程學系",educationStatus:"大學日間部 · 大三在學中",educationCcpc:"2026 CCPC 工作人員",educationBuddy:"114-2 International Buddy 國際學伴",educationTa:"115-1 人工智慧及其應用課程助教",csieAssociation:"資訊工程學系學會",eventTeam:"活動組",eventTeamDesc:"協助規劃與執行系上大型活動，負責現場協調與支援。",sepPresent:"2025 / 09 — 現在",transferUnion:"彰師大轉學生聯誼社",vicePr:"副會長 & 公關",transferDesc:"轉學生交流平台主要負責人之一，負責對外聯繫、活動宣傳與社群經營。",junPresent:"2025 / 06 — 現在",transferTime:"2025 / 06 — 2026 / 06",itClub:"資訊社",equipmentManager:"設備管理幹部",itClubRole:"核心幹部",itClubDesc:"管理社團電腦設備與技術支援，協助辦理程式工作坊與技術交流。",febPresent:"2025 / 02 — 現在",ccpcTitle:"中區大專院校程式設計競賽（CCPC）",ccpcRole:"工作人員",ccpcDesc:"協助競賽現場執行、流程協調與參賽隊伍支援。",buddyTitle:"114-2 國際學伴",buddyRole:"國際學伴",buddyDesc:"協助國際學生融入系上環境、課業與校園生活。",taTitle:"人工智慧及其應用",taRole:"課程助教",taDesc:"協助 115-1 課程教學、學生學習與課堂運作。",openSourceClub:"開源社",communityMember:"社群參與成員",gdgDesc:"參與跨校技術交流、DevFest Taipei 2024、SITCON 2025 與 COMPUTEX。",
      workTitle:"把想法做成可驗證的成果。",workIntro:"從真實問題出發，持續實作與迭代。",kinsunDesc:"智慧長照 AI 陪伴系統：以在地語言、記憶確認、安全評估與協作開發，打造更有溫度的日常陪伴。",detoxTitle:"數位防腐劑",
      project1:"智慧記憶項鍊，整合 AI 語音、3D 投影、光導感測與 GPS；負責產品敘事、體驗流程與技術研究，獲 2025 康寧創星家優等獎。",
      project2:"擔任組長，以 AI 使用分析、溫和提醒與注意力轉移三階段方法，協助使用者改善「腦腐」與碎片內容成癮。",
      project3:"以 PLC、液位感測器與警示元件打造水位變化預先警報系統，獲世界青少年發明展臺灣選拔銅牌。",
      avatarTitle:"和我的 AI 分身聊聊",avatarBody:"透過 Perxona 互動式 AI Avatar，快速了解我的經歷與作品。",
      contactTitle:"歡迎交流合作。",qrTitle:"掃描查看所有聯絡方式",qrBody:"用手機相機掃描，或直接點下方連結。"
    },
    en: {
      available:"OPEN TO COLLABORATION · 2026",surname:"楊杰倫",
      headline:"Understand the problem. Build something useful. Keep making it better.",
      intro:"Computer Science student and R&D intern at TMYTEK, focused on applied AI, software testing, product development, and technical communities.",
      viewExperience:"View experience ↓",contactMe:"Contact me ↗",directoryTitle:"Portfolio directory",navAbout:"About",navExperience:"Experience",navEducation:"Education & community",navProjects:"Selected work",navAvatar:"AI avatar",navContact:"Contact",navAboutSub:"Profile & focus",navExperienceSub:"Industry roles",navEducationSub:"Community & skills",navProjectsSub:"AI & engineering",navAvatarSub:"Interactive profile",navContactSub:"Social & email",
      aboutTitle:"Clarify the problem, then do the work well.",
      aboutBody:"I turn ambiguous problems into plans that can be built, tested, and improved. Through internships, campus ambassador roles, communities, and competitions, I have developed experience in cross-team communication, content planning, test automation, and product implementation. Outside work, I enjoy ramen, travel, marathons, hiking, sports, new technology, and space.",
      exp1Role:"Research & Development Intern",exp1Time:"2026 / 07 — PRESENT",exp1Meta:"Internship · Hsinchu / Banqiao · On-site",
      exp1a:"Contribute to product R&D involving millimeter-wave and communications technologies across engineering sites.",exp1b:"Translate research needs into verifiable technical tasks and document testing and iteration results.",
      foxconn:"Hon Hai Precision Industry ↗",exp2Time:"2026 / 03 — PRESENT",hybrid:"Internship · Hybrid",exp2a:"Create accessible content on industry trends, AI, and automation.",exp2b:"Support technical seminars, employer events, and campus talks that connect students with industry.",exp2c:"Gather student feedback on technology and career development to inform event and talent strategy.",
      corp104:"104 Corporation ↗",careerTeam:"Career Program",exp3a:"Promoted campus career resources, internships, and part-time opportunities through content and community operations.",exp3b:"Reviewed more than 600 submissions for a nationwide competition and helped establish scoring criteria.",exp3c:"Coordinated speakers, course information, and event schedules to strengthen industry–academia connections.",
      exp4Meta:"Internship · Fujian, China · On-site",exp4a:"Joined an automated testing project for multilingual monitor translation.",exp4b:"Assisted with Python test scripts, reports, UI, functional, regression testing, and bug tracking.",
      exp5a:"Tested system workflows and stability, documented issues, and supported technical demonstrations.",exp5b:"Supported on-site promotion at AI Expo Taiwan 2025 and COMPUTEX.",
      educationSectionLabel:"Academic background and community leadership",educationTitle:"National Changhua University of Education",educationMajor:"B.S. in Computer Science · 2023 — 2027 (Expected)",educationBody:"Focused on software engineering, applied AI, and hands-on implementation, with industry internships and projects used to validate learning.",educationCommunityTitle:"Learning happens in class, in communities, and through action.",educationCommunityIntro:"Computer science builds my technical foundation; communities, events, and leadership teach me to connect people and resources.",educationMajorShort:"Computer Science and Information Engineering",educationStatus:"Full-time undergraduate · Junior",educationCcpc:"Staff Member · 2026 Central Collegiate Programming Contest (CCPC)",educationBuddy:"114-2 International Buddy",educationTa:"Teaching Assistant · Artificial Intelligence and Its Applications (115-1)",csieAssociation:"CSIE Student Association",eventTeam:"Event Planning Committee",eventTeamDesc:"Plan and execute major department events and coordinate on-site operations.",sepPresent:"2025 / 09 — PRESENT",transferUnion:"NCUE Transfer Students Union",vicePr:"Vice President & Public Relations",transferDesc:"Help lead the transfer-student community and manage outreach, promotion, and social channels.",junPresent:"2025 / 06 — PRESENT",transferTime:"2025 / 06 — 2026 / 06",itClub:"IT Club",equipmentManager:"Equipment Manager",itClubRole:"Core Team Member",itClubDesc:"Manage computing equipment, provide technical support, and help run programming workshops.",febPresent:"2025 / 02 — PRESENT",ccpcTitle:"Central Collegiate Programming Contest (CCPC)",ccpcRole:"Staff Member",ccpcDesc:"Supported event operations, contest flow, and participating teams at the 2026 Central Collegiate Programming Contest.",buddyTitle:"114-2 International Buddy",buddyRole:"International Buddy",buddyDesc:"Helped international students adapt to the department, coursework, and campus life.",taTitle:"Artificial Intelligence and Its Applications",taRole:"Teaching Assistant",taDesc:"Support teaching, student learning, and course operations for the 115-1 semester.",openSourceClub:"Open Source Community",communityMember:"Community Member",gdgDesc:"Participated in cross-campus exchanges, DevFest Taipei 2024, SITCON 2025, and COMPUTEX.",
      workTitle:"Turning ideas into verifiable outcomes.",workIntro:"Start with a real problem. Build, test, and iterate.",kinsunDesc:"An AI companion for long-term care, combining local-language interaction, memory confirmation, safety evaluation, and collaborative development.",detoxTitle:"Digital Preservative",
      project1:"A smart memory necklace combining AI voice, 3D projection, light-guided sensing, and GPS. I led product storytelling, experience flow, and technical research; Excellence Award at the 2025 Corning Innovation Competition.",
      project2:"As team leader, I developed a three-stage approach using AI usage analysis, gentle nudges, and attention redirection to address brain rot and fragmented-content addiction.",
      project3:"Built a water-level early-warning system with PLC control, liquid-level sensors, and alert modules; Bronze Medal at the Taiwan selection of the International Exhibition for Young Inventors.",
      avatarTitle:"Talk with my AI avatar",avatarBody:"Use the interactive Perxona AI avatar to explore my experience and selected work.",
      contactTitle:"Let's build something useful.",qrTitle:"Scan to see every contact",qrBody:"Scan with your phone camera, or open the link below."
    }
  };

  const savedTheme = localStorage.getItem("portfolio-theme-v2") || "dark";
  root.dataset.theme = savedTheme;
  const updateThemeLabel = () => {
    const dark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", dark ? "切換至淺色主題" : "切換至深色主題");
    document.querySelector('meta[name="theme-color"]').content = dark ? "#030711" : "#eff7fb";
  };
  updateThemeLabel();
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme-v2", root.dataset.theme);
    updateThemeLabel();
  });

  let currentLang = localStorage.getItem("portfolio-lang-v3") || "en";
  const setLanguage = (lang) => {
    currentLang = lang;
    root.lang = lang === "zh" ? "zh-Hant" : "en";
    langToggle.textContent = lang === "zh" ? "EN" : "中";
    langToggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切換至中文");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = translations[lang][node.dataset.i18n];
      if (value) node.textContent = value;
    });
    localStorage.setItem("portfolio-lang-v3", lang);
  };
  setLanguage(currentLang);
  langToggle.addEventListener("click", () => setLanguage(currentLang === "zh" ? "en" : "zh"));

  qrOpeners.forEach((opener) => opener.addEventListener("click", () => qrDialog.showModal()));
  qrClose.addEventListener("click", () => qrDialog.close());
  qrDialog.addEventListener("click", (event) => {
    const rect = qrDialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) qrDialog.close();
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      }), { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((element) => observer ? observer.observe(element) : element.classList.add("visible"));
  // Load the below-the-fold avatar SDK only when its section is nearby.
  const avatarSection = document.querySelector("#avatar");
  if (avatarSection) {
    let sdkRequested = false;
    const loadAvatarSdk = () => {
      if (sdkRequested) return;
      sdkRequested = true;
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://cdn.perxona.ai/asia/prod/latest/widget/entry/index.js";
      document.head.append(script);
    };
    if ("IntersectionObserver" in window) {
      const avatarObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadAvatarSdk();
          avatarObserver.disconnect();
        }
      }, { rootMargin: "800px 0px" });
      avatarObserver.observe(avatarSection);
    } else loadAvatarSdk();
  }
})();
