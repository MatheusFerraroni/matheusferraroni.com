const text = (ptBr, en) => Object.freeze({ "pt-BR": ptBr, en });

export const SITE_URL = "https://matheusferraroni.com";

export const siteContent = Object.freeze({
  person: {
    id: "matheus-ferraroni-sanches",
    name: "Matheus Ferraroni Sanches",
    title: text(
      "Matheus Ferraroni Sanches | CTO e Pesquisador em IA",
      "Matheus Ferraroni Sanches | CTO and AI Researcher",
    ),
    description: text(
      "Matheus Ferraroni Sanches é CTO, professor e pesquisador em Ciência da Computação, com atuação em IA, agtech, NLP, privacidade e sensoriamento remoto.",
      "Matheus Ferraroni Sanches is a CTO, professor and computer science researcher working on AI, agtech, NLP, privacy and remote sensing.",
    ),
    summary: text(
      "CTO na Orion Sistemas Agrícolas e doutorando em Ciência da Computação pela UNICAMP. Atua em pesquisa e desenvolvimento de plataformas para agtech, sensoriamento remoto, processamento de linguagem natural, aprendizado federado, privacidade em LLMs, otimização e redes veiculares.",
      "CTO at Orion Sistemas Agrícolas and a PhD candidate in Computer Science at UNICAMP. His research and development work spans agtech platforms, remote sensing, natural language processing, federated learning, LLM privacy, optimization, and vehicular networks.",
    ),
    socialCardAlt: text(
      "Matheus Ferraroni Sanches — CTO, professor e pesquisador em IA",
      "Matheus Ferraroni Sanches — CTO, professor, and AI researcher",
    ),
    jobTitles: text(
      ["Diretor de Tecnologia (CTO)", "Professor", "Pesquisador em Ciência da Computação"],
      ["Chief Technology Officer (CTO)", "Professor", "Computer Science Researcher"],
    ),
    knowsAbout: text(
      [
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
    contact: text("Contato", "Contact"),
    close: text("Fechar", "Close"),
    email: text("E-mail", "Email"),
    contactEmailAlt: text("E-mail de contato", "Contact email address"),
    linkedinUnavailable: text(
      "LinkedIn desativado temporariamente",
      "LinkedIn temporarily unavailable",
    ),
    repository: text("Repositório", "Repository"),
    technologies: text("Tecnologias", "Technologies"),
    advisor: text("Orientador", "Advisor"),
    dissertation: text("Dissertação", "Dissertation"),
    undergraduateProject: text("Trabalho", "Undergraduate project"),
    work: text("Trabalho", "Paper"),
  },

  sectionTitles: {
    experience: text("Histórico profissional", "Professional experience"),
    education: text("Histórico acadêmico", "Education"),
    skills: text("Habilidades", "Skills"),
    publications: text("Publicações selecionadas", "Selected publications"),
    projects: text("Projetos", "Projects"),
    awards: text("Prêmios e reconhecimentos", "Awards and recognition"),
    previousExperience: text(
      "Experiências anteriores selecionadas",
      "Selected previous experience",
    ),
  },

  topics: [
    { id: "natural-language-processing", label: text("Processamento de Linguagem Natural", "Natural Language Processing") },
    { id: "agtech", label: text("Agtech", "Agtech") },
    { id: "llm-privacy", label: text("Privacidade e segurança em LLMs", "LLM Privacy and Security") },
    { id: "federated-learning", label: text("Aprendizado Federado", "Federated Learning") },
    { id: "optimization", label: text("Otimização", "Optimization") },
    { id: "remote-sensing", label: text("Sensoriamento remoto", "Remote Sensing") },
    { id: "vehicular-networks", label: text("Redes veiculares", "Vehicular Networks") },
    { id: "wireless-communication", label: text("Comunicação sem fio", "Wireless Communication") },
  ],

  links: {
    lattes: "http://lattes.cnpq.br/7066133969704063",
    scholar: "https://scholar.google.com/citations?hl=pt-BR&user=ZCrxyHUAAAAJ",
    github: "https://github.com/MatheusFerraroni",
    visualAlgorithms: "https://matheusferraroni.github.io/visual_algo/",
    dblp: "https://dblp.org/pid/165/3906.html",
    fapesp: "https://bv.fapesp.br/pt/pesquisador/702639/matheus-ferraroni-sanches/",
  },

  quickLinks: [
    { id: "lattes", label: text("Lattes", "Lattes"), linkKey: "lattes" },
    { id: "google-scholar", label: text("Google Scholar", "Google Scholar"), linkKey: "scholar" },
    { id: "github", label: text("GitHub", "GitHub"), linkKey: "github" },
    { id: "visual-algorithms", label: text("Algoritmos Visuais", "Visual Algorithms"), linkKey: "visualAlgorithms" },
  ],

  experience: {
    current: [
      {
        id: "orion-cto",
        role: text(
          "Diretor de Tecnologia (CTO), Orion Sistemas Agrícolas",
          "Chief Technology Officer (CTO), Orion Sistemas Agrícolas",
        ),
        period: text("Jun/2025, atual", "Jun 2025–present"),
        description: text(
          "Liderança das áreas de Tecnologia, Inovação e Pesquisa & Desenvolvimento, atuando na criação de novos produtos, máquinas agrícolas e plataformas digitais. Responsável pela estratégia tecnológica da empresa, abrangendo desenvolvimento de software, sistemas corporativos, infraestrutura, segurança da informação e transformação digital.",
          "Leads Technology, Innovation, and Research & Development, contributing to the creation of new products, agricultural machinery, and digital platforms. He is responsible for the company’s technology strategy across software development, enterprise systems, infrastructure, information security, and digital transformation.",
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
          "Professor universitário nas áreas de Inteligência Artificial, Ciência da Computação e Sistemas de Informação. Atua em disciplinas relacionadas a Inteligência Artificial, aprendizado de máquina, algoritmos e estruturas de dados, conectando fundamentos teóricos e aplicações práticas para o desenvolvimento de soluções tecnológicas inovadoras.",
          "University professor in Artificial Intelligence, Computer Science, and Information Systems. Teaches courses related to artificial intelligence, machine learning, algorithms, and data structures, connecting theoretical foundations with practical applications to develop innovative technology solutions.",
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
          "Responsável pela estratégia tecnológica, arquitetura de software e liderança das equipes de desenvolvimento, conduzindo a evolução de plataformas de sensoriamento remoto e análise geoespacial baseadas em imagens de satélite, desde a concepção do produto até sua operação e entrega aos clientes.",
          "Led technology strategy, software architecture, and development teams, guiding the evolution of remote sensing and geospatial analysis platforms based on satellite imagery, from product conception through operation and customer delivery.",
        ),
      },
    ],
    previous: [
      { id: "sumup-senior-software-engineer", organization: "SumUp", role: text("Engenheiro de Software Sênior", "Senior Software Engineer"), period: text("Jun/2022 – Jun/2025", "Jun 2022–Jun 2025") },
      { id: "cit-data-scientist", organization: "CI&T Software", role: text("Cientista de Dados/Pesquisador", "Data Scientist/Researcher"), period: text("Fev/2021 – Set/2022", "Feb 2021–Sep 2022") },
      { id: "cygni-tech-lead", organization: "CYGNI AgroScience", role: text("Líder técnico", "Tech Lead"), period: text("Dez/2019 – Ago/2020", "Dec 2019–Aug 2020") },
      { id: "clickideia-data-scientist", organization: "Clickideia Tecnologia Educacional", role: text("Cientista de Dados/Pesquisador", "Data Scientist/Researcher"), period: text("Dez/2018 – Nov/2019", "Dec 2018–Nov 2019") },
      { id: "cygni-it-manager", organization: "CYGNI AgroScience", role: text("Gerente de TI", "IT Manager"), period: text("Ago/2016 – Nov/2018", "Aug 2016–Nov 2018") },
      { id: "univem-cnpq-researcher", organization: "Centro Universitário Eurípides de Marília, UNIVEM", role: text("Pesquisador CNPq", "CNPq Researcher"), period: text("Jan/2015 – Jul/2016", "Jan 2015–Jul 2016") },
    ],
  },

  education: [
    {
      id: "phd-computer-science",
      degree: text("Doutorado em Ciência da Computação", "PhD in Computer Science"),
      period: text("2020, em andamento", "2020–present"),
      institution: "Universidade Estadual de Campinas, UNICAMP",
      advisor: "Leandro Aparecido Villas",
    },
    {
      id: "msc-computer-science",
      degree: text("Mestrado em Ciência da Computação", "Master’s in Computer Science"),
      period: text("2018 a 2020", "2018–2020"),
      institution: "Universidade Estadual de Campinas, UNICAMP",
      workTitle: "Alocação de Road Side Unit Ciente de Obstáculos com Diferentes Modelos de Propagação de Sinal",
      workTitleLanguage: "pt-BR",
      workKind: "dissertation",
      advisor: "Leandro Aparecido Villas",
    },
    {
      id: "bsc-computer-science",
      degree: text("Graduação em Ciência da Computação", "Bachelor’s in Computer Science"),
      period: text("2014 a 2017", "2014–2017"),
      institution: "Centro Universitário Eurípides de Marília, UNIVEM",
      workTitle: "Processamento e Entendimento de Linguagem Natural no Gerenciamento de Emergências Para Obtenção de Consciência Situacional",
      workTitleLanguage: "pt-BR",
      workKind: "undergraduateProject",
      advisor: "Leonardo Castro Botega",
    },
  ],

  skillGroups: [
    {
      id: "engineering",
      items: [
        { id: "programming", label: text("Programação", "Programming"), value: "Python, PHP, JavaScript, Elixir, C++, Go" },
        { id: "tools", label: text("Ferramentas", "Tools"), value: "Git, Docker, Google Maps JS, Jupyter, Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, NLTK, DBT" },
        { id: "aws", label: text("Nuvem AWS", "AWS Cloud"), value: "Lambda, EC2, S3, DynamoDB, CodeCommit, Elastic Beanstalk, EFS, RDS, API Gateway" },
      ],
    },
    {
      id: "data-and-collaboration",
      items: [
        { id: "databases", label: text("Bancos de dados", "Databases"), value: "SQL, NoSQL, DynamoDB, PostgreSQL, Snowflake" },
        { id: "soft-skills", label: text("Competências interpessoais", "Soft Skills"), value: text("Diligente, aprendizado rápido, proativo, colaborativo, pensamento crítico", "Diligent, quick learner, proactive, collaborative, critical thinker") },
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
          venue: "arXiv",
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
  ],

  projects: [
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
      { id: "orion-professional-recognition", year: "2025", description: text("Destaque Profissional por Iniciativa Criativa e Inovadora · Orion Sistemas Agrícolas.", "Professional recognition for creative and innovative initiative · Orion Sistemas Agrícolas.") },
      { id: "cygni-professional-recognition", year: "2016", description: text("Destaque Profissional por Iniciativa Criativa e Inovadora · CYGNI AgroCiência.", "Professional recognition for creative and innovative initiative · CYGNI AgroCiência.") },
      { id: "regional-programming-fourth-place", year: "2014", description: text("Quarto colocado na fase regional de programação · Sociedade Brasileira de Computação.", "Fourth place in the regional programming contest · Sociedade Brasileira de Computação.") },
      { id: "univem-computing-olympiad", year: "2013", description: text("Primeiro colocado na olimpíada de informática para alunos do ensino médio promovida pelo UNIVEM.", "First place in UNIVEM’s computing olympiad for high school students.") },
    ],
  },
});

export const supportedLocales = Object.freeze(["pt-BR", "en"]);
