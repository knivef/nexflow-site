/**
 * Types for the site content. All copy lives in site.ts, which must satisfy SiteContent.
 * Strings may contain [PLACEHOLDER: description] markers, which render as visible highlights.
 */

export interface Link {
  label: string;
  href: string;
}

export interface TextBlock {
  title: string;
  body: string;
}

export interface SectionHeader {
  eyebrow: string;
  heading: string;
  intro: string;
}

/** Interface strings that are not section copy: accessible labels, form helpers, menu text. */
export interface UiContent {
  skipLink: string;
  mainNavLabel: string;
  footerNavLabel: string;
  menuOpen: string;
  menuClose: string;
  announcementLabel: string;
  dismissAnnouncement: string;
  requiredMarker: string;
  selectPlaceholder: string;
  /** Accessible names for sections, used when a section has no visible heading. Keyed by anchor id. */
  sectionLabels: Record<string, string>;
}

export interface NavContent {
  brand: string;
  /** Accessible label for the home link, e.g. "Nexflow home". */
  brandLabel: string;
  links: Link[];
  /** Quiet text link for merchants who land here by mistake. */
  merchantLink: Link;
  primaryCta: Link;
}

export interface AnnouncementContent {
  /** Bump this when the announcement changes, so people who dismissed the old one see the new one. */
  id: string;
  text: string;
  link: Link | null;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: Link;
  secondaryCta: Link | null;
  /** Short factual claims shown under the CTAs. */
  proofPoints: string[];
}

export interface WhoColumn {
  heading: string;
  items: string[];
}

export interface WhoContent extends SectionHeader {
  worksWith: WhoColumn;
  notWith: WhoColumn;
  merchantNote: {
    text: string;
    link: Link;
  };
}

export interface ProblemContent extends SectionHeader {
  /** Keyword-led H3 under the H2, e.g. "Multi-acquiring without multiple contracts". */
  subheading: string;
  points: TextBlock[];
}

export interface HowStep {
  title: string;
  body: string;
}

export interface TimelineMilestone {
  label: string;
  /** Duration text, may contain a placeholder, e.g. "[PLACEHOLDER: X] days". */
  value: string;
}

export interface HowContent extends SectionHeader {
  steps: HowStep[];
  timeline: {
    /** Accessible name and visible caption for the timeline graphic. */
    label: string;
    milestones: TimelineMilestone[];
  };
}

export interface NetworkRow {
  region: string;
  /** "Yes", "No", or a placeholder until confirmed. */
  localAcquiring: string;
  verticals: string[];
  settlementCurrencies: string;
  typicalGoLive: string;
  /** True for seeded example rows. Every cell renders highlighted until replaced with real data. */
  placeholder: boolean;
}

