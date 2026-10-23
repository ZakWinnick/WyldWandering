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

// Where the site's forms (contact question, retainer application) are delivered via FormSubmit.
// Separate from SITE.email, which stays the public address shown on the site.
export const FORM_EMAIL = 'zak.winnick@fora.travel';

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

// Planning fees. Home, Services, Contact and FAQ all read from here.
export const PRICING = [
  {
    name: 'Hotel Only',
    price: 'Complimentary',
    detail: 'I book the hotel you choose and add the VIP perks: breakfast, resort credits, and upgrades when available.',
  },
  {
    name: 'Hotel and Flights',
    price: '$250',
    detail: 'Your hotel with perks, plus flights that connect sensibly with the rest of the trip.',
  },
  {
    name: 'Full Itinerary',
    price: '$1,000',
    detail: 'Hotels, flights, restaurants, and experiences, planned day by day.',
  },
  {
    name: 'Group Room Blocks',
    price: 'From $500',
    detail: 'Up to 10 rooms $500. 11 to 25 rooms $1,000. Larger groups by quote. Group itineraries quoted separately.',
  },
] as const;

export const RETAINER = {
  name: 'Annual Retainer',
  price: '$5,000/year',
  amount: '$5,000',
  billing: 'Billed annually, or $1,350 quarterly. By application.',
  summary: 'Up to six full itineraries, same-business-day response, and 50% off everything else.',
  includes: [
    'Up to six full itineraries a year',
    'Every hotel and hotel-and-flights booking, no planning fee',
    'Same-business-day response',
    'Concierge help on trips booked with me: dining, experiences, transfers',
    'A planning call at the start of your year',
    '50% off everything else: extra itineraries, group room blocks, events',
  ],
  invite: "Once you've booked $40,000 in travel with me, you get a year of retainer services free, no application needed.",
} as const;

// Retainer application form (FormSubmit, emails SITE.email).
export const RETAINER_APPLY_URL = '/retainer/apply/';

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/faq', label: 'FAQ' },
] as const;
