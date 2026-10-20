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
  /** Show the floating version switcher linking the versions of the site (see src/shared/versions.ts). */
  showVersionSwitcher: boolean;
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
};
