import { GraphEdge, GraphNode, HackathonMission, ProfileDossier, ProjectDetail, SkillItem } from '../types/portfolio';

export const PROFILE_DATA: ProfileDossier = {
  name: "Nandipalle Parthu",
  handle: "nandipalleparthu-eng",
  title: "AI/ML Developer • Builder • Student • Hackathon Champion",
  subtitle: "B.Tech CSE (AI & ML) @ Karunya Institute of Technology and Sciences",
  education: {
    degree: "B.Tech Computer Science and Engineering",
    institution: "Karunya Institute of Technology and Sciences",
    specialization: "Artificial Intelligence and Machine Learning",
    period: "2025 – 2029"
  },
  identityStatement: "Nandipalle Parthu is a B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning at Karunya Institute of Technology and Sciences (2025–2029), with a broad builder profile spanning AI/ML, full-stack web development, cybersecurity, IoT, computer vision, human-computer interaction, game development, and startup/product development. A student builder who moves across AI, software, cybersecurity, hardware, IoT, interactive technology and startup ideas, with a recurring pattern of identifying a problem, building a working prototype, experimenting with emerging technology, and taking the result into hackathons, demonstrations and real-world product concepts.",
  evolutionSteps: [
    {
      phase: 'LEARN',
      tagline: 'Foundations, Math & Core Systems',
      description: 'Mastered neural network math, computer vision algorithms, cryptographic ciphers, embedded protocols (MQTT/CoAP), and low-level Linux systems.'
    },
    {
      phase: 'BUILD',
      tagline: 'Multimodal AI Assistants & IoT Systems',
      description: 'Engineered FRIDAY (Iron Man inspired AI assistant with touchless gesture/cursor control), SmartKisan, smart IoT grids (ESP32/ESP8266), and multi-agent systems.'
    },
    {
      phase: 'EXPERIMENT',
      tagline: 'Cybersecurity, Cryptanalysis & Computer Vision',
      description: 'Built Custom-CTF arenas, Secure Cryptography Toolkits, port reconnaissance tools, PoseAssist biomechanics, and biometric HCI defense protocols.'
    },
    {
      phase: 'COMPETE',
      tagline: 'MINDKRAFT 2026 & National Hackathons',
      description: 'Won 1st Prize in CSE Department @ MINDKRAFT 2026 with FRIDAY, 4th in Cryptogram 2.0, 5th in Hashes Over Roses 3.0, and Champion/Finalist at National T4G.'
    },
    {
      phase: 'SHIP',
      tagline: 'Production Deployments & Scalable Web Ecosystems',
      description: 'Delivering live decks for ARTHA, open-source repositories across 20+ domains, interactive canvas visualizers, and toolkits for developers.'
    }
  ],
  coreDomains: [
    {
      title: "Multimodal AI & Intelligent Assistants",
      description: "FRIDAY assistant (voice recognition, facial identification, touchless gesture/cursor control, laptop navigation), local LLM deployment, multi-agent frameworks.",
      icon: "Brain"
    },
    {
      title: "Agri-Tech & Supply Chain Platforms",
      description: "ARTHA (4-sector harvest exchange connecting farmers, buyers, suppliers, logistics), SmartKisan (crop recommendations, profit analytics, multilingual).",
      icon: "Wheat"
    },
    {
      title: "Cybersecurity & Cryptographic Defense",
      description: "Custom-CTF challenge engine, Secure Cryptography Toolkit (AES/RSA/ECDH/ZKP), Ultimate Port Scanner, hash cryptanalysis, and secure biometric HCI.",
      icon: "ShieldAlert"
    },
    {
      title: "IoT, Embedded Systems & Hardware Grids",
      description: "Smart Garage, Smart Classroom, Remote Health Monitoring, Weather & Air Quality monitoring with Arduino, ESP32, ESP8266, MQTT, CoAP, Blynk, ThingSpeak.",
      icon: "Cpu"
    },
    {
      title: "Creative Web Engineering & Interactive Graphics",
      description: "Performant React 19/TypeScript engines, Weave visual workflow canvas, 2D affine transformation playground, distributed booking systems.",
      icon: "Globe"
    }
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/nandipalleparthu-eng",
      handle: "@nandipalleparthu-eng",
      action: "Inspect 20+ Repositories"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/nandipalle-parthu-ai",
      handle: "in/nandipalle-parthu-ai",
      action: "Connect (1K+ Followers • 500+ Connections)"
    },
    {
      platform: "Email",
      url: "mailto:parthu198528@gmail.com",
      handle: "parthu198528@gmail.com",
      action: "Send Direct Email"
    }
  ],
  email: "parthu198528@gmail.com",
  accolades: [
    {
      title: "1st Prize Winner — CSE Department",
      event: "MINDKRAFT 2026 (International Level Techno-Management Expo)",
      achievement: "1st Prize with FRIDAY AI Assistant (CSE Dept also secured Overall 1st Prize)",
      badge: "INTERNATIONAL EXPO 1ST PRIZE",
      description: "Won 1st prize in the Computer Science and Engineering Department for showcasing FRIDAY—an AI-powered multimodal assistant featuring voice recognition, facial identification, touchless hand-gesture cursor control, and full laptop OS navigation."
    },
    {
      title: "4th Place — Cryptogram 2.0",
      event: "MINDKRAFT 2026 Cyber Arena",
      achievement: "Top 4 in Cryptographic Problem Solving & Cipher Breaking",
      badge: "MINDKRAFT 2026 4TH PLACE",
      description: "Solved advanced classical and modern cryptographic puzzles, proving mathematical proficiency in encryption, key recovery, and cryptanalysis."
    },
    {
      title: "5th Place — Hashes Over Roses 3.0",
      event: "MINDKRAFT 2026 Security Sprint",
      achievement: "Top 5 in Hash Cracking, Entropy Auditing & Vulnerability Discovery",
      badge: "MINDKRAFT 2026 5TH PLACE",
      description: "Demonstrated deep cybersecurity acumen in high-speed cryptographic hash collision finding, salt analysis, and password entropy evaluation."
    },
    {
      title: "Champion / Finalist — ARTHA",
      event: "Tech For Good (T4G) National Hackathon Challenge",
      achievement: "Multi-sector Agricultural Resource Trading & Harvest Analytics",
      badge: "NATIONAL HACKATHON FINALIST",
      description: "Shipped the ARTHA 4-sector digital agricultural procurement ecosystem connecting smallholder farmers, industrial buyers, aggregators, and cold-chain logistics."
    }
  ],
  linkedInMetrics: {
    followers: "1K+ Followers",
    connections: "500+ Connections",
    status: "Data Analyst & Active AI/ML Builder"
  }
};