export interface NetworkContent extends SectionHeader {
  /** Hub-and-spoke coverage diagram. Region nodes are generated from table.rows. */
  diagram: {
    label: string;
    sourceLabel: string;
    sourceDetail: string;
    hubLabel: string;
    hubDetail: string;
    /** Badge text on a region node when localAcquiring is "Yes" / "No". */
    localBadge: string;
    crossBorderBadge: string;
  };
  table: {
    caption: string;
    columns: {
      region: string;
      localAcquiring: string;
      verticals: string;
      settlementCurrencies: string;
      typicalGoLive: string;
    };
    filters: {
      regionLabel: string;
      verticalLabel: string;
      allRegions: string;
      allVerticals: string;
      reset: string;
      /** Live status text. {shown} and {total} are replaced at runtime. */
      status: string;
      empty: string;
    };
    placeholderRowLabel: string;
    rows: NetworkRow[];
  };
  footnote: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface FeatureGroup {
  id: string;
  label: string;
  summary: string;
  items: Feature[];
}

export interface FeaturesContent extends SectionHeader {
  tabsLabel: string;
  groups: FeatureGroup[];
}

export interface Vertical {
  /** Used for the deep link (#verticals-{id}) and a future standalone page slug. */
  id: string;
  /** Short label on the tab. */
  tabLabel: string;
  /** Full vertical name, shown above the sub-heading. */
  name: string;
  /** SEO sub-heading, rendered as the panel's H3. */
  subheading: string;
  problem: string;
  solution: string;
  capabilities: string[];
  /** Optional extra block, used for affiliate and referral partners. */
  aside: {
    heading: string;
    audience: string;
    body: string;
  } | null;
}

export interface VerticalsContent extends SectionHeader {
  tabsLabel: string;
  defaultTab: string;
  labels: {
    problem: string;
    solution: string;
    capabilities: string;
  };
  items: Vertical[];
  /** Catch-all card shown under the tabs. */
  other: {
    title: string;
    body: string;
    link: Link;
  };
}

export interface PartnerType {
  title: string;
  /** The "what you get" line. */
  benefit: string;
  link: Link | null;
}

export interface PartnersContent extends SectionHeader {
  /** Keyword-led H3 under the H2. */
  subheading: string;
  benefitLabel: string;
  types: PartnerType[];
  callout: {
    heading: string;
    text: string;
  };
}

/** Shared shape for the left-hand label column of each trust module. */
export interface TrustModuleHeader {
  heading: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/jane-doe.jpg". Empty shows a neutral placeholder. */
  photo: string;
  yearsInPayments: string;
  /** Real previous employers only. */
  previousCompanies: string[];
  linkedin: string;
}

export interface Advisor {
  name: string;
  background: string;
  linkedin: string;
}

export interface CorporateFact {
  label: string;
  value: string;
  /** Optional link, e.g. to the company registry record. */
  href: string;
}

export interface Licence {
  name: string;
  regulator: string;
  number: string;
  /** Link to the public register entry. */
  href: string;
}

export interface ComplianceItem {
  name: string;
  /** Honest status, e.g. "Level 1 certified", "In progress", "Not started". */
  status: string;
  detail: string;
}

export interface PresenceItem {
  name: string;
  /** e.g. "Member", "Attending", "Speaking". */
  type: string;
  href: string;
}

export interface Resource {
  title: string;
  summary: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  title: string;
  summary: string;
  href: string;
}

export interface TrustContent extends SectionHeader {
  people: TrustModuleHeader & { members: TeamMember[] };
  /** Module is hidden when members is empty. */
  advisors: TrustModuleHeader & { members: Advisor[] };
  corporate: TrustModuleHeader & {
    facts: CorporateFact[];
    licences: Licence[];
    /** Shown when licences is empty. */
    notLicensedStatement: string;
    statusNote: string;
    licenceLabels: { regulator: string; number: string; register: string };
  };
  criteria: TrustModuleHeader & {
    lookFor: { summary: string; items: string[] };
    cantPlace: { summary: string; items: string[] };
  };
  charter: TrustModuleHeader & { commitments: string[] };
  security: TrustModuleHeader & { items: ComplianceItem[] };
  presence: TrustModuleHeader & { items: PresenceItem[] };
  founding: TrustModuleHeader & { link: Link };
  /** Rendered only when config.showResources is true. */
  resources: TrustModuleHeader & { items: Resource[]; linkLabel: string };
  contact: TrustModuleHeader & {
    name: string;
    role: string;
    photo: string;
    email: string;
    /** Handle without the @. */
    telegram: string;
    /** Used when the BOOKING_URL env var is not set. */
    calendarUrl: string;
    labels: { email: string; telegram: string; calendar: string };
  };
  /** Rendered only when config.showTestimonials is true AND at least one array has real entries. */
  proof: {
    heading: string;
    testimonials: Testimonial[];
    caseStudies: CaseStudy[];
    caseStudyLinkLabel: string;
  };
  labels: {
    yearsInPayments: string;
    previously: string;
    linkedin: string;
    photoOf: string;
  };
}

export interface FoundingPartnersContent extends SectionHeader {
  /**
   * H2 template. {spots} is replaced with config.foundingSpotsTotal when it is set,
   * otherwise with spotsPlaceholder.
   */
  headingTemplate: string;
  spotsPlaceholder: string;
  gets: { heading: string; items: string[] };
  asks: { heading: string; items: string[] };
  /** Progress text. {filled}, {total} and {left} are replaced from config. */
  progressLabel: string;
  progressRemaining: string;
  cta: Link & {
    /** Pre-selects this partnership type in the #apply form. */
    intent: string;
  };
}

export interface CompareRow {
  label: string;
  /** One value per column, in the same order as columns. */
  values: string[];
  /** Indexes of the columns that come out ahead on this row. Empty when it depends. */
  edge: number[];
}

export interface CompareContent extends SectionHeader {
  caption: string;
  columns: string[];
  /** Index of the Nexflow column, which gets a subtle highlight. */
  highlightColumn: number;
  edgeLabel: string;
  rows: CompareRow[];
  footnote: string;
}

export interface MerchantsContent {
  heading: string;
  body: string;
  /** Rendered only when config.merchantReferralForm is true. */
  form: {
    heading: string;
    intro: string;
    fields: FormFieldContent[];
    submitLabel: string;
    privacyNote: string;
  };
}

export interface FaqItem {
  /** Anchor id, used as #faq-{id}. Keep stable once published. */
  id: string;
  question: string;
  /** The direct answer in 1 to 2 sentences. Quoted by search snippets and AI answers, so it must stand alone. */
  lead: string;
  /** Supporting paragraphs after the direct answer. Plain text. */
  detail: string[];
  /** Optional bullet list after the detail paragraphs. */
  list?: string[];
  /** ISO date (YYYY-MM-DD) for answers with time-sensitive facts. Rendered as "Last updated". */
  lastUpdated?: string;
}

export interface FaqContent extends SectionHeader {
  lastUpdatedLabel: string;
  items: FaqItem[];
}

export interface FormOption {
  value: string;
  label: string;
}

export interface FormFieldContent {
  name: string;
  label: string;
  /** checkboxes = a multi-select rendered as a group of checkboxes. */
  kind: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'checkboxes';
  type?: 'text' | 'email' | 'url' | 'tel' | 'number';
  required: boolean;
  hint?: string;
  placeholder?: string;
  autocomplete?: string;
  options?: FormOption[];
  /** Layout hint: half-width fields sit two per row on wide screens. */
  width?: 'half' | 'full';
}

/** Field names are fixed: validation and the submission adapters rely on them. Copy is free to change. */
export type ApplyFieldName =
  | 'fullName'
  | 'workEmail'
  | 'company'
  | 'website'
  | 'companyType'
  | 'licenceStatus'
  | 'licenceDetails'
  | 'volume'
  | 'verticals'
  | 'geographies'
  | 'currentAcquirers'
  | 'needs'
  | 'message';

export interface ApplyContent extends SectionHeader {
  fields: Record<ApplyFieldName, FormFieldContent>;
  consent: {
    /** {privacyLink} is replaced with a link to the privacy notice. */
    label: string;
    privacyLinkLabel: string;
    privacyHref: string;
  };
  honeypotLabel: string;
  submitLabel: string;
  submittingLabel: string;
  errors: {
    required: string;
    email: string;
    freeEmail: string;
    url: string;
    minOne: string;
    licenceDetails: string;
    consent: string;
    invalidOption: string;
    tooLong: string;
    /** Shown above the form when client-side validation fails. {count} is the number of fields to fix. */
    summary: string;
    rateLimited: string;
  };
  success: {
    heading: string;
    body: string;
    bookingHeading: string;
    bookingLinkLabel: string;
    bookingFrameTitle: string;
  };
  failure: {
    heading: string;
    /** {email} is replaced with the fallback email link. */
    body: string;
    email: string;
  };
}

export interface FooterContent {
  tagline: string;
  about: {
    heading: string;
    /** Written to be quoted word for word by AI assistants. Keep it factual and self-contained. */
    text: string;
  };
  columns: { heading: string; links: Link[] }[];
  contact: {
    heading: string;
    emailLabel: string;
    email: string;
    social: Link[];
  };
  /** Legal entity name, number and registered address. */
  entityDetails: string;
  disclaimer: string;
  /** {year} and {brand} are replaced at build time. */
  copyright: string;
}

export interface SeoContent {
  title: string;
  description: string;
  /** Exact category wording from CLAUDE.md. Used in copy, schema and llms.txt. */
  categoryLabel: string;
  /** Path under /public. 1200 x 630. */
  ogImage: string;
  ogImageAlt: string;
  /** X handle without the @, for twitter:site. Leave empty or a placeholder to omit the tag. */
  twitterHandle: string;
  organization: {
    legalName: string;
    logo: string;
    /** Public profiles. Only real URLs are output in schema; placeholders are skipped. */
    sameAs: { label: string; url: string }[];
  };
  service: {
    name: string;
    serviceType: string;
    audienceType: string;
    description: string;
  };
  /** Text for /llms.txt. Category label, verticals and contact details are pulled from the rest of this file. */
  llms: {
    summary: string;
    servesHeading: string;
    serves: string[];
    verticalsHeading: string;
    doesNotHeading: string;
    doesNot: string[];
    notAcquirerLine: string;
    contactHeading: string;
    applyLine: string;
    pagesHeading: string;
  };
}

export interface SiteContent {
  ui: UiContent;
  nav: NavContent;
  announcement: AnnouncementContent;
  hero: HeroContent;
  who: WhoContent;
  problem: ProblemContent;
  how: HowContent;
  network: NetworkContent;
  features: FeaturesContent;
  verticals: VerticalsContent;
  partners: PartnersContent;
  trust: TrustContent;
  foundingPartners: FoundingPartnersContent;
  compare: CompareContent;
  merchants: MerchantsContent;
  faq: FaqContent;
  apply: ApplyContent;
  footer: FooterContent;
  seo: SeoContent;
}
