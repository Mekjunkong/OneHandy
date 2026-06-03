export type ServiceType = 'FIXED' | 'QUOTE';

export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  type: ServiceType;
  price: string;
  duration: string;
  icon: string;
  description: string;
  includes: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'ac-cleaning',
    name: 'AC Cleaning',
    shortDesc: 'Deep clean for cooler, healthier air',
    type: 'FIXED',
    price: '฿800/unit',
    duration: '1–2 hrs',
    icon: 'Wind',
    description:
      'Professional AC deep clean to restore cooling efficiency and improve air quality throughout your home.',
    includes: [
      'Filter removal and deep wash',
      'Coil and fan blade cleaning',
      'Drainage pipe flush',
      'Performance test on completion',
      'Before & after photo updates',
    ],
    faq: [
      { q: 'How often should I clean my AC?', a: 'Every 3–6 months, or more frequently in dusty conditions or heavy use.' },
      { q: 'How long does it take per unit?', a: 'Approximately 45–90 minutes per unit.' },
      { q: 'Do I need to be home?', a: 'Yes, you or a trusted representative needs to be present to grant access.' },
      { q: 'What if my AC needs a refrigerant refill?', a: 'Our technician will advise. Refills are quoted separately.' },
    ],
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    shortDesc: 'Leaks, blockages, and installations fixed fast',
    type: 'FIXED',
    price: 'from ฿1,200',
    duration: '1–3 hrs',
    icon: 'Droplets',
    description:
      'Experienced plumbers handling everything from leaky taps to blocked drains and full pipe repairs.',
    includes: [
      'Fault diagnosis and quote confirmation',
      'Tap, toilet, and pipe repairs',
      'Drain unblocking',
      'Water heater inspection',
      'Completion photos',
    ],
    faq: [
      { q: 'Is the ฿1,200 price inclusive of parts?', a: 'The base rate covers labour. Parts are quoted separately and approved before purchase.' },
      { q: 'Do you handle emergency leaks?', a: 'Yes — for urgent issues, select Emergency Callout so we can triage the request and check technician availability.' },
      { q: 'What brands of fixtures do you work with?', a: 'All standard residential brands available in Thailand.' },
      { q: 'Can you install new fixtures?', a: 'Yes, new fixture installations are within scope.' },
    ],
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    shortDesc: 'Electrical issues coordinated with suitable technicians',
    type: 'FIXED',
    price: 'from ฿1,000',
    duration: '1–2 hrs',
    icon: 'Zap',
    description:
      'Electrical troubleshooting and repair requests coordinated with suitable local technicians for your home.',
    includes: [
      'Issue triage before technician assignment',
      'Outlet, switch, and light fixture requests',
      'Breaker and power issue coordination',
      'Credential check where regulated work is required',
      'Completion report with photos',
    ],
    faq: [
      { q: 'Are electrical technicians checked?', a: 'For regulated electrical work, OneHandy asks for appropriate technician credentials before accepting the request.' },
      { q: 'Can you coordinate ceiling fan installation?', a: 'Yes, submit the request details and we will confirm whether a suitable technician is available.' },
      { q: 'What if the problem requires rewiring?', a: 'Major rewiring jobs require a separate quote and approval before work proceeds.' },
      { q: 'Is the booking confirmed immediately?', a: 'No. We first review the request, confirm technician suitability and availability, then share next steps.' },
    ],
  },
  {
    slug: 'gardening',
    name: 'Gardening',
    shortDesc: 'Lawn care, trimming & garden maintenance',
    type: 'FIXED',
    price: 'from ฿600',
    duration: '2–4 hrs',
    icon: 'Leaf',
    description:
      'Professional garden and lawn maintenance to keep your outdoor space neat and healthy year-round.',
    includes: [
      'Lawn mowing and edging',
      'Hedge and shrub trimming',
      'Weeding and waste removal',
      'Plant inspection and basic care advice',
      'Site clean-up on completion',
    ],
    faq: [
      { q: 'Do you bring your own equipment?', a: 'Yes, all tools and equipment are supplied by our team.' },
      { q: 'Can I set up a regular schedule?', a: 'Yes — weekly, fortnightly, or monthly bookings available.' },
      { q: 'Do you handle large trees?', a: 'Large tree work and palm climbing requires a separate quote.' },
      { q: 'What if it rains on the day?', a: "We'll contact you to reschedule at no extra charge." },
    ],
  },
  {
    slug: 'roof-repair',
    name: 'Roof Repair',
    shortDesc: 'Leaks, tiles, gutters — properly fixed',
    type: 'QUOTE',
    price: 'from ฿3,000',
    duration: 'Varies',
    icon: 'Home',
    description:
      'Experienced roof repair specialists handling leaks, damaged tiles, guttering, and waterproofing.',
    includes: [
      'Full roof inspection and photo report',
      'Detailed written quote before work begins',
      'Leak source identification and repair',
      'Tile replacement and re-bedding',
      'Gutter cleaning and repair',
      'Waterproof sealant application',
    ],
    faq: [
      { q: 'How is the quote calculated?', a: "After a roof inspection, we provide a written quote covering materials and labour. No work starts without your approval." },
      { q: 'How long do repairs take?', a: 'Minor repairs 1–2 days. Full re-roofing 3–7 days depending on size.' },
      { q: 'Do you work during the rainy season?', a: 'We schedule around weather forecasts and prioritise emergency repairs.' },
      { q: 'Is there a workmanship guarantee?', a: 'Any warranty or workmanship coverage is confirmed in writing with the technician quote before work starts.' },
    ],
  },
  {
    slug: 'emergency',
    name: 'Emergency Callout',
    shortDesc: 'Urgent issues triaged for availability follow-up',
    type: 'FIXED',
    price: '฿500 + parts',
    duration: 'Availability requested',
    icon: 'AlertTriangle',
    description:
      'Urgent request path for home issues such as leaks, power failures, lockouts, and safety concerns. We triage the request and follow up with availability and next steps.',
    includes: [
      'Urgent request triage',
      'Availability follow-up before dispatch',
      'Plumbing, electrical, and general emergencies',
      'Transparent parts pricing before purchase',
      'English-speaking coordination throughout',
    ],
    faq: [
      { q: 'What counts as an emergency?', a: 'Active leaks, loss of power, gas concerns, structural hazards, or any situation requiring urgent attention.' },
      { q: 'Is the ฿500 the total cost?', a: "฿500 covers the callout fee. Any parts or specialist labour are quoted on-site before proceeding." },
      { q: 'Is this available at night?', a: 'Submit an urgent request and we will follow up if a technician is available. If there is immediate danger, contact local emergency services or your building manager first.' },
      { q: 'How do I request urgent help?', a: 'Submit the urgent request form with the issue, area, and access details so we can triage availability and next steps.' },
    ],
  },
  {
    slug: 'property-care',
    name: 'Property Care',
    shortDesc: "Monthly management while you're away",
    type: 'QUOTE',
    price: 'from ฿2,500/mo',
    duration: 'Subscription',
    icon: 'ShieldCheck',
    description:
      "Comprehensive property management subscription for expats who travel — we watch your home so you don't have to worry.",
    includes: [
      'Weekly property inspection with photo report',
      'Air circulation and appliance checks',
      'Post-storm damage assessment',
      'Coordination of any required repairs',
      'Monthly written summary report',
      'Priority booking for all services',
      'Dedicated coordination channel after request approval',
    ],
    faq: [
      { q: 'How often do you visit?', a: 'Visit frequency is agreed during setup based on your property, access, and travel schedule.' },
      { q: 'What if something needs fixing?', a: "You'll be notified with photos and a quote. We'll only proceed with your approval." },
      { q: 'Is there a minimum contract length?', a: 'Terms are confirmed during the property-care setup call before a plan starts.' },
      { q: 'What areas do you cover?', a: 'Central Chiang Mai, Nimman, Santitham, Hang Dong, and surrounding areas.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
