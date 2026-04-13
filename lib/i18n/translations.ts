export type Locale = 'en' | 'fr';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      ourSolutions: 'Our Solutions',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
    },

    // Hero Section
    hero: {
      token: '100% French Solutions',
      title: 'Driving the next wave of Digital Transformation',
      titlePart1: 'Driving the next',
      titlePart2: 'wave of',
      titleHighlight1: 'Digital',
      titleHighlight2: 'Transformation',
      description:
        'Blue Connect Solutions drives digital transformation through 3 pillars: IoT, Cybersecurity, and Video Broadcasting — Empowered by AI and hardware designed in France. We bring together innovation, trust, and performance to shape a smarter and more secure digital world.',
      ctaContact: 'Contact Us',
      ctaExplore: 'Explore Solutions',
    },

    // Our Solutions Section
    solutions: {
      title: 'Our Tree Pilars',
      subtitle:
        'Everything you need to build, secure, and scale your digital operations',
      solutionsLabel: 'Solutions',
      solution1: {
        number: '1',
        title: '1. Cyber-Security',
        description:
          'Enterprise-grade security solutions with real-time threat detection, automated response, and comprehensive compliance management.',
        pillarLabel: 'Cyber Security',
        solutions: [
          { name: 'Oxydian', href: 'https://www.oxydian.fr/', logo: '/logos/oxydian.png' },
          { name: 'Kubb Secure', href: 'https://www.kubb-secure.com/', logo: '/logos/kubbsecure.png' },
        ],
      },
      solution2: {
        number: '2',
        title: '2. IoT',
        description:
          'IoT solutions with low latency processing, real-time analytics, and seamless device management.',
        pillarLabel: 'IoT',
        solutions: [
          { name: 'SmartConnect IoT', href: 'https://www.smartconnectiot.com/', logo: '/logos/smartconnectiot.svg', padding: 'p-4' },
        ],
      },
      solution3: {
        number: '3',
        title: '3. Video Broadcasting',
        description:
          'High-performance video streaming and broadcasting solutions with ultra-low latency, multi-format support, and global CDN integration.',
        pillarLabel: 'Video Broadcasting',
        solutions: [
          { name: 'Fusion & Kaptivate', href: 'https://newbluefx.com/emea-fusion/', logo: '/logos/newbluefx.jpeg' },
          { name: 'Celestory', href: 'https://www.celestory.io/', logo: '/logos/Celectrory.png' },
        ],
      },
    },

    // Hardware Section
    hardware: {
      token: 'Designed in France',
      title: 'Powered by French Excellence',
      description:
        'Every Blue Connect solution runs on premium hardware designed in France by Bleujour. Silent, powerful, and built to last — our infrastructure combines cutting-edge performance with minimalist design, ensuring reliability for your most critical operations.',
      features: [
        { label: 'Silent Operation', description: 'Fanless technology' },
        { label: 'Premium Design', description: 'Minimalist & elegant' },
        { label: 'High Performance', description: 'Professional-grade' },
        { label: 'Designed in France', description: 'Occitanie' },
      ],
      cta: 'Discover Bleujour',
      ctaHref: 'https://bleujour.com/fr/',
      imageAlt: 'KUBB by Bleujour',
    },

    // KPIs Section
    kpis: {
      kpi1: {
        value: '100%',
        label: 'Project Guarantee',
        description: 'High quality products and processes',
      },
      kpi2: {
        value: '+20',
        label: 'Years of Experience',
        description: 'Lightning-fast response times',
      },
      kpi3: {
        value: '24/7',
        label: 'Support & Monitoring',
        description: 'Real-time threat detection',
      },
      kpi4: {
        value: '150+',
        label: 'Global Deployments',
        description: 'Worldwide infrastructure',
      },
    },

    // About Section
    about: {
      token: 'French Technology',
      title: 'Driving Innovation with Made-in-France Excellence',
      description1:
        'Blue Connect Solutions is a leading provider of digital transformation solutions, specializing in IoT, Cybersecurity, and Video Broadcasting. Based in Occitanie, France, we combine cutting-edge AI technology with premium Made-in-France hardware to deliver enterprise-grade solutions.',
      description2:
        'Our commitment to innovation, security, and performance has made us a trusted partner for organizations looking to modernize their digital infrastructure while maintaining the highest standards of data protection and compliance.',
      imageAlt: 'About Blue Connect Solutions',
    },

    // Contact Section
    contact: {
      token: 'Take a rendez-vous',
      title: 'Contact Us',
      subtitle:
        "Have a question or want to learn more about our solutions? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
      form: {
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'your.email@example.com',
        company: 'Company',
        companyPlaceholder: 'Your company name',
        message: 'Message',
        messagePlaceholder: 'Tell us about your project or question...',
        submit: 'Send Message',
        submitting: 'Sending...',
        successMessage:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        errorMessage: 'Something went wrong. Please try again later.',
      },
      otherWays: 'Other Ways to Reach Us',
      emailLabel: 'Email',
      locationLabel: 'Location',
      location: 'Occitanie, France',
    },

    // CTA Section
    cta: {
      title: 'Ready to Transform Your Digital Infrastructure?',
      description:
        'Join leading organizations worldwide who trust Blue Connect Solutions to power their digital transformation journey.',
      button: 'Contact Us',
    },

    // Footer
    footer: {
      solutions: {
        title: 'Solutions',
        edgeComputing: 'Edge Computing',
        cyberSecurity: 'Cyber-Security',
        edgeAI: 'IoT',
        smartInfrastructure: 'Smart Infrastructure',
      },
      company: {
        title: 'Company',
        aboutUs: 'About Us',
        careers: 'Careers',
        partners: 'Partners',
        contact: 'Contact',
      },
      resources: {
        title: 'Resources',
        documentation: 'Documentation',
        blog: 'Blog',
        caseStudies: 'Case Studies',
        support: 'Support',
      },
      legal: {
        title: 'Legal',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        security: 'Security',
        compliance: 'Compliance',
      },
      copyright: '© 2025 Blue Connect Solutions. All rights reserved.',
    },
  },

  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      ourSolutions: 'Nos Solutions',
      aboutUs: 'A propos',
      contactUs: 'Contact',
    },

    // Hero Section
    hero: {
      token: 'Solutions 100% Françaises',
      title: 'Impulser la prochaine vague de Transformation Digitale',
      titlePart1: 'Impulser la prochaine',
      titlePart2: 'vague de',
      titleHighlight1: 'Transformation',
      titleHighlight2: 'Digitale',
      description:
        "Blue Connect Solutions accélère la transformation digitale autour de 3 piliers : IoT, Cybersécurité et Diffusion Vidéo — Propulsés par l'IA et du hardware conçu en France. Nous conjuguons innovation, confiance et performance pour façonner un monde numérique plus intelligent et plus sécurisé.",
      ctaContact: 'Nous Contacter',
      ctaExplore: 'Explorer les Solutions',
    },

    // Our Solutions Section
    solutions: {
      title: 'Nos Trois Piliers',
      subtitle:
        'Tout ce dont vous avez besoin pour construire, sécuriser et faire évoluer vos opérations numériques',
      solutionsLabel: 'Solutions',
      solution1: {
        number: '1',
        title: '1. Cyber-Sécurité',
        description:
          "Solutions de sécurité de niveau entreprise avec détection des menaces en temps réel, réponse automatisée et gestion complète de la conformité.",
        pillarLabel: 'Cyber-Sécurité',
        solutions: [
          { name: 'Oxydian', href: 'https://www.oxydian.fr/', logo: '/logos/oxydian.png' },
          { name: 'Kubb Secure', href: 'https://www.kubb-secure.com/', logo: '/logos/kubbsecure.png' },
        ],
      },
      solution2: {
        number: '2',
        title: '2. IoT',
        description:
          "Solutions IoT avec traitement à faible latence, analyse en temps réel et gestion transparente des appareils.",
        pillarLabel: 'IoT',
        solutions: [
          { name: 'SmartConnect IoT', href: 'https://www.smartconnectiot.com/', logo: '/logos/smartconnectiot.svg', padding: 'p-4' },
        ],
      },
      solution3: {
        number: '3',
        title: '3. Diffusion Vidéo',
        description:
          'Solutions de streaming et diffusion vidéo haute performance avec latence ultra-faible, support multi-format et intégration CDN mondiale.',
        pillarLabel: 'Diffusion Vidéo',
        solutions: [
          { name: 'Fusion & Kaptivate', href: 'https://newbluefx.com/emea-fusion/', logo: '/logos/newbluefx.jpeg' },
          { name: 'Celestory', href: 'https://www.celestory.io/', logo: '/logos/Celectrory.png' },
        ],
      },
    },

    // Hardware Section
    hardware: {
      token: 'Conçu en France',
      title: 'Propulsé par l\'Excellence Française',
      description:
        'Chaque solution Blue Connect repose sur du hardware premium conçu en France par Bleujour. Silencieux, puissant et durable — notre infrastructure allie performance de pointe et design minimaliste, garantissant fiabilité pour vos opérations les plus critiques.',
      features: [
        { label: 'Fonctionnement Silencieux', description: 'Technologie fanless' },
        { label: 'Design Premium', description: 'Minimaliste & élégant' },
        { label: 'Haute Performance', description: 'Qualité professionnelle' },
        { label: 'Conçu en France', description: 'Occitanie' },
      ],
      cta: 'Découvrir Bleujour',
      ctaHref: 'https://bleujour.com/fr/',
      imageAlt: 'KUBB par Bleujour',
    },

    // KPIs Section
    kpis: {
      kpi1: {
        value: '100%',
        label: 'Garantie Projet',
        description: 'Produits et processus de haute qualité',
      },
      kpi2: {
        value: '+20',
        label: "Ans d'Expérience",
        description: 'Temps de réponse ultra-rapides',
      },
      kpi3: {
        value: '24/7',
        label: 'Support & Monitoring',
        description: 'Détection des menaces en temps réel',
      },
      kpi4: {
        value: '150+',
        label: 'Déploiements Mondiaux',
        description: 'Infrastructure mondiale',
      },
    },

    // About Section
    about: {
      token: 'Technologie Française',
      title: "Stimuler l'Innovation avec l'Excellence Made-in-France",
      description1:
        "Blue Connect Solutions est un fournisseur leader de solutions de transformation digitale, spécialisé dans l'IoT, la Cybersécurité et la Diffusion Vidéo. Basés en Occitanie, France, nous combinons une technologie IA de pointe avec du hardware premium Made-in-France pour offrir des solutions de niveau entreprise.",
      description2:
        "Notre engagement envers l'innovation, la sécurité et la performance fait de nous un partenaire de confiance pour les organisations souhaitant moderniser leur infrastructure numérique tout en maintenant les plus hauts standards de protection des données et de conformité.",
      imageAlt: 'A propos de Blue Connect Solutions',
    },

    // Contact Section
    contact: {
      token: 'Prendre rendez-vous',
      title: 'Nous Contacter',
      subtitle:
        'Vous avez une question ou souhaitez en savoir plus sur nos solutions ? Nous serions ravis de vous entendre. Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.',
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom complet',
        email: 'Email',
        emailPlaceholder: 'votre.email@exemple.com',
        company: 'Entreprise',
        companyPlaceholder: 'Nom de votre entreprise',
        message: 'Message',
        messagePlaceholder: 'Parlez-nous de votre projet ou question...',
        submit: 'Envoyer le Message',
        submitting: 'Envoi en cours...',
        successMessage:
          'Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.',
        errorMessage:
          "Une erreur s'est produite. Veuillez réessayer plus tard.",
      },
      otherWays: 'Autres Moyens de Nous Contacter',
      emailLabel: 'Email',
      locationLabel: 'Localisation',
      location: 'Occitanie, France',
    },

    // CTA Section
    cta: {
      title: 'Prêt à Transformer Votre Infrastructure Numérique ?',
      description:
        'Rejoignez les organisations leaders dans le monde qui font confiance à Blue Connect Solutions pour accompagner leur transformation digitale.',
      button: 'Nous Contacter',
    },

    // Footer
    footer: {
      solutions: {
        title: 'Solutions',
        edgeComputing: 'Edge Computing',
        cyberSecurity: 'Cyber-Sécurité',
        edgeAI: 'IoT',
        smartInfrastructure: 'Infrastructure Intelligente',
      },
      company: {
        title: 'Entreprise',
        aboutUs: 'A propos',
        careers: 'Carrières',
        partners: 'Partenaires',
        contact: 'Contact',
      },
      resources: {
        title: 'Ressources',
        documentation: 'Documentation',
        blog: 'Blog',
        caseStudies: 'Études de Cas',
        support: 'Support',
      },
      legal: {
        title: 'Légal',
        privacyPolicy: 'Politique de Confidentialité',
        termsOfService: "Conditions d'Utilisation",
        security: 'Sécurité',
        compliance: 'Conformité',
      },
      copyright: '© 2025 Blue Connect Solutions. Tous droits réservés.',
    },
  },
};

export type Translations = (typeof translations)['en'] | (typeof translations)['fr'];