export const PROJECTS_DATA: ProjectDetail[] = [
  // 1. FRIDAY (AI ASSISTANT & MULTIMODAL HCI MASTERPIECE - FLAGSHIP)
  {
    id: "friday-ai",
    title: "FRIDAY AI Assistant",
    codeName: "JARVIS-FRIDAY-HCI",
    tagline: "Multimodal AI Personal Assistant with Touchless Vision & Gesture OS Control",
    status: "DEPLOYED",
    category: "Multimodal AI, Computer Vision & Touchless HCI",
    domain: "ai",
    isFlagship: true,
    clearanceLevel: "LEVEL-01 FLAGSHIP",
    problem: "Traditional computing interfaces require physical mouse and keyboard contact, creating accessibility barriers and lacking intuitive voice-vision contextual autonomy for hands-free productivity and laptop navigation.",
    solution: "Inspired by Iron Man's AI concept, FRIDAY is an intelligent multimodal desktop companion combining continuous voice recognition, real-time facial identification, hand-gesture tracking, touchless cursor navigation, and voice-commanded operating system automation.",
    aiArchitecture: "Multi-threaded sensory pipeline integrating MediaPipe for sub-30ms skeletal hand-keypoint tracking, facial biometric embeddings for instant user authentication, lightweight local speech recognition, and system-level IPC controllers.",
    localAiDetails: "Engineered for low-latency on-device processing: facial recognition embeddings and hand-gesture geometric classifiers run locally on the client CPU/GPU without cloud round-trip lag.",
    techStack: [
      { name: "Python 3.11", category: "AI / ML", highlight: true },
      { name: "OpenCV", category: "AI / ML", highlight: true },
      { name: "MediaPipe (Hand & Face)", category: "AI / ML", highlight: true },
      { name: "SpeechRecognition & TTS", category: "AI / ML", highlight: true },
      { name: "PyAutoGUI & OS Control", category: "Backend", highlight: true },
      { name: "Local LLM Integration", category: "AI / ML", highlight: true },
      { name: "Computer Vision", category: "AI / ML", highlight: true }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng",
    teamRole: "Lead Creator & AI Systems Engineer",
    keyContributions: [
      "Won 1st Prize in CSE Department at the International Level Techno-Management Expo, MINDKRAFT 2026.",
      "Engineered real-time touchless cursor control with pinch-to-click, scroll gestures, and drag-and-drop actions.",
      "Implemented facial recognition biometric gate authorizing voice commands and personal laptop navigation.",
      "Built voice-command system executing applications, search queries, volume management, and window switching."
    ],
    skillsUsed: ["Python", "OpenCV", "Machine Learning", "AI Models", "Security", "Algorithms"]
  },

  // 2. ARTHA (FLAGSHIP)
  {
    id: "artha",
    title: "ARTHA",
    codeName: "HARVEST-INTELLIGENCE-01",
    tagline: "Agricultural Resource Trading & Harvest Analytics",
    status: "ACTIVE BUILD",
    category: "AI + Agricultural Supply Chain Intelligence",
    domain: "ai",
    isFlagship: true,
    clearanceLevel: "LEVEL-01 FLAGSHIP",
    problem: "Agricultural supply chains suffer from severe market opacity, predatory intermediary layers, high post-harvest loss, delayed crop pricing signals, and lack of real-time logistics coordination between smallholder farmers and food processing industries.",
    solution: "ARTHA provides an interconnected digital ecosystem uniting 4 critical sectors: Farmers, Bulk Suppliers, Industrial Production/Buyers, and Logistics. Incorporates dynamic market intelligence, automated grading, predictive demand forecasting, and real-time dispatch routing.",
    aiArchitecture: "Equipped with localized computer vision for crop quality/defect grading, neural demand forecasting engine running lightweight time-series predictions, and a multi-lingual AI assistant tailored for regional farming queries.",
    localAiDetails: "Engineered to operate with local/edge AI models to accommodate rural connectivity constraints—allowing offline-first image inspection and vernacular audio transcription before syncing to the centralized trade exchange.",
    sectorViews: [
      {
        id: "farmer-view",
        name: "Farmer Dashboard",
        role: "Producers & Cultivators",
        description: "Localized crop health diagnostics, instant mandi market price telemetry, direct contract sale creation without exploitative middlemen.",
        features: ["Voice-enabled Vernacular Assistant", "Real-Time Crop Yield Estimation", "Direct Bulk Contract Listing", "Fair-Price Benchmark Calculator"],
        metrics: "Eliminates up to 30% intermediary trade margin loss",
        badge: "PRODUCER NODE"
      },
      {
        id: "supplier-view",
        name: "Supplier & Aggregator View",
        role: "Procurement Aggregators",
        description: "Batch collection management, cold-storage capacity allocation, quality assurance certificates, and consolidated batch transport.",
        features: ["Micro-Warehouse Stock Tracking", "Multi-Farm Batch Aggregation", "Quality Grade Verification", "Payment Escrow Verification"],
        metrics: "40% faster bulk fulfillment dispatch",
        badge: "PROCUREMENT NODE"
      },
      {
        id: "production-view",
        name: "Production & Buyer View",
        role: "Industrial Food Processors",
        description: "Raw material pipeline forecasting, automated forward contracts, commodity batch traceability, and factory inventory demand synchronization.",
        features: ["Demand-Driven Forward Contracts", "Traceability QR Verification", "Factory Inflow Scheduling", "Commodity Price Trend Prediction"],
        metrics: "Reduces factory idle downtime by 28%",
        badge: "INDUSTRIAL NODE"
      },
      {
        id: "logistics-view",
        name: "Logistics & Dispatch View",
        role: "Transport & Cold-Chain Fleets",
        description: "Optimized route dispatching, temperature sensor telemetry for perishable produce, and smart cargo load consolidation.",
        features: ["Multi-Stop Pickup Routing", "Cold-Chain Temperature Telemetry", "Driver Dispatch App Interface", "Real-Time Proof of Delivery"],
        metrics: "Reduces transit spoilage by ~22%",
        badge: "DISPATCH NODE"
      }
    ],
    techStack: [
      { name: "React 19", category: "Frontend", highlight: true },
      { name: "TypeScript", category: "Frontend", highlight: true },
      { name: "Tailwind CSS", category: "Frontend", highlight: true },
      { name: "Node / Express", category: "Backend", highlight: true },
      { name: "Computer Vision / AI", category: "AI / ML", highlight: true },
      { name: "Time-Series Forecasting", category: "AI / ML", highlight: true },
      { name: "Anime.js / Motion", category: "Frontend" },
      { name: "Local Inference Engine", category: "AI / ML", highlight: true }
    ],
    primaryLiveUrl: "https://artha-story-deck.netlify.app/",
    otherBuilds: [
      {
        label: "ARTHA Tech-for-Good Build (T4G)",
        url: "https://artha-t4g.netlify.app/",
        note: "Interactive prototype submitted for the national T4G hackathon."
      },
      {
        label: "ARTHA GDR Operational Node",
        url: "https://artha-t4g-gdr.netlify.app/",
        note: "Specialized rural procurement & logistics distribution build."
      },
      {
        label: "ARTHA Extended Analytics Repo",
        url: "https://github.com/nandipalleparthu-eng/ARTHA---Agricultural-Resource-Trading-Harvest-Analytics",
        note: "Full agricultural resource trading & harvest analytics engine repository."
      }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/ARTHA",
    documentationUrl: "https://artha-story-deck.netlify.app/",
    teamRole: "Lead System Architect & AI/Fullstack Engineer",
    keyContributions: [
      "Designed the multi-sector distributed architecture connecting farmers, buyers, and logistics fleets.",
      "Engineered edge-compatible AI workflows for crop assessment and localized audio processing.",
      "Built dynamic UI dashboards with interactive trade graphs and real-time state visualization.",
      "Integrated supply chain telemetry with route dispatch optimization logic."
    ],
    skillsUsed: ["Python", "Machine Learning", "React", "TypeScript", "Tailwind CSS", "Node.js", "AI Models"]
  },

  // 3. SmartKisan (AI for Farmers)
  {
    id: "smart-kissan",
    title: "SmartKisan (AI for Agriculture)",
    codeName: "SMART-KISAN-AGRI",
    tagline: "AI Crop Recommendations, Market Insights, Profit Analysis & Multilingual Support",
    status: "DEPLOYED",
    category: "Agri-Tech & Applied Machine Learning",
    domain: "ai",
    clearanceLevel: "LEVEL-02 AGRI-TECH",
    problem: "Smallholder farmers struggle with uncertain crop selection, sudden market price crashes, lack of scientific yield comparisons, and language barriers when accessing advisory tools.",
    solution: "SmartKisan is an AI-for-agriculture advisory suite delivering intelligent crop recommendations based on soil/climate parameters, live mandi market-price insights, comprehensive profit and risk analysis, yield comparisons, and vernacular multilingual support.",
    aiArchitecture: "Predictive machine learning models for crop recommendation and yield forecasting, coupled with multilingual NLP processing enabling vernacular voice and text guidance.",
    techStack: [
      { name: "Python", category: "AI / ML", highlight: true },
      { name: "Machine Learning (Scikit-Learn)", category: "AI / ML", highlight: true },
      { name: "React", category: "Frontend", highlight: true },
      { name: "Multilingual NLP", category: "AI / ML", highlight: true },
      { name: "Node.js", category: "Backend" },
      { name: "OpenCV", category: "AI / ML" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/SmartKissan",
    otherBuilds: [
      {
        label: "Farmers Hub Repository",
        url: "https://github.com/nandipalleparthu-eng/farmers",
        note: "Direct community portal for farmer produce listing and agricultural advisory."
      }
    ],
    teamRole: "Lead AI Developer & Full-Stack Engineer",
    keyContributions: [
      "Trained crop recommendation model matching soil NPK and meteorological metrics with optimal harvest yields.",
      "Engineered dynamic profit & risk analysis calculator factoring in fertilizer, labor, and expected mandi rates.",
      "Implemented multilingual support for localized vernacular farmer adoption."
    ],
    skillsUsed: ["Python", "Machine Learning", "OpenCV", "React", "Node.js", "AI Models"]
  },

  // 4. Secure Cryptography Toolkit
  {
    id: "crypto-toolkit",
    title: "Secure Cryptography Toolkit",
    codeName: "CIPHER-CORE-SEC",
    tagline: "Cryptographic Algorithm Suite & Mathematical Encryption Suite",
    status: "STABLE RELEASE",
    category: "Cybersecurity & Applied Cryptography",
    domain: "cyber",
    clearanceLevel: "LEVEL-02 SECURITY",
    problem: "Implementing and understanding modern asymmetric and symmetric cryptographic primitives requires safe implementations resistant to common side-channel vulnerabilities and implementation flaws.",
    solution: "A modular, hardened security toolkit implementing end-to-end symmetric encryption (AES-GCM), asymmetric key exchange (RSA-OAEP, ECDH), cryptographic hashing (SHA-3/BLAKE2), and zero-knowledge proof primitives with interactive step-by-step verification.",
    aiArchitecture: "Heuristic entropy analyzer and automated cipher-strength scoring system verifying key generation randomness and resistance against known statistical attacks.",
    techStack: [
      { name: "Python 3.11", category: "Backend", highlight: true },
      { name: "C / C++", category: "Security", highlight: true },
      { name: "Cryptography Libs", category: "Security", highlight: true },
      { name: "Entropy Analysis", category: "Security" },
      { name: "Algorithms", category: "Security" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/Secure-Cryptography-Toolkit---Parthu",
    teamRole: "Sole Security Researcher & Author",
    keyContributions: [
      "Implemented constant-time modular arithmetic for RSA and Elliptic-Curve operations.",
      "Built high-speed symmetric stream and block encryption benchmarking utilities.",
      "Engineered zero-knowledge verification proofs for tamper-resistant data sharing.",
      "Awarded 4th Place in Cryptogram 2.0 & 5th Place in Hashes Over Roses 3.0 at MINDKRAFT 2026."
    ],
    skillsUsed: ["Cryptography", "C/C++", "Python", "Security", "Algorithms"]
  },

  // 5. Custom-CTF
  {
    id: "custom-ctf",
    title: "Custom-CTF",
    codeName: "EXPLOIT-SANDBOX-09",
    tagline: "Capture The Flag Simulation Engine & Security Challenge Grid",
    status: "ACTIVE BUILD",
    category: "Cybersecurity & Penetration Testing",
    domain: "cyber",
    clearanceLevel: "LEVEL-02 DEFENSE",
    problem: "Standard security labs lack realistic simulated environments for practicing binary exploitation, reverse engineering, and web vulnerability analysis in an isolated sandbox.",
    solution: "An end-to-end custom CTF arena providing automated containerized challenges spanning binary reverse-engineering, cryptographic cipher breaking, web injection flaws, and memory corruption challenges with real-time flag validation.",
    techStack: [
      { name: "Python", category: "Backend", highlight: true },
      { name: "Docker / Sandboxes", category: "DevOps", highlight: true },
      { name: "Reverse Engineering", category: "Security", highlight: true },
      { name: "Web Security", category: "Security" },
      { name: "Linux / GDB", category: "Security", highlight: true }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/Custom-CTF",
    teamRole: "Lead CTF Challenge Architect & Security Engineer",
    keyContributions: [
      "Authored multi-tier cryptographic and binary reverse engineering challenges.",
      "Implemented secure flag verification hashing with rate-limiting to prevent brute force.",
      "Engineered isolated runtime sandboxes for safe exploit execution."
    ],
    skillsUsed: ["CTF", "Security", "Python", "Reverse Engineering", "Linux"]
  },

  // 6. IoT Smart Grid: Smart Garage & Smart Classroom
  {
    id: "iot-smart-grid",
    title: "IoT Smart Grid: Garage & Classroom Automation",
    codeName: "IOT-GRID-AUTOMATION",
    tagline: "Embedded Microcontroller Automation with ESP32, ESP8266, Arduino, MQTT & CoAP",
    status: "DEPLOYED",
    category: "IoT, Embedded Systems & Hardware Automation",
    domain: "iot",
    clearanceLevel: "LEVEL-02 HARDWARE",
    problem: "Classrooms and vehicle parking facilities waste substantial energy, lack automated access control, and rely on manual switches without real-time environmental occupancy intelligence.",
    solution: "A connected IoT automation grid featuring a Smart Garage (automated barrier gates, ultrasonic proximity slots, RFID authentication) and a Smart Classroom (PIR occupancy power-saving, ambient light luminance regulation, and MQTT cloud control via Blynk and ThingSpeak).",
    techStack: [
      { name: "ESP32 / ESP8266", category: "Hardware / IoT", highlight: true },
      { name: "Arduino / C++", category: "Hardware / IoT", highlight: true },
      { name: "MQTT & CoAP Protocols", category: "Hardware / IoT", highlight: true },
      { name: "Blynk & ThingSpeak", category: "Hardware / IoT", highlight: true },
      { name: "Ultrasonic / PIR Sensors", category: "Hardware / IoT" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng",
    teamRole: "Embedded Hardware & IoT Systems Engineer",
    keyContributions: [
      "Programmed ESP32/ESP8266 microcontrollers with non-blocking firmware routines.",
      "Set up lightweight MQTT publish-subscribe broker streams for sub-50ms actuator triggering.",
      "Integrated ThingSpeak IoT telemetry channels logging power usage trends."
    ],
    skillsUsed: ["Arduino/ESP32", "MQTT/CoAP", "C/C++", "Security"]
  },

  // 7. IoT Telemetry: Remote Health, Weather & Air Quality
  {
    id: "iot-telemetry-grid",
    title: "IoT Health & Environmental Telemetry Grid",
    codeName: "IOT-SENSE-TELEMETRY",
    tagline: "Remote Health Vital Telemetry, Weather Station & Optical Air Quality Array",
    status: "DEPLOYED",
    category: "IoT, Environmental Sensing & Health Telemetry",
    domain: "iot",
    clearanceLevel: "LEVEL-02 TELEMETRY",
    problem: "Real-time remote physiological monitoring and localized microclimate/air pollution tracking require accessible, low-power sensor nodes capable of transmitting data without heavy infrastructure.",
    solution: "An integrated sensor array comprising a Remote Health Monitor (heart rate, SpO2 pulse oximetry, emergency threshold triggers), an automated Weather Station (temperature, barometric pressure, rain detection), and an Air Quality Monitor (particulate matter, VOC & gas detection) streaming to live IoT cloud dashboards.",
    techStack: [
      { name: "ESP32 Microcontrollers", category: "Hardware / IoT", highlight: true },
      { name: "Pulse Oximeter & Biosensors", category: "Hardware / IoT", highlight: true },
      { name: "DHT22 / BMP280 / MQ-135", category: "Hardware / IoT", highlight: true },
      { name: "ThingSpeak & Blynk Cloud", category: "Hardware / IoT", highlight: true },
      { name: "C++ / Embedded C", category: "Hardware / IoT" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng",
    teamRole: "Lead IoT Hardware Developer",
    keyContributions: [
      "Constructed multi-sensor data acquisition pipeline with noise-filtering DSP filters.",
      "Engineered automated SMS/email alert triggers for abnormal vital signs and pollution spikes.",
      "Configured low-power deep-sleep modes extending battery lifetime for remote nodes."
    ],
    skillsUsed: ["Arduino/ESP32", "MQTT/CoAP", "C/C++", "Python"]
  },

  // 8. AI Memory Map
  {
    id: "ai-memory-map",
    title: "AI Memory Map",
    codeName: "SYNAPSE-GRAPH-AI",
    tagline: "Cognitive Visual Memory Graph & Contextual Association Engine",
    status: "ACTIVE BUILD",
    category: "AI / ML & Knowledge Graphs",
    domain: "ai",
    clearanceLevel: "LEVEL-02 COGNITION",
    problem: "LLM conversational context is frequently lost across sessions, leading to fragmented reasoning and disjointed understanding of interconnected ideas.",
    solution: "An interactive graph-based memory mapping system that visually clusters concepts, creates dynamic associative links between stored nodes, and provides contextual recall for AI agents.",
    aiArchitecture: "Employs semantic vector embeddings combined with force-directed graph spatialization to map memory nodes by conceptual similarity.",
    techStack: [
      { name: "Python", category: "AI / ML", highlight: true },
      { name: "Vector Embeddings", category: "AI / ML", highlight: true },
      { name: "Knowledge Graphs", category: "AI / ML", highlight: true },
      { name: "TypeScript", category: "Frontend" },
      { name: "React", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/-AI-Memory-Map-",
    teamRole: "AI Architect & Graph Developer",
    keyContributions: [
      "Designed associative memory graph schema with bidirectional synaptic links.",
      "Integrated fast vector cosine similarity computation for real-time node clustering.",
      "Created visual memory exploration canvas with smooth zoom and inspect states."
    ],
    skillsUsed: ["Python", "AI Models", "Machine Learning", "TypeScript", "React"]
  },

  // 9. Autonomous Frontend Marketing AI Agent
  {
    id: "autonomous-marketing-agent",
    title: "Autonomous Frontend Marketing AI Agent",
    codeName: "AUTO-MARKET-AGENT-X",
    tagline: "Multi-Agent Autonomous Pipeline for Dynamic Web & Marketing Generation",
    status: "ACTIVE BUILD",
    category: "AI Agents & Autonomous Systems",
    domain: "ai",
    clearanceLevel: "LEVEL-02 AGENTIC",
    problem: "Generating bespoke landing pages, campaign copy, and brand assets requires multiple specialized human roles and tedious manual alignment.",
    solution: "An autonomous multi-agent orchestration framework where specialized sub-agents collaborate to research target audiences, write high-converting copy, and synthesize responsive frontend code in minutes.",
    aiArchitecture: "Multi-agent chain-of-thought architecture with automated critique-and-refine feedback loops verifying UI accessibility and styling constraints.",
    techStack: [
      { name: "Python", category: "Backend", highlight: true },
      { name: "LLM Orchestration", category: "AI / ML", highlight: true },
      { name: "TypeScript", category: "Frontend", highlight: true },
      { name: "React / Tailwind", category: "Frontend" },
      { name: "Multi-Agent Systems", category: "AI / ML", highlight: true }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/The-Ultimate-Autonomous-Frontend-Marketing-AI-Agent",
    teamRole: "Lead AI Agent Architect",
    keyContributions: [
      "Architected autonomous agent pipeline with role-specialized prompt chains.",
      "Engineered automated code validation compiler ensuring zero hallucinated syntax.",
      "Built interactive dashboard monitoring agent execution states and token telemetry."
    ],
    skillsUsed: ["Python", "AI Models", "TypeScript", "React", "Tailwind CSS"]
  },

  // 10. Parthu Labs AI Portfolio Generator
  {
    id: "ai-portfolio-generator",
    title: "Parthu Labs AI Portfolio Generator",
    codeName: "PORTFOLIO-GEN-LABS",
    tagline: "Intelligent Case Study Architect & Portfolio Synthesis Engine",
    status: "STABLE RELEASE",
    category: "AI Tools & Web Automation",
    domain: "ai",
    clearanceLevel: "LEVEL-02 CREATIVE",
    problem: "Engineers and designers struggle to convert dense GitHub repositories into compelling, structured project case files and interactive portfolio presentations.",
    solution: "An intelligent portfolio synthesis engine that analyzes repository metadata, code architecture, and commit histories to automatically construct interactive, production-ready portfolio showcases.",
    techStack: [
      { name: "TypeScript", category: "Frontend", highlight: true },
      { name: "React 19", category: "Frontend", highlight: true },
      { name: "Generative AI", category: "AI / ML", highlight: true },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/Parthu-Labs-AI-Portfolio-Generator",
    otherBuilds: [
      {
        label: "AI Portfolio Generator Alternative Repo",
        url: "https://github.com/nandipalleparthu-eng/AI-PORTFOLIO-GENERATOR---PARTHU",
        note: "Core generator engine repository and template builder."
      }
    ],
    teamRole: "Full-Stack & AI Engineer",
    keyContributions: [
      "Built automated repo parser that extracts architecture blueprints and tech tags.",
      "Implemented dynamic dark-mode showcase templates with responsive typography.",
      "Engineered one-click export to static deployable bundles."
    ],
    skillsUsed: ["React", "TypeScript", "AI Models", "Tailwind CSS", "JavaScript"]
  },

  // 11. PoseAssist
  {
    id: "pose-assist",
    title: "PoseAssist",
    codeName: "BIO-VISION-POSE",
    tagline: "Real-Time AI Computer Vision Pose Estimation & Posture Correction",
    status: "DEPLOYED",
    category: "Computer Vision & Biomechanics",
    domain: "ai",
    clearanceLevel: "LEVEL-02 VISION",
    problem: "Poor physical posture and improper exercise form lead to chronic musculoskeletal strain without affordable real-time biometric feedback.",
    solution: "A computer-vision posture correction application utilizing skeletal keypoint tracking to detect ergonomic misalignments and form errors in real-time with zero specialized hardware.",
    aiArchitecture: "Utilizes lightweight landmark detection models running at 30+ FPS directly in the browser/client, calculating joint angles using vector trigonometric algebra.",
    techStack: [
      { name: "OpenCV", category: "AI / ML", highlight: true },
      { name: "MediaPipe / Pose", category: "AI / ML", highlight: true },
      { name: "Python", category: "AI / ML", highlight: true },
      { name: "JavaScript", category: "Frontend" },
      { name: "Real-Time Vision", category: "AI / ML" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/PoseAssist",
    teamRole: "Computer Vision Developer",
    keyContributions: [
      "Developed angle computation algorithm for real-time spine and neck alignment.",
      "Optimized frame processing pipeline for low-latency web camera feeds.",
      "Added audio-visual cues alerting users to ergonomic posture degradation."
    ],
    skillsUsed: ["OpenCV", "Python", "Machine Learning", "AI Models", "JavaScript"]
  },

  // 12. SafeRoute AI
  {
    id: "saferoute-ai",
    title: "SafeRoute AI",
    codeName: "SENTINEL-ROUTE-AI",
    tagline: "Intelligent Urban Safety Navigation & Predictive Threat Assessment",
    status: "ACTIVE BUILD",
    category: "AI Navigation & Predictive Safety",
    domain: "ai",
    clearanceLevel: "LEVEL-02 GEOSPATIAL",
    problem: "Standard map navigation optimizes strictly for travel time, routing pedestrians through poorly lit, isolated, or high-risk zones without considering personal safety.",
    solution: "A safety-centric navigation platform combining real-time incident telemetry, street illumination data, and predictive risk scoring to recommend secure transit corridors.",
    aiArchitecture: "Neural risk assessment classifier weighing historical incident patterns, ambient lighting metrics, and real-time user crowd density.",
    techStack: [
      { name: "Python", category: "AI / ML", highlight: true },
      { name: "Geospatial Routing", category: "Backend", highlight: true },
      { name: "Machine Learning", category: "AI / ML", highlight: true },
      { name: "React", category: "Frontend" },
      { name: "Leaflet / Maps", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/saferoute-ai",
    teamRole: "AI & Geospatial Developer",
    keyContributions: [
      "Engineered multi-criteria routing algorithm balancing travel distance against safety score.",
      "Built dynamic safety heatmap overlay with live hazard reporting.",
      "Integrated emergency SOS beacon trigger with automated location broadcasting."
    ],
    skillsUsed: ["Python", "Machine Learning", "AI Models", "React", "TypeScript"]
  },

  // 13. Ultimate Port Scanner
  {
    id: "ultimate-port-scanner",
    title: "Ultimate Port Scanner",
    codeName: "NET-RECON-PROBE",
    tagline: "High-Speed Multithreaded Network Reconnaissance & Service Auditor",
    status: "STABLE RELEASE",
    category: "Network Security & Reconnaissance",
    domain: "cyber",
    clearanceLevel: "LEVEL-02 RECON",
    problem: "Network penetration testers require fast, lightweight, and customizable socket auditing tools capable of scanning subnets without heavy dependency bloat.",
    solution: "A multithreaded asynchronous network port scanner and service banner grabber designed for high-speed target scanning, service fingerprinting, and open vulnerability flagging.",
    techStack: [
      { name: "Python", category: "Security", highlight: true },
      { name: "AsyncIO / Sockets", category: "Security", highlight: true },
      { name: "Multithreading", category: "Backend", highlight: true },
      { name: "Network Protocols", category: "Security" },
      { name: "Linux / CLI", category: "Security" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/ultimate-port-scanner",
    teamRole: "Security Tooling Engineer",
    keyContributions: [
      "Implemented concurrent non-blocking socket connect engine scanning 1,000 ports in seconds.",
      "Engineered intelligent banner grabbing for service version identification.",
      "Added structured JSON/CSV export for automated penetration testing pipelines."
    ],
    skillsUsed: ["Python", "Security", "Linux", "Algorithms"]
  },

  // 14. Python Password Cracker Demo
  {
    id: "password-cracker-demo",
    title: "Python Password Cracker & Entropy Lab",
    codeName: "HASH-COLLISION-LAB",
    tagline: "Cryptographic Hash Security Analysis & Brute-Force Vulnerability Demo",
    status: "RESEARCH LAB",
    category: "Cryptanalysis & Security Research",
    domain: "cyber",
    clearanceLevel: "LEVEL-02 AUDIT",
    problem: "Demonstrating how weak hashing algorithms (MD5, SHA-1) and low-entropy passphrases succumb to dictionary and rainbow table attacks in educational security labs.",
    solution: "A security demonstration suite showcasing multi-threaded cryptographic hash cracking, salt-verification, and password entropy calculation with mathematical resistance analysis.",
    techStack: [
      { name: "Python", category: "Security", highlight: true },
      { name: "Hashlib / Cryptography", category: "Security", highlight: true },
      { name: "Multiprocessing", category: "Backend" },
      { name: "Entropy Analysis", category: "Security" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/python-password-cracker-demo",
    teamRole: "Security Researcher",
    keyContributions: [
      "Built multi-core dictionary attack engine with benchmark metrics.",
      "Implemented password strength scoring based on Shannon entropy.",
      "Demonstrated the cryptographic necessity of bcrypt/Argon2 slow hashing."
    ],
    skillsUsed: ["Python", "Cryptography", "Security", "Algorithms"]
  },

  // 15. Secure HCI
  {
    id: "secure-hci",
    title: "Secure HCI",
    codeName: "BIOMETRIC-HCI-PROTO",
    tagline: "Secure Human-Computer Interface & Tamper-Resistant Authentication Protocol",
    status: "ACTIVE BUILD",
    category: "HCI & Authentication Security",
    domain: "cyber",
    clearanceLevel: "LEVEL-02 PROTOCOL",
    problem: "Traditional human-computer interactions in sensitive environments are vulnerable to shoulder surfing, replay attacks, and unauthorized session hijacking.",
    solution: "A secured human-computer interaction protocol integrating behavioral keystroke dynamics, localized biometric verification, and encrypted channel handshakes.",
    techStack: [
      { name: "Python / C++", category: "Security", highlight: true },
      { name: "Biometric Handshake", category: "Security", highlight: true },
      { name: "Cryptography", category: "Security", highlight: true },
      { name: "HCI Protocols", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/secure-hci",
    otherBuilds: [
      {
        label: "Secure HCI Experimental Build",
        url: "https://github.com/nandipalleparthu-eng/secure-hci134124312",
        note: "Continuous behavioral telemetry research branch."
      }
    ],
    teamRole: "HCI Security Researcher",
    keyContributions: [
      "Engineered behavioral anomaly detection algorithms during user interaction sessions.",
      "Implemented secure key exchange ensuring hardware interface integrity.",
      "Designed privacy-preserving local verification with zero cloud credential transmission."
    ],
    skillsUsed: ["Security", "Cryptography", "Python", "C/C++"]
  },

  // 16. IdeaToProject
  {
    id: "idea-to-project",
    title: "IdeaToProject",
    codeName: "ARCHITECT-GEN-01",
    tagline: "AI Concept-to-Architecture Pipeline & Scaffold Generator",
    status: "ACTIVE BUILD",
    category: "Developer Tooling & System Synthesis",
    domain: "ai",
    clearanceLevel: "LEVEL-02 ARCHITECT",
    problem: "Transforming vague conceptual software ideas into concrete system architectures, database schemas, and API endpoints is time-consuming for developers.",
    solution: "An AI-powered development pipeline that converts natural language project concepts into comprehensive architecture blueprints, entity relationship diagrams, and starter code scaffolds.",
    techStack: [
      { name: "Python", category: "Backend", highlight: true },
      { name: "LLM Frameworks", category: "AI / ML", highlight: true },
      { name: "TypeScript", category: "Frontend" },
      { name: "React", category: "Frontend" },
      { name: "API Synthesis", category: "Backend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/Ideatoproject",
    teamRole: "Lead System Architect",
    keyContributions: [
      "Created structured domain prompt engine generating production-ready architectural schemas.",
      "Built interactive tree visualizer for inspecting microservice and module boundaries.",
      "Implemented automated package.json and boilerplate file generation."
    ],
    skillsUsed: ["Python", "AI Models", "TypeScript", "React", "Node.js"]
  },

  // 17. Weave App
  {
    id: "weave-app",
    title: "Weave App",
    codeName: "WEAVE-FLOW-CANVAS",
    tagline: "Node-Based Visual Workflow Engine & Connected Canvas Interface",
    status: "STABLE RELEASE",
    category: "Web Systems & Interactive Canvas",
    domain: "web",
    clearanceLevel: "LEVEL-02 INTERACTION",
    problem: "Complex multi-step digital workflows are difficult to visualize and orchestrate without an intuitive visual node canvas.",
    solution: "A high-performance web canvas platform enabling users to create, connect, and execute visual node graphs with real-time data streaming between interconnected modules.",
    techStack: [
      { name: "React", category: "Frontend", highlight: true },
      { name: "TypeScript", category: "Frontend", highlight: true },
      { name: "Canvas 2D / SVG", category: "Frontend", highlight: true },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "State Machine", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/weave-app",
    teamRole: "Frontend Canvas Architect",
    keyContributions: [
      "Engineered fluid drag-and-drop node graph canvas with custom Bezier wire connections.",
      "Implemented reactive dataflow propagation engine across interconnected nodes.",
      "Built customizable node library with extensible input/output socket typings."
    ],
    skillsUsed: ["React", "TypeScript", "JavaScript", "Tailwind CSS"]
  },

  // 18. 2D Transformations Playground
  {
    id: "2d-transformations",
    title: "2D Transformations Playground",
    codeName: "MATRIX-RENDER-LAB",
    tagline: "Interactive Affine Transformation Matrix & Computer Graphics Visualizer",
    status: "DEPLOYED",
    category: "Computer Graphics & Computational Geometry",
    domain: "web",
    clearanceLevel: "LEVEL-02 GRAPHICS",
    problem: "Understanding 3x3 affine transformation matrices (translation, scaling, rotation, shearing, reflection) is abstract without real-time visual coordinate feedback.",
    solution: "An interactive graphics playground that renders real-time matrix multiplication, basis vector alterations, and geometric transformations on custom 2D polygon vertices.",
    techStack: [
      { name: "JavaScript", category: "Frontend", highlight: true },
      { name: "HTML5 Canvas 2D", category: "Frontend", highlight: true },
      { name: "Matrix Math / Linear Algebra", category: "Frontend", highlight: true },
      { name: "CSS3", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/2d-transformations-playground",
    teamRole: "Graphics & Math Developer",
    keyContributions: [
      "Implemented custom 3x3 matrix multiplication engine from scratch without external math libraries.",
      "Rendered interactive basis vectors (i-hat, j-hat) with live coordinate grid deformation.",
      "Built step-by-step matrix composition chain showing composite transformations."
    ],
    skillsUsed: ["JavaScript", "Algorithms", "C/C++", "React"]
  },

  // 19. Flight Booking System
  {
    id: "flight-booking-system",
    title: "Flight Booking System",
    codeName: "AERO-RESERVE-CORE",
    tagline: "Full-Stack Distributed Flight Reservation & Seat Allocation Engine",
    status: "STABLE RELEASE",
    category: "Full-Stack Distributed Systems",
    domain: "web",
    clearanceLevel: "LEVEL-02 ENTERPRISE",
    problem: "Airline reservation systems must handle concurrent seat lock contention, dynamic fare scaling, and instant ticket itinerary generation without transaction race conditions.",
    solution: "A complete distributed flight reservation platform featuring interactive aircraft seat-map selection, transactional booking pipelines, and automated boarding pass generation.",
    techStack: [
      { name: "Python / Django", category: "Backend", highlight: true },
      { name: "SQL Database", category: "Database", highlight: true },
      { name: "JavaScript", category: "Frontend" },
      { name: "HTML5 / Bootstrap", category: "Frontend" },
      { name: "REST API", category: "Backend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/flight_booking_system",
    teamRole: "Full-Stack Backend Engineer",
    keyContributions: [
      "Architected transactional database schema preventing double-booking race conditions.",
      "Designed dynamic pricing calculation engine based on seat occupancy levels.",
      "Created intuitive aircraft cabin layout UI with real-time seat availability states."
    ],
    skillsUsed: ["Python", "JavaScript", "Node.js", "Algorithms"]
  },

  // 20. Linux Dualboot Proof & Systems Architecture
  {
    id: "linux-dualboot-proof",
    title: "Linux Dualboot & Low-Level Architecture",
    codeName: "KERNEL-BOOT-PROOF",
    tagline: "UEFI/GRUB Boot Partitioning, Kernel Level Configurations & Linux Systems",
    status: "STABLE RELEASE",
    category: "Systems Engineering & Linux Internals",
    domain: "iot",
    clearanceLevel: "LEVEL-02 KERNEL",
    problem: "Configuring hardware-level dual-boot environments with secure boot constraints, NVMe storage partitioning, and kernel module tuning requires precise low-level understanding.",
    solution: "Documented proof and scripts for hardware partition table management, GRUB bootloader configuration, driver firmware provisioning, and Linux kernel optimization.",
    techStack: [
      { name: "Linux / Bash", category: "DevOps", highlight: true },
      { name: "UEFI / GRUB", category: "Security", highlight: true },
      { name: "Kernel Configs", category: "Backend" },
      { name: "Systems Architecture", category: "Hardware / IoT" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/linux_dualboot_proof",
    teamRole: "Systems & Linux Engineer",
    keyContributions: [
      "Implemented EFI system partition management with fallback bootloader chains.",
      "Configured custom kernel compilation flags optimizing I/O throughput.",
      "Documented hardware-level firmware verification and disk encryption routines."
    ],
    skillsUsed: ["Linux", "C/C++", "Security"]
  },

  // 21. Nandipalle Parthu Portfolio
  {
    id: "parthu-portfolio",
    title: "Nandipalle Parthu Digital Experience",
    codeName: "SPIDER-WEB-EXPERIENCE",
    tagline: "Physics-Driven Web Ecosystem & Digital Presence Node",
    status: "ACTIVE BUILD",
    category: "Interactive Experience & Creative Engineering",
    domain: "web",
    clearanceLevel: "LEVEL-01 CORE",
    problem: "Static portfolio websites fail to represent the dynamic interdisciplinary links between AI models, security research, hardware systems, and full-stack software.",
    solution: "A physics-based spider-web network portfolio where every project, skill, and mission is an elastic strand connected directly to Parthu at the central nexus.",
    techStack: [
      { name: "React 19", category: "Frontend", highlight: true },
      { name: "TypeScript", category: "Frontend", highlight: true },
      { name: "D3 Force Simulation", category: "Frontend", highlight: true },
      { name: "HTML5 Canvas 2D", category: "Frontend", highlight: true },
      { name: "Web Audio API", category: "Frontend", highlight: true },
      { name: "Tailwind CSS", category: "Frontend" }
    ],
    githubUrl: "https://github.com/nandipalleparthu-eng/Nandipalle-Parthu-Portfolio",
    teamRole: "Creator & Lead Engineer",
    keyContributions: [
      "Created custom spring-damper spider-web physics engine on HTML5 Canvas.",
      "Synthesized interactive Web Audio sound effects for tactile strand plucks.",
      "Built Spider-Sense semantic scanner parsing multi-domain portfolio nodes in real time."
    ],
    skillsUsed: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Algorithms"]
  }
];

export const HACKATHONS_DATA: HackathonMission[] = [
  {
    id: "mission-mindkraft-friday",
    name: "MINDKRAFT 2026 — 1st Prize Winner",
    codeName: "OPERATION: FRIDAY-EXPO-1ST",
    event: "International Level Techno-Management Expo, MINDKRAFT 2026",
    date: "2026",
    role: "Sole Creator & Lead AI/HCI Architect",
    problem: "Developing an intuitive, hands-free multimodal AI desktop companion combining touchless hand-gesture navigation, face ID, and voice autonomy.",
    project: "FRIDAY (Multimodal AI Personal Assistant)",
    projectId: "friday-ai",
    technologies: ["Python", "OpenCV", "MediaPipe", "SpeechRecognition", "PyAutoGUI", "Local LLM"],
    outcome: "Won 1st Prize in the CSE Department at the International Level Techno-Management Expo, MINDKRAFT 2026! (CSE Department also secured overall first prize).",
    status: "CHAMPION / FINALIST",
    githubUrl: "https://github.com/nandipalleparthu-eng",
    learnings: [
      "Real-time sensor fusion combining high-speed optical keypoint tracking with speech recognition pipelines.",
      "Designing resilient fallback mechanisms for touchless cursor navigation under varying ambient lighting.",
      "Showcasing live technical hardware-software demonstrations to international evaluators."
    ]
  },
  {
    id: "mission-cryptogram",
    name: "MINDKRAFT 2026 — Cryptogram 2.0 (4th Place)",
    codeName: "OPERATION: CRYPTOGRAM-SOLVER",
    event: "MINDKRAFT 2026 International Crypto Arena",
    date: "2026",
    role: "Cryptographic Researcher & Solver",
    problem: "Cracking multi-stage classical ciphers, modern asymmetric keys, and stream cipher vulnerabilities under intense countdown.",
    project: "Secure Cryptography Toolkit & Cipher Analysis",
    projectId: "crypto-toolkit",
    technologies: ["Python", "RSA/AES Math", "Modular Arithmetic", "Cryptanalysis"],
    outcome: "Secured 4th Place in Cryptogram 2.0 at MINDKRAFT 2026, breaking complex encrypted payload matrices.",
    status: "COMPLETED",
    githubUrl: "https://github.com/nandipalleparthu-eng/Secure-Cryptography-Toolkit---Parthu",
    learnings: [
      "High-speed cryptanalytic factorization and padding attack techniques.",
      "Optimizing Python scripts for rapid algorithmic puzzle solving."
    ]
  },
  {
    id: "mission-hashes-over-roses",
    name: "MINDKRAFT 2026 — Hashes Over Roses 3.0 (5th Place)",
    codeName: "OPERATION: HASH-BREAKER-5TH",
    event: "MINDKRAFT 2026 Cybersecurity & Forensics Sprint",
    date: "2026",
    role: "Security & Hash Forensic Analyst",
    problem: "Identifying cryptographic hash collisions, cracking salted digest challenges, and discovering obfuscated flag vectors.",
    project: "Custom-CTF & Password Cracker Demo",
    projectId: "custom-ctf",
    technologies: ["Python", "Hashlib", "Multiprocessing", "Entropy Analysis", "Linux"],
    outcome: "Secured 5th Place in Hashes Over Roses 3.0 at MINDKRAFT 2026, demonstrating fast security and analytical skills.",
    status: "COMPLETED",
    githubUrl: "https://github.com/nandipalleparthu-eng/Custom-CTF",
    learnings: [
      "Multi-core hash dictionary optimization and entropy profiling under time pressure.",
      "Practical forensics for detecting tampered cryptographic hashes."
    ]
  },
  {
    id: "mission-t4g-artha",
    name: "Tech For Good (T4G) National Hackathon Challenge",
    codeName: "OPERATION: ARTHA-T4G",
    event: "National Tech For Good Hackathon Challenge",
    date: "2024",
    role: "Team Lead & Lead AI Architect",
    problem: "Inefficiencies, food waste, and middleman exploitation in rural agricultural supply chains.",
    project: "ARTHA (Agricultural Resource Trading & Harvest Analytics)",
    projectId: "artha",
    technologies: ["React", "TypeScript", "AI Vision", "Node.js", "Tailwind CSS", "Anime.js"],
    outcome: "Built and deployed 3 functional builds (Live Story Deck, T4G Prototype, and GDR Logistics Node). Highly commended for multi-sector coordination UX.",
    status: "CHAMPION / FINALIST",
    demoUrl: "https://artha-story-deck.netlify.app/",
    githubUrl: "https://github.com/nandipalleparthu-eng/ARTHA",
    learnings: [
      "Rapid end-to-end prototyping under intense 36-hour sprint constraints.",
      "Translating complex supply-chain economics into intuitive 4-portal interface.",
      "Designing offline-first edge AI models for rural farmer connectivity."
    ]
  },
  {
    id: "mission-ai-innovation",
    name: "AI / ML Innovation Sprint",
    codeName: "OPERATION: NEURAL-PULSE",
    event: "University AI & Deep Learning Hackfest",
    date: "2024",
    role: "ML Model Developer",
    problem: "Real-time edge visual diagnostics without high-end cloud compute dependencies.",
    project: "PoseAssist & Computer Vision Lab",
    projectId: "pose-assist",
    technologies: ["PyTorch", "OpenCV", "Python", "MediaPipe"],
    outcome: "Achieved sub-35ms inference latency on standard commodity webcams for real-time biomechanical feedback.",
    status: "DEPLOYED SPRINT",
    githubUrl: "https://github.com/nandipalleparthu-eng/PoseAssist",
    learnings: [
      "Quantization-aware training workflows in computer vision pipelines.",
      "Optimizing video frame buffer throughput for zero latency rendering."
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // AI/ML & MULTIMODAL
  {
    id: "skill-python",
    name: "Python",
    category: "LANGUAGES",
    domain: "ai",
    proficiency: "ADVANCED",
    summary: "Primary language for AI/ML neural models, FRIDAY assistant, computer vision pipelines, multi-agent frameworks, and security tools.",
    connectedProjectIds: ["friday-ai", "artha", "crypto-toolkit", "custom-ctf", "ai-memory-map", "autonomous-marketing-agent", "pose-assist", "saferoute-ai", "smart-kissan", "ultimate-port-scanner", "password-cracker-demo", "idea-to-project", "flight-booking-system"],
    coreConcepts: ["PyTorch", "NumPy", "OpenCV", "AsyncIO", "Data Structures", "Multi-Agent Chains"]
  },
  {
    id: "skill-aimodels",
    name: "AI Models, LLMs & Multi-Agent Frameworks",
    category: "AI / ML",
    domain: "ai",
    proficiency: "ADVANCED",
    summary: "Local AI/LLM deployment, voice assistants (FRIDAY), autonomous agent orchestration, vector knowledge graphs, and local inference quantization.",
    connectedProjectIds: ["friday-ai", "artha", "ai-memory-map", "autonomous-marketing-agent", "ai-portfolio-generator", "idea-to-project", "saferoute-ai", "smart-kissan"],
    coreConcepts: ["Local LLM Deployment", "Agent Orchestration", "Vector Embeddings", "Quantization", "Voice & Multimodal Systems"]
  },
  {
    id: "skill-ml",
    name: "Machine Learning & Deep Learning",
    category: "AI / ML",
    domain: "ai",
    proficiency: "ADVANCED",
    summary: "Supervised and unsupervised learning, predictive forecasting, neural architectures, crop risk scoring, and feature engineering.",
    connectedProjectIds: ["friday-ai", "artha", "smart-kissan", "ai-memory-map", "pose-assist", "saferoute-ai"],
    coreConcepts: ["Regression", "Time-Series Forecasting", "Feature Engineering", "Model Evaluation"]
  },
  {
    id: "skill-opencv",
    name: "OpenCV, MediaPipe & Computer Vision",
    category: "AI / ML",
    domain: "ai",
    proficiency: "ADVANCED",
    summary: "Touchless hand-gesture cursor control (FRIDAY), skeletal pose tracking (PoseAssist), facial identification, and real-time video stream inspection.",
    connectedProjectIds: ["friday-ai", "pose-assist", "artha", "smart-kissan"],
    coreConcepts: ["MediaPipe Hands/Face", "Touchless Cursor Navigation", "Edge Detection", "Contour Analysis", "Frame Buffering"]
  },

  // IOT & EMBEDDED SYSTEMS
  {
    id: "skill-iot-hardware",
    name: "Arduino, ESP32 & ESP8266",
    category: "IoT",
    domain: "iot",
    proficiency: "ADVANCED",
    summary: "Embedded microcontroller programming, sensor interfacing (ultrasonic, PIR, DHT22, pulse oximetry, gas sensors), and hardware telemetry.",
    connectedProjectIds: ["iot-smart-grid", "iot-telemetry-grid"],
    coreConcepts: ["ESP32 Firmware", "ESP8266 Wi-Fi", "GPIO & ADC Interfacing", "Power Management", "Non-blocking C++"]
  },
  {
    id: "skill-iot-protocols",
    name: "MQTT, CoAP, Blynk & ThingSpeak",
    category: "IoT",
    domain: "iot",
    proficiency: "ADVANCED",
    summary: "Publish-subscribe IoT protocol architecture, lightweight CoAP streaming, cloud dashboard telemetry, and real-time mobile widget sync.",
    connectedProjectIds: ["iot-smart-grid", "iot-telemetry-grid"],
    coreConcepts: ["MQTT Brokers", "CoAP RESTful IoT", "ThingSpeak Analytics", "Blynk Dashboards", "Alert Webhooks"]
  },

  // WEB & FRONTEND
  {
    id: "skill-react",
    name: "React",
    category: "WEB DEVELOPMENT",
    domain: "web",
    proficiency: "ADVANCED",
    summary: "Building highly interactive, component-driven client applications, state graphs, and custom canvas bridges.",
    connectedProjectIds: ["artha", "ai-portfolio-generator", "weave-app", "2d-transformations", "parthu-portfolio", "smart-kissan", "saferoute-ai"],
    coreConcepts: ["Custom Hooks", "State Management", "Performance Optimization", "Canvas Integration"]
  },
  {
    id: "skill-typescript",
    name: "TypeScript",
    category: "WEB DEVELOPMENT",
    domain: "web",
    proficiency: "ADVANCED",
    summary: "Strict type safety, generic interfaces, complex domain modeling, and robust API contracts.",
    connectedProjectIds: ["artha", "ai-portfolio-generator", "weave-app", "parthu-portfolio", "autonomous-marketing-agent", "ai-memory-map"],
    coreConcepts: ["Generics", "Discriminated Unions", "Type Narrowing", "Strict Schema Design"]
  },
  {
    id: "skill-javascript",
    name: "JavaScript",
    category: "LANGUAGES",
    domain: "web",
    proficiency: "ADVANCED",
    summary: "Modern ESNext, asynchronous event loop mastery, Web Audio API, Canvas 2D / WebGL rendering.",
    connectedProjectIds: ["artha", "weave-app", "2d-transformations", "parthu-portfolio", "flight-booking-system", "pose-assist"],
    coreConcepts: ["Async / Await", "Canvas 2D", "Web Audio API", "Prototypes"]
  },
  {
    id: "skill-tailwind",
    name: "Tailwind CSS",
    category: "WEB DEVELOPMENT",
    domain: "web",
    proficiency: "ADVANCED",
    summary: "Precision responsive styling, cinematic dark mode layouts, high-density HUD systems, and custom theme tokens.",
    connectedProjectIds: ["artha", "ai-portfolio-generator", "weave-app", "parthu-portfolio", "autonomous-marketing-agent"],
    coreConcepts: ["Responsive Layouts", "Custom Themes", "Animation Tokens", "Component Utilities"]
  },
  {
    id: "skill-nodejs",
    name: "Node.js & Express",
    category: "WEB DEVELOPMENT",
    domain: "web",
    proficiency: "PROFICIENT",
    summary: "RESTful API creation, WebSocket telemetry pipelines, rate limiting, and microservice orchestration.",
    connectedProjectIds: ["artha", "ai-portfolio-generator", "flight-booking-system", "smart-kissan"],
    coreConcepts: ["Express Middleware", "WebSocket Servers", "Authentication Flow", "API Routing"]
  },

  // CYBERSECURITY & CRYPTOGRAPHY
  {
    id: "skill-cryptography",
    name: "Cryptography & Cipher Analysis",
    category: "CYBERSECURITY",
    domain: "cyber",
    proficiency: "ADVANCED",
    summary: "Symmetric and asymmetric encryption primitives (AES-GCM, RSA, ECDH), SHA-3/BLAKE2 hashing, and zero-knowledge proof verification. (4th in Cryptogram 2.0 @ MINDKRAFT 2026).",
    connectedProjectIds: ["crypto-toolkit", "custom-ctf", "password-cracker-demo", "secure-hci"],
    coreConcepts: ["AES-GCM", "RSA-OAEP", "ECC / ECDH", "SHA-3", "Zero-Knowledge Primitives", "Padding Attacks"]
  },
  {
    id: "skill-ctf",
    name: "CTF, Exploits & Hash Forensics",
    category: "CYBERSECURITY",
    domain: "cyber",
    proficiency: "ADVANCED",
    summary: "Capture-The-Flag challenge creation, vulnerability discovery, payload crafting, and binary analysis. (5th in Hashes Over Roses 3.0 @ MINDKRAFT 2026).",
    connectedProjectIds: ["custom-ctf", "crypto-toolkit", "ultimate-port-scanner", "password-cracker-demo"],
    coreConcepts: ["Reverse Engineering", "Web Security OWASP", "Binary Sandboxing", "Hash Collision Forensics"]
  },
  {
    id: "skill-security",
    name: "Security Fundamentals & Recon",
    category: "CYBERSECURITY",
    domain: "cyber",
    proficiency: "ADVANCED",
    summary: "Network security defense, attack surface reduction, network reconnaissance, socket port scanning, and secure protocol design.",
    connectedProjectIds: ["crypto-toolkit", "custom-ctf", "ultimate-port-scanner", "password-cracker-demo", "secure-hci", "linux-dualboot-proof"],
    coreConcepts: ["Port Reconnaissance", "Threat Modeling", "Input Sanitization", "Sandboxing"]
  },

  // SYSTEMS & LINUX
  {
    id: "skill-linux",
    name: "Linux & Systems Architecture",
    category: "IoT",
    domain: "iot",
    proficiency: "ADVANCED",
    summary: "Linux kernel level configurations, UEFI bootloaders, bash scripting, memory management, and system sandboxing.",
    connectedProjectIds: ["linux-dualboot-proof", "custom-ctf", "ultimate-port-scanner"],
    coreConcepts: ["Bash Scripting", "UEFI/GRUB", "Kernel Modules", "Process Isolation"]
  },
  {
    id: "skill-cpp",
    name: "C / C++",
    category: "LANGUAGES",
    domain: "iot",
    proficiency: "PROFICIENT",
    summary: "Low-level systems programming, embedded firmware for ESP32/Arduino, cryptographic algorithm implementations, and graphics matrices.",
    connectedProjectIds: ["crypto-toolkit", "iot-smart-grid", "iot-telemetry-grid", "secure-hci", "2d-transformations", "linux-dualboot-proof"],
    coreConcepts: ["Memory Management", "Pointers", "Modular Arithmetic", "Embedded C++"]
  },
  {
    id: "skill-algorithms",
    name: "Algorithms & Matrix Math",
    category: "LANGUAGES",
    domain: "web",
    proficiency: "ADVANCED",
    summary: "Linear algebra, affine matrix transformations, graph traversal, dynamic programming, and computational geometry.",
    connectedProjectIds: ["2d-transformations", "parthu-portfolio", "crypto-toolkit", "flight-booking-system", "friday-ai"],
    coreConcepts: ["Affine Matrices", "Graph Traversal", "D3 Physics", "Complexity Analysis"]
  }
];

// Generate initial Web Graph Nodes & Edges
export function buildPortfolioGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Central Core Node: PARTHU
  nodes.push({
    id: "node-parthu",
    label: "PARTHU",
    type: "central",
    category: "core",
    subtitle: "AI/ML Developer • Builder",
    description: "Central Nexus: B.Tech CSE (AI & ML) @ Karunya. Builder across Multimodal AI, Web, Cybersecurity, IoT & Systems.",
    level: 0,
    radius: 44,
    color: "#ef4444", // Spider Red
    highlightColor: "#ffffff",
    iconName: "Compass",
    x: 0,
    y: 0,
    pinned: true
  });

  // Level 1: Primary Branches (10 branches)
  const primaryBranches: { id: string; label: string; category: GraphNode['category']; icon: string; angle: number; dist: number; color: string; desc: string; targetId?: string }[] = [
    { id: "branch-ai", label: "AI / ML & HCI", category: "ai", icon: "Brain", angle: -90, dist: 175, color: "#a855f7", desc: "FRIDAY Assistant, SmartKisan, Vision & Autonomous Agents" },
    { id: "branch-web", label: "WEB DEV", category: "web", icon: "Globe", angle: 0, dist: 175, color: "#3b82f6", desc: "ARTHA Platform, Weave Canvas, 2D Matrix Engine & Booking" },
    { id: "branch-cyber", label: "CYBERSECURITY", category: "cyber", icon: "ShieldAlert", angle: 180, dist: 175, color: "#ef4444", desc: "Custom-CTF, Cryptography Toolkit, Port Scanner & Secure HCI" },
    { id: "branch-iot", label: "IoT & SYSTEMS", category: "iot", icon: "Cpu", angle: 90, dist: 175, color: "#10b981", desc: "Smart Garage/Classroom, Health Telemetry, ESP32 & Linux" },
    { id: "branch-projects", label: "PROJECTS", category: "core", icon: "FolderGit2", angle: 45, dist: 185, color: "#f59e0b", desc: "21+ Engineered Repositories, Deployments & AI Tools" },
    { id: "branch-hackathons", label: "HACKATHONS", category: "hackathon", icon: "Trophy", angle: 135, dist: 185, color: "#ec4899", desc: "MINDKRAFT 2026 1st Prize, Cryptogram 2.0, Hashes 3.0 & T4G" },
    { id: "branch-about", label: "IDENTITY", category: "core", icon: "User", angle: -135, dist: 185, color: "#06b6d4", desc: "Nandipalle Parthu: Student Builder Dossier (2025–2029)", targetId: "profile-dossier" },
    { id: "branch-github", label: "GITHUB", category: "core", icon: "GitBranch", angle: 225, dist: 220, color: "#94a3b8", desc: "Public Repositories: @nandipalleparthu-eng", targetId: "github-hub" },
    { id: "branch-linkedin", label: "LINKEDIN", category: "core", icon: "Share2", angle: 315, dist: 220, color: "#0284c7", desc: "Professional Profile: nandipalle-parthu-ai", targetId: "linkedin-hub" },
  ];

  primaryBranches.forEach(branch => {
    const rad = (branch.angle * Math.PI) / 180;
    nodes.push({
      id: branch.id,
      label: branch.label,
      type: "category",
      category: branch.category,
      subtitle: branch.desc,
      level: 1,
      radius: 26,
      color: branch.color,
      iconName: branch.icon,
      targetId: branch.targetId,
      x: Math.cos(rad) * branch.dist,
      y: Math.sin(rad) * branch.dist
    });

    edges.push({
      id: `edge-root-${branch.id}`,
      source: "node-parthu",
      target: branch.id,
      color: branch.color,
      distance: branch.dist,
      width: 2.2
    });
  });

  // Level 2: Project Nodes
  PROJECTS_DATA.forEach((proj, idx) => {
    const isArtha = proj.id === "artha";
    const isFriday = proj.id === "friday-ai";
    const isFlagship = isArtha || isFriday;
    const radius = isFlagship ? 34 : 20;
    const color = isFriday ? "#c084fc" : isArtha ? "#ef4444" : proj.domain === "ai" ? "#a855f7" : proj.domain === "cyber" ? "#ef4444" : proj.domain === "iot" ? "#10b981" : "#3b82f6";
    
    // Position projects strategically around their domains
    let parentBranchId = "branch-projects";
    if (proj.domain === "ai") parentBranchId = isFriday ? "branch-ai" : isArtha ? "branch-projects" : "branch-ai";
    else if (proj.domain === "cyber") parentBranchId = "branch-cyber";
    else if (proj.domain === "iot") parentBranchId = "branch-iot";
    else if (proj.domain === "web") parentBranchId = "branch-web";

    const baseAngle = isFriday ? -80 : isArtha ? 35 : (idx * 17 + 10) % 360;
    const baseDist = isFlagship ? 280 : 300 + (idx % 4) * 25;
    const rad = (baseAngle * Math.PI) / 180;

    const projNodeId = `node-proj-${proj.id}`;
    nodes.push({
      id: projNodeId,
      label: proj.title,
      type: "project",
      category: proj.domain,
      subtitle: proj.tagline,
      description: proj.problem,
      level: 2,
      radius: radius,
      color: color,
      iconName: isFriday ? "Sparkles" : isArtha ? "Wheat" : proj.domain === "cyber" ? "ShieldCheck" : proj.domain === "iot" ? "Cpu" : proj.domain === "ai" ? "Brain" : "Globe",
      targetId: proj.id,
      x: Math.cos(rad) * baseDist,
      y: Math.sin(rad) * baseDist
    });

    // Primary connection to category branch
    edges.push({
      id: `edge-${parentBranchId}-${projNodeId}`,
      source: parentBranchId,
      target: projNodeId,
      color: color,
      distance: 140,
      width: isFlagship ? 2.8 : 1.6
    });

    // Cross connection to "PROJECTS" hub
    if (parentBranchId !== "branch-projects") {
      edges.push({
        id: `edge-projects-${projNodeId}`,
        source: "branch-projects",
        target: projNodeId,
        color: "#f59e0b",
        distance: 160,
        dashed: true,
        width: 1.0
      });
    }

    // FRIDAY multi-disciplinary links
    if (isFriday) {
      edges.push({
        id: "edge-friday-root",
        source: "node-parthu",
        target: projNodeId,
        color: "#c084fc",
        distance: 210,
        width: 2.2
      });
    }

    // ARTHA multi-disciplinary links
    if (isArtha) {
      edges.push({
        id: "edge-artha-ai",
        source: "branch-ai",
        target: projNodeId,
        color: "#a855f7",
        distance: 150,
        width: 2.0
      });
      edges.push({
        id: "edge-artha-web",
        source: "branch-web",
        target: projNodeId,
        color: "#3b82f6",
        distance: 150,
        width: 2.0
      });
    }
  });

  // Level 2: Hackathon Mission Nodes
  HACKATHONS_DATA.forEach((mission, idx) => {
    const angle = 110 + idx * 22;
    const rad = (angle * Math.PI) / 180;
    const dist = 320 + (idx % 2) * 20;
    const missionNodeId = `node-mission-${mission.id}`;

    nodes.push({
      id: missionNodeId,
      label: mission.name,
      type: "mission",
      category: "hackathon",
      subtitle: `${mission.event} • ${mission.date}`,
      description: mission.outcome,
      level: 2,
      radius: 21,
      color: "#ec4899",
      iconName: "Trophy",
      targetId: mission.id,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist
    });

    edges.push({
      id: `edge-hackathon-${missionNodeId}`,
      source: "branch-hackathons",
      target: missionNodeId,
      color: "#ec4899",
      distance: 130,
      width: 1.6
    });

    // If mission is tied to project, link them!
    if (mission.projectId) {
      edges.push({
        id: `edge-mission-proj-${mission.id}`,
        source: missionNodeId,
        target: `node-proj-${mission.projectId}`,
        color: "#ec4899",
        dashed: true,
        distance: 150,
        width: 1.4
      });
    }
  });

  // Level 2: Key Skill Nodes
  SKILLS_DATA.forEach((skill, idx) => {
    const angle = (idx * 21 + 8) % 360;
    const rad = (angle * Math.PI) / 180;
    const dist = 410 + (idx % 3) * 35;
    const skillNodeId = `node-skill-${skill.id}`;
    const color = skill.domain === "ai" ? "#c084fc" : skill.domain === "web" ? "#60a5fa" : skill.domain === "cyber" ? "#f87171" : "#34d399";

    nodes.push({
      id: skillNodeId,
      label: skill.name,
      type: "skill",
      category: skill.domain,
      subtitle: `${skill.category} • ${skill.proficiency}`,
      description: skill.summary,
      level: 3,
      radius: 13,
      color: color,
      iconName: "Sparkles",
      targetId: skill.id,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist
    });

    // Connect skill to corresponding category branch
    const branchMap: Record<string, string> = {
      "ai": "branch-ai",
      "web": "branch-web",
      "cyber": "branch-cyber",
      "iot": "branch-iot",
      "core": "branch-projects",
      "hackathon": "branch-hackathons"
    };
    const parentBranch = branchMap[skill.domain] || "node-parthu";

    edges.push({
      id: `edge-${parentBranch}-${skillNodeId}`,
      source: parentBranch,
      target: skillNodeId,
      color: color,
      distance: 190,
      width: 0.9
    });

    // Cross-link skill to every project that uses it!
    skill.connectedProjectIds.forEach(pId => {
      edges.push({
        id: `edge-skill-${skill.id}-proj-${pId}`,
        source: skillNodeId,
        target: `node-proj-${pId}`,
        color: color,
        dashed: true,
        distance: 160,
        width: 0.7
      });
    });
  });

  return { nodes, edges };
}
