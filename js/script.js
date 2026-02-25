const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 40)
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    navlist.classList.toggle('open');
    if(window.scrollY < 90){
        header.classList.toggle ("sticky");
    }
    
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

const topo = document.getElementById("top");

window.addEventListener("scroll", function() {
    topo.classList.toggle ("show-top", window.scrollY > 140)
    topo.classList.toggle ("hide-top", window.scrollY < 140);
});

window.onload = () => {
    topo.classList.toggle ("hide-top");
}

const langBtn = document.getElementById("lang-btn");

const translations = {
  pt: {
    navAbout: "Sobre mim",
    navExp: "Experiências",
    navProjects: "Projetos",
    navSkills: "Skills",

    homeTitle: "Olá",
    homePresentation: "Me chamo",
    homeProfession: "Analista de <span>Quality Assurance</span>",
    homeContact: "Contato",
    homeWork: "Veja meu trabalho",

    aboutTitle: "Sobre <span>Mim</span>",
    aboutSubtitle: "Profissional proativo, focado em qualidade e melhoria contínua",
    aboutCollege:
      "&bull; Graduando em Análise e Desenvolvimento de Sistemas na <a href='https://unifil.br/' class='link'>UNIFIL.</a>",
    aboutExp:
      "&bull; Experiência em desenvolvimento Full Stack, suporte técnico e atuação com testes manuais e automatizados, garantindo qualidade e confiabilidade das aplicações.",
    aboutStudy:
        "&bull; Aprofundando conhecimentos em Quality Assurance, automação de testes E2E e validação de APIs.",

    expTitle: "<span>Experiência</span> profissional",

    qaTitle: "Como eu <span>trabalho</span>",
    qaReq: "Análise de Requisitos",
    qaReqText:
      "Analiso histórias e critérios de aceitação para identificar riscos e falhas antes do desenvolvimento.",

    qaScenarios: "Criação de Cenários",
    qaScenariosText:
      "Escrevo casos de teste, cenários BDD e executo testes exploratórios e regressivos.",

    qaBugs: "Reporte de Bugs",
    qaBugsText:
      "Registro defeitos com evidências claras, severidade definida e impacto no negócio.",

    qaAutomation: "Automação",
    qaAutomationText:
      "Desenvolvimento de testes E2E e API com Cypress integrados ao CI.",

    qaRegression: "Testes Regressivos",
    qaRegressionText:
      "Execução manual e automatizada garantindo estabilidade da aplicação.",

    qaApi: "Testes de API",
    qaApiText:
      "Validação de endpoints com Postman e automação de fluxos.",

    skillsSmall: "Meus conhecimentos",

    exp1Period: "2025 - <span>Atualmente</span>",
    exp1Role: "Quality Assurance Analyst - <span><b>Carga Online</b></span>",
    exp1Desc:
        "Atuo garantindo a qualidade de aplicações web através da criação e execução de testes manuais e automatizados. Realizo análise de requisitos, definição de cenários de teste, testes regressivos e validação de integrações entre serviços. Sou responsável por estruturar automações E2E e testes de API, além de colaborar ativamente com o time de desenvolvimento na identificação e prevenção de defeitos.",       

    exp2Period: "2024 - <span>2025</span>",
    exp2Role: "Frontend Developer - <span><b>IPSolution</b></span>",
    exp2Desc:
        "Responsável pela manutenção da interface legada e implementação da nova interface do sistema. Participei da evolução da experiência do usuário e integração com APIs REST.  ",

    exp3Period: "2023 - <span>2024</span>",
    exp3Role: "Technical Support - <span><b>IPSolution</b></span>",
    exp3Desc:
        "Atuei no suporte técnico ao cliente, análise de incidentes e verificação de integrações via API. Realizei monitoramento de serviços e auxílio na manutenção de ambientes em produção.",
  },

  en: {
    navAbout: "About me",
    navExp: "Experience",
    navProjects: "Projects",
    navSkills: "Skills",

    homeTitle: "Hello",
    homePresentation: "My name is",
    homeProfession: "Quality Assurance <span>Analyst</span>",
    homeContact: "Contact",
    homeWork: "See my work",

    aboutTitle: "About <span>Me</span>",
    aboutSubtitle: "Proactive professional focused on quality and continuous improvement",
    aboutCollege:
      "&bull; Studying Systems Analysis and Development at <a href='https://unifil.br/' class='link'>UNIFIL.</a>",
    aboutExp:
      "&bull; Experience in Full Stack development, technical support, and both manual and automated testing, ensuring application quality and reliability.",
    aboutStudy:
      "&bull; Experience in Full Stack development, technical support, and both manual and automated testing, ensuring application quality and reliability.",

    expTitle: "<span>Professional</span> Experience",

    qaTitle: "How I <span>Work</span>",
    qaReq: "Requirement Analysis",
    qaReqText:
      "I analyze user stories and acceptance criteria to identify risks and issues before development.",

    qaScenarios: "Test Scenario Creation",
    qaScenariosText:
      "I write test cases, BDD scenarios and execute exploratory and regression tests.",

    qaBugs: "Bug Reporting",
    qaBugsText:
      "I document defects with clear evidence, severity and business impact.",

    qaAutomation: "Automation",
    qaAutomationText:
      "Development of E2E and API tests using Cypress integrated with CI.",

    qaRegression: "Regression Testing",
    qaRegressionText:
      "Manual and automated execution ensuring application stability.",

    qaApi: "API Testing",
    qaApiText:
      "Endpoint validation using Postman and automation flows.",

    skillsSmall: "My knowledge",

    exp1Period: "2025 - <span>Present</span>",
    exp1Role: "Quality Assurance Analyst - <span><b>Carga Online</b></span>",
    exp1Desc:
        "I ensure the quality of web applications through manual and automated testing. I perform requirement analysis, test scenario definition, regression testing, and service integration validation. I structured E2E and API automation, reducing production bugs and improving system reliability. I actively collaborate with the development team to prevent defects and enhance processes.",

    exp2Period: "2024 - <span>2025</span>",
    exp2Role: "Frontend Developer - <span><b>IPSolution</b></span>",
    exp2Desc:
        "Responsible for maintaining the legacy interface and implementing the new system interface. Contributed to user experience improvements and REST API integrations. The system currently serves over 300 companies across Brazil.",

    exp3Period: "2023 - <span>2024</span>",
    exp3Role: "Technical Support - <span><b>IPSolution</b></span>",
    exp3Desc:
        "Provided technical support to clients, incident analysis, and API integration validation. Assisted in service monitoring and production environment maintenance.",
  }
};

