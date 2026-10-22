// Single source of truth for links that appear across the site.
// Fora intake and client portal URLs come from the advisor's Fora account.

export const SITE = {
  name: 'Wyld Wandering',
  url: 'https://wyldwandering.com',
  email: 'hello@wyldwandering.com',
  advisor: 'Zak Winnick',
  tagline: 'Premium travel planning with Zak Winnick',
  description:
    'Premium travel planning by Zak Winnick, a certified Fora travel advisor with 15 years in luxury hospitality. The right hotels, the hard-to-get reservations, and the perks you would not get booking on your own.',
} as const;

// New clients start here. Creates their traveler profile in Fora.
export const INTAKE_URL = 'https://secure.foratravel.com/intake/wyldwandering/C8ug7ybur3';

// Existing clients sign in here to browse and book hotels.
export const PORTAL_URL = 'https://trips.foratravel.com/wyldwandering/book';

export const SOCIAL = {
  instagram: 'https://instagram.com/wyldwandering',
  instagramHandle: '@wyldwandering',
  x: 'https://x.com/WyldWandering',
  xHandle: '@WyldWandering',
  fora: 'https://foratravel.com/advisors/zak-winnick',
} as const;

// Required Fora affiliation disclosure. Registration numbers as published on
// https://www.foratravel.com/legal. Update here if Fora's registrations change.
export const FORA_DISCLOSURE = {
  affiliation: 'Wyld Wandering is an independent affiliate of Fora Travel, Inc.',
  registrationsIntro: 'Fora Travel, Inc. is registered with the following state licenses:',
  registrations: [
    'California Seller of Travel Registration No. 2151995-50',
    'Florida Seller of Travel Registration No. ST43973',
    'Washington Seller of Travel Unified Business ID (UBI) # 605329242',
  ],
} as const;

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/faq', label: 'FAQ' },
] as const;
