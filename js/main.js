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
      headline:"AI 應用 · 軟體測試 · 產品開發",
      intro:"彰師大資訊工程學系學生，現於 TMYTEK 擔任研發實習生，預計加入工研院研究團隊。",
      viewExperience:"查看經歷 ↓",contactMe:"聯絡我 ↗",directoryTitle:"網站目錄",navAbout:"關於我",navExperience:"工作經歷",navEducation:"教育與社群",navProjects:"精選作品",navAvatar:"AI 分身",navContact:"聯絡方式",navAboutSub:"個人簡介與方向",navExperienceSub:"企業與實習經歷",navEducationSub:"社群與專業能力",navProjectsSub:"AI 與工程實作",navAvatarSub:"互動式個人介紹",navContactSub:"社群與電子郵件",
      aboutTitle:"專業摘要",
      aboutBody:"我在彰師大就讀資訊工程學系，關注 AI 應用、軟體測試與產品實作。目前在 TMYTEK 參與研發與驗證工作，也將於工研院展開研究實習，並擔任『人工智慧及其應用』課程助教。我喜歡把問題拆解成可測試的步驟，透過專案與競賽把想法變成成果。",
      researchTitle:"研究成果",paperCandidate:"最佳論文候選",paperTitle:"GEMO3D：結合深度學習感知、相機幾何與投影高度比例補償之單目 3D 車輛偵測方法",paperSummary:"將深度學習感知、相機幾何與投影高度比例補償整合成可解釋的單目 3D 車輛偵測流程，並於 CARLA 場景評估。",paperMetricError:"3D 中心誤差",paperMetricSpeed:"推論速度",paperVenue:"CVGIP 2026 研討會",
      exp1Role:"Research & Development Intern",exp1Time:"2026 / 07 — 現在",exp1Meta:"實習 · 新竹／板橋 · 現場",
      exp1a:"參與毫米波與通訊技術相關產品研發，協助跨據點的工程協作。",exp1b:"將研究需求轉換為可驗證的技術任務，持續紀錄測試與迭代結果。",
      exp2Role:"鴻海未來人才計畫成員",exp3Role:"校園大使｜職涯課程組",exp4Role:"資訊科技實習生",exp5Role:"校園大使｜技術組",
      foxconn:"鴻海精密工業 ↗",exp2Time:"2026 / 03 — 現在",hybrid:"實習 · 混合型",exp2a:"撰寫產業趨勢、AI 與自動化技術內容，讓複雜議題更容易被理解。",exp2b:"協助技術研討會、企業說明會與校園講座，促進學生與企業交流。",exp2c:"蒐集學生對技術議題與職涯發展的回饋，提供活動與人才策略參考。",
      corp104:"104 人力銀行 ↗",careerTeam:"職涯課程組",exp3a:"推廣校園職涯資源、實習與打工機會，負責內容創作與社群經營。",exp3b:"協助全國競賽並審閱超過 600 件作品，參與建立評分標準。",exp3c:"協調企業講師、課程資訊與活動時程，強化產學連結。",
      exp4Meta:"實習 · 中國福建 · 現場",exp4a:"加入多語系顯示器翻譯自動化測試專案。",exp4b:"協助 Python 測試腳本、測試報告、UI／功能／回歸測試與 Bug Tracking。",
      exp5a:"執行系統流程與穩定性測試，整理問題並協助技術展示。",exp5b:"參與 AI Expo Taiwan 2025 與 COMPUTEX 現場推廣。",
      educationSectionLabel:"學歷與社群領導經驗",educationTitle:"國立彰化師範大學",educationMajor:"資訊工程學系 · 2023 — 2027（預計）",educationBody:"以軟體工程、AI 應用與實作為核心，持續透過企業實習和專案驗證所學。",educationCommunityTitle:"學習不只在課堂，也發生在社群與行動裡。",educationCommunityIntro:"資訊工程訓練建立技術底座；社群、活動與領導經驗，讓我學會把人與資源連結起來。",educationMajorShort:"資訊工程學系",educationStatus:"大學日間部 · 大三在學中",educationCcpc:"2026 CCPC 工作人員",educationBuddy:"114-2 International Buddy 國際學伴",educationTa:"115-1 人工智慧及其應用課程助教",csieAssociation:"資訊工程學系學會",eventTeam:"活動組",eventTeamDesc:"協助規劃與執行系上大型活動，負責現場協調與支援。",sepPresent:"2025 / 09 — 現在",transferUnion:"彰師大轉學生聯誼社",vicePr:"副會長 & 公關",transferDesc:"轉學生交流平台主要負責人之一，負責對外聯繫、活動宣傳與社群經營。",junPresent:"2025 / 06 — 現在",transferTime:"2025 / 06 — 2026 / 06",itClub:"資訊社",equipmentManager:"設備管理幹部",itClubRole:"核心幹部",itClubDesc:"管理社團電腦設備與技術支援，協助辦理程式工作坊與技術交流。",febPresent:"2025 / 02 — 現在",ccpcTitle:"中區大專院校程式設計競賽（CCPC）",ccpcRole:"工作人員",ccpcDesc:"協助競賽現場執行、流程協調與參賽隊伍支援。",buddyTitle:"114-2 國際學伴",buddyRole:"國際學伴",buddyDesc:"協助國際學生融入系上環境、課業與校園生活。",taTitle:"人工智慧及其應用",taRole:"課程助教",taDesc:"協助 115-1 課程教學、學生學習與課堂運作。",openSourceClub:"開源社",communityMember:"社群參與成員",gdgDesc:"參與跨校技術交流、DevFest Taipei 2024、SITCON 2025 與 COMPUTEX。",
      detoxTitle:"數位防腐劑",
      competitionTitle:"競賽與成果",awsCompetition:"AWS 黑客松",corningCompetition:"康寧創星家競賽",corningAward:"優等獎",projectLabel:"作品",ieyiTitle:"世界青少年發明展臺灣選拔",ieyiProject:"水位變化預先警報系統",ieyiAward:"銅牌",watchVideo:"作品影片",
      contactTitle:"歡迎交流合作。",qrTitle:"掃描查看所有聯絡方式",qrBody:"用手機相機掃描，或直接點下方連結。"
    },
    en: {
      available:"OPEN TO COLLABORATION · 2026",surname:"楊杰倫",
      headline:"Applied AI · Software Testing · Product Development",
      intro:"Computer Science student at NCUE. R&D Intern at TMYTEK; incoming Research Intern at ITRI.",
      viewExperience:"View experience ↓",contactMe:"Contact me ↗",directoryTitle:"Portfolio directory",navAbout:"About",navExperience:"Experience",navEducation:"Education & community",navProjects:"Selected work",navAvatar:"AI avatar",navContact:"Contact",navAboutSub:"Profile & focus",navExperienceSub:"Industry roles",navEducationSub:"Community & skills",navProjectsSub:"AI & engineering",navAvatarSub:"Interactive profile",navContactSub:"Social & email",
      aboutTitle:"Profile",
      aboutBody:"I study Computer Science and Information Engineering at NCUE, with a focus on applied AI, software testing, and building useful products. I currently work on R&D and validation at TMYTEK, will join ITRI as a research intern, and serve as a teaching assistant for Artificial Intelligence and Its Applications. I like turning open-ended problems into testable steps and tangible outcomes through projects and competitions.",
      researchTitle:"Research",paperCandidate:"Best Paper Candidate",paperTitle:"GEMO3D: A Monocular 3D Vehicle Detection Method Integrating Deep Learning Perception, Camera Geometry, and Projection Height Ratio Compensation",paperSummary:"An interpretable monocular 3D vehicle detection pipeline combining deep learning perception, camera geometry, and projection height ratio compensation, evaluated in CARLA.",paperMetricError:"3D center error",paperMetricSpeed:"Inference speed",paperVenue:"CVGIP 2026 conference",
      exp1Role:"Research & Development Intern",exp1Time:"2026 / 07 — PRESENT",exp1Meta:"Internship · Hsinchu / Banqiao · On-site",
      exp1a:"Contribute to product R&D involving millimeter-wave and communications technologies across engineering sites.",exp1b:"Translate research needs into verifiable technical tasks and document testing and iteration results.",
      exp2Role:"Future Talent Program Associate",exp3Role:"Campus Ambassador | Career Program",exp4Role:"Information Technology Intern",exp5Role:"Campus Ambassador | Technical Group",
      foxconn:"Hon Hai Precision Industry ↗",exp2Time:"2026 / 03 — PRESENT",hybrid:"Internship · Hybrid",exp2a:"Create accessible content on industry trends, AI, and automation.",exp2b:"Support technical seminars, employer events, and campus talks that connect students with industry.",exp2c:"Gather student feedback on technology and career development to inform event and talent strategy.",
      corp104:"104 Corporation ↗",careerTeam:"Career Program",exp3a:"Promoted campus career resources, internships, and part-time opportunities through content and community operations.",exp3b:"Reviewed more than 600 submissions for a nationwide competition and helped establish scoring criteria.",exp3c:"Coordinated speakers, course information, and event schedules to strengthen industry–academia connections.",
      exp4Meta:"Internship · Fujian, China · On-site",exp4a:"Joined an automated testing project for multilingual monitor translation.",exp4b:"Assisted with Python test scripts, reports, UI, functional, regression testing, and bug tracking.",
      exp5a:"Tested system workflows and stability, documented issues, and supported technical demonstrations.",exp5b:"Supported on-site promotion at AI Expo Taiwan 2025 and COMPUTEX.",
      educationSectionLabel:"Academic background and community leadership",educationTitle:"National Changhua University of Education",educationMajor:"B.S. in Computer Science · 2023 — 2027 (Expected)",educationBody:"Focused on software engineering, applied AI, and hands-on implementation, with industry internships and projects used to validate learning.",educationCommunityTitle:"Learning happens in class, in communities, and through action.",educationCommunityIntro:"Computer science builds my technical foundation; communities, events, and leadership teach me to connect people and resources.",educationMajorShort:"Computer Science and Information Engineering",educationStatus:"Full-time undergraduate · Junior",educationCcpc:"Staff Member · 2026 Central Collegiate Programming Contest (CCPC)",educationBuddy:"114-2 International Buddy",educationTa:"Teaching Assistant · Artificial Intelligence and Its Applications (115-1)",csieAssociation:"CSIE Student Association",eventTeam:"Event Planning Committee",eventTeamDesc:"Plan and execute major department events and coordinate on-site operations.",sepPresent:"2025 / 09 — PRESENT",transferUnion:"NCUE Transfer Students Union",vicePr:"Vice President & Public Relations",transferDesc:"Help lead the transfer-student community and manage outreach, promotion, and social channels.",junPresent:"2025 / 06 — PRESENT",transferTime:"2025 / 06 — 2026 / 06",itClub:"IT Club",equipmentManager:"Equipment Manager",itClubRole:"Core Team Member",itClubDesc:"Manage computing equipment, provide technical support, and help run programming workshops.",febPresent:"2025 / 02 — PRESENT",ccpcTitle:"Central Collegiate Programming Contest (CCPC)",ccpcRole:"Staff Member",ccpcDesc:"Supported event operations, contest flow, and participating teams at the 2026 Central Collegiate Programming Contest.",buddyTitle:"114-2 International Buddy",buddyRole:"International Buddy",buddyDesc:"Helped international students adapt to the department, coursework, and campus life.",taTitle:"Artificial Intelligence and Its Applications",taRole:"Teaching Assistant",taDesc:"Support teaching, student learning, and course operations for the 115-1 semester.",openSourceClub:"Open Source Community",communityMember:"Community Member",gdgDesc:"Participated in cross-campus exchanges, DevFest Taipei 2024, SITCON 2025, and COMPUTEX.",
      detoxTitle:"Digital Preservative",
      competitionTitle:"Competitions & awards",awsCompetition:"AWS Hackathon",corningCompetition:"Corning Innovation Competition",corningAward:"Excellence Award",projectLabel:"Project",ieyiTitle:"International Exhibition for Young Inventors · Taiwan Selection",ieyiProject:"Water-level early-warning system",ieyiAward:"Bronze Medal",watchVideo:"Project video",
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
    document.querySelectorAll(".company-link,.social-links a,.social-links button,.qr-url").forEach((node) => {
      node.textContent = node.textContent.replaceAll(" ↗", "").replaceAll("↗", "");
    });
    const month = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
    document.querySelectorAll("time[data-date-start]").forEach((node) => {
      const format = (value) => lang === "zh" ? value.replace("-", ".") : month.format(new Date(`${value}-01T00:00:00Z`));
      const end = node.dataset.dateEnd === "present" ? (lang === "zh" ? "現在" : "PRESENT") : format(node.dataset.dateEnd);
      node.textContent = `${format(node.dataset.dateStart)} — ${end}`.toUpperCase();
    });
    localStorage.setItem("portfolio-lang-v3", lang);
  };
  setLanguage(currentLang);
  langToggle.addEventListener("click", () => setLanguage(currentLang === "zh" ? "en" : "zh"));

  const motto = document.querySelector(".hero-motto");
  if (motto && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const phrase = motto.textContent;
    const characters = Array.from(phrase);
    let position = 0;
    motto.setAttribute("aria-label", phrase);
    motto.textContent = "";
    motto.classList.add("is-typing");
    const typeNext = () => {
      motto.textContent += characters[position++];
      if (position < characters.length) setTimeout(typeNext, 58);
      else motto.classList.remove("is-typing");
    };
    setTimeout(typeNext, 350);
  }

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
})();
