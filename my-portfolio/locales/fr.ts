import type { Dictionary } from './en';

export const fr: Dictionary = {
  meta: {
    home: {
      title: 'Joshua Rose — Développeur full stack',
      description:
        'Joshua Rose est développeur full stack et conçoit des applications web modernes avec React, Next.js et Node.js.',
    },
    contact: {
      title: 'Contact — Joshua Rose',
      description:
        'Contactez Joshua Rose pour échanger sur des produits, des projets ou des opportunités à construire ensemble.',
    },
    cv: {
      title: 'CV — Joshua Rose',
      description:
        'Le CV de Joshua Rose : profil, parcours professionnel, points forts et compétences techniques démontrées à travers ses projets.',
    },
  },

  skipToContent: 'Aller au contenu',

  nav: {
    primaryLabel: 'Navigation principale',
    portfolio: 'Portfolio',
    cv: 'CV',
    contact: 'Contact',
    letsTalk: 'Discutons',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mobileNavLabel: 'Navigation mobile',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },

  languageToggle: {
    groupLabel: 'Langue',
    switchToEnglish: 'Switch to English',
    switchToFrench: 'Passer en français',
  },

  hero: {
    eyebrow: 'Développeur full stack · France',
    headingLine1: 'Je suis Josh',
    headingLine2: 'Je crée des',
    headingLine3: 'expériences',
    paragraph:
      "Je suis développeur full stack et je conçois des applications web modernes, où des interfaces claires rencontrent une ingénierie solide. Avant de coder, j’ai passé dix ans à enseigner dans des universités et écoles de commerce françaises, ce qui m’a appris à rendre les choses complexes faciles à comprendre.",
    exploreWork: 'Découvrir mes projets',
    viewCv: 'Voir mon CV',
    portraitAlt: 'Joshua Rose',
  },

  techStrip: {
    // Technology names are not translated.
  },

  work: {
    headingLine1: 'Projets',
    headingLine2: 'sélectionnés',
    intro:
      'Quatre produits construits pendant ma formation full stack, d’une interface front-end en React à des applications complètes avec authentification, données en temps réel et base de données.',
    liveDemo: 'Démo en ligne',
    github: 'GitHub',
    screenshotAltSuffix: '— capture d’écran',
    projects: {
      '1': {
        description: 'Page sur une célébrité construite avec React Router et une API intégrée personnalisée.',
      },
      '2': {
        description:
          'Une liste de tâches avancée construite sur une stack front-end et back-end entièrement intégrée.',
      },
      '3': {
        description:
          'Une application de réseau social simple avec connexion sécurisée et un fil affichant les publications de nombreux utilisateurs.',
      },
      '4': {
        description:
          'Une application de gestion d’événements personnels avec messagerie, envoi de photos et une fonctionnalité de suggestion par IA.',
      },
    },
  },

  whoIAm: {
    eyebrow: '(02) Qui je suis',
    heading:
      'J’ai passé dix ans à enseigner dans certaines des universités et écoles de commerce les plus prestigieuses de France.',
    body:
      'Aujourd’hui, je construis des applications web, en apportant au code la même organisation, le même leadership et la même curiosité.',
    cvLink: 'Mon CV',
  },

  closingCta: {
    heading: 'Construisons quelque chose de bien.',
    button: 'Me contacter',
  },

  footer: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    cv: 'CV',
  },

  contactPage: {
    eyebrow: 'Contact',
    heading: 'Vous avez quelque chose de bien en tête',
    paragraph:
      'Je suis toujours intéressé à échanger autour de produits réfléchis, de défis intéressants et d’opportunités à construire ensemble.',
    emailMe: 'M’écrire',
    elsewhere: 'Ailleurs',
  },

  contactForm: {
    heading: 'Envoyer un message',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailLabel: 'E-mail',
    emailPlaceholder: 'vous@entreprise.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Un poste, un projet, une idée…',
    submit: 'Envoyer',
    sending: 'Envoi…',
    successMessage: 'Merci, votre message a bien été envoyé. Je vous répondrai dès que possible.',
    errorMessagePrefix: 'Une erreur s’est produite. Merci de réessayer ou de m’écrire directement à',
    errors: {
      name: 'Indiquez votre nom.',
      email: 'Indiquez une adresse e-mail valide.',
      message: 'Le message doit contenir au moins 10 caractères.',
    },
  },

  cvPage: {
    eyebrow: 'CV — Joshua Rose',
    heading: 'Plus qu’un intitulé de poste',
    paragraph: 'Un aperçu de l’expérience, des compétences et de la perspective que j’apporte au travail.',
    downloadCv: 'Télécharger le CV',
    print: 'Imprimer / Enregistrer en PDF',
    printShortcutHint: '⌘P / Ctrl+P',

    profileLabel: 'Profil',
    profileFacts: {
      nameLabel: 'Nom',
      nameValue: 'Joshua Rose',
      roleLabel: 'Poste',
      roleValue: 'Développeur web full-stack',
      basedInLabel: 'Basé à',
      basedInValue: 'Paris, France',
      languagesLabel: 'Langues',
      languagesValue: 'Anglais (langue maternelle), Français (C1)',
      teachingLabel: 'Enseignement',
      teachingValue: '10 ans, France',
    },

    timelineLabel: 'Parcours en un coup d’œil',
    timelineHint: 'Sélectionnez une étape pour l’ouvrir',
    timelineHeading: 'Parcours',
    collapse: 'Réduire',
    expandAll: 'Tout développer',
    whatIDidLabel: 'Ce que j’ai fait',
    subjectsLabel: 'Matières',

    timeline: {
      hypto: {
        stageLabel: 'Hypto',
        heading: 'Hypto (Professionnel)',
        role: 'Développeur Full-stack',
        location: 'Paris',
        dates: 'Juin à juillet 2026',
        whatIDid: [
          'Création de tableaux de bord KPI et d’un système RBAC multi-tenant pour un SaaS du secteur de la construction.',
          'Création de l’interface et des rôles cross-tenant.',
          'Rédaction de la documentation du code.',
        ],
      },
      training: {
        stageLabel: 'Formation',
        heading: 'Formation',
        role: "Concepteur développeur d'applications (RNCP niveau 6)",
        dates: 'Septembre 2025 à octobre 2026',
        statusNote: 'RNCP 6, validé',
        evidenceLabel: 'Projets réalisés — preuves',
        evidenceNote: 'Party Up est le projet de certification RNCP 6.',
        extraLine:
          'Précédemment : University of Plymouth, 2008-2012 — Licence (BA) Langues vivantes étrangères et commerce.',
      },
      teaching: {
        stageLabel: 'Enseignement',
        heading: 'Enseignement',
        role: 'Professeur d’anglais, universités et écoles de commerce, France',
        teachingRoles: {
          icp: { dates: '2022 à 2026', detail: 'Conception d’un curriculum numérique sur Moodle.' },
          istc: {
            dates: '2019 à 2022',
            detail: 'Encadrement de projets multimédias étudiants ; gestion des plannings et des livrables.',
          },
        },
        subjects: 'Anglais',
      },
    },

    strengthsLabel: 'Points forts',
    strengths: {
      communication: {
        title: 'Communication',
        body: 'Expliquer clairement les décisions aux collègues, aux clients et aux non-techniciens.',
      },
      structuredThinking: {
        title: 'Pensée structurée',
        body: 'Décomposer un sujet complexe en parties ordonnées et compréhensibles.',
      },
      organisation: {
        title: 'Organisation et leadership',
        body: 'Planifier, piloter et porter le travail sur une année universitaire complète.',
      },
      explaining: {
        title: 'Expliquer des idées complexes',
        body: 'Transformer une matière difficile en quelque chose que l’on peut suivre et utiliser.',
      },
    },

    technicalProfileLabel: 'Profil technique',
    technicalProfileHint: 'Sélectionnez une compétence pour voir les projets qui en témoignent.',
    skillGroups: {
      frontend: 'Frontend',
      backendData: 'Backend et données',
      authEmailTesting: 'Auth, e-mail et tests',
      alsoOnCv: 'Également sur mon CV (aucun projet lié pour le moment)',
    },
    evidenceForPrefix: 'Preuves pour',
    noProjectLinked: 'Aucun projet lié sur ce site pour le moment.',
  },
};
