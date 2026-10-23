/* ═══════════════════════════════════════════════════════════════════════════
   COMPASSION BRASIL — ÁREA DE CURSOS, METODOLOGIAS & DASHBOARD CORPORATIVO
   Lógica Interativa: Estado, Simulação de Autenticação, Moodle e Relatórios
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── 1. DADOS MOCKADOS: CURSOS E METODOLOGIAS ──
  const CATALOG_ITEMS = [
    {
      id: "curso-01",
      type: "course",
      title: "Oficial de Proteção e Salvaguarda Infantil",
      badgeText: "Curso EAD · Certificação Oficial",
      badgeClass: "badge-course",
      category: "protecao",
      categoryLabel: "Proteção & Salvaguarda",
      format: "SCORM / Moodle · 40 horas",
      desc: "Formação técnica aprofundada nos protocolos institucionais de prevenção, encaminhamento legal, acolhimento de denúncias e manutenção de ambientes seguros para crianças e adolescentes.",
      hasCertificate: true,
      downloadsOrEnrolled: 1840,
      imageColor: "var(--yellow)"
    },
    {
      id: "curso-02",
      type: "course",
      title: "Acolhimento e Vínculo Materno-Infantil",
      badgeText: "Curso EAD · Certificação Oficial",
      badgeClass: "badge-course",
      category: "infancia",
      categoryLabel: "Primeira Infância",
      format: "SCORM / Moodle · 30 horas",
      desc: "Capacitação para agentes comunitários e educadores em visitação domiciliar, cuidados na gestação, estímulo sensorial precoce e fortalecimento do apego seguro entre mãe e bebê.",
      hasCertificate: true,
      downloadsOrEnrolled: 1420,
      imageColor: "var(--blue)"
    },
    {
      id: "curso-03",
      type: "course",
      title: "Liderança Servidora e Protagonismo Jovem",
      badgeText: "Curso EAD · Certificação Oficial",
      badgeClass: "badge-course",
      category: "juventude",
      categoryLabel: "Juventude & Liderança",
      format: "SCORM / Moodle · 45 horas",
      desc: "Estratégias de mentoria e facilitação de grupos para adolescentes. Desenvolvimento de resiliência, liderança comunitária, projeto de vida e transição para o mercado profissional.",
      hasCertificate: true,
      downloadsOrEnrolled: 1190,
      imageColor: "var(--orange)"
    },
    {
      id: "metodologia-01",
      type: "methodology",
      title: "Manual Prático de Proteção Infantil para Igrejas Locais",
      badgeText: "Metodologia Aberta · Toolkit PDF",
      badgeClass: "badge-methodology",
      category: "protecao",
      categoryLabel: "Proteção & Salvaguarda",
      format: "Documento PDF · 48 páginas",
      desc: "Guia completo passo a passo com modelos de fichas de encaminhamento, termos de consentimento, políticas de voluntariado e checklist de segurança física para templos e salas infantis.",
      hasCertificate: false,
      downloadsOrEnrolled: 4210,
      imageColor: "var(--green)"
    },
    {
      id: "metodologia-02",
      type: "toolkit",
      title: "Apresentação: Treinamento de Voluntários do Ministério Infantil",
      badgeText: "Material Pedagógico · Slides PPTX",
      badgeClass: "badge-toolkit",
      category: "discipulado",
      categoryLabel: "Discipulado & Formação",
      format: "Apresentação PPTX · 36 slides editáveis",
      desc: "Slides prontos para uso em reuniões de capacitação da igreja. Abrange desde princípios bíblicos do cuidado infantil até dinâmicas lúdicas de ensino e disciplina positiva.",
      hasCertificate: false,
      downloadsOrEnrolled: 3150,
      imageColor: "var(--yellow)"
    },
    {
      id: "metodologia-03",
      type: "tool",
      title: "Planilha de Planejamento Orçamentário para Projetos Sociais",
      badgeText: "Ferramenta de Gestão · Planilha Excel",
      badgeClass: "badge-tool",
      category: "gestao",
      categoryLabel: "Gestão Social & Projetos",
      format: "Planilha XLSX · Fórmulas prontas",
      desc: "Planilha parametrizada para controle de custos, prestação de contas de doações, plano de compras de materiais pedagógicos e relatórios financeiros para liderança da igreja.",
      hasCertificate: false,
      downloadsOrEnrolled: 2890,
      imageColor: "var(--teal)"
    },
    {
      id: "curso-04",
      type: "course",
      title: "Discipulado e Educação Bíblica Criativa",
      badgeText: "Curso EAD · Certificação Oficial",
      badgeClass: "badge-course",
      category: "discipulado",
      categoryLabel: "Discipulado & Formação",
      format: "SCORM / Moodle · 25 horas",
      desc: "Metodologias pedagógicas dinâmicas para educadores cristãos ensinarem a Palavra de Deus às crianças de maneira cativante, amorosa, prática e contextualizada à realidade local.",
      hasCertificate: true,
      downloadsOrEnrolled: 980,
      imageColor: "var(--green)"
    },
    {
      id: "metodologia-04",
      type: "methodology",
      title: "Guia de Acolhimento e Apoio Emocional Pós-Trauma",
      badgeText: "Metodologia Aberta · Apostila PDF",
      badgeClass: "badge-methodology",
      category: "saude",
      categoryLabel: "Saúde Mental & Apoio",
      format: "Apostila PDF · 32 páginas",
      desc: "Orientações sensíveis e práticas para pastores e educadores que atendem crianças em situação de luto, violência familiar ou perdas materiais decorrentes de desastres.",
      hasCertificate: false,
      downloadsOrEnrolled: 1980,
      imageColor: "var(--orange)"
    }
  ];

  // ── 2. DADOS MOCKADOS: RELATÓRIOS DO DASHBOARD CORPORATIVO ──
  const REPORT_DATA = [
    { name: "Pr. Carlos Eduardo Silva", email: "carlos.silva@igrejaesperanca.org.br", city: "São Paulo", uf: "SP", role: "Pastor / Líder de Igreja", item: "Oficial de Proteção e Salvaguarda Infantil", type: "Curso EAD", date: "21/10/2026", status: "completed" },
    { name: "Mariana Albuquerque", email: "mariana.educ@projetoalegria.org", city: "Fortaleza", uf: "CE", role: "Educadora Social", item: "Manual Prático de Proteção Infantil", type: "Metodologia PDF", date: "21/10/2026", status: "downloaded" },
    { name: "Pr. Marcos Vinícius Santos", email: "pr.marcos@comunidadeviva.com.br", city: "Salvador", uf: "BA", role: "Pastor / Líder de Igreja", item: "Planilha de Planejamento Orçamentário", type: "Planilha XLSX", date: "20/10/2026", status: "downloaded" },
    { name: "Ana Beatriz Ferreira", email: "ana.ferreira@ministerioinfantil.org", city: "Recife", uf: "PE", role: "Líder de Ministério Infantil", item: "Acolhimento e Vínculo Materno-Infantil", type: "Curso EAD", date: "19/10/2026", status: "completed" },
    { name: "Lucas Mendes de Oliveira", email: "lucas.oliveira@acaocompassiva.org.br", city: "Belo Horizonte", uf: "MG", role: "Assistente Social", item: "Apresentação: Treinamento de Voluntários", type: "Slides PPTX", date: "19/10/2026", status: "downloaded" },
    { name: "Pr. David Alencar", email: "david.alencar@igrejabatista.com.br", city: "Manaus", uf: "AM", role: "Pastor / Líder de Igreja", item: "Liderança Servidora e Protagonismo Jovem", type: "Curso EAD", date: "18/10/2026", status: "in-progress" },
    { name: "Cláudia Regina Costa", email: "claudia.costa@espacocrianca.org.br", city: "Curitiba", uf: "PR", role: "Educadora Social", item: "Guia de Acolhimento e Apoio Emocional", type: "Metodologia PDF", date: "18/10/2026", status: "downloaded" },
    { name: "Juliana Rocha Paiva", email: "juliana.paiva@igrejadaluz.org.br", city: "Campinas", uf: "SP", role: "Líder de Ministério Infantil", item: "Discipulado e Educação Bíblica Criativa", type: "Curso EAD", date: "17/10/2026", status: "completed" }
  ];

  // ── 3. ESTADO DA SESSÃO ──
  const APP_STATE = {
    role: "student", // 'visitor' | 'student' | 'admin'
    activeTab: "catalogo", // 'catalogo' | 'aluno' | 'dashboard'
    user: {
      name: "Pr. Carlos Eduardo Silva",
      email: "carlos.silva@igrejaesperanca.org.br",
      state: "SP",
      city: "São Paulo",
      profession: "Pastor / Líder de Igreja",
      avatarInitials: "CS",
      completedCourses: 1,
      inProgressCourses: 1,
      downloadedMaterials: 3
    },
    activeFilter: "all",
    searchQuery: ""
  };

  // ── 4. ELEMENTOS DO DOM ──
  let dom = {};

  function cacheDom() {
    dom = {
      roleBtns: document.querySelectorAll(".demo-role-btn"),
      portalNavTabs: document.querySelectorAll(".portal-nav-tab"),
      tabContents: {
        catalogo: document.getElementById("tabContentCatalogo"),
        aluno: document.getElementById("tabContentAluno"),
        dashboard: document.getElementById("tabContentDashboard")
      },
      catalogContainer: document.getElementById("dynamicCoursesGrid"),
      searchInput: document.getElementById("catalogSearchInput"),
      filterChips: document.querySelectorAll(".filter-chip"),
      btnOpenAuth: document.getElementById("btnOpenAuthModal"),
      authWidget: document.getElementById("headerAuthWidget"),
      authUserPill: document.getElementById("headerUserPill"),
      authUserName: document.getElementById("headerUserName"),
      authUserRole: document.getElementById("headerUserRole"),
      authAvatar: document.getElementById("headerAvatar"),
      
      // Modais
      authModalBackdrop: document.getElementById("authModalBackdrop"),
      authModalClose: document.getElementById("authModalClose"),
      authForm: document.getElementById("registerForm"),
      authSuccessState: document.getElementById("registerSuccessState"),
      btnSimulateEmailConfirm: document.getElementById("btnSimulateEmailConfirm"),
      
      certModalBackdrop: document.getElementById("certModalBackdrop"),
      certModalClose: document.getElementById("certModalClose"),
      certRecipientName: document.getElementById("certRecipientName"),
      certCourseTitle: document.getElementById("certCourseTitle"),
      certIssueDate: document.getElementById("certIssueDate"),
      certAuthCode: document.getElementById("certAuthCode"),
      btnPrintCert: document.getElementById("btnPrintCert"),
      
      // Toast
      toastEl: document.getElementById("portalToast"),
      toastMessage: document.getElementById("portalToastMessage"),
      
      // Dashboard Elements
      btnExportCsv: document.getElementById("btnExportCsv"),
      dashSearchInput: document.getElementById("dashSearchInput"),
      dashRoleFilter: document.getElementById("dashRoleFilter"),
      dashReportTbody: document.getElementById("dashReportTbody")
    };
  }

  // ── 5. RENDERIZAÇÃO DO CATÁLOGO ──
  function renderCatalog() {
    if (!dom.catalogContainer) return;

    const filtered = CATALOG_ITEMS.filter((item) => {
      const matchFilter =
        APP_STATE.activeFilter === "all" ||
        (APP_STATE.activeFilter === "courses" && item.type === "course") ||
        (APP_STATE.activeFilter === "methodologies" && (item.type === "methodology" || item.type === "toolkit")) ||
        (APP_STATE.activeFilter === "tools" && item.type === "tool");

      const query = APP_STATE.searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.format.toLowerCase().includes(query);

      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      dom.catalogContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: 14px; border: 1px dashed rgba(0,0,0,0.15)">
          <div style="font-size: 2rem; margin-bottom: 8px">🔍</div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--dark); margin-bottom: 6px">Nenhum conteúdo encontrado</h4>
          <p style="font-size: 0.88rem; color: var(--g600)">Tente ajustar o termo da busca ou selecione outro filtro acima.</p>
        </div>
      `;
      return;
    }

    dom.catalogContainer.innerHTML = filtered
      .map((item) => {
        const isCourse = item.type === "course";
        const actionBtnLabel = isCourse ? "Inscrever-se no Curso" : "Baixar Material Gratuito";
        const actionBtnClass = isCourse ? "btn-primary" : "btn-secondary";
        const actionIcon = isCourse
          ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
          : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

        return `
          <article class="course-card" style="box-shadow: 0 4px 18px rgba(0,0,0,0.04); display: flex; flex-direction: column;">
            <div class="course-thumb-ph" style="position: relative;">
              <span class="course-thumb-badge" style="border-left: 3px solid ${item.imageColor}">
                ${item.categoryLabel}
              </span>
              <div class="course-thumb-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${
                    isCourse
                      ? `<polygon points="5 3 19 12 5 21 5 3" />`
                      : `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`
                  }
                </svg>
              </div>
              <span class="course-thumb-meta">${item.format}</span>
            </div>

            <div class="course-card-content" style="flex: 1; display: flex; flex-direction: column;">
              <div>
                <span class="content-type-badge ${item.badgeClass}">${item.badgeText}</span>
              </div>
              <h3 class="course-card-title" style="margin-top: 4px;">${item.title}</h3>
              <p class="course-card-desc" style="flex: 1;">
                ${item.desc}
              </p>

              <div class="course-card-footer" style="margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <span style="font-size: 0.76rem; font-weight: 700; color: var(--g600); display: flex; align-items: center; gap: 4px;">
                  <span style="color: var(--blue);">●</span> ${item.downloadsOrEnrolled.toLocaleString("pt-BR")} ${isCourse ? "inscritos" : "downloads"}
                </span>

                <button type="button" class="btn ${actionBtnClass} btn-action-card" data-id="${item.id}" data-type="${item.type}" data-title="${item.title}" style="padding: 7px 14px; font-size: 0.78rem; gap: 6px;">
                  ${actionIcon}
                  ${actionBtnLabel}
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Conectar eventos dos botões dos cards
    dom.catalogContainer.querySelectorAll(".btn-action-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const type = btn.getAttribute("data-type");
        const title = btn.getAttribute("data-title");
        handleContentAction(id, type, title);
      });
    });
  }

  // ── 6. MANIPULAÇÃO DE AÇÕES (Inscrição / Download) ──
  function handleContentAction(id, type, title) {
    if (APP_STATE.role === "visitor") {
      openAuthModal(title);
      return;
    }

    if (type === "course") {
      showToast(`Inscrição confirmada no curso "${title}"! Redirecionando para a sala Moodle...`);
      // Atualiza contador mockado
      const item = CATALOG_ITEMS.find((c) => c.id === id);
      if (item) item.downloadsOrEnrolled++;
      renderCatalog();
    } else {
      showToast(`Download iniciado: "${title}". Arquivo disponibilizado!`);
      // Simula download de arquivo de teste para validação
      simulateFileDownload(title);
      const item = CATALOG_ITEMS.find((c) => c.id === id);
      if (item) item.downloadsOrEnrolled++;
      renderCatalog();
    }
  }

  function simulateFileDownload(fileName) {
    const cleanName = fileName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const content = `Compassion Brasil — Material de Apoio Pedagógico\r\nDocumento: ${fileName}\r\nDisponibilizado para uso educacional e ministerial.\r\nData de download: ${new Date().toLocaleDateString("pt-BR")}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Compassion_${cleanName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── 7. RENDERIZAÇÃO DA TABELA DO DASHBOARD ──
  function renderDashboardTable() {
    if (!dom.dashReportTbody) return;

    const query = dom.dashSearchInput ? dom.dashSearchInput.value.toLowerCase().trim() : "";
    const roleFilter = dom.dashRoleFilter ? dom.dashRoleFilter.value : "all";

    const filtered = REPORT_DATA.filter((row) => {
      const matchRole = roleFilter === "all" || row.role === roleFilter;
      const matchSearch =
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.city.toLowerCase().includes(query) ||
        row.uf.toLowerCase().includes(query) ||
        row.item.toLowerCase().includes(query);
      return matchRole && matchSearch;
    });

    dom.dashReportTbody.innerHTML = filtered
      .map((row) => {
        let statusBadge = "";
        if (row.status === "completed") {
          statusBadge = `<span class="status-badge completed">✓ Certificado Concluído</span>`;
        } else if (row.status === "in-progress") {
          statusBadge = `<span class="status-badge in-progress">⏳ Cursando no Moodle</span>`;
        } else {
          statusBadge = `<span class="status-badge downloaded">⬇ Download Realizado</span>`;
        }

        const initials = row.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("");

        return `
          <tr>
            <td>
              <div class="table-user-cell">
                <div class="table-user-avatar">${initials}</div>
                <div>
                  <div style="font-weight: 700; color: var(--dark);">${row.name}</div>
                  <div style="font-size: 0.72rem; color: var(--g600);">${row.email}</div>
                </div>
              </div>
            </td>
            <td>
              <div style="font-weight: 600;">${row.city}/${row.uf}</div>
            </td>
            <td>
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--g700);">${row.role}</span>
            </td>
            <td>
              <div style="font-weight: 700; color: var(--dark);">${row.item}</div>
              <span style="font-size: 0.72rem; color: var(--blue); font-weight: 700;">${row.type}</span>
            </td>
            <td>
              <span style="font-size: 0.78rem; color: var(--g600);">${row.date}</span>
            </td>
            <td>${statusBadge}</td>
          </tr>
        `;
      })
      .join("");
  }

  // ── 8. EXPORTAÇÃO REAL DE CSV ──
  function exportCsvReport() {
    let csv = "Nome,E-mail,Cidade,Estado,Profissão,Conteúdo,Tipo,Data,Status\r\n";
    REPORT_DATA.forEach((r) => {
      const statusLabel = r.status === "completed" ? "Concluido" : r.status === "in-progress" ? "Em Andamento" : "Download Realizado";
      csv += `"${r.name}","${r.email}","${r.city}","${r.uf}","${r.role}","${r.item}","${r.type}","${r.date}","${statusLabel}"\r\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio_capacitacoes_compassion_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("Relatório CSV gerado e baixado com sucesso!");
  }

  // ── 9. MODAIS E CERTIFICADO ──
  function openAuthModal(courseTitle) {
    if (dom.authModalBackdrop) {
      if (dom.authForm) dom.authForm.style.display = "block";
      if (dom.authSuccessState) dom.authSuccessState.style.display = "none";
      dom.authModalBackdrop.classList.add("open");
    }
  }

  function closeAuthModal() {
    if (dom.authModalBackdrop) {
      dom.authModalBackdrop.classList.remove("open");
    }
  }

  function openCertificateModal(studentName, courseName, date) {
    if (dom.certModalBackdrop) {
      if (dom.certRecipientName) dom.certRecipientName.textContent = studentName || APP_STATE.user.name;
      if (dom.certCourseTitle) dom.certCourseTitle.textContent = courseName || "Acolhimento e Vínculo Materno-Infantil";
      if (dom.certIssueDate) dom.certIssueDate.textContent = date || new Date().toLocaleDateString("pt-BR");
      if (dom.certAuthCode) dom.certAuthCode.textContent = "CPB-BR-" + Math.floor(100000 + Math.random() * 900000);
      dom.certModalBackdrop.classList.add("open");
    }
  }

  function closeCertificateModal() {
    if (dom.certModalBackdrop) {
      dom.certModalBackdrop.classList.remove("open");
    }
  }

  // ── 10. TOAST DE FEEDBACK ──
  let toastTimer = null;
  function showToast(message) {
    if (!dom.toastEl || !dom.toastMessage) return;
    dom.toastMessage.textContent = message;
    dom.toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastEl.classList.remove("show");
    }, 4000);
  }

  // ── 11. TROCA DE PERFIL / PAPEL (SIMULAÇÃO) ──
  function setRole(newRole) {
    APP_STATE.role = newRole;

    dom.roleBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-role") === newRole);
    });

    if (newRole === "visitor") {
      if (dom.btnOpenAuth) dom.btnOpenAuth.style.display = "inline-flex";
      if (dom.authWidget) dom.authWidget.style.display = "none";
      setTab("catalogo");
    } else if (newRole === "student") {
      if (dom.btnOpenAuth) dom.btnOpenAuth.style.display = "none";
      if (dom.authWidget) dom.authWidget.style.display = "flex";
      if (dom.authUserName) dom.authUserName.textContent = APP_STATE.user.name;
      if (dom.authUserRole) dom.authUserRole.textContent = `${APP_STATE.user.profession} · ${APP_STATE.user.city}/${APP_STATE.user.state}`;
      if (dom.authAvatar) dom.authAvatar.textContent = APP_STATE.user.avatarInitials;
      setTab("aluno");
    } else if (newRole === "admin") {
      if (dom.btnOpenAuth) dom.btnOpenAuth.style.display = "none";
      if (dom.authWidget) dom.authWidget.style.display = "flex";
      if (dom.authUserName) dom.authUserName.textContent = "Alexandre (Gestão Compassion)";
      if (dom.authUserRole) dom.authUserRole.textContent = "Administrador Geral · Moodle Integrado";
      if (dom.authAvatar) dom.authAvatar.textContent = "AL";
      setTab("dashboard");
    }

    renderCatalog();
    renderDashboardTable();
  }

  // ── 12. CONTROLE DE ABAS DO PORTAL ──
  function setTab(tabId) {
    APP_STATE.activeTab = tabId;

    dom.portalNavTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.getAttribute("data-tab") === tabId);
    });

    Object.keys(dom.tabContents).forEach((key) => {
      const content = dom.tabContents[key];
      if (content) {
        if (key === tabId) {
          content.style.display = "block";
          content.classList.add("active");
        } else {
          content.style.display = "none";
          content.classList.remove("active");
        }
      }
    });

    window.scrollTo({ top: 350, behavior: "smooth" });
  }

  // ── 13. INICIALIZAÇÃO E EVENT LISTENERS ──
  function init() {
    cacheDom();

    // Seletor de Role (Demonstração da Reunião)
    dom.roleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setRole(btn.getAttribute("data-role"));
      });
    });

    // Abas de navegação
    dom.portalNavTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setTab(tab.getAttribute("data-tab"));
      });
    });

    // Filtros de conteúdo (Cursos vs Metodologias)
    dom.filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        dom.filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        APP_STATE.activeFilter = chip.getAttribute("data-filter");
        renderCatalog();
      });
    });

    // Busca do catálogo
    if (dom.searchInput) {
      dom.searchInput.addEventListener("input", (e) => {
        APP_STATE.searchQuery = e.target.value;
        renderCatalog();
      });
    }

    // Modal de Cadastro
    if (dom.btnOpenAuth) {
      dom.btnOpenAuth.addEventListener("click", () => openAuthModal());
    }
    if (dom.authModalClose) {
      dom.authModalClose.addEventListener("click", closeAuthModal);
    }
    if (dom.authModalBackdrop) {
      dom.authModalBackdrop.addEventListener("click", (e) => {
        if (e.target === dom.authModalBackdrop) closeAuthModal();
      });
    }

    // Submissão do Formulário de Cadastro (Double Opt-in)
    if (dom.authForm) {
      dom.authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("regNome").value;
        const email = document.getElementById("regEmail").value;
        const estado = document.getElementById("regEstado").value;
        const cidade = document.getElementById("regCidade").value;
        const profissao = document.getElementById("regProfissao").value;

        // Atualiza estado temporário
        APP_STATE.user.name = nome;
        APP_STATE.user.email = email;
        APP_STATE.user.state = estado;
        APP_STATE.user.city = cidade;
        APP_STATE.user.profession = profissao;
        APP_STATE.user.avatarInitials = nome
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("");

        const emailNotice = document.getElementById("sentEmailNotice");
        if (emailNotice) emailNotice.textContent = email;

        // Mostra estado de verificação de e-mail
        dom.authForm.style.display = "none";
        dom.authSuccessState.style.display = "block";
      });
    }

    // Simulação do clique no link do e-mail
    if (dom.btnSimulateEmailConfirm) {
      dom.btnSimulateEmailConfirm.addEventListener("click", () => {
        closeAuthModal();
        setRole("student");
        showToast("E-mail confirmado com sucesso! Usuário ativado e provisionado no Moodle.");
      });
    }

    // Modal de Certificado
    if (dom.certModalClose) {
      dom.certModalClose.addEventListener("click", closeCertificateModal);
    }
    if (dom.certModalBackdrop) {
      dom.certModalBackdrop.addEventListener("click", (e) => {
        if (e.target === dom.certModalBackdrop) closeCertificateModal();
      });
    }
    if (dom.btnPrintCert) {
      dom.btnPrintCert.addEventListener("click", () => {
        window.print();
      });
    }

    // Abertura de certificado nos botões da Área do Aluno
    document.querySelectorAll(".btn-view-certificate").forEach((btn) => {
      btn.addEventListener("click", () => {
        const course = btn.getAttribute("data-cert-course");
        openCertificateModal(APP_STATE.user.name, course, "19/10/2026");
      });
    });

    // Dashboard CSV Export
    if (dom.btnExportCsv) {
      dom.btnExportCsv.addEventListener("click", exportCsvReport);
    }

    // Dashboard Filtros
    if (dom.dashSearchInput) {
      dom.dashSearchInput.addEventListener("input", renderDashboardTable);
    }
    if (dom.dashRoleFilter) {
      dom.dashRoleFilter.addEventListener("change", renderDashboardTable);
    }

    // Render inicial
    renderCatalog();
    renderDashboardTable();
    setRole("student"); // Inicia no modo Aluno para apresentação imediata
  }

  // Executa quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
