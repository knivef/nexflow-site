/**
 * Every flag and list from CLAUDE.md lives here. Nothing else in the codebase decides
 * whether a feature is visible.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const configSchema = z.object({
  /** Review-only control for switching between home versions A, B and C. */
  showVersionSwitcher: z.boolean(),
  /** Client login is out of scope. Keep false until the product exists. */
  showLogin: z.boolean(),
  /** Cookie consent gate. Required while any non-essential script can load. */
  cookieConsentRequired: z.boolean(),
  /** Leadership section on the About page. Keep false until real bios exist. */
  showLeadership: z.boolean(),
  /**
   * Countries where business accounts can be opened, used by the account form and by the
   * "supported countries" link. Empty until compliance supplies the approved list, so the
   * form cannot imply a country is supported when it is not.
   */
  supportedCountries: z.array(z.object({ code: z.string().length(2), name: z.string().min(1) })),
  /**
   * Industries the account form accepts. Derived from the client segments in CLAUDE.md.
   * Excluded industries are never listed here and never rendered anywhere on the site.
   */
  acceptedIndustries: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })),
  /**
   * Free mail domains the account form refuses, so a business application arrives from a
   * company address we can tie to the business. A judgement list, not a regulatory one.
   */
  freeEmailDomains: z.array(z.string().min(1)),
  /**
   * Business activities we do not serve, listed on the prohibited businesses page.
   * acceptedIndustries is the positive counterpart: this is the explicit exclusion list.
   */
  prohibitedBusinesses: z.array(z.string().min(1)),
  /** Countries where services are not available. Empty until compliance supplies the list. */
  restrictedCountries: z.array(z.object({ code: z.string().length(2), name: z.string().min(1) })),
});

export const siteConfig = defineContent('site.config', configSchema, {
  showVersionSwitcher: true,
  showLogin: false,
  cookieConsentRequired: true,
  showLeadership: false,

  // [PLACEHOLDER: supported countries list] See PLACEHOLDERS.md.
  supportedCountries: [],

  // [CONFIRM: compliance approval of the accepted industry list]
  acceptedIndustries: [
    { id: 'crypto-web3', label: 'Crypto and Web3' },
    { id: 'ecommerce', label: 'E-commerce and digital goods' },
    { id: 'video-games', label: 'Video game studios' },
    { id: 'marketplaces', label: 'Marketplaces and platforms' },
    { id: 'remote-teams', label: 'Remote-first companies' },
    { id: 'import-export', label: 'Import and export' },
    { id: 'fintechs', label: 'Fintechs and crypto platforms' },
  ],

  // [CONFIRM: the free mail domain list] Extend it as real applications come in.
  freeEmailDomains: [
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'yahoo.co.uk',
    'hotmail.com',
    'hotmail.co.uk',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'proton.me',
    'protonmail.com',
    'gmx.com',
    'gmx.net',
    'mail.com',
    'mail.ru',
    'yandex.com',
    'yandex.ru',
    'zoho.com',
    'tutanota.com',
    'fastmail.com',
  ],

  /*
   * CLAUDE.md names three excluded industries. They are listed here, and on the prohibited
   * businesses page, because that page is the one place they must appear: the rule against
   * listing them is about never implying we serve them anywhere else.
   * [PLACEHOLDER: full prohibited business list from the AML policy] extends this.
   */
  prohibitedBusinesses: [
    'Gambling, betting and gaming of chance',
    'Adult content',
    'Unlicensed financial services',
  ],

  // [PLACEHOLDER: restricted countries list] Empty until compliance supplies it.
  restrictedCountries: [],
});

export type SiteConfig = typeof siteConfig;
