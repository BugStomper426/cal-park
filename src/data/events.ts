export type EventItem = {
  slug: 'mothers-day' | 'memorial-weekend' | 'fishing-for-memories' | 'butterfly-release' | '5k' | 'veterans-day' | 'angel-tree';
  title: string;
  year: number;
  dateDisplay: string;
  time: string;
  summary: string;
  instructions: string[];
  ctaLinks: { label: string; href: string; external?: boolean }[];
};

export const eventItems: EventItem[] = [
  {
    slug: 'mothers-day',
    title: "Mother's Day Remembrance",
    year: 2026,
    dateDisplay: 'May 10, 2026',
    time: '10:00 AM - 12:00 PM',
    summary:
      'A morning of remembrance with floral tributes, devotional reflections, and quiet time in our gardens.',
    instructions: [
      'Parking opens at 9:00 AM near the main office.',
      'Bring a photo or written memory to add to the remembrance display.',
      'Staff will assist families who need accessibility support.'
    ],
    ctaLinks: [
      { label: 'Contact Event Team', href: '/contact/' },
      { label: 'View Events List', href: '/events/' }
    ]
  },
  {
    slug: 'memorial-weekend',
    title: 'Memorial Weekend Tribute',
    year: 2026,
    dateDisplay: 'May 23, 2026',
    time: '11:00 AM - 1:30 PM',
    summary:
      'Community tribute honoring loved ones and veterans with special music, prayer, and remembrance programming.',
    instructions: [
      'Please arrive 20 minutes early for seating and check-in.',
      'Ceremony begins at Veterans Plaza rain or shine.',
      'Families may submit names for the memorial reading on-site.'
    ],
    ctaLinks: [
      { label: 'Get Directions', href: '/contact/' },
      { label: 'Call (219) 769-8803', href: 'tel:12197698803' }
    ]
  },
  {
    slug: 'fishing-for-memories',
    title: 'Fishing for Memories',
    year: 2026,
    dateDisplay: 'June 20, 2026',
    time: '8:00 AM - 12:00 PM',
    summary:
      'A family-focused remembrance event featuring shoreline reflection time and youth-friendly activities.',
    instructions: [
      'Bring your own fishing gear if available.',
      'Children under 16 must attend with an adult guardian.',
      'Check-in starts at 7:30 AM at the event tent.'
    ],
    ctaLinks: [
      { label: 'RSVP with Our Team', href: '/contact/' },
      { label: 'See Full Events Calendar', href: '/events/' }
    ]
  },
  {
    slug: 'butterfly-release',
    title: 'Butterfly Release',
    year: 2026,
    dateDisplay: 'July 18, 2026',
    time: '1:00 PM - 3:00 PM',
    summary:
      'A symbolic release ceremony celebrating life, memory, and healing in our reflection gardens.',
    instructions: [
      'Advance registration is recommended due to limited butterfly kits.',
      'On-site check-in begins at 12:15 PM.',
      'Shade seating and water stations are available throughout the ceremony area.'
    ],
    ctaLinks: [
      { label: 'Reserve Your Spot', href: '/contact/' },
      { label: 'Visit Grief Counseling', href: '/grief-counseling/' }
    ]
  },
  {
    slug: '5k',
    title: 'Light the Darkness 5K',
    year: 2026,
    dateDisplay: 'September 19, 2026',
    time: '7:30 AM - 11:00 AM',
    summary:
      'Our annual 5K fundraiser supporting grief resources and remembrance programs for local families.',
    instructions: [
      'Packet pickup opens the day before and race-day morning.',
      'Course map and pace details are shared during registration.',
      'Participants may run or walk all route segments.'
    ],
    ctaLinks: [
      { label: 'Register for 5K', href: 'https://runsignup.com', external: true },
      { label: 'View Course Info', href: '/events/' }
    ]
  },
  {
    slug: 'veterans-day',
    title: "Veterans Day Ceremony",
    year: 2026,
    dateDisplay: 'November 11, 2026',
    time: '10:30 AM - 12:00 PM',
    summary:
      'A ceremonial gathering honoring service members with military traditions and family acknowledgements.',
    instructions: [
      'Veteran family names can be submitted at check-in.',
      'Color guard processional begins at 10:30 AM.',
      'Dress warmly for outdoor portions of the program.'
    ],
    ctaLinks: [
      { label: 'Explore Veterans Services', href: '/veterans/' },
      { label: 'Contact Our Team', href: '/contact/' }
    ]
  },
  {
    slug: 'angel-tree',
    title: 'Angel Tree Gathering',
    year: 2026,
    dateDisplay: 'December 6, 2026',
    time: '4:00 PM - 6:00 PM',
    summary:
      'A holiday remembrance event where families place ornaments and messages in honor of loved ones.',
    instructions: [
      'Arrive early to receive ornament supplies and placement instructions.',
      'Hot beverages and indoor rest areas are available throughout the evening.',
      'Names for the candle-lighting moment close 30 minutes before start.'
    ],
    ctaLinks: [
      { label: 'Reserve Attendance', href: '/contact/' },
      { label: 'View Privacy Policy', href: '/privacy/' }
    ]
  }
];

export const eventRouteSlugs = eventItems.map((event) => event.slug);

export const getEventBySlug = (slug: string) => eventItems.find((event) => event.slug === slug);
