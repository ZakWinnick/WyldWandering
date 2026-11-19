// Single source of truth for links that appear across the site.

export const SITE = {
  name: 'Wyld Wandering',
  url: 'https://wyldwandering.com',
  email: 'hello@wyldwandering.com',
  advisor: 'Zak Winnick',
  tagline: 'Premium travel planning with Zak Winnick',
  description:
    'Premium travel planning by Zak Winnick, a luxury travel advisor with 15 years at hotels like the Wynn and the Cosmopolitan. The right hotels, the hard-to-get reservations, and the perks you would not get booking on your own.',
} as const;

// Site forms (contact question, Private Client application) post
// to the Cloudflare Worker in workers/forms, which emails each submission to
// SITE.email through Proton SMTP. Turnstile guards them against bots.
export const FORMS_ENDPOINT = 'https://forms.wyldwandering.com';
export const TURNSTILE_SITE_KEY = '0x4AAAAAAFht_sHD4b5R6f_-';
export const FORMS_LIVE = true;
export const formAction = (form: 'contact' | 'private-client') => `${FORMS_ENDPOINT}/${form}`;

// New clients start here: the TravelJoy intake form (external, opens in a new tab).
export const START_URL = 'https://intake.wyldwandering.com';

export const SOCIAL = {
  instagram: 'https://instagram.com/wyldwandering',
  instagramHandle: '@wyldwandering',
  x: 'https://x.com/WyldWandering',
  xHandle: '@WyldWandering',
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

// Private Client: the annual plan for frequent travelers (formerly "retainer").
export const PRIVATE_CLIENT = {
  name: 'Private Client',
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
  invite: "Once you've booked $40,000 in travel with me, you get a year as a Private Client free, no application needed.",
} as const;

// Private Client application form (posts to the forms Worker).
export const PRIVATE_CLIENT_APPLY_URL = '/private-client/apply/';

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/faq', label: 'FAQ' },
] as const;
