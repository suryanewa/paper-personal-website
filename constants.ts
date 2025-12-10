import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Surya Newa",
  title: "Product Manager & Designer",
  contact: {
    email: "newa@nyu.edu",
    phone: "(612) 295-5555",
    location: "New York, NY",
    website: "suryanewa.com",
    social: [
      { name: "LinkedIn", url: "https://linkedin.com/in/suryanewa" },
      { name: "GitHub", url: "https://github.com/suryanewa" },
      { name: "Medium", url: "https://medium.com/@suryanewa" },
      { name: "Substack", url: "https://suryanewa.substack.com" }
    ]
  },
  summary: "I build and ship end-to-end products by turning ambiguity into clarity, complexity into systems, and ideas into beautifully engineered experiences. My work lives at the intersection of product, design, and AI-driven execution.",
  education: [
    {
      id: "edu2",
      school: "Payton College Prep",
      location: "Chicago, IL",
      degree: "High School Diploma",
      year: "Jun 2022",
      details: [
        "Coursework: AP CS Principles, AP CS A, AP English Language, AP Calc BC, AP World History, AP Psychology, AP Microeconomics",
        "Activities: Creative AI Club (Founder, President), National Honor Society (Tutor, Volunteer), Wharton Investing Team (Analyst)"
      ]
    },
    {
      id: "edu1",
      school: "New York University",
      location: "New York, NY",
      degree: "B.A. in Product Management Minor in Integrated Design & Media",
      year: "May 2027",
      details: [
        "Coursework: Product Management, Agile Design, HCI, Ideation & Prototyping, Programming & Data Science, Business Statistics",
        "Activities: Entrepreneurial Exchange Group (Startup Team), STAC Lab (Peer Advisor), Product Management Club (Case Comp)"
      ]
    }
  ],
  experience: [
    {
      id: "exp2",
      role: "Engineering Intern",
      company: "Chipper Cash",
      location: "San Francisco, CA",
      period: "Jun 2025 – Aug 2025",
      description: [
        "Launched an ML-powered fraud alert pipeline that reduced manual review time by 60% through automation and anomaly detection.",
        "Implemented a backend (Python, Pub/Sub, Gmail API) optimizing data pipelines and reducing response times from 20 to 5 minutes.",
        "Built internal Retool and TypeScript dashboards visualizing card fraud data and improving auditability across 100+ weekly reviews."
      ]
    },
    {
      id: "exp1",
      role: "Product & Marketing Intern",
      company: "BenchPrep",
      location: "Chicago, IL",
      period: "May 2025 – Aug 2025",
      description: [
        "Coded a HubSpot-integrated Learning Power Index tool piloted with 50+ educational associations using HTML + CSS + JavaScript.",
        "Streamlined the prototype lifecycle by implementing structured user research and process optimization, cutting delivery time by 24%.",
        "Developed an AI sentiment analysis tool that aggregated learner feedback to boost conversions by 18% and driving KPI alignment."
      ]
    },
    {
      id: "exp3",
      role: "AI Product Management Intern",
      company: "Logic Information Systems",
      location: "Minneapolis, MN",
      period: "May 2023 – Jul 2023",
      description: [
        "Researched 20+ LLMs, CV, and RL models to define enterprise AI use cases and guide product roadmap and go-to-market strategy.",
        "Scoped and delivered 3 AI-driven POCs, advancing 2 to pilot deployment with cross-functional collaboration and MVP validation.",
        "Evaluated model performance using Mixpanel, Amplitude, and Tableau, reducing false positives by 10% to improve model reliability."
      ]
    }
  ],
  competitions: [
    {
      id: "comp1",
      award: "Best Undergraduate Team",
      event: "National Product Case Competition",
      role: "Product Lead & Developer",
      location: "New York, NY",
      date: "Nov 2025",
      link: "https://ios27.io",
      description: [
        "Built an AI-driven digital mindfulness update using gyroscope and screen-time data to reduce unintentional usage more consistently.",
        "Defined product vision, MVP, and success metrics with Agile sprints, design thinking, and behavioral analytics for clearer alignment.",
        "Won Best Undergraduate Team and placed second overall among 200+ undergraduate and graduate teams from eight universities."
      ]
    },
    {
      id: "comp2",
      award: "First Place Winner",
      event: "NYU x BrainStation Product Case Competition",
      role: "Product Lead & Developer",
      location: "New York, NY",
      date: "Nov 2025",
      link: "https://joinfreshi.com",
      description: [
        "Built a real-time food freshness visibility dashboard for distributors with smart routing using IoT APIs and ML to improve accuracy.",
        "Led product research, PRD creation, and MVP scoping using Agile, RICE, and data-driven planning for stronger product alignment.",
        "Won first place among sixteen undergraduate and graduate teams across all NYU schools by delivering rigorous product execution."
      ]
    }
  ],
  projects: [
    {
      id: "proj0",
      title: "EveryRepo - Codebase Mapping Engine",
      role: "Creator",
      period: "Present",
      tech: ["Developer Tools", "Code Intelligence", "Interactive Web"],
      logo: "/assets/logos/Every Repo Logo.svg",
      description: [
        "Mapping and visualizing the software ecosystem at scale, inspired by GitHub Next's speculative tooling and Glenn McDonald's Every Noise at Once system of musical embeddings.",
        "Exploring new ways developers can understand, navigate, and compare repositories using large-scale embeddings, graph visualizations, and interactive exploration."
      ],
      link: "https://everyrepo.com"
    },
    {
      id: "proj1",
      title: "LifeOS - Life Management System",
      role: "Founder & Developer",
      period: "Present",
      tech: ["AI", "Automation", "Productivity"],
      logo: "/assets/logos/LifeOS Logo.svg",
      description: [
        "Building an all-in-one life dashboard integrating tasks, notes, calendar, and more with automation and metrics for user productivity.",
        "Conducting interviews and online forum analysis to define MVP scope and identify key adoption drivers for early product-market fit."
      ],
      link: "https://joinlifeos.com"
    },
    {
      id: "proj6",
      title: "QuickTake - AI Answer Engine",
      role: "Creator",
      period: "2025",
      tech: ["AI", "Search", "Knowledge Retrieval"],
      logo: "/assets/logos/QuickTake Logo.svg",
      description: [
        "Built an AI-powered how-to and what-is answer engine that summarizes the best short-form videos into clear, trustworthy instruction cards.",
        "Prototyping ranking, embedding, and snippet-generation pipelines to identify high-quality clips and surface structured answers that reduce user friction in discovery."
      ],
      link: "http://quicktake.live"
    },
    {
      id: "proj7",
      title: "PawCare - Pet Health Monitoring",
      role: "Developer",
      period: "2025",
      tech: ["Hardware", "Health Monitoring", "Veterinary Tech"],
      logo: "/assets/logos/Pawcare Logo.svg",
      description: [
        "Developed a wearable collar device concept and clinic dashboard that track continuous pet health signals to surface early indicators of illness often missed during periodic vet visits.",
        "Conducted interviews with veterinarians and technicians to refine feature scope, validate pricing, and identify workflow gaps where continuous monitoring drives measurable clinical value."
      ],
      link: "https://pawcarehealth.vercel.app"
    },
    {
      id: "proj5",
      title: "iOS 27 - Digital Mindfulness Features",
      role: "Designer",
      period: "2025",
      tech: ["On-Device ML", "Digital Wellness", "Software"],
      logo: "/assets/logos/iOS 27 Logo.svg",
      description: [
        "Uses device sensors and usage patterns to detect close-screen behavior and doomscrolling, nudging users with gentle visual/haptic cues.",
        "Integrates into Focus Mode and Screen Time to reduce unintentional usage and improve posture, focus, and well-being."
      ],
      link: "https://ios27.io"
    },
    {
      id: "proj4",
      title: "Freshi - Food Inventory Routing",
      role: "Developer",
      period: "2025",
      tech: ["Logistics", "Real-Time Data", "IoT & Sensors"],
      logo: "/assets/logos/Freshi Logo.svg",
      description: [
        "Tracks freshness in transit and dynamically re-routes near-expiry shipments to closer retailers or food banks to reduce spoilage and cost.",
        "Aggregates real-time freshness scores across shipments to help distributors prevent rejections and cut waste."
      ],
      link: "https://joinfreshi.com"
    },
    {
      id: "proj2",
      title: "Courtl - Pickup Game Locator",
      role: "Developer",
      period: "2025",
      tech: ["Web App", "Maps API", "Real-time"],
      logo: "/assets/logos/Courtl Logo.svg",
      description: [
        "Built a web app that matches players to local pickup games using location, skill level, and time preferences for improved engagement.",
        "Designed an interactive map UI with real-time game listings, RSVP tracking, and team formation features for higher user activation."
      ],
      link: "https://courtl.io"
    },
    {
      id: "proj3",
      title: "Seamster - Generative Fashion Designer",
      role: "Developer",
      period: "2024",
      tech: ["GenAI", "Diffusion Models", "Interactive Web"],
      logo: "/assets/logos/Seamster Logo.svg",
      description: [
        "Developed a concept-to-creation app using diffusion models to visualize clothing designs from text inputs for fast product iteration.",
        "Created an interactive web tool with dynamic garment previews, material customization, and modeling for a strong user experience."
      ],
      link: "https://seamster.app"
    }
  ],
  skills: [
    { category: "Skills", items: ["Agile & Scrum", "Product Development", "UI/UX & Graphic Design", "Prototyping", "Data Analysis", "Automation"] },
    { category: "Languages", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Python", "SQL", "Java", "R"] },
    { category: "Tools", items: ["Figma", "Webflow", "Miro", "Jira", "Linear", "Asana", "Confluence", "Airtable", "n8n", "Tableau", "Amplitude", "Hubspot", "Clay"] },
    { category: "Interests", items: ["Emerging Technologies", "Behavioral Psychology", "Quantum Physics", "Digital Art", "Fashion", "Sneakers", "Cooking", "Tennis", "Gym"] }
  ],
  publications: [
    {
      id: "pub3",
      title: "The Screenshot Black Hole",
      publisher: "Substack",
      date: "Nov 2025",
      link: "https://suryanewa.substack.com/p/the-screenshot-black-hole",
      description: [
        "How a single click reveals the hidden intent layer of modern student life"
      ]
    },
    {
      id: "pub2",
      title: "When Intelligence Becomes Infrastructure",
      publisher: "Substack",
      date: "Oct 2025",
      link: "https://suryanewa.substack.com/p/when-intelligence-becomes-infrastructure",
      description: [
        "The silent shift bringing applied AI from research labs into the messy, vital operations of everyday businesses"
      ]
    },
    {
      id: "pub1",
      title: "Approaching Digital Inequality: A Three-Stage Framework",
      publisher: "SSRN",
      date: "Nov 2021",
      link: "https://dx.doi.org/10.2139/ssrn.3971326",
      description: [
        "The hidden scaffolding of digital inequality that decides who thrives as society becomes more digitally driven"
      ]
    }
  ]
};
