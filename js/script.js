
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
}


const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 40);
});


const menuIcon = document.getElementById('menu-icon');
const navlist  = document.querySelector('.navlist');

menuIcon.onclick = () => {
    navlist.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
    if (window.scrollY < 90) header.classList.toggle('sticky');
};

document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        navlist.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    });
});


const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 140) {
        topBtn.classList.add('show-top');
        topBtn.classList.remove('hide-top');
    } else {
        topBtn.classList.add('hide-top');
        topBtn.classList.remove('show-top');
    }
});


const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navlist a');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.navlist a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));


document.querySelectorAll('.exp-card, .qa-box, .skill-box, .about-item, .stat-card').forEach(el => {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Aqui ta mudando o curriculo pra PT e EN  =====

//   curriculo.pdf  → versão em português
//   resume.pdf     → versão em inglês
const CV_FILES = {
    pt: { file: 'curriculo.pdf', name: 'Guilherme_Henrique_QA_PT.pdf' },
    en: { file: 'resume.pdf',    name: 'Guilherme_Henrique_QA_EN.pdf' },
};

function updateCvLinks(lang) {
    const cv = CV_FILES[lang];
    document.querySelectorAll('.cv-link').forEach(el => {
        el.setAttribute('href', cv.file);
        el.setAttribute('download', cv.name);
    });
}

const translations = {
    pt: {
        navHome: '~/home', navAbout: '~/sobre', navExp: '~/exp', navProjects: '~/qa', navSkills: '~/skills',
        homeTitle: 'Olá', homePresentation: 'Me chamo',
        homeProfession: 'Analista de <span>Quality Assurance</span>',
        homeContact: '<i class="bx bxl-whatsapp"></i><span>Contato</span>',
        btnCv: '<i class="bx bx-download"></i><span>Baixar CV</span>',
        homeWork: '<i class="bx bx-play-circle"></i><span>Ver trabalho</span>',

        aboutTitle: 'Sobre <span>Mim</span>',
        aboutSubtitle: 'Profissional proativo, focado em qualidade e melhoria contínua',
        aboutCollege: '&bull; Graduando em Análise e Desenvolvimento de Sistemas na <a href="https://unifil.br/" class="link" target="_blank">UNIFIL.</a>',
        aboutExp: '&bull; Experiência em desenvolvimento Full Stack, suporte técnico e atuação com testes manuais e automatizados, garantindo qualidade e confiabilidade das aplicações.',
        aboutStudy: '&bull; Aprofundando conhecimentos em Quality Assurance, automação de testes E2E e validação de APIs.',

        expTitle: '<span>Experiência</span> profissional',
        exp1Period: '2025 - <span>Atualmente</span>',
        exp1Role: 'QA Analyst · <span>Carga Online</span>',
        exp1Desc: 'Atuo garantindo a qualidade de aplicações web e mobile através de testes manuais, automatizados E2E e de API. Realizo análise de requisitos, abertura de chamados no ClickUp, testes regressivos e validação de integrações. Responsável por estruturar automações com Cypress e colaborar com o time de desenvolvimento para prevenção de defeitos.',
        exp2Period: '2024 - <span>2025</span>',
        exp2Role: 'Frontend Developer · <span>IPSolution</span>',
        exp2Desc: 'Responsável pela manutenção da interface legada e implementação da nova interface do sistema. Participei da evolução da experiência do usuário e integração com APIs REST.',
        exp3Period: '2023 - <span>2024</span>',
        exp3Role: 'Suporte Técnico · <span>IPSolution</span>',
        exp3Desc: 'Atuei no suporte técnico ao cliente, análise de incidentes e verificação de integrações via API. Realizei monitoramento de serviços e auxílio na manutenção de ambientes em produção.',

        qaTitle: 'Como eu <span>trabalho</span>',
        qaReq: 'Análise de Requisitos', qaReqText: 'Analiso histórias e critérios de aceitação para identificar riscos e falhas antes do desenvolvimento.',
        qaScenarios: 'Criação de Cenários', qaScenariosText: 'Escrevo casos de teste, cenários BDD e executo testes exploratórios e regressivos.',
        qaBugs: 'Reporte de Bugs', qaBugsText: 'Registro defeitos com evidências claras, severidade definida e impacto no negócio.',
        qaAutomation: 'Automação', qaAutomationText: 'Desenvolvimento de testes E2E e API com Cypress integrados ao CI.',
        qaRegression: 'Testes Regressivos', qaRegressionText: 'Execução manual e automatizada garantindo estabilidade da aplicação.',
        qaApi: 'Testes de API', qaApiText: 'Validação de endpoints com Postman e automação de fluxos.',

        skillsSmall: 'Meus conhecimentos',
    },
    en: {
        navHome: '~/home', navAbout: '~/about', navExp: '~/exp', navProjects: '~/qa', navSkills: '~/skills',
        homeTitle: 'Hello', homePresentation: 'My name is',
        homeProfession: 'Quality Assurance <span>Analyst</span>',
        homeContact: '<i class="bx bxl-whatsapp"></i><span>Contact</span>',
        btnCv: '<i class="bx bx-download"></i><span>Download CV</span>',
        homeWork: '<i class="bx bx-play-circle"></i><span>See my work</span>',

        aboutTitle: 'About <span>Me</span>',
        aboutSubtitle: 'Proactive professional focused on quality and continuous improvement',
        aboutCollege: '&bull; Studying Systems Analysis and Development at <a href="https://unifil.br/" class="link" target="_blank">UNIFIL.</a>',
        aboutExp: '&bull; Experience in Full Stack development, technical support, and both manual and automated testing, ensuring application quality and reliability.',
        aboutStudy: '&bull; Deepening knowledge in Quality Assurance, E2E test automation, and API validation.',

        expTitle: '<span>Professional</span> Experience',
        exp1Period: '2025 - <span>Present</span>',
        exp1Role: 'QA Analyst · <span>Carga Online</span>',
        exp1Desc: 'I ensure web and mobile application quality through manual, automated E2E and API testing. I perform requirement analysis, create tickets on ClickUp, run regression tests and integration validation. I structured Cypress automation and collaborate with dev teams to prevent defects.',
        exp2Period: '2024 - <span>2025</span>',
        exp2Role: 'Frontend Developer · <span>IPSolution</span>',
        exp2Desc: 'Responsible for maintaining the legacy interface and implementing the new system interface. Contributed to user experience improvements and REST API integrations.',
        exp3Period: '2023 - <span>2024</span>',
        exp3Role: 'Technical Support · <span>IPSolution</span>',
        exp3Desc: 'Provided technical support to clients, incident analysis, and API integration validation. Assisted in service monitoring and production environment maintenance.',

        qaTitle: 'How I <span>Work</span>',
        qaReq: 'Requirement Analysis', qaReqText: 'I analyze user stories and acceptance criteria to identify risks and issues before development.',
        qaScenarios: 'Test Scenario Creation', qaScenariosText: 'I write test cases, BDD scenarios and execute exploratory and regression tests.',
        qaBugs: 'Bug Reporting', qaBugsText: 'I document defects with clear evidence, defined severity and business impact.',
        qaAutomation: 'Automation', qaAutomationText: 'Development of E2E and API tests using Cypress integrated with CI.',
        qaRegression: 'Regression Testing', qaRegressionText: 'Manual and automated execution ensuring application stability.',
        qaApi: 'API Testing', qaApiText: 'Endpoint validation using Postman and automation flows.',

        skillsSmall: 'My knowledge',
    }
};

function changeLanguage(lang) {
    const t = translations[lang];
    const set     = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText  = val; };

    setText('nav-home', t.navHome); setText('nav-about', t.navAbout);
    setText('nav-exp',  t.navExp);  setText('nav-projects', t.navProjects); setText('nav-skills', t.navSkills);

    setText('home-title', t.homeTitle);
    setText('home-presentation', t.homePresentation);
    set('home-profession', t.homeProfession);
    set('home-contact', t.homeContact);
    set('btn-cv', t.btnCv);
    set('home-work', t.homeWork);

    set('aboutTitle', t.aboutTitle);
    setText('aboutSubtitle', t.aboutSubtitle);
    set('aboutCollege', t.aboutCollege);
    set('aboutExperience', t.aboutExp);
    set('aboutStudy', t.aboutStudy);

    set('exp-title', t.expTitle);
    set('exp1-period', t.exp1Period); set('exp1-role', t.exp1Role); setText('exp1-desc', t.exp1Desc);
    set('exp2-period', t.exp2Period); set('exp2-role', t.exp2Role); setText('exp2-desc', t.exp2Desc);
    set('exp3-period', t.exp3Period); set('exp3-role', t.exp3Role); setText('exp3-desc', t.exp3Desc);

    set('qa-title', t.qaTitle);
    setText('qa-req',        t.qaReq);        setText('qa-req-text',        t.qaReqText);
    setText('qa-scenarios',  t.qaScenarios);  setText('qa-scenarios-text',  t.qaScenariosText);
    setText('qa-bugs',       t.qaBugs);       setText('qa-bugs-text',       t.qaBugsText);
    setText('qa-automation', t.qaAutomation); setText('qa-automation-text', t.qaAutomationText);
    setText('qa-regression', t.qaRegression); setText('qa-regression-text', t.qaRegressionText);
    setText('qa-api',        t.qaApi);        setText('qa-api-text',        t.qaApiText);

    setText('skills-small', t.skillsSmall);

    
    document.querySelectorAll(`[data-${lang}]`).forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });

    
    updateCvLinks(lang);
}


const langToggle = document.getElementById('lang-toggle');
let currentLang  = 'pt';


updateCvLinks('pt');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langToggle.classList.toggle('active');
    changeLanguage(currentLang);
});