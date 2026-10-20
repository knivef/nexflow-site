/**
 * Feature flags for the site. This is the only place these switches live.
 */
export interface SiteConfig {
  /** Show the black announcement bar above the nav. Hidden anyway if announcement text is empty. */
  showAnnouncementBar: boolean;
  /** Render testimonials in #trust. Keep false until there are real, approved quotes. */
  showTestimonials: boolean;
  /** Show the founding partner spots progress bar in #founding-partners. */
  showFoundingProgress: boolean;
  /** Total founding partner spots on offer. */
  foundingSpotsTotal: number;
  /** Founding partner spots already taken. Must be a real number. */
  foundingSpotsFilled: number;
  /** Show a merchant referral form in #merchants instead of a plain redirect message. */
  merchantReferralForm: boolean;
  /** Show links to resources (docs, guides, status page) once they exist. */
  showResources: boolean;
  /** Show the floating version switcher linking the deployed versions of the site. */
  showVersionSwitcher: boolean;
  /**
   * Deployed versions. Each lives on its own git branch and Vercel URL.
   * The first entry is the primary version: the only one search engines may index.
   */
  versions: { id: string; label: string; branch: string; url: string }[];
}

export const config: SiteConfig = {
  showAnnouncementBar: true,
  showTestimonials: false,
  showFoundingProgress: false,
  foundingSpotsTotal: 0,
  foundingSpotsFilled: 0,
  merchantReferralForm: false,
  showResources: false,
  showVersionSwitcher: true,
  versions: [
    { id: 'v1', label: 'V1', branch: 'main', url: 'https://nexflow-site.vercel.app' },
    { id: 'v2', label: 'V2', branch: 'v2', url: 'https://nexflow-site-v2.vercel.app' },
    { id: 'v3', label: 'V3', branch: 'v3', url: 'https://nexflow-site-v3.vercel.app' },
  ],
};
