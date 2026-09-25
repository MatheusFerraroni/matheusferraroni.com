const text = (ptBr, en) => Object.freeze({ "pt-BR": ptBr, en });

export const SITE_URL = "https://matheusferraroni.com";

export const siteContent = Object.freeze({
  person: {
    id: "matheus-ferraroni-sanches",
    name: "Matheus Ferraroni Sanches",
    title: text(
      "Matheus Ferraroni Sanches | CTO, P&D e Inteligência Artificial",
      "Matheus Ferraroni Sanches | CTO, R&D and Artificial Intelligence",
    ),
    headline: text(
      "CTO | Liderança em Tecnologia e P&D | Inteligência Artificial",
      "CTO | Technology and R&D Leadership | Artificial Intelligence",
    ),
    description: text(
      "Matheus Ferraroni Sanches é CTO e diretor de P&D do Grupo Orion, com atuação em estratégia tecnológica, novos produtos, IA corporativa, cloud e agritech.",
      "Matheus Ferraroni Sanches is a CTO and R&D Director at Grupo Orion, working in technology strategy, new products, enterprise AI, cloud and agritech.",
    ),
    summary: text(
      "CTO e diretor de P&D do Grupo Orion, responsável pela estratégia tecnológica, portfólio de inovação, transformação digital e adoção corporativa de IA. Forma equipes multidisciplinares e lidera o desenvolvimento de produtos que integram software, hardware e engenharia, com profundidade técnica em cloud, sistemas distribuídos e modelos de linguagem. É professor na Unimar, mestre e doutorando em Ciência da Computação pela Unicamp.",
      "CTO and R&D Director at Grupo Orion, responsible for technology strategy, the innovation portfolio, digital transformation and enterprise AI adoption. Builds multidisciplinary teams and leads product development spanning software, hardware and engineering, with technical depth in cloud, distributed systems and language models. A professor at Unimar, he holds a master's degree and is pursuing a PhD in Computer Science at Unicamp.",
    ),
    socialCardAlt: text(
      "Matheus Ferraroni Sanches — CTO, diretor de P&D e Inteligência Artificial",
      "Matheus Ferraroni Sanches — CTO, R&D Director and Artificial Intelligence",
    ),
    jobTitles: text(
      ["Diretor de Tecnologia (CTO)", "Diretor de P&D", "Professor", "Pesquisador em Ciência da Computação"],
      ["Chief Technology Officer (CTO)", "R&D Director", "Professor", "Computer Science Researcher"],
    ),
    knowsAbout: text(
      [
        "Estratégia tecnológica",
        "Gestão de portfólio de P&D",
        "Adoção corporativa de IA",
        "Desenvolvimento de produtos",
        "Arquitetura em nuvem e sistemas distribuídos",
        "Inteligência artificial",
        "Agtech",
        "Processamento de linguagem natural",
        "Privacidade em modelos de linguagem de grande escala",
        "Aprendizado federado",
        "Sensoriamento remoto",
        "Otimização",
        "Redes veiculares",
      ],
      [
        "Technology strategy",
        "R&D portfolio management",
        "Enterprise AI adoption",
        "Product development",
        "Cloud architecture and distributed systems",
        "Artificial intelligence",
        "Agtech",
        "Natural language processing",
        "Large language model privacy",
        "Federated learning",
        "Remote sensing",
        "Optimization",
        "Vehicular networks",
      ],
    ),
  },

  ui: {
    languageNavigation: text("Seleção de idioma", "Language selection"),
    portuguese: "Português",
    english: "English",
    flowField: text("Campo vetorial", "Flow field"),
    quickAccess: text("Acesso rápido", "Quick access"),
    tools: text("Ferramentas", "Tools"),
    contact: text("Contato", "Contact"),
    close: text("Fechar", "Close"),
    email: text("E-mail", "Email"),
    contactEmailAlt: text("E-mail de contato", "Contact email address"),
    repository: text("Repositório", "Repository"),
    technologies: text("Tecnologias", "Technologies"),
    problem: text("Problema", "Problem"),
    contribution: text("Contribuição", "Contribution"),
    status: text("Estado atual", "Current status"),
    work: text("Trabalho", "Work"),
    advisor: text("Orientador", "Advisor"),
    academicWork: text("Trabalho acadêmico", "Academic work"),
    defense: text("Defesa", "Defense"),
    examinationCommittee: text("Banca examinadora", "Examination committee"),
    grade: text("Nota", "Grade"),
  },

  privacy: {
    bannerTitle: text("Ajude a melhorar este site", "Help improve this site"),
    bannerText: text(
      "Com sua permissão, uso o Google Analytics para entender quais conteúdos são mais úteis. Não uso anúncios, Google Signals, nomes, e-mails ou texto livre. Você pode mudar essa escolha a qualquer momento.",
      "With your permission, I use Google Analytics to understand which content is most useful. I do not use ads, Google Signals, names, email addresses, or free-form text. You can change this choice at any time.",
    ),
    accept: text("Aceitar", "Accept"),
    reject: text("Recusar", "Decline"),
    bannerPrivacy: text("Privacidade", "Privacy"),
    privacy: text("Privacidade", "Privacy"),
    modalEyebrow: text("Dados e preferências", "Data and preferences"),
    modalTitle: text("Privacidade e Analytics", "Privacy and Analytics"),
    introduction: text(
      "Com sua permissão, usamos o Google Analytics 4 para medir visitas e melhorar este site.",
      "With your permission, we use Google Analytics 4 to measure visits and improve this site.",
    ),
    collectedData: text(
      "O Google pode receber páginas visitadas, dados de sessão, localização aproximada, informações do navegador e dispositivo e eventos de interação com o site.",
      "Google may receive visited pages, session data, approximate location, browser and device information, and site interaction events.",
    ),
    retention: text(
      "Após o aceite, o Analytics pode gravar cookies _ga por até dois anos. Os dados detalhados de usuários e eventos ficam retidos por 14 meses.",
      "After acceptance, Analytics may store _ga cookies for up to two years. Detailed user and event data is retained for 14 months.",
    ),
    safeguards: text(
      "Não usamos Google Ads, Google Signals, User-ID ou personalização publicitária, nem enviamos nome, e-mail, texto livre ou conteúdo de contato.",
      "We do not use Google Ads, Google Signals, User-ID, or advertising personalization, and we do not send names, email addresses, free-form text, or contact content.",
    ),
    controller: text(
      "Controlador: Matheus Ferraroni Sanches. Para exercer seus direitos, use o contato deste site.",
      "Controller: Matheus Ferraroni Sanches. To exercise your rights, use this site's contact option.",
    ),
    choiceStorage: text(
      "Seu aceite é guardado neste navegador e pode ser revogado a qualquer momento. Se você recusar, o aviso será ocultado somente nesta página.",
      "Your acceptance is stored in this browser and can be revoked at any time. If you decline, the notice is hidden only on this page.",
    ),
    googleInformation: text(
      "Como o Google usa essas informações",
      "How Google uses this information",
    ),
    contact: text("Abrir contato", "Open contact"),
    currentStatus: text("Estado atual:", "Current status:"),
    statusUndecided: text("não definido", "not set"),
    statusGranted: text("Analytics permitido", "Analytics allowed"),
    statusDenied: text("Analytics não permitido", "Analytics not allowed"),
    allowAnalytics: text("Permitir Analytics", "Allow Analytics"),
    denyAnalytics: text("Não permitir Analytics", "Do not allow Analytics"),
  },

  sectionTitles: {
    experience: text("Histórico profissional", "Professional experience"),
    education: text("Histórico acadêmico", "Education"),
    skills: text("Competências e idiomas", "Skills and languages"),
    publications: text("Publicações selecionadas", "Selected publications"),
    projects: text("Projetos", "Projects"),
    awards: text("Prêmios e reconhecimentos", "Awards and recognition"),
    previousExperience: text(
      "Experiências anteriores selecionadas",
      "Selected previous experience",
    ),
  },

  topics: [
    { id: "technology-leadership", label: text("Liderança em tecnologia", "Technology Leadership") },
    { id: "research-and-development", label: text("Pesquisa e Desenvolvimento (P&D)", "Research and Development (R&D)") },
    { id: "enterprise-ai", label: text("IA corporativa", "Enterprise AI") },
    { id: "product-development", label: text("Desenvolvimento de produtos", "Product Development") },
    { id: "cloud-architecture", label: text("Cloud e sistemas distribuídos", "Cloud and Distributed Systems") },
    { id: "agtech", label: text("Agritech", "Agritech") },
    { id: "natural-language-processing", label: text("Processamento de Linguagem Natural", "Natural Language Processing") },
    { id: "llm-privacy", label: text("Privacidade e segurança em LLMs", "LLM Privacy and Security") },
    { id: "federated-learning", label: text("Aprendizado Federado", "Federated Learning") },
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/matheusferraroni/",
    lattes: "http://lattes.cnpq.br/7066133969704063",
    scholar: "https://scholar.google.com/citations?hl=pt-BR&user=ZCrxyHUAAAAJ",
    github: "https://github.com/MatheusFerraroni",
    visualAlgorithms: "https://matheusferraroni.github.io/visual_algo/",
    fieldMap: "https://www.mapadasparcelas.com.br/",
    dblp: "https://dblp.org/pid/165/3906.html",
    fapesp: "https://bv.fapesp.br/pt/pesquisador/702639/matheus-ferraroni-sanches/",
  },

  quickLinks: [
    { id: "lattes", label: text("Lattes", "Lattes"), linkKey: "lattes" },
    { id: "google-scholar", label: text("Google Scholar", "Google Scholar"), linkKey: "scholar" },
    { id: "github", label: text("GitHub", "GitHub"), linkKey: "github" },
  ],

  tools: [
    { id: "visual-algorithms", label: "Algoritmos Visuais", linkKey: "visualAlgorithms" },
    { id: "field-map", label: "Mapa das Parcelas", linkKey: "fieldMap" },
  ],

  experience: {
    current: [
      {
        id: "orion-cto",
        role: text(
          "Diretor de Tecnologia (CTO) e Diretor de P&D, Grupo Orion Sistemas Agrícolas",
          "Chief Technology Officer (CTO) and R&D Director, Grupo Orion Sistemas Agrícolas",
        ),
        period: text("Jul/2025, atual", "Jul 2025–present"),
        description: text(
          "Lidera a tecnologia nas empresas do Grupo Orion, definindo roadmap, arquitetura e padrões de software, hardware, cloud e infraestrutura, além da estratégia da plataforma digital da CYGNI AgroScience.",
          "Leads technology across Grupo Orion companies, defining the roadmap, architecture and standards for software, hardware, cloud and infrastructure, as well as the strategy for CYGNI AgroScience's digital platform.",
        ),
        highlights: [
          text(
            "Estruturou do zero o CINTEC (Centro de Inovação e Tecnologia), com uma equipe multidisciplinar de cinco profissionais. Dirige o portfólio de P&D, define prioridades com a presidência e planeja investimentos, recursos e marcos de desenvolvimento conforme o calendário das safras.",
            "Built CINTEC (Innovation and Technology Center) from the ground up with a multidisciplinary team of five. Directs the R&D portfolio, sets priorities with the company's leadership and plans investments, resources and development milestones around the crop calendar.",
          ),
          text(
            "No primeiro ano à frente do CINTEC, conduziu o desenvolvimento de máquinas agrícolas, sistemas embarcados e instrumentação: um protótipo entregue a cliente parceiro para testes, dois sistemas em testes de campo e dois equipamentos laboratoriais prontos para uso.",
            "In his first year leading CINTEC, guided the development of agricultural machinery, embedded systems and instrumentation: one prototype delivered to a partner customer for testing, two systems in field trials and two laboratory devices ready for use.",
          ),
          text(
            "Lidera a adoção corporativa de IA, com diretrizes de uso seguro, capacitação e integração de modelos aos sistemas internos via MCP. Incorporou IA a fluxos de engenharia, como o roteamento automatizado de mangueiras hidráulicas.",
            "Leads enterprise AI adoption through safe-use guidelines, training and model integration with internal systems via MCP. Incorporated AI into engineering workflows, including automated hydraulic hose routing.",
          ),
          text(
            "Coordena a pesquisa em biológicos integrada aos projetos do CINTEC, apoiando o refinamento de protocolos e organizando pessoas, cronogramas e recursos de ensaios que já validaram parâmetros adotados em equipamentos de aplicação.",
            "Coordinates biological research integrated with CINTEC projects, supporting protocol refinement and organizing people, schedules and trial resources. These trials have validated parameters adopted in application equipment.",
          ),
          text(
            "Lidera a implantação do SAP com cerca de 20 líderes da fábrica e do escritório, respondendo por planejamento, escopo, atividades, prazos e entregas. Implantou o fluxo CAP/FAE para controle de alterações de engenharia entre as áreas envolvidas.",
            "Leads the SAP implementation with around 20 factory and office leaders, taking responsibility for planning, scope, activities, deadlines and deliverables. Introduced the CAP/FAE workflow to control engineering changes across the teams involved.",
          ),
        ],
      },
      {
        id: "orion-cto-initial",
        role: text(
          "Diretor de Tecnologia (CTO), Grupo Orion Sistemas Agrícolas",
          "Chief Technology Officer (CTO), Grupo Orion Sistemas Agrícolas",
        ),
        period: text("Abr/2025 – Jun/2025", "Apr 2025–Jun 2025"),
        description: text(
          "Assumiu a liderança de tecnologia das empresas do Grupo Orion, ampliando a responsabilidade anteriormente concentrada na CYGNI e passando a responder pelo roadmap tecnológico, arquitetura, sistemas e iniciativas de transformação digital do grupo.",
          "Took on technology leadership across Grupo Orion companies, expanding responsibilities previously focused on CYGNI to cover the group's technology roadmap, architecture, systems and digital transformation initiatives.",
        ),
      },
      {
        id: "unimar-professor",
        role: text(
          "Professor, Universidade de Marília (UNIMAR)",
          "Professor, Universidade de Marília (UNIMAR)",
        ),
        period: text("Jan/2025, atual", "Jan 2025–present"),
        description: text(
          "Docência nos cursos de Ciência da Computação, Inteligência Artificial e Sistemas de Informação, com disciplinas de IA, aprendizado de máquina, algoritmos e estruturas de dados. Orienta dois projetos de iniciação científica.",
          "Teaches in Computer Science, Artificial Intelligence and Information Systems programs, covering AI, machine learning, algorithms and data structures. Supervises two undergraduate research projects.",
        ),
      },
      {
        id: "cygni-cto",
        role: text(
          "Diretor de Tecnologia (CTO), CYGNI AgroScience",
          "Chief Technology Officer (CTO), CYGNI AgroScience",
        ),
        period: text("Set/2020 – Jun/2025", "Sep 2020–Jun 2025"),
        description: text(
          "Liderou cerca de 10 profissionais de desenvolvimento e geoprocessamento, com responsabilidade por tecnologia e produto, roadmap, contratações, infraestrutura e parcerias. Concebeu e implementou uma arquitetura em nuvem sob demanda que reduziu o processamento de milhares de imagens de satélite por talhão de horas para poucos minutos, diminuindo significativamente o custo operacional.",
          "Led around 10 development and geospatial professionals, with responsibility for technology, product, the roadmap, hiring, infrastructure and partnerships. Designed and implemented an on-demand cloud architecture that cut processing time for thousands of satellite images per field from hours to a few minutes, significantly reducing operating costs.",
        ),
        highlights: [
          text(
            "Evoluiu a plataforma com 14 índices de vegetação, solo e umidade, análises temporais e identificação de anomalias. Conectou imagens de satélite à coleta georreferenciada e à geração de mapas de aplicação em taxa variável utilizados em equipamentos da Orion.",
            "Expanded the platform with 14 vegetation, soil and moisture indices, temporal analysis and anomaly detection. Connected satellite imagery to georeferenced field data collection and variable-rate application maps used in Orion equipment.",
          ),
        ],
      },
    ],
    previous: [
      {
        id: "sumup-senior-software-engineer",
        organization: "SumUp",
        role: text("Engenheiro de Software Sênior", "Senior Software Engineer"),
        period: text("Jun/2022 – Jun/2025", "Jun 2022–Jun 2025"),
        description: text(
          "Concebeu e implementou uma solução de otimização para venda e alocação de recebíveis, gerando economia anual de milhões de dólares após validação da tesouraria. Foi o principal responsável técnico pelos sistemas de DIMP e DECRED e atuou na arquitetura e implementação de reconciliação em streaming para milhões de transações por dia. Contribuiu para a formação da tecnologia de Finanças Brasil, com contratação, padrões de engenharia, mentoria e capacitação de profissionais de finanças.",
          "Designed and implemented a solution to optimize receivables sales and allocation, generating millions of dollars in annual savings following treasury validation. Was the main technical owner of the DIMP and DECRED systems and worked on the architecture and implementation of streaming reconciliation for millions of transactions per day. Helped build the Brazil Finance technology function through hiring, engineering standards, mentoring and training finance professionals.",
        ),
      },
      {
        id: "cit-data-scientist",
        organization: "CI&T",
        role: text("Cientista de Dados", "Data Scientist"),
        period: text("Fev/2021 – Set/2022", "Feb 2021–Sep 2022"),
        description: text(
          "Desenvolveu de ponta a ponta um pipeline de análise de percepção de marca com dados de redes sociais, avaliações, pesquisas e notícias. Refinou BERT para a linguagem informal de redes sociais, incluindo gírias e variações linguísticas, elevando em 15 pontos percentuais a métrica agregada de avaliação do projeto.",
          "Developed an end-to-end brand perception analysis pipeline using social media, reviews, surveys and news. Refined BERT for informal social media language, including slang and linguistic variations, increasing the project's aggregate evaluation metric by 15 percentage points.",
        ),
      },
      {
        id: "cygni-tech-lead",
        organization: "CYGNI AgroScience",
        role: text("Líder técnico", "Tech Lead"),
        period: text("Dez/2019 – Ago/2020", "Dec 2019–Aug 2020"),
        description: text(
          "Liderou tecnicamente uma equipe de 3 a 4 profissionais na primeira arquitetura de alto desempenho em nuvem da CYGNI, completando a migração de etapas manuais ou locais. A nova arquitetura reduziu em 10% os custos e duplicou a velocidade de processamento, com resultados medidos em produção.",
          "Provided technical leadership to a team of 3 to 4 on CYGNI's first high-performance cloud architecture, completing the migration of manual or local processing steps. The new architecture reduced costs by 10% and doubled processing speed, with results measured in production.",
        ),
      },
      { id: "clickideia-software-developer", organization: "Clickideia Tecnologia Educacional", role: text("Desenvolvedor de Software — Bolsista FAPESP (Treinamento Técnico)", "Software Developer — FAPESP Technical Training Fellow"), period: text("Dez/2018 – Nov/2019", "Dec 2018–Nov 2019") },
      { id: "cygni-it-manager", organization: "CYGNI AgroScience", role: text("Gerente de TI", "IT Manager"), period: text("Ago/2016 – Nov/2018", "Aug 2016–Nov 2018") },
      { id: "univem-cnpq-researcher", organization: "Centro Universitário Eurípides de Marília, UNIVEM", role: text("Pesquisador CNPq", "CNPq Researcher"), period: text("Jan/2015 – Jul/2016", "Jan 2015–Jul 2016") },
      {
        id: "fbm-python-finance-instructor",
        organization: "FBM Educação",
        role: text("Instrutor de Python e IA para Finanças (18 horas)", "Python and AI for Finance Instructor (18 hours)"),
        period: text("Out/2024", "Oct 2024"),
        description: text(
          "Ministrou curso ao vivo para profissionais de finanças, combinando Python e IA generativa para capacitar não programadores a construir ferramentas e automações para suas próprias rotinas.",
          "Delivered a live course for finance professionals, combining Python and generative AI to help non-programmers build tools and automate their own workflows.",
        ),
      },
    ],
  },

  education: [
    {
      id: "phd-computer-science",
      degree: text("Doutorado em Ciência da Computação", "PhD in Computer Science"),
      period: text("2020, em andamento", "2020–present"),
      institution: "Universidade Estadual de Campinas, UNICAMP",
      advisor: "Leandro Aparecido Villas",
      description: text(
        "Pesquisa: Geração e Adaptação de Conjuntos de Dados Conversacionais para Modelos de Linguagem com Mitigação de Vazamento em Aprendizado Federado. Defesa agendada para 26 de outubro de 2026; curso em andamento.",
        "Research: Generation and Adaptation of Conversational Datasets for Language Models with Leakage Mitigation in Federated Learning. Defense scheduled for October 26, 2026; degree in progress.",
      ),
    },
    {
      id: "msc-computer-science",
      degree: text("Mestrado em Ciência da Computação", "Master’s in Computer Science"),
      period: text("2018 a 2020", "2018–2020"),
      institution: "Universidade Estadual de Campinas, UNICAMP",
      advisor: "Leandro Aparecido Villas",
      academicWork: {
        title: "Alocação de RoadSide Units Ciente de Obstáculos e Diferentes Modelos de Propagação de Sinal",
        titleLanguage: "pt-BR",
        defenseDate: text("27 de abril de 2020", "April 27, 2020"),
        committee: ["Lucas Francisco Wanner", "Roberto Sadao Yokoyama"],
        documents: [
          {
            id: "masters-dissertation",
            kind: "dissertation",
            label: text("Baixar dissertação", "Download dissertation"),
            path: "documents/dissertation.pdf",
            downloadName: "matheus-ferraroni-sanches-dissertacao-mestrado.pdf",
          },
          {
            id: "masters-presentation",
            kind: "presentation",
            label: text("Baixar apresentação", "Download presentation"),
            path: "documents/slides_masters.pdf",
            downloadName: "matheus-ferraroni-sanches-apresentacao-mestrado.pdf",
          },
        ],
        records: [
          {
            id: "masters-doi",
            label: "DOI",
            url: "https://doi.org/10.47749/T/UNICAMP.2020.1129126",
          },
          {
            id: "masters-unicamp-record",
            label: text("Registro na Unicamp", "Unicamp record"),
            url: "https://repositorio.unicamp.br/acervo/detalhe/1129126",
          },
        ],
      },
    },
    {
      id: "bsc-computer-science",
      degree: text("Graduação em Ciência da Computação", "Bachelor’s in Computer Science"),
      period: text("2014 a 2017", "2014–2017"),
      institution: "Centro Universitário Eurípides de Marília, UNIVEM",
      advisor: "Leonardo Castro Botega",
      academicWork: {
        title: "Processamento e Entendimento de Linguagem Natural no Gerenciamento de Emergências para Obtenção de Consciência Situacional",
        titleLanguage: "pt-BR",
        defenseDate: text("27 de novembro de 2017", "November 27, 2017"),
        committee: ["Fabio Piola Navarro", "Guilherme Rodrigues Bilar"],
        documents: [
          {
            id: "undergraduate-monograph",
            kind: "undergraduate-thesis",
            label: text("Baixar monografia", "Download undergraduate thesis"),
            path: "documents/monograph.pdf",
            downloadName: "matheus-ferraroni-sanches-monografia-graduacao.pdf",
          },
        ],
        records: [
          {
            id: "undergraduate-univem-record",
            label: text("Registro no UNIVEM", "UNIVEM record"),
            url: "https://aberto.univem.edu.br/handle/11077/1662",
          },
        ],
      },
    },
  ],

  skillGroups: [
    {
      id: "leadership-and-ai",
      items: [
        {
          id: "leadership-and-research",
          label: text("Liderança e P&D", "Leadership and R&D"),
          value: text(
            "Estratégia tecnológica, gestão de portfólio de P&D e roadmap de inovação, priorização de projetos e recursos, planejamento de investimentos, formação e liderança de equipes multidisciplinares, contratação, gestão por meio de líderes, mentoria e transformação digital.",
            "Technology strategy, R&D portfolio management and innovation roadmaps, project and resource prioritization, investment planning, building and leading multidisciplinary teams, hiring, managing through team leaders, mentoring and digital transformation.",
          ),
        },
        {
          id: "artificial-intelligence",
          label: text("Inteligência artificial", "Artificial intelligence"),
          value: text(
            "LLMs e transformers, fine-tuning, pré-treinamento continuado, construção e curadoria de datasets, avaliação de modelos, RAG, agentes de IA, embeddings, aprendizado federado, privacidade diferencial e aumento de dados.",
            "LLMs and transformers, fine-tuning, continued pretraining, dataset construction and curation, model evaluation, RAG, AI agents, embeddings, federated learning, differential privacy and data augmentation.",
          ),
        },
        {
          id: "applied-ai-and-adoption",
          label: text("IA aplicada e adoção", "Applied AI and adoption"),
          value: text(
            "Adoção corporativa e governança de IA, IA generativa aplicada a engenharia e software, prompt engineering e integração de modelos de linguagem a sistemas corporativos via MCP.",
            "Enterprise AI adoption and governance, generative AI for engineering and software, prompt engineering and language model integration with enterprise systems via MCP.",
          ),
        },
        {
          id: "multidisciplinary-research",
          label: text("P&D multidisciplinar", "Multidisciplinary R&D"),
          value: text(
            "Desenvolvimento de produtos integrando software, hardware, sistemas embarcados e engenharia mecânica, com definição de requisitos, prototipagem e validação.",
            "Product development integrating software, hardware, embedded systems and mechanical engineering, including requirements definition, prototyping and validation.",
          ),
        },
      ],
    },
    {
      id: "architecture-and-data",
      items: [
        {
          id: "aws",
          label: text("Cloud e arquitetura", "Cloud and architecture"),
          value: text(
            "AWS, sistemas distribuídos e de alta escala, arquiteturas serverless e orientadas a eventos, processamento paralelo e concorrente, Docker, CI/CD, Linux, mensageria, APIs e otimização de custos em nuvem.",
            "AWS, large-scale distributed systems, serverless and event-driven architectures, parallel and concurrent processing, Docker, CI/CD, Linux, messaging, APIs and cloud cost optimization.",
          ),
        },
        { id: "databases", label: text("Dados e persistência", "Data and persistence"), value: "PostgreSQL, MongoDB, DynamoDB, Snowflake, Redis" },
        {
          id: "geospatial-and-agritech",
          label: text("Geoprocessamento e agritech", "Geospatial processing and agritech"),
          value: text(
            "Sensoriamento remoto, Landsat e Sentinel-2, processamento de grandes volumes de rasters, GDAL/Rasterio, índices de vegetação, estatística espacial, agricultura de precisão, mapas de aplicação em taxa variável e integração entre dados de campo e imagens de satélite.",
            "Remote sensing, Landsat and Sentinel-2, large-scale raster processing, GDAL/Rasterio, vegetation indices, spatial statistics, precision agriculture, variable-rate application maps and integration of field data with satellite imagery.",
          ),
        },
        { id: "programming", label: text("Programação", "Programming"), value: text("Python e JavaScript/TypeScript", "Python and JavaScript/TypeScript") },
        { id: "languages", label: text("Idiomas", "Languages"), value: text("Português nativo · Inglês fluente", "Native Portuguese · Fluent English") },
      ],
    },
  ],

  publications: [
    {
      id: "publications-2023",
      year: "2023",
      items: [
        {
          id: "conversation-flows",
          title: "Automatic Extraction of Conversation Flows from Human Dialogues: Understanding Their Impact to Refine NLP Models",
          titleLanguage: "en",
          venue: "SN Computer Science",
          description: text(
            "Trabalho sobre extração automática de fluxos conversacionais a partir de diálogos humanos para refinamento de modelos de Processamento de Linguagem Natural.",
            "Research on automatically extracting conversation flows from human dialogues to refine natural language processing models.",
          ),
          link: { label: "DOI: 10.1007/s42979-023-02148-7", url: "https://doi.org/10.1007/s42979-023-02148-7" },
        },
        {
          id: "curricular-transfer-learning",
          title: "Curricular Transfer Learning for Sentence Encoded Tasks",
          titleLanguage: "en",
          venue: text("Preprint no arXiv", "arXiv preprint"),
          description: text(
            "Estudo sobre aprendizado curricular para adaptação gradual entre distribuições em tarefas com sentenças codificadas.",
            "Study of curriculum learning for gradual adaptation between distributions in sentence-encoded tasks.",
          ),
          link: { label: "arXiv: 2308.01849", url: "https://arxiv.org/abs/2308.01849" },
        },
      ],
    },
    {
      id: "publications-2022",
      year: "2022",
      items: [
        {
          id: "mccd",
          title: "MCCD: Generating Human Natural Language Conversational Datasets",
          titleLanguage: "en",
          venue: "ICEIS 2022",
          description: text(
            "Metodologia para geração de datasets conversacionais multi-turno e multiusuário a partir de fóruns online.",
            "A methodology for generating multi-turn, multi-user conversational datasets from online forums.",
          ),
          link: { label: "DOI: 10.5220/0011077400003179", url: "https://doi.org/10.5220/0011077400003179" },
        },
        {
          id: "portuguese-brazilian-datasets",
          title: "Textual Datasets For Portuguese-Brazilian Language Models",
          titleLanguage: "en",
          venue: "Dataset Showcase Workshop, SBC",
          description: text(
            "Apresentação de datasets textuais para modelos de linguagem em português brasileiro.",
            "Presentation of textual datasets for Brazilian Portuguese language models.",
          ),
          link: { label: "DOI: 10.5753/dsw.2022.224294", url: "https://sol.sbc.org.br/index.php/dsw/article/view/21907" },
        },
      ],
    },
    {
      id: "publications-2021",
      year: "2021",
      items: [
        {
          id: "efis",
          title: "EFIS: Ecological Fuel-consumption Intelligent System",
          titleLanguage: "en",
          venue: "DCOSS 2021",
          description: text(
            "Sistema inteligente que combina controlador fuzzy e rede neural para recomendar velocidade instantânea e reduzir o consumo de combustível usando características do veículo e da rodovia.",
            "An intelligent system combining a fuzzy controller and neural network to recommend instantaneous speed and reduce fuel consumption using vehicle and highway characteristics.",
          ),
          link: { label: "DOI: 10.1109/DCOSS52077.2021.00032", url: "https://doi.org/10.1109/DCOSS52077.2021.00032" },
        },
      ],
    },
    {
      id: "publications-2020",
      year: "2020",
      items: [
        {
          id: "rp-sim-paper",
          title: "RP-Sim: Radio Propagation Simulator",
          titleLanguage: "en",
          venue: "SBRC Companion 2020",
          link: { label: "DOI: 10.5753/sbrc_estendido.2020.12395", url: "https://sol.sbc.org.br/index.php/sbrc_estendido/article/view/12395" },
        },
      ],
    },
    {
      id: "publications-2019",
      year: "2019",
      items: [
        {
          id: "maximum-coverage-medical-emergency",
          title: "Genetic Algorithm for the Maximum Coverage Location Problem Applied to Medical Emergency",
          titleLanguage: "en",
          venue: "SBPO 2019",
          description: text(
            "Algoritmo genético para selecionar locais de espera de veículos de emergência considerando informações de trânsito; trabalho premiado com o 2º lugar no Prêmio Roberto Diéguez Galvão.",
            "A genetic algorithm for selecting emergency-vehicle standby locations using traffic information; awarded second place in the Roberto Diéguez Galvão Award.",
          ),
          link: { label: "DOI: 10.59254/sbpo-2019-106784", url: "https://doi.org/10.59254/sbpo-2019-106784" },
        },
      ],
    },
  ],

  projects: [
    {
      id: "queroquero",
      name: "Quero-Quero",
      subtitle: text("Dados e continual pretraining em português brasileiro", "Brazilian Portuguese data and continual pretraining"),
      description: text(
        "Pipeline de pesquisa reprodutível para preparar seis corpora em português brasileiro e adaptar o Tucano 2 0.6B por continual pretraining.",
        "A reproducible research pipeline for preparing six Brazilian Portuguese corpora and adapting Tucano 2 0.6B through continual pretraining.",
      ),
      problem: text(
        "Preparar dados heterogêneos em escala e treinar modelos de linguagem com proveniência, privacidade e comparabilidade entre experimentos.",
        "Prepare heterogeneous data at scale and train language models with provenance, privacy, and comparability across experiments.",
      ),
      contribution: text(
        "Projetou e implementou validação, limpeza conservadora, deduplicação, tokenização, packing, shards verificáveis e treinamento retomável com avaliação de loss e perplexidade.",
        "Designed and implemented validation, conservative cleaning, deduplication, tokenization, packing, verifiable shards, and resumable training with loss and perplexity evaluation.",
      ),
      technologies: "Python, PyTorch, Hugging Face Transformers, Parquet, Slurm, DDP, NCCL",
      status: text(
        "Preparação dos seis datasets e pipeline de treino implementados; a execução científica completa depende dos derivados locais e da alocação no cluster.",
        "Preparation for all six datasets and the training pipeline are implemented; the complete scientific run depends on local derivatives and cluster allocation.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/queroquero" }],
    },
    {
      id: "wackywacky",
      name: "WackyWacky",
      subtitle: text("Crawler experimental para construção controlada de corpus", "Experimental crawler for controlled corpus construction"),
      description: text(
        "Crawler web open source para exploração controlada, coleta de texto comprimido e observabilidade completa da execução.",
        "An open-source web crawler for controlled exploration, compressed text collection, and full execution observability.",
      ),
      problem: text(
        "Coletar páginas recursivamente sem perder controle sobre domínios, idioma, ritmo de acesso, falhas e volume armazenado.",
        "Crawl pages recursively while retaining control over domains, language, access rate, failures, and stored volume.",
      ),
      contribution: text(
        "Implementou trabalhadores concorrentes, filtros de domínio e idioma, limites de taxa e tentativas, persistência comprimida e telemetria de métricas, logs e traces.",
        "Implemented concurrent workers, domain and language filters, rate and retry limits, compressed persistence, and telemetry for metrics, logs, and traces.",
      ),
      technologies: "Python, Playwright, MySQL, Docker, OpenTelemetry, Grafana, Loki, Prometheus, Jaeger",
      status: text("Crawler experimental funcional e publicado como open source.", "Functional experimental crawler published as open source."),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/wackywacky" }],
    },
    {
      id: "wackywacky-analysis",
      name: "WackyWacky Analysis",
      nameLanguage: "en",
      subtitle: text("Análise de corpus em memória externa", "External-memory corpus analysis"),
      description: text(
        "Pacote independente para caracterizar cópias imutáveis do corpus WackyWacky sem carregar dezenas de gigabytes na memória.",
        "A standalone package for characterizing immutable WackyWacky corpus snapshots without loading tens of gigabytes into memory.",
      ),
      problem: text(
        "Validar, deduplicar e caracterizar um grande corpus textual com resultados retomáveis e auditáveis em hardware limitado.",
        "Validate, deduplicate, and characterize a large text corpus with resumable and auditable results on constrained hardware.",
      ),
      contribution: text(
        "Desenvolveu inventário, deduplicação exata, revisão de boilerplate, análise lexical e estrutural, checkpoints e geração determinística de tabelas e figuras.",
        "Developed inventory, exact deduplication, boilerplate review, lexical and structural analysis, checkpoints, and deterministic table and figure generation.",
      ),
      technologies: "Python, Parquet, Zstandard, spaCy, Slurm",
      status: text(
        "Pipeline e visão principal B_clean_v2 implementados; a execução integral ocorre na processadora dedicada.",
        "The pipeline and primary B_clean_v2 view are implemented; the complete run executes on the dedicated processing server.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/wackywacky-analysis" }],
    },
    {
      id: "semantic-replace-with-federated-learning",
      name: "Semantic Replace with Federated Learning",
      nameLanguage: "en",
      subtitle: text("Privacidade e reprodução de dados pessoais em aprendizado federado", "Privacy and personal-data reproduction in federated learning"),
      description: text(
        "Pesquisa experimental sobre reprodução direcionada de perfis pessoais sintéticos e mitigação de vazamento em treinamento federado de modelos de linguagem.",
        "Experimental research on targeted reproduction of synthetic personal profiles and leakage mitigation in federated language-model training.",
      ),
      problem: text(
        "Medir se um cliente adversário aumenta a reprodução de dados sensíveis e comparar defesas sob condições federadas controladas.",
        "Measure whether an adversarial client increases sensitive-data reproduction and compare defenses under controlled federated conditions.",
      ),
      contribution: text(
        "Implementou dados sintéticos, treinamento local, FedAvg, auditoria de extração, substituição semântica rotativa, DP-AdamW por conversa e pilotos retomáveis.",
        "Implemented synthetic data, local training, FedAvg, extraction auditing, rotating semantic substitution, per-conversation DP-AdamW, and resumable pilots.",
      ),
      technologies: "Python, PyTorch, Hugging Face Transformers, Opacus, Slurm",
      status: text(
        "Piloto de substituição semântica concluído e aprovado em duas seeds; execução científica do piloto refinado com privacidade diferencial ainda pendente.",
        "The semantic-substitution pilot completed and passed on two seeds; the refined differentially private scientific run remains pending.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/semantic-replace-with-fed-learning" }],
    },
    {
      id: "visual-algo",
      name: "Visual Algo",
      nameLanguage: "en",
      subtitle: text("Demonstrações interativas de algoritmos", "Interactive algorithm demonstrations"),
      description: text(
        "Coleção publicada de experiências visuais para explorar algoritmos, aprendizado de máquina e evolução neural diretamente no navegador.",
        "A published collection of visual experiments for exploring algorithms, machine learning, and neural evolution directly in the browser.",
      ),
      problem: text(
        "Tornar conceitos abstratos observáveis e manipuláveis em experiências didáticas sem instalação.",
        "Make abstract concepts observable and adjustable through educational experiences that require no installation.",
      ),
      contribution: text(
        "Criou e mantém demos de K-Means, perceptron, veículos neurais evoluídos e simulação evolutiva determinística.",
        "Created and maintains demos for K-Means, perceptrons, evolved neural vehicles, and deterministic evolutionary simulation.",
      ),
      technologies: "JavaScript, HTML, CSS, p5.js, TensorFlow.js, Chart.js",
      status: text("Publicado no GitHub Pages com demonstrações disponíveis.", "Published on GitHub Pages with live demonstrations."),
      links: [
        { kind: "repository", url: "https://github.com/MatheusFerraroni/visual_algo" },
        { label: "Demo", url: "https://matheusferraroni.github.io/visual_algo/" },
      ],
    },
    {
      id: "rp-sim",
      name: "RP-Sim",
      subtitle: text("Simulador de propagação de rádio", "Radio propagation simulator"),
      description: text(
        "Ambiente open source para simular propagação de comunicação sem fio, com suporte a modelos de propagação, RSSI, BER, exportação de área de comunicação e visualização por demonstração interativa.",
        "An open-source environment for simulating wireless communication propagation, with support for propagation models, RSSI, BER, communication-area export, and an interactive demo.",
      ),
      technologies: "JavaScript, p5.js, Mappa.js",
      links: [
        { kind: "repository", url: "https://github.com/MatheusFerraroni/RP-Sim" },
        { label: "Demo", url: "https://matheusferraroni.github.io/RP-Sim/" },
      ],
    },
    {
      id: "mccd",
      name: "MCCD",
      subtitle: text("Metodologia e datasets conversacionais", "Conversational methodology and datasets"),
      description: text(
        "Metodologia para geração de datasets conversacionais naturais a partir de fóruns online e outras fontes de diálogo humano.",
        "A methodology for generating natural conversational datasets from online forums and other sources of human dialogue.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/MCCD" }],
    },
    {
      id: "miner-xenforo",
      name: "Miner-XenForo",
      subtitle: text("Ferramenta de mineração de fóruns", "Forum-mining tool"),
      description: text(
        "Ferramenta para extrair e preparar dados conversacionais de fóruns para uso em datasets de Processamento de Linguagem Natural.",
        "A tool for extracting and preparing conversational data from forums for use in natural language processing datasets.",
      ),
      technologies: "Python",
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/miner-xenforo" }],
    },
    {
      id: "portuguese-nlp-dataset",
      name: "Portuguese NLP dataset",
      nameLanguage: "en",
      subtitle: text("Datasets para Processamento de Linguagem Natural em português", "Datasets for natural language processing in Portuguese"),
      description: text(
        "Agregação de conjuntos de dados novos ou adaptados para treinamento de modelos em português.",
        "A collection of new or adapted datasets for training Portuguese-language models.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/nlp_ptbr_datasets" }],
    },
    {
      id: "gga",
      name: "GGA",
      subtitle: text("Biblioteca Python para algoritmos genéticos", "Python library for genetic algorithms"),
      description: text(
        "Biblioteca open source para facilitar a criação e customização de algoritmos genéticos em Python.",
        "An open-source library that simplifies the creation and customization of genetic algorithms in Python.",
      ),
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/GGA" }],
    },
    {
      id: "msim",
      name: "Msim",
      subtitle: text("Simulador de eventos", "Event simulator"),
      description: text("Simulador simples de eventos em Python.", "A simple event simulator written in Python."),
      technologies: "Python",
      links: [{ kind: "repository", url: "https://github.com/MatheusFerraroni/Msim" }],
    },
    {
      id: "satellite-image-processing",
      name: "Satellite Image Processing",
      nameLanguage: "en",
      subtitle: text("Processamento de imagens de satélite", "Satellite image processing"),
      description: text(
        "Processamento de imagens dos satélites Landsat-8 e Sentinel-2 para apoiar a tomada de decisões de agricultores com imagens coloridas e NDVI.",
        "Processing Landsat 8 and Sentinel-2 satellite imagery to support farmers’ decision-making with color imagery and NDVI.",
      ),
      technologies: "AWS, Python, GDAL, Rasterio, Pillow",
    },
    {
      id: "sco3",
      name: "SCO3, Servidor Clickideia Offline 3.0",
      nameLanguage: "pt-BR",
      subtitle: text("Projeto FAPESP", "FAPESP project"),
      description: text(
        "Projeto voltado a atualizações automáticas de conteúdo educacional por redes oportunísticas em escolas com acesso limitado ou inexistente à internet.",
        "A project focused on automatically updating educational content through opportunistic networks in schools with limited or no internet access.",
      ),
      links: [{ label: "BV FAPESP", url: "https://bv.fapesp.br/pt/pesquisador/702639/matheus-ferraroni-sanches/" }],
    },
  ],

  awards: {
    featured: [
      {
        id: "iceis-best-paper",
        year: "2022",
        title: text("Best Paper Award, ICEIS 2022", "Best Paper Award, ICEIS 2022"),
        titleLanguage: "en",
        workTitle: "MCCD: Generating Human Natural Language Conversational Datasets",
        workTitleLanguage: "en",
      },
      {
        id: "sbpo-second-place",
        year: "2019",
        title: text(
          "2º lugar no Prêmio Roberto Diéguez Galvão, SBPO 2019",
          "Second place in the Roberto Diéguez Galvão Award, SBPO 2019",
        ),
        workTitle: "Genetic Algorithm for the Maximum Coverage Location Problem Applied to Medical Emergency",
        workTitleLanguage: "en",
      },
    ],
    other: [
      { id: "orion-professional-recognition", year: "2025", description: text("Reconhecimento profissional por criatividade e inovação, Grupo Orion, pela estruturação inicial da área de P&D.", "Professional recognition for creativity and innovation, Grupo Orion, for establishing the initial R&D function.") },
      { id: "cygni-professional-recognition", year: "2016", description: text("Destaque profissional por criatividade e inovação, CYGNI AgroScience.", "Professional recognition for creativity and innovation, CYGNI AgroScience.") },
      { id: "regional-programming-third-place", year: "2014", description: text("Terceiro colocado na fase regional de programação · Sociedade Brasileira de Computação.", "Third place in the regional programming contest · Sociedade Brasileira de Computação.") },
      { id: "univem-computing-olympiad", year: "2013", description: text("Primeiro colocado na olimpíada de informática para alunos do ensino médio promovida pelo UNIVEM.", "First place in UNIVEM’s computing olympiad for high school students.") },
    ],
  },
});

export const supportedLocales = Object.freeze(["pt-BR", "en"]);