function changeLanguage(lang) {
  document.getElementById("nav-about").innerText = translations[lang].navAbout;
  document.getElementById("nav-exp").innerText = translations[lang].navExp;
  document.getElementById("nav-projects").innerText = translations[lang].navProjects;
  document.getElementById("nav-skills").innerText = translations[lang].navSkills;

  document.getElementById("home-title").innerText = translations[lang].homeTitle;
  document.getElementById("home-presentation").innerText = translations[lang].homePresentation;
  document.getElementById("home-profession").innerHTML = translations[lang].homeProfession;
  document.getElementById("home-contact").innerText = translations[lang].homeContact;
  document.getElementById("home-work").innerText = translations[lang].homeWork;

  document.getElementById("aboutTitle").innerHTML = translations[lang].aboutTitle;
  document.getElementById("aboutSubtitle").innerText = translations[lang].aboutSubtitle;
  document.getElementById("aboutCollege").innerHTML = translations[lang].aboutCollege;
  document.getElementById("aboutExperience").innerHTML = translations[lang].aboutExp;
  document.getElementById("aboutStudy").innerHTML  = translations[lang].aboutStudy;

  document.getElementById("exp-title").innerHTML = translations[lang].expTitle;

  document.getElementById("qa-title").innerHTML = translations[lang].qaTitle;
  document.getElementById("qa-req").innerText = translations[lang].qaReq;
  document.getElementById("qa-req-text").innerText = translations[lang].qaReqText;
  document.getElementById("qa-scenarios").innerText = translations[lang].qaScenarios;
  document.getElementById("qa-scenarios-text").innerText = translations[lang].qaScenariosText;
  document.getElementById("qa-bugs").innerText = translations[lang].qaBugs;
  document.getElementById("qa-bugs-text").innerText = translations[lang].qaBugsText;
  document.getElementById("qa-automation").innerText = translations[lang].qaAutomation;
  document.getElementById("qa-automation-text").innerText = translations[lang].qaAutomationText;
  document.getElementById("qa-regression").innerText = translations[lang].qaRegression;
  document.getElementById("qa-regression-text").innerText = translations[lang].qaRegressionText;
  document.getElementById("qa-api").innerText = translations[lang].qaApi;
  document.getElementById("qa-api-text").innerText = translations[lang].qaApiText;

  document.getElementById("skills-small").innerText = translations[lang].skillsSmall;

  document.getElementById("exp1-period").innerHTML = translations[lang].exp1Period;
  document.getElementById("exp1-role").innerHTML = translations[lang].exp1Role;
  document.getElementById("exp1-desc").innerText = translations[lang].exp1Desc;

  document.getElementById("exp2-period").innerHTML = translations[lang].exp2Period;
  document.getElementById("exp2-role").innerHTML = translations[lang].exp2Role;
  document.getElementById("exp2-desc").innerText = translations[lang].exp2Desc;

  document.getElementById("exp3-period").innerHTML = translations[lang].exp3Period;
  document.getElementById("exp3-role").innerHTML = translations[lang].exp3Role;
  document.getElementById("exp3-desc").innerText = translations[lang].exp3Desc;
}

const toggle = document.getElementById("lang-toggle");

let currentLang = "pt";

toggle.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";

  changeLanguage(currentLang);

  toggle.classList.toggle("active");
});
