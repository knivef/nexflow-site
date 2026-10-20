/**
 * All site copy lives here. Components read from this file and never hardcode copy.
 * Rules (see CLAUDE.md): no em dashes, no invented facts, no banned words.
 * Any fact we don't have yet goes in as [PLACEHOLDER: description] and is logged in PLACEHOLDERS.md.
 */
import type { SiteContent } from './types';


export const CATEGORY_LABEL = 'Nexflow is an acquiring partner network for PSPs, payfacs and ISOs.';

export const site: SiteContent = {
  ui: {
    skipLink: 'Skip to content',
    mainNavLabel: 'Main',
    footerNavLabel: 'Footer',
    menuOpen: 'Menu',
    menuClose: 'Close',
    announcementLabel: 'Announcement',
    dismissAnnouncement: 'Dismiss announcement',
    requiredMarker: '(required)',
    selectPlaceholder: 'Select one',
    versionSwitcherLabel: 'Site versions',
    versionPrefix: 'Version',
    sectionLabels: {
      hero: 'Introduction',
      who: 'Who Nexflow works with',
      problem: 'The problem',
      how: 'How it works',
      network: 'The network',
      features: 'Features',
      verticals: 'Verticals',
      partners: 'Partner types',
      trust: 'Trust',
      'founding-partners': 'Founding partners',
      compare: 'Comparison',
      merchants: 'For merchants',
      faq: 'FAQ',
      apply: 'Apply',
    },
  },

  nav: {
    brand: 'Nexflow',
    brandLabel: 'Nexflow home',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Network', href: '#network' },
      { label: 'Verticals', href: '#verticals' },
      { label: 'Trust', href: '#trust' },
      { label: 'Partners', href: '#partners' },
      { label: 'FAQ', href: '#faq' },
    ],
    merchantLink: { label: 'Merchant? Read this', href: '#merchants' },
    primaryCta: { label: 'Become a partner', href: '#apply' },
  },

  announcement: {
    id: 'founding-cohort-1',
    text: 'Now onboarding our first cohort of founding PSP partners.',
    link: { label: 'See terms', href: '#founding-partners' },
  },

  hero: {
    eyebrow: 'High-risk acquiring partner for PSPs, payfacs and ISOs',
    // Headline options. A is live. To test another, swap it into `heading`.
    // B: 'One partnership. Acquirers that want your merchants.'
    // C: 'Your merchants. Our acquirer network. Live MIDs in days.'
    heading: 'Acquiring capacity for the PSPs everyone else turns away.',
    subheading:
      'Nexflow signs and manages acquirer relationships across [PLACEHOLDER: regions, e.g. EU, UK, LatAm] so you can place iGaming, ecommerce and affiliate merchants without chasing banks. We work with payment companies only, never with merchants directly.',
    primaryCta: { label: 'Become a partner', href: '#apply' },
    secondaryCta: { label: 'See how placement works', href: '#how' },
    proofPoints: [
      'PSP-only: zero merchant-facing products',
      '[PLACEHOLDER: X] acquiring partners across [PLACEHOLDER: Y] markets',
      'Target MID go-live: [PLACEHOLDER: X] business days',
      'Response to every application within 24 hours',
    ],
  },

  who: {
    eyebrow: 'Who this is for',
    heading: 'Payment companies only. Never merchants.',
    intro: '',
    worksWith: {
      heading: 'We work with',
      items: [
        'Licensed or registered PSPs',
        'Payment facilitators',
        'ISOs and MSPs',
        'White-label gateway operators',
        'Payment orchestrators adding acquiring capacity',
        'EMIs and PIs needing acquiring',
        'High-risk specialist processors',
      ],
    },
    notWith: {
      heading: "We don't work with",
      items: [
        'Merchants applying directly',
        'Unlicensed resellers',
        'Businesses on scheme prohibited lists',
      ],
    },
    merchantNote: {
      text: "If you're a merchant, the PSPs we work with can help.",
      link: { label: 'Read this', href: '#merchants' },
    },
  },

  problem: {
    eyebrow: '',
    heading: "Acquiring is a relationship business. Most PSPs don't have enough relationships.",
    intro: '',
    subheading: 'Multi-acquiring without multiple contracts',
    points: [
      {
        title: 'One acquirer, one point of failure.',
        body: 'A single acquirer changes risk appetite, and half your book is looking for a new home overnight.',
      },
      {
        title: 'Months to onboard, days to lose a merchant.',
        body: 'Each new acquirer means a new contract, a new integration and a fresh round of underwriting while your merchant waits.',
      },
      {
        title: 'High-risk means high friction.',
        body: 'MCC 7995, affiliate traffic and cross-border ecommerce get declined at application, priced as an afterthought, or hit with reserves nobody explained.',
      },
    ],
  },

  how: {
    eyebrow: '',
    heading: 'How acquiring as a service works with Nexflow',
    intro: '',
    steps: [
      {
        title: 'Partner with Nexflow once.',
        body: 'One master agreement and one due diligence process. We review your licence, AML framework and portfolio.',
      },
      {
        title: 'Submit merchants in our standard format.',
        body: 'A single underwriting pack covering KYB, processing history, website compliance and licence checks. No rewriting it for every bank.',
      },
      {
        title: 'We match and place.',
        body: 'We route each merchant to the acquirer whose appetite fits its MCC, geography, volume and risk profile. Backup placement is planned from day one.',
      },
      {
        title: 'Go live and stay live.',
        body: "MIDs are issued, settlement terms confirmed, and we monitor scheme thresholds with you so merchants don't get shut down by surprise.",
      },
    ],
    timeline: {
      label: 'Onboarding timeline',
      milestones: [
        { label: 'Partner due diligence', value: '[PLACEHOLDER: X] days' },
        { label: 'First merchant placed', value: '[PLACEHOLDER: X] days' },
        { label: 'Live processing', value: '[PLACEHOLDER: X] days' },
      ],
    },
  },

  network: {
    eyebrow: '',
    heading: 'An acquirer network built around appetite, not logos',
    intro: '',
    diagram: {
      label: 'How a PSP reaches acquirers through Nexflow, by region',
      sourceLabel: 'Your PSP',
      sourceDetail: 'One agreement',
      hubLabel: 'Nexflow',
      hubDetail: 'Appetite matching',
      localBadge: 'Local acquiring',
      crossBorderBadge: 'Cross-border',
    },
    table: {
      caption: 'Acquiring coverage by region',
      columns: {
        region: 'Region',
        localAcquiring: 'Local acquiring',
        verticals: 'Verticals accepted',
        settlementCurrencies: 'Settlement currencies',
        typicalGoLive: 'Typical go-live',
      },
      filters: {
        regionLabel: 'Region',
        verticalLabel: 'Vertical',
        allRegions: 'All regions',
        allVerticals: 'All verticals',
        reset: 'Clear filters',
        status: 'Showing {shown} of {total} regions',
        empty: 'No region matches those filters. Clear them, or ask us: coverage changes as we sign acquirers.',
      },
      placeholderRowLabel: 'Placeholder row',
      // [PLACEHOLDER: regions and local acquiring availability] Replace these four example rows with real coverage.
      rows: [
        {
          region: '[PLACEHOLDER: Region 1]',
          localAcquiring: '[PLACEHOLDER: Y/N]',
          verticals: ['iGaming', 'Ecommerce'],
          settlementCurrencies: '[PLACEHOLDER: currencies]',
          typicalGoLive: '[PLACEHOLDER: X] days',
          placeholder: true,
        },
        {
          region: '[PLACEHOLDER: Region 2]',
          localAcquiring: '[PLACEHOLDER: Y/N]',
          verticals: ['Ecommerce', 'Affiliate'],
          settlementCurrencies: '[PLACEHOLDER: currencies]',
          typicalGoLive: '[PLACEHOLDER: X] days',
          placeholder: true,
        },
        {
          region: '[PLACEHOLDER: Region 3]',
          localAcquiring: '[PLACEHOLDER: Y/N]',
          verticals: ['iGaming', 'Affiliate'],
          settlementCurrencies: '[PLACEHOLDER: currencies]',
          typicalGoLive: '[PLACEHOLDER: X] days',
          placeholder: true,
        },
        {
          region: '[PLACEHOLDER: Region 4]',
          localAcquiring: '[PLACEHOLDER: Y/N]',
          verticals: ['Ecommerce'],
          settlementCurrencies: '[PLACEHOLDER: currencies]',
          typicalGoLive: '[PLACEHOLDER: X] days',
          placeholder: true,
        },
      ],
    },
    footnote:
      'We name acquiring partners under NDA during due diligence. Many of our acquirers prefer not to be listed publicly, which is standard in high-risk acquiring.',
  },

  features: {
    eyebrow: '',
    heading: 'Everything a PSP needs from an acquiring partner',
    intro: '',
    tabsLabel: 'Feature groups',
    groups: [
      {
        id: 'access',
        label: 'Access and placement',
        summary: 'One agreement, several acquirers, and a plan for where every merchant goes.',
        items: [
          {
            title: 'Multi-acquirer access through one agreement',
            body: 'Sign once with Nexflow and place merchants across the network without negotiating a new contract for each bank.',
          },
          {
            title: 'Appetite matching by MCC, geo, BIN country and risk tier',
            body: 'Merchants go to the acquirer that wants that risk, not the one most likely to decline it.',
          },
          {
            title: 'Backup acquirer for every vertical',
            body: 'If one acquirer changes appetite, the merchant has somewhere to go. The second placement is planned before the first goes live.',
          },
          {
            title: 'Local acquiring in key markets',
            body: 'Domestic processing where the network has it, for better approval rates and lower cross-border fees.',
          },
          {
            title: 'Dedicated or shared MIDs, plus sub-merchant models',
            body: 'Board merchants on their own MIDs, on shared MIDs, or as sub-merchants under your payfac setup, where the acquirer supports it.',
          },
        ],
      },
      {
        id: 'underwriting',
        label: 'Underwriting and compliance',
        summary: 'One underwriting pack, checked by us before any acquirer sees it.',
        items: [
          {
            title: 'Standardised underwriting pack',
            body: 'Prepare one file per merchant. Every acquirer in the network accepts the same format.',
          },
          {
            title: 'Pre-screening before submission',
            body: 'We review the file first, so you know the likely outcome before you tell the merchant anything.',
          },
          {
            title: 'Website and content compliance review',
            body: 'T&Cs, refund policy, descriptors and age gates for gambling, checked before an acquirer finds the gaps.',
          },
          {
            title: 'Scheme registrations handled with you',
            body: 'Visa and Mastercard high-risk merchant registration for MCCs such as 7995, 5967 and 5122, plus payfac and marketplace registrations.',
          },
          {
            title: 'MATCH/VMAS checks and gambling licence verification',
            body: 'Every merchant screened against MATCH and VMAS. Gambling licences verified for MGA, UKGC, Curaçao and [PLACEHOLDER: others].',
          },
        ],
      },
      {
        id: 'risk',
        label: 'Risk and monitoring',
        summary: "We watch scheme thresholds with you, so a merchant doesn't get shut down by surprise.",
        items: [
          {
            title: 'Chargeback and fraud ratio monitoring',
            body: "Ratios tracked per merchant against Visa VAMP and Mastercard's excessive chargeback and fraud programmes.",
          },
          {
            title: 'Early warning alerts',
            body: 'You hear about a rising ratio before the merchant breaches a threshold, while there is still time to fix it.',
          },
          {
            title: '3DS2, network tokens and descriptor management',
            body: 'Authentication, tokenisation and clear descriptors set up per acquirer, to lift approvals and cut "I don\'t recognise this" disputes.',
          },
          {
            title: 'Chargeback prevention integrations',
            body: 'Ethoca alerts and Verifi RDR and CDRN where available, so disputes get resolved before they become chargebacks.',
          },
        ],
      },
      {
        id: 'settlement',
        label: 'Settlement and economics',
        summary: 'Wholesale pricing and written terms. You set your own merchant pricing.',
        items: [
          {
            title: 'Wholesale pricing with interchange++ pass-through',
            body: 'Interchange and scheme fees passed through at cost with our margin shown separately, so you price your merchants your way.',
          },
          {
            title: 'Clear reserve terms',
            body: 'Rolling or fixed, reserve terms are agreed in writing before a merchant goes live.',
          },
          {
            title: 'Multi-currency settlement',
            body: 'Settlement in [PLACEHOLDER: currencies]. Optional stablecoin settlement (USDC, USDT, EURC) where the acquirer supports it [PLACEHOLDER: confirm].',
          },
          {
            title: 'Payouts for withdrawals',
            body: 'Visa Direct and Mastercard Move (OCT) for player and customer withdrawals, where available.',
          },
          {
            title: 'Reconciliation and reporting',
            body: 'Transaction, fee and settlement data via API and dashboard [PLACEHOLDER: confirm].',
          },
          {
            title: 'A named partner manager',
            body: 'One person who knows your book and answers directly, not a ticket queue.',
          },
        ],
      },
    ],
  },

  verticals: {
    eyebrow: '',
    heading: 'Built for the verticals that need acquiring the most',
    intro: '',
    tabsLabel: 'Verticals',
    defaultTab: 'igaming',
    labels: {
      problem: 'The problem',
      solution: 'What Nexflow does',
      capabilities: 'Capabilities',
    },
    items: [
      {
        id: 'igaming',
        tabLabel: 'iGaming',
        name: 'iGaming and sports betting',
        subheading: 'iGaming acquiring for licensed operators (MCC 7995)',
        problem:
          "Most acquirers won't touch MCC 7995, and the ones that do change their mind after a scheme review.",
        solution:
          "We place licensed operators with acquirers that hold gambling appetite in the operator's target markets, and set up deposits and withdrawals from the start.",
        capabilities: [
          'Licence-matched placement: MGA, UKGC, Curaçao, [PLACEHOLDER: other licences]',
          'OCT and fast withdrawals',
          'Geo-blocking and age-verification compliance checks',
          'Reserve terms agreed upfront',
        ],
        aside: null,
      },
      {
        id: 'ecommerce',
        tabLabel: 'Cross-border ecommerce',
        name: 'Cross-border ecommerce',
        subheading: 'Local acquiring for cross-border ecommerce',
        problem: 'Cross-border transactions get declined by issuers and cost more in scheme fees.',
        solution:
          'Local acquiring in [PLACEHOLDER: markets] lifts approval rates and cuts cross-border fees for your ecommerce merchants.',
        capabilities: [
          'Local acquiring',
          'Multi-currency pricing and settlement',
          'Network tokens',
          'Subscription and recurring support',
        ],
        aside: null,
      },
      {
        id: 'affiliate',
        tabLabel: 'Affiliate-driven',
        name: 'Affiliate-driven merchants and affiliate networks',
        subheading: 'High-risk acquiring for affiliate-driven merchants',
        problem:
          'Merchants that run on affiliate traffic (nutra, lead gen, trial offers, CPA funnels) look risky to acquirers by default.',
        solution:
          "We pre-screen funnels, offer pages and billing models before submission, so placements survive the acquirer's first audit.",
        capabilities: [
          'Funnel and landing page compliance review',
          'Descriptor and billing clarity checks',
          'Chargeback alert enrolment',
          'Backup placement',
        ],
        aside: {
          heading: 'For affiliate and referral partners',
          audience: 'Consultants, agencies and ISOs without acquirer access.',
          body: 'Bring us PSPs or portfolios and earn a revenue share. [PLACEHOLDER: referral terms]',
        },
      },
      {
        id: 'trading',
        tabLabel: 'Forex and CFD',
        name: 'Forex, CFD and trading platforms',
        subheading: 'Acquiring for licensed forex, CFD and trading platforms',
        problem:
          'Card deposits into trading accounts are high-ticket and closely watched by regulators, so many acquirers decline them at application.',
        solution:
          "We match regulated brokers with acquirers that accept trading deposits under the broker's licence, and set up withdrawals alongside deposits.",
        capabilities: [
          'Licence-matched placement: [PLACEHOLDER: regulators accepted, e.g. CySEC, FCA, ASIC]',
          'Deposit and withdrawal flows',
          'High-ticket transaction support',
        ],
        aside: null,
      },
      {
        id: 'subscriptions',
        tabLabel: 'Subscriptions and SaaS',
        name: 'Subscriptions, SaaS and digital goods',
        subheading: 'Acquiring for subscription, SaaS and digital goods merchants',
        problem:
          'Recurring billing spreads card-not-present risk over months, and one unclear cancellation flow can push a merchant over chargeback thresholds.',
        solution:
          'We place recurring-billing merchants with acquirers that support card-on-file and account updater, and review cancellation and descriptor setup before go-live.',
        capabilities: [
          'Recurring billing',
          'Account updater',
          'Card-on-file tokenisation',
          'Churn and chargeback control',
        ],
        aside: null,
      },
      {
        id: 'crypto',
        tabLabel: 'Crypto on-ramps',
        name: 'Crypto on-ramps and Web3 platforms',
        subheading: 'Card acquiring for crypto on-ramps (MCC 6051)',
        problem: 'Card-to-crypto purchases run under MCC 6051, which many acquirers exclude outright.',
        solution:
          'We place on-ramps and Web3 platforms with acquirers that accept MCC 6051 [PLACEHOLDER: confirm appetite], with stablecoin settlement where the acquirer supports it.',
        capabilities: [
          'Card-to-crypto purchase flows',
          'Acquirers that accept MCC 6051',
          'Stablecoin settlement options',
        ],
        aside: null,
      },
    ],
    other: {
      title: 'Other high-risk: dating, travel, nutra, digital services',
      body: "Ask us. If we can't place it, we'll tell you why in writing.",
      link: { label: 'Ask about your vertical', href: '#apply' },
    },
  },

  partners: {
    eyebrow: '',
    heading: 'Your merchants stay yours',
    intro: '',
    subheading: 'Sponsor acquiring for payfacs and ISOs',
    benefitLabel: 'What you get',
    types: [
      {
        title: 'PSPs and gateways',
        benefit: 'Extra acquiring capacity and a backup for concentration risk.',
        link: null,
      },
      {
        title: 'Payment facilitators',
        benefit: 'Sub-merchant models with sponsor-acquirer coverage.',
        link: null,
      },
      {
        title: 'ISOs and MSPs',
        benefit: "Placements for portfolios that mainstream acquirers won't take.",
        link: null,
      },
      {
        title: 'Orchestrators',
        benefit: 'Acquirers to plug into your routing, with one commercial relationship.',
        link: null,
      },
      {
        title: 'Referral partners',
        benefit: 'Revenue share for introducing PSPs.',
        link: { label: 'Referral details', href: '#verticals-affiliate' },
      },
    ],
    callout: {
      heading: 'No merchant-facing business. In writing.',
      text: "We don't run a merchant-facing brand, we don't have a merchant sales team, and we don't contact your merchants directly. That's in our contract, not just on our website. [PLACEHOLDER: confirm non-solicit clause]",
    },
  },

  trust: {
    eyebrow: '',
    heading: 'New brand. No shortcuts.',
    intro: "We're early, so we'd rather show you how we operate than tell you who we've worked with.",

    people: {
      heading: 'The people',
      description: "You're trusting people, not a logo. Here's who you'll deal with.",
      // [PLACEHOLDER: team bios] Replace with real people only. Photos go in /public/team/.
      members: [
        {
          name: '[PLACEHOLDER: Full name]',
          role: '[PLACEHOLDER: Role]',
          photo: '',
          yearsInPayments: '[PLACEHOLDER: X]',
          previousCompanies: ['[PLACEHOLDER: previous companies, real only]'],
          linkedin: '[PLACEHOLDER: LinkedIn URL]',
        },
        {
          name: '[PLACEHOLDER: Full name]',
          role: '[PLACEHOLDER: Role]',
          photo: '',
          yearsInPayments: '[PLACEHOLDER: X]',
          previousCompanies: ['[PLACEHOLDER: previous companies, real only]'],
          linkedin: '[PLACEHOLDER: LinkedIn URL]',
        },
        {
          name: '[PLACEHOLDER: Full name]',
          role: '[PLACEHOLDER: Role]',
          photo: '',
          yearsInPayments: '[PLACEHOLDER: X]',
          previousCompanies: ['[PLACEHOLDER: previous companies, real only]'],
          linkedin: '[PLACEHOLDER: LinkedIn URL]',
        },
      ],
    },

    advisors: {
      heading: 'Advisors',
      description: 'People with acquiring and scheme experience who review how we work.',
      // [PLACEHOLDER: advisors] Add named advisors here. The module stays hidden while this is empty.
      members: [],
    },

    corporate: {
      heading: 'Company and regulatory facts',
      description: 'Check us on the public registers before you sign anything.',
      facts: [
        { label: 'Legal entity', value: '[PLACEHOLDER: legal entity name]', href: '' },
        { label: 'Registration number', value: '[PLACEHOLDER: company number]', href: '' },
        { label: 'Registered address', value: '[PLACEHOLDER: registered address]', href: '' },
        { label: 'Jurisdiction', value: '[PLACEHOLDER: jurisdiction]', href: '' },
        { label: 'Registry record', value: '[PLACEHOLDER: link to company registry entry]', href: '' },
      ],
      licences: [],
      notLicensedStatement:
        'Nexflow is not an acquirer. All acquiring is performed by our regulated acquiring partners, who hold Visa and Mastercard principal membership.',
      statusNote: '[PLACEHOLDER: entity and licence status]',
      licenceLabels: { regulator: 'Regulator', number: 'Licence number', register: 'View on register' },
    },

    criteria: {
      heading: 'Partner criteria',
      description: 'What we ask of partners, published up front so you can qualify yourself before you apply.',
      lookFor: {
        summary: 'What we look for in a PSP partner',
        items: [
          'A licence or registration that covers what you do: PI, EMI or equivalent, or scheme registration as an ISO, MSP or payfac.',
          'A documented AML/KYC programme with a named compliance owner, and KYB on every merchant you board.',
          'Chargeback and fraud history for your current portfolio, ideally below scheme thresholds, or a remediation plan if not.',
          'A clear view of your portfolio mix by MCC, geography and volume, so we can match it to acquirer appetite.',
        ],
      },
      cantPlace: {
        summary: "What we can't place",
        items: [
          'Anything prohibited under Visa or Mastercard rules, including illegal products and content, and counterfeit goods.',
          "Unlicensed gambling, or gambling into markets the operator's licence doesn't cover.",
          'Merchants listed on MATCH or VMAS without a resolved listing.',
          'Binary options and unregulated investment schemes.',
          "Businesses that won't complete KYB or disclose beneficial owners.",
          '[PLACEHOLDER: other exclusions set by acquiring partners]',
        ],
      },
    },

    charter: {
      heading: 'Partner charter',
      description: 'Public commitments. Hold us to them.',
      commitments: [
        'Every application gets a reply within 24 hours.',
        'Reserve terms are agreed in writing before go-live.',
        "We give 30 days' notice before any change to pricing or terms. [PLACEHOLDER: confirm]",
        "If we can't place a merchant, we explain why in writing.",
        'We never contact your merchants.',
      ],
    },

    security: {
      heading: 'Security and compliance',
      description: 'Real status only. If something is in progress, it says so.',
      // [PLACEHOLDER: confirm each] Remove any line that doesn't apply rather than leaving it vague.
      items: [
        { name: 'PCI DSS', status: '[PLACEHOLDER: level, or "In progress"]', detail: '' },
        { name: 'GDPR', status: '[PLACEHOLDER: confirm]', detail: '' },
        { name: 'ISO 27001', status: '[PLACEHOLDER: status]', detail: '' },
        { name: 'SOC 2', status: '[PLACEHOLDER: status]', detail: '' },
      ],
    },

    presence: {
      heading: 'Industry presence',
      description: "Where you'll find us. Memberships and events we're actually part of.",
      // [PLACEHOLDER] Real memberships and events only.
      items: [{ name: '[PLACEHOLDER: memberships and events]', type: '', href: '' }],
    },

    founding: {
      heading: 'Founding partner programme',
      description: "Our first partners get founding terms. Here's what's on offer and what we ask in return.",
      link: { label: 'See the founding partner terms', href: '#founding-partners' },
    },

    resources: {
      heading: 'Resources',
      description: 'Working notes for PSP risk and partnerships teams.',
      linkLabel: 'Read',
      items: [
        {
          title: 'VAMP 2026: what the 1.5% threshold means for PSPs',
          summary: '[PLACEHOLDER: one-line summary]',
          href: '[PLACEHOLDER: URL]',
        },
        {
          title: 'MCC 7995 acquiring checklist',
          summary: '[PLACEHOLDER: one-line summary]',
          href: '[PLACEHOLDER: URL]',
        },
        {
          title: 'How PSPs get access to acquiring banks',
          summary: '[PLACEHOLDER: one-line summary]',
          href: '[PLACEHOLDER: URL]',
        },
      ],
    },

    contact: {
      heading: 'Talk to a human',
      description: 'A named person, not a contact form.',
      name: '[PLACEHOLDER: Full name]',
      role: '[PLACEHOLDER: Role]',
      photo: '',
      email: '[PLACEHOLDER: email]',
      telegram: '[PLACEHOLDER: Telegram handle]',
      calendarUrl: '[PLACEHOLDER: calendar link]',
      labels: { email: 'Email', telegram: 'Telegram', calendar: 'Book a call' },
    },

    proof: {
      heading: 'What partners say',
      testimonials: [],
      caseStudies: [],
      caseStudyLinkLabel: 'Read the case study',
    },

    labels: {
      yearsInPayments: 'Years in payments',
      previously: 'Previously',
      linkedin: 'LinkedIn',
      photoOf: 'Photo of',
    },
  },

  foundingPartners: {
    eyebrow: '',
    heading: '',
    intro: '',
    headingTemplate: 'Founding partner cohort: {spots} spots',
    spotsPlaceholder: '[PLACEHOLDER: number]',
    gets: {
      heading: 'What founding partners get',
      items: [
        '[PLACEHOLDER: e.g. preferential wholesale rates locked for 12 months, priority placement queue, direct founder access, input into the roadmap]',
      ],
    },
    asks: {
      heading: 'What we ask',
      items: ['[PLACEHOLDER: e.g. minimum monthly volume, feedback sessions, a reference once live, if happy]'],
    },
    progressLabel: '{filled} of {total} founding spots taken',
    progressRemaining: '{left} left',
    cta: { label: 'Apply for a founding spot', href: '#apply', intent: 'founding' },
  },

  compare: {
    eyebrow: '',
    heading: 'Going direct vs going through Nexflow',
    intro: 'An honest comparison. Going direct is the right call for some PSPs, and we say where.',
    caption: 'Direct acquirer contracts, generic aggregators and Nexflow compared',
    columns: ['Direct acquirer contracts', 'Generic aggregators', 'Nexflow'],
    highlightColumn: 2,
    edgeLabel: 'Comes out ahead',
    rows: [
      {
        label: 'Contracts to sign',
        values: [
          'One per acquirer, each with its own due diligence.',
          'One, with the aggregator.',
          'One master agreement, covering every acquirer in the network.',
        ],
        edge: [1, 2],
      },
      {
        label: 'Time to first live MID',
        values: [
          'Often months per acquirer, depending on the bank.',
          'Fast for low-risk merchants. High-risk is often declined at sign-up.',
          'Target: [PLACEHOLDER: X] business days.',
        ],
        edge: [],
      },
      {
        label: 'High-risk appetite',
        values: [
          'Depends on the bank. You find out after you apply.',
          'Limited. Many high-risk MCCs are restricted or prohibited.',
          'Matched by MCC, geography and risk tier across the network.',
        ],
        edge: [2],
      },
      {
        label: 'Who owns the merchant relationship',
        values: [
          'You do.',
          'Often the aggregator. Merchants sit under its terms and brand.',
          'You do. We never contact your merchants.',
        ],
        edge: [0, 2],
      },
      {
        label: 'Pricing transparency',
        values: [
          'Good. Negotiated per contract, and IC++ is common at scale.',
          'Usually blended rates with the margin built in.',
          'Wholesale IC++ pass-through, with our margin shown separately.',
        ],
        edge: [0, 2],
      },
      {
        label: 'Cost at very high volume',
        values: [
          'Lowest. At real scale, a direct contract removes the intermediary margin.',
          'Usually highest.',
          'Between the two: wholesale rates plus our margin.',
        ],
        edge: [0],
      },
      {
        label: 'Backup placement if an acquirer exits',
        values: [
          "Only if you've already signed a second acquirer.",
          'Rarely. If the aggregator offboards a merchant, you start again elsewhere.',
          'Planned from day one for every vertical.',
        ],
        edge: [2],
      },
      {
        label: 'Vertical expertise',
        values: [
          "Deep in the bank's chosen verticals, none outside them.",
          'Generalist, built for low-risk volume.',
          'Focused on high-risk: iGaming, affiliate-driven, trading, crypto on-ramps.',
        ],
        edge: [2],
      },
    ],
    footnote:
      'If you process very high volume in a narrow, low-risk vertical, a direct acquirer contract will usually cost less. Nexflow is built for PSPs that need more than one acquirer, or acquirers that will take high-risk.',
  },

  merchants: {
    heading: 'Are you a merchant?',
    // Brief wording was "we can't open a merchant account for you directly". Reworded to stay off
    // merchant search terms (see SEO rules in CLAUDE.md).
    body: "Nexflow works with payment companies only, so we can't set up card processing for you directly. Your PSP or payment provider can work with us. Ask them about Nexflow.",
    form: {
      heading: 'Tell us who your PSP is',
      intro: "Share your PSP's details and we'll reach out to them, not to you.",
      fields: [
        { name: 'merchant_company', label: 'Your company', kind: 'input', type: 'text', required: true, autocomplete: 'organization' },
        { name: 'merchant_email', label: 'Your email', kind: 'input', type: 'email', required: true, autocomplete: 'email' },
        { name: 'merchant_psp', label: 'Your PSP or payment provider', kind: 'input', type: 'text', required: true },
        { name: 'merchant_vertical', label: 'What you sell', kind: 'input', type: 'text', required: false },
      ],
      submitLabel: 'Send',
      privacyNote: '[PLACEHOLDER: privacy note and link to privacy policy]',
    },
  },

  faq: {
    eyebrow: '',
    heading: 'Questions PSPs ask us',
    intro: '',
    lastUpdatedLabel: 'Last updated',
    // Rule for every answer: `lead` answers the question directly in 1 to 2 sentences. Detail comes after.
    items: [
      {
        id: 'is-nexflow-an-acquirer',
        question: 'Is Nexflow an acquirer?',
        lead: 'No: Nexflow is an acquiring partner network for PSPs, payfacs and ISOs. All acquiring is performed by our regulated acquiring partners, who hold Visa and Mastercard principal membership.',
        detail: [
          'We sit between you and the acquirers: one agreement with us, one underwriting format, and each merchant placed with the acquirer whose appetite fits it.',
          'Our own regulatory status: [PLACEHOLDER: entity and licence status].',
        ],
      },
      {
        id: 'what-is-acquiring-as-a-service',
        question: 'What is acquiring as a service?',
        lead: 'Acquiring as a service gives a PSP access to one or more acquiring banks through a partner, instead of contracting and onboarding with each acquirer itself. The partner holds the acquirer relationships and handles underwriting format and placement.',
        detail: [
          'With Nexflow, that means one master agreement, one due diligence process, a standard underwriting pack accepted across the network, and merchants routed to the acquirer that wants their MCC, geography and risk profile.',
          'You keep the merchant relationship and set your own merchant pricing.',
        ],
      },
      {
        id: 'how-do-psps-get-access-to-an-acquiring-bank',
        question: 'How do PSPs get access to an acquiring bank?',
        lead: 'Either by contracting with an acquirer directly, which means its own due diligence, contract and onboarding, or through a partner like Nexflow that already has acquirer relationships in place.',
        detail: [
          'Going direct makes sense at very high volume in low-risk verticals. If you need more than one acquirer, or acquirers that take high-risk MCCs, a partner network saves you repeating due diligence and contracting for every bank.',
          'With Nexflow, you go through due diligence once (licence, AML framework and portfolio), then submit merchants in our standard format.',
        ],
      },
      {
        id: 'who-are-your-acquiring-partners',
        question: 'Who are your acquiring partners?',
        lead: 'We name our acquiring partners under NDA during due diligence. Many of our acquirers prefer not to be listed publicly, which is standard in high-risk acquiring.',
        detail: [
          'What we can say publicly: we work with [PLACEHOLDER: X] acquiring partners across [PLACEHOLDER: Y] markets. The coverage table on this page shows regions, verticals, settlement currencies and typical go-live times.',
        ],
      },
      {
        id: 'can-a-psp-work-with-more-than-one-acquirer',
        question: 'Can a PSP work with more than one acquirer?',
        lead: 'Yes, and most PSPs should. With a single acquirer, one change in risk appetite can leave half your book looking for a new home.',
        detail: [
          'Through Nexflow you get multi-acquiring under one agreement. Each merchant goes to the acquirer that fits it, and backup placement is planned from day one, so a merchant has somewhere to go if an acquirer changes course.',
          'Transaction routing between acquirers stays in your stack or your orchestrator.',
        ],
      },
      {
        id: 'which-verticals-and-mccs-can-you-place',
        question: 'Which verticals and MCCs can you place?',
        lead: 'We focus on verticals mainstream acquirers turn away: iGaming and sports betting (MCC 7995), affiliate-driven merchants, forex and CFD, subscriptions and digital goods, crypto on-ramps (MCC 6051, [PLACEHOLDER: confirm appetite]) and cross-border ecommerce.',
        detail: [
          'Appetite differs by acquirer, MCC, geography and risk tier, so we give you a likely outcome at pre-screening, before you say anything to the merchant.',
          "For other high-risk categories such as dating, travel, nutra and digital services, ask us. If we can't place it, we'll tell you why in writing.",
        ],
      },
      {
        id: 'which-acquirers-accept-mcc-7995',
        question: 'Which acquirers accept MCC 7995?',
        lead: "Only a minority of acquirers accept MCC 7995, and usually only for operators licensed in the markets they serve. Whether one will take a given operator depends on the operator's licence, target markets and processing history.",
        detail: [
          'We name the specific acquirers under NDA during due diligence. In general they look for a recognised licence (MGA, UKGC, Curaçao, [PLACEHOLDER: other licences]), geo-blocking for markets the licence does not cover, age verification, and Visa and Mastercard high-risk merchant registration.',
          'We check all of this before submission and agree reserve terms upfront.',
        ],
      },
      {
        id: 'do-you-work-with-unlicensed-gambling-operators',
        question: 'Do you work with unlicensed gambling operators?',
        lead: 'No. We only place gambling operators that hold a licence covering the markets they take players from.',
        detail: [
          'Unlicensed gambling is on our published list of what we cannot place. We verify gambling licences (MGA, UKGC, Curaçao, [PLACEHOLDER: other licences]) and check geo-blocking for markets outside the licence before any submission.',
        ],
      },
      {
        id: 'what-is-a-sponsor-acquirer-for-payfacs',
        question: 'What is a sponsor acquirer for payfacs?',
        lead: 'A sponsor acquirer is the bank that sponsors a payment facilitator into the card schemes, so the payfac can board sub-merchants under its own master MID.',
        detail: [
          'The payfac handles sub-merchant onboarding, KYB and funding, while the sponsor acquirer stays responsible to Visa and Mastercard for the programme.',
          'Nexflow places payfacs with sponsor acquirers that support sub-merchant models, and works with you on payfac and marketplace scheme registrations. ISOs and MSPs need a sponsoring acquirer for scheme registration in the same way.',
        ],
      },
      {
        id: 'how-long-does-it-take-to-get-a-live-mid',
        question: 'How long does it take to get a live MID?',
        lead: 'Our target is [PLACEHOLDER: X] business days from a complete merchant file to a live MID, after your one-time partner due diligence.',
        detail: [
          'Partner due diligence takes [PLACEHOLDER: X] days and happens once. After that, timing depends on the vertical, the acquirer and how complete the merchant file is.',
          'MCCs that need high-risk scheme registration, such as 7995, can take longer. Pre-screening tells you the likely timeline before you submit.',
        ],
      },
      {
        id: 'how-does-pricing-work',
        question: 'How does pricing work?',
        lead: 'Wholesale pricing on interchange++: interchange and scheme fees are passed through at cost, with our margin shown as a separate line. You set your own pricing to your merchants.',
        detail: [
          'Reserve terms, rolling or fixed, are agreed in writing before a merchant goes live. We give 30 days\' notice before any change to pricing or terms [PLACEHOLDER: confirm].',
          'Rates depend on vertical, volume and acquirer. [PLACEHOLDER: any pricing detail you are willing to publish, e.g. setup fees or a typical margin range]',
        ],
      },
      {
        id: 'who-owns-the-merchant-relationship',
        question: 'Who owns the merchant relationship?',
        lead: "You do. Nexflow works with payment companies only: we don't run a merchant-facing brand, we don't have a merchant sales team, and we never contact your merchants directly.",
        detail: [
          'That commitment is in our partner contract, not just on our website [PLACEHOLDER: confirm non-solicit clause].',
          'The acquirer will know your merchants for underwriting and scheme reasons, but the commercial relationship stays with you.',
        ],
      },
      {
        id: 'do-you-require-technical-integration',
        question: 'Do you require technical integration?',
        lead: 'It depends on how you connect to the acquirer. [PLACEHOLDER: direct answer once the technical model is confirmed, e.g. whether supported gateways need no new integration]',
        detail: [
          'Supported gateways and platforms: [PLACEHOLDER: supported gateways and platforms].',
          'Nexflow handles the commercial, underwriting and placement side. Reconciliation and reporting data is available via API and dashboard [PLACEHOLDER: confirm].',
        ],
      },
      {
        id: 'what-happens-if-an-acquirer-exits-a-vertical',
        question: 'What happens if an acquirer exits a vertical?',
        lead: "Your merchants move to a backup acquirer. We plan backup placement for every vertical from day one, so there's somewhere to go before it's needed.",
        detail: [
          'The merchant file is already in our standard format, so re-submission is quicker than starting a fresh application. We tell you as soon as an acquirer gives notice of a change in appetite.',
          "Notice periods depend on the acquirer's contract: [PLACEHOLDER: typical acquirer notice period].",
        ],
      },
      {
        id: 'how-does-visa-vamp-affect-psps',
        question: "How does Visa's VAMP programme affect PSPs?",
        lead: "Visa's Acquirer Monitoring Program (VAMP) measures fraud and disputes together, for each merchant and each acquirer. On 1 April 2026 the merchant Excessive threshold dropped from 2.2% to 1.5%, with a fee of $8 per disputed or fraudulent transaction.",
        detail: [
          'Acquirers are measured too: they pay $4 per dispute at Above Standard and $8 at Excessive. That cost flows down, so acquirers are quicker to add reserves, cap volume or offboard merchants trending towards the threshold.',
          'For a PSP, that means watching every merchant\'s ratio, not just the portfolio average. We monitor ratios against VAMP with you and send early warnings before a merchant breaches.',
          'Thresholds and fees can differ by region and change over time. Check the current Visa rules for the markets you process in.',
        ],
        lastUpdated: '2026-10-20',
      },
      {
        id: 'how-do-you-handle-chargeback-threshold-breaches',
        question: 'How do you handle chargeback threshold breaches?',
        lead: "We aim to stop them before they happen: we track each merchant's ratios against Visa VAMP and Mastercard's excessive chargeback and fraud programmes, and alert you early.",
        detail: [
          'Prevention tools include Ethoca alerts and Verifi RDR and CDRN where available, 3DS2, and clear descriptors.',
          "If a merchant does breach, we work with you and the acquirer on a remediation plan. If it can't be fixed in time, we look at whether a backup placement is possible.",
        ],
      },
      {
        id: 'can-you-settle-in-stablecoins',
        question: 'Can you settle in stablecoins?',
        lead: 'Where the acquirer supports it, yes: optional settlement in USDC, USDT or EURC [PLACEHOLDER: confirm]. Standard settlement is in [PLACEHOLDER: currencies].',
        detail: [
          'Stablecoin settlement is an option alongside fiat, not a replacement. Availability depends on the acquirer and your jurisdiction, and we confirm it per placement.',
        ],
      },
      {
        id: 'do-you-offer-payouts-and-withdrawals-oct',
        question: 'Do you offer payouts and withdrawals (OCT)?',
        lead: 'Yes, where available: payouts and withdrawals through Visa Direct and Mastercard Move, using original credit transactions (OCT).',
        detail: [
          'This matters most for iGaming and trading platforms, where players and customers expect fast withdrawals to the card they deposited with.',
          'Availability depends on the acquirer, the card issuer country and the vertical. [PLACEHOLDER: confirm OCT coverage]',
        ],
      },
      {
        id: 'what-do-you-need-to-start-due-diligence',
        question: 'What do you need from us to start due diligence?',
        lead: "Your licence or registration, your AML/KYC framework and an overview of your portfolio. That's enough for us to tell you whether we're a fit.",
        detail: ['For full due diligence, expect to share:'],
        list: [
          'Company documents and ownership, including beneficial owners',
          'Licence or registration details (PI, EMI or equivalent, or scheme registration as an ISO, MSP or payfac)',
          'Your AML/KYC policy and the name of your compliance owner',
          'Portfolio overview: MCCs, geographies and monthly volume',
          'Recent chargeback and fraud ratios',
          '[PLACEHOLDER: full due diligence document list]',
        ],
      },
      {
        id: 'do-you-have-a-referral-programme',
        question: 'Do you have a referral or affiliate programme?',
        lead: 'Yes. Consultants, agencies and ISOs without acquirer access can introduce PSPs or portfolios to Nexflow and earn a revenue share.',
        detail: [
          'Terms: [PLACEHOLDER: referral terms].',
          'Referred PSPs go through the same due diligence as any other partner. To join, apply through the form on this page and choose "Referral partner".',
        ],
      },
    ],
  },

  apply: {
    eyebrow: '',
    heading: "Tell us about your book. We'll tell you where it fits.",
    intro: 'Reply within 24 hours. Confidential. NDA available on request.',
    fields: {
      fullName: { name: 'fullName', label: 'Full name', kind: 'input', type: 'text', required: true, autocomplete: 'name', width: 'half' },
      workEmail: {
        name: 'workEmail',
        label: 'Work email',
        kind: 'input',
        type: 'email',
        required: true,
        autocomplete: 'email',
        hint: 'Company domain only.',
        width: 'half',
      },
      company: { name: 'company', label: 'Company name', kind: 'input', type: 'text', required: true, autocomplete: 'organization', width: 'half' },
      website: {
        name: 'website',
        label: 'Website',
        kind: 'input',
        type: 'url',
        required: true,
        autocomplete: 'url',
        placeholder: 'yourcompany.com',
        width: 'half',
      },
      companyType: {
        name: 'companyType',
        label: 'Company type',
        kind: 'select',
        required: true,
        width: 'half',
        options: [
          { value: 'psp-gateway', label: 'PSP / Gateway' },
          { value: 'payfac', label: 'Payfac' },
          { value: 'iso-msp', label: 'ISO / MSP' },
          { value: 'orchestrator', label: 'Orchestrator' },
          { value: 'emi-pi', label: 'EMI / PI' },
          { value: 'referral', label: 'Referral partner' },
          { value: 'founding', label: 'Founding partner' },
          { value: 'other', label: 'Other' },
        ],
      },
      volume: {
        name: 'volume',
        label: 'Monthly processing volume',
        kind: 'select',
        required: true,
        width: 'half',
        options: [
          { value: 'under-500k', label: 'Under $500k' },
          { value: '500k-2m', label: '$500k to $2M' },
          { value: '2m-10m', label: '$2M to $10M' },
          { value: '10m-50m', label: '$10M to $50M' },
          { value: '50m-plus', label: '$50M+' },
        ],
      },
      licenceStatus: {
        name: 'licenceStatus',
        label: 'Licence or registration',
        kind: 'select',
        required: true,
        width: 'half',
        options: [
          { value: 'pi-emi', label: 'Payment institution or EMI licence' },
          { value: 'scheme-registered', label: 'Scheme registration (ISO, MSP or payfac)' },
          { value: 'other-licence', label: 'Other licence or registration' },
          { value: 'none', label: 'None' },
        ],
      },
      licenceDetails: {
        name: 'licenceDetails',
        label: 'Jurisdiction and licence type',
        kind: 'input',
        type: 'text',
        required: true,
        placeholder: 'e.g. Lithuania, EMI licence',
        hint: 'Not needed if you selected None.',
        width: 'half',
      },
      verticals: {
        name: 'verticals',
        label: 'Verticals',
        kind: 'checkboxes',
        required: true,
        hint: 'Select all that apply.',
        options: [
          { value: 'igaming', label: 'iGaming' },
          { value: 'sports-betting', label: 'Sports betting' },
          { value: 'ecommerce', label: 'Ecommerce' },
          { value: 'affiliate-nutra', label: 'Affiliate / nutra' },
          { value: 'forex-cfd', label: 'Forex / CFD' },
          { value: 'subscriptions', label: 'Subscriptions' },
          { value: 'crypto', label: 'Crypto' },
          { value: 'dating', label: 'Dating' },
          { value: 'travel', label: 'Travel' },
          { value: 'other', label: 'Other' },
        ],
      },
      geographies: {
        name: 'geographies',
        label: 'Target geographies',
        kind: 'checkboxes',
        required: true,
        hint: 'Where your merchants sell. Select all that apply.',
        options: [
          { value: 'eea', label: 'EEA' },
          { value: 'uk', label: 'UK' },
          { value: 'north-america', label: 'North America' },
          { value: 'latam', label: 'Latin America' },
          { value: 'apac', label: 'Asia-Pacific' },
          { value: 'middle-east', label: 'Middle East' },
          { value: 'africa', label: 'Africa' },
          { value: 'global', label: 'Global' },
        ],
      },
      needs: {
        name: 'needs',
        label: 'What you need',
        kind: 'checkboxes',
        required: true,
        hint: 'Select all that apply.',
        options: [
          { value: 'extra-capacity', label: 'Extra capacity' },
          { value: 'backup-acquirer', label: 'Backup acquirer' },
          { value: 'high-risk-placement', label: 'High-risk placement' },
          { value: 'local-acquiring', label: 'Local acquiring' },
          { value: 'payouts-oct', label: 'Payouts / OCT' },
          { value: 'stablecoin-settlement', label: 'Stablecoin settlement' },
        ],
      },
      currentAcquirers: {
        name: 'currentAcquirers',
        label: 'Current acquirers',
        kind: 'input',
        type: 'text',
        required: false,
        hint: 'Optional. Treated as confidential.',
      },
      message: {
        name: 'message',
        label: 'Anything else we should know',
        kind: 'textarea',
        required: false,
        hint: 'Optional.',
      },
    },
    consent: {
      label: 'I agree that Nexflow can use these details to respond to my application, as described in the {privacyLink}.',
      privacyLinkLabel: 'privacy notice',
      privacyHref: '[PLACEHOLDER: privacy notice URL]',
    },
    honeypotLabel: 'Leave this field empty',
    submitLabel: 'Send application',
    submittingLabel: 'Sending',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address, like name@company.com.',
      freeEmail: 'Please use your company email so we can verify your business.',
      url: 'Enter a valid website, like yourcompany.com.',
      minOne: 'Select at least one option.',
      licenceDetails: 'Add the jurisdiction and licence type, or choose None above.',
      consent: 'Please agree so we can respond to your application.',
      invalidOption: 'Choose one of the options.',
      tooLong: 'This is too long. Please shorten it.',
      summary: 'Please fix {count} field(s) below.',
      rateLimited: "You've sent several applications in a short time. Please wait a few minutes and try again.",
    },
    success: {
      heading: 'Application received',
      body: 'Thanks. [PLACEHOLDER: contact name] will reply within 24 hours.',
      bookingHeading: 'Want to talk sooner?',
      bookingLinkLabel: 'Open the booking page',
      bookingFrameTitle: 'Book a call with Nexflow',
    },
    failure: {
      heading: "We couldn't send your application",
      body: "Something went wrong on our side. Email us at {email} and we'll pick it up from there.",
      email: '[PLACEHOLDER: partnerships email]',
    },
  },

  footer: {
    tagline: 'Acquiring partner network for PSPs.',
    about: {
      heading: 'About Nexflow',
      text: 'Nexflow is an acquiring partner network for PSPs, payfacs and ISOs. We sign and manage acquirer relationships so payment companies can place iGaming, ecommerce and affiliate merchants. We do not work with merchants directly.',
    },
    columns: [
      {
        heading: 'On this page',
        links: [
          { label: 'How it works', href: '#how' },
          { label: 'Network', href: '#network' },
          { label: 'Verticals', href: '#verticals' },
          { label: 'Partners', href: '#partners' },
          { label: 'Trust', href: '#trust' },
          { label: 'Founding partners', href: '#founding-partners' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Apply', href: '#apply' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy policy', href: '[PLACEHOLDER: privacy policy URL]' },
          { label: 'Terms', href: '[PLACEHOLDER: terms URL]' },
          { label: 'Cookie policy', href: '[PLACEHOLDER: cookie policy URL]' },
          { label: 'Responsible gambling', href: '[PLACEHOLDER: responsible gambling statement URL]' },
        ],
      },
    ],
    contact: {
      heading: 'Contact',
      emailLabel: 'Email',
      email: '[PLACEHOLDER: contact email]',
      social: [
        { label: 'LinkedIn', href: '[PLACEHOLDER: LinkedIn URL]' },
        { label: 'X', href: '[PLACEHOLDER: X URL]' },
        { label: 'Telegram', href: '[PLACEHOLDER: Telegram URL]' },
      ],
    },
    entityDetails: '[PLACEHOLDER: legal entity name, company number, registered address]',
    disclaimer:
      'Nexflow is not a bank or card acquirer. Acquiring services are provided by our regulated partners. [PLACEHOLDER: adjust to actual status]',
    copyright: '© {year} {brand}',
  },

  seo: {
    title: 'Acquiring for PSPs: iGaming & High-Risk | Nexflow',
    // Alternative title, kept for testing:
    // title: 'Acquiring Partner for PSPs, Payfacs and ISOs | Nexflow',
    description:
      'Acquiring partner network for PSPs, payfacs and ISOs. Place iGaming, ecommerce and affiliate merchants with acquirers that want them. PSP-only.',
    categoryLabel: CATEGORY_LABEL,
    // [PLACEHOLDER: final OG image] The current file is a labelled placeholder.
    ogImage: '/og/nexflow-og.png',
    ogImageAlt: 'Nexflow: acquiring for PSPs, iGaming and high-risk',
    twitterHandle: '[PLACEHOLDER: X handle]',
    organization: {
      legalName: '[PLACEHOLDER: legal entity name]',
      logo: '/icon-512.png',
      sameAs: [
        { label: 'LinkedIn', url: '[PLACEHOLDER: LinkedIn company URL]' },
        { label: 'Crunchbase', url: '[PLACEHOLDER: Crunchbase URL]' },
        { label: 'X', url: '[PLACEHOLDER: X profile URL]' },
      ],
    },
    service: {
      name: 'Nexflow acquiring partner network',
      serviceType: 'Acquiring partner network',
      audienceType: 'Payment service providers, payment facilitators, ISOs',
      description:
        'Access to multiple acquiring banks through one partnership, with merchants placed by MCC, geography and risk profile. Built for high-risk verticals including iGaming, affiliate-driven merchants and cross-border ecommerce.',
    },
    llms: {
      summary:
        'Nexflow signs and manages acquirer relationships so payment companies can place iGaming, ecommerce and affiliate merchants with acquirers that want them. It works with payment companies only.',
      servesHeading: 'Who Nexflow serves',
      serves: [
        'PSPs and gateways that need extra acquiring capacity or a backup acquirer',
        'Payment facilitators that need sponsor-acquirer coverage for sub-merchant models',
        'ISOs and MSPs with portfolios mainstream acquirers will not take',
        'Payment orchestrators adding acquirers to their routing',
        'EMIs and PIs that need acquiring',
        'Referral partners (consultants, agencies, ISOs without acquirer access)',
      ],
      verticalsHeading: 'Verticals covered',
      doesNotHeading: 'What Nexflow does not do',
      doesNot: [
        'Nexflow does not work with merchants directly and has no merchant-facing product or sales team.',
        'Nexflow does not place unlicensed gambling or anything prohibited under Visa or Mastercard rules.',
      ],
      notAcquirerLine:
        'Nexflow is not an acquirer. All acquiring is performed by its regulated acquiring partners.',
      contactHeading: 'Contact',
      applyLine: 'Partner applications',
      pagesHeading: 'Pages',
    },
  },
};
