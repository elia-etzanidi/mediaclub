import defaultAvatar from '../../../assets/default-avatar.png';

export const currentUser = {
  username: 'DemoUser',
  email: 'demouser@example.com',
  pfp: defaultAvatar,
  createdAt: 'October 15, 2023'
};

export const initialClubs = [
  { 
    id: 1, 
    name: 'Inception', 
    mediaType: 'movies',
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23004643'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EINC%3C/text%3E%3C/svg%3E", 
    channels: [
      { id: 'info', name: 'info', type: 'info' },
      { id: 1, name: 'general', type: 'text' },
      { id: 2, name: 'spoilers', type: 'text' },
      { id: 3, name: 'theories', type: 'text' },
      { id: 4, name: 'reviews', type: 'text' }
    ], 
    members: [
      { id: 1, name: 'Alice Smith', img: defaultAvatar, role: 'moderator' },
      { id: 2, name: 'Bob Jones', img: defaultAvatar, role: 'member' },
      { id: 3, name: 'Charlie Day', img: defaultAvatar, role: 'member' }
    ] 
  },
  { 
    id: 2, 
    name: 'Breaking Bad', 
    mediaType: 'tv',
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23357979'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EBB%3C/text%3E%3C/svg%3E", 
    channels: [
      { id: 'info', name: 'info', type: 'info' },
      { id: 1, name: 'general', type: 'text' },
      { id: 2, name: 'spoilers', type: 'text' },
      { id: 3, name: 'episodes', type: 'text' }
    ], 
    members: [
      { id: 4, name: 'Diana Prince', img: defaultAvatar, role: 'moderator' },
      { id: 5, name: 'Evan Wright', img: defaultAvatar, role: 'member' },
      { id: 6, name: 'Fiona Gallagher', img: defaultAvatar, role: 'member' }
    ] 
  }
];

export const initialPeople = [
  { id: 101, name: 'Alice Smith', img: 'https://via.placeholder.com/50/FF5733/FFFFFF' }
];

export const mockSearchResults = [
  {
    id: 1,
    type: 'movies',
    title: 'Inception',
    genre: 'Sci-Fi / Action',
    year: '2010',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23004643'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EINC%3C/text%3E%3C/svg%3E"
  },
  {
    id: 2,
    type: 'tv',
    title: 'Breaking Bad',
    genre: 'Crime / Drama',
    year: '2008',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23357979'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EBB%3C/text%3E%3C/svg%3E"
  },
  {
    id: 3,
    type: 'books',
    title: 'Dune',
    genre: 'Sci-Fi',
    year: '1965',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23d97706'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3ED%3C/text%3E%3C/svg%3E"
  },
  {
    id: 4,
    type: 'movies',
    title: 'Interstellar',
    genre: 'Sci-Fi / Adventure',
    year: '2014',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23112625'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EINT%3C/text%3E%3C/svg%3E"
  },
  {
    id: 5,
    type: 'tv',
    title: 'Stranger Things',
    genre: 'Sci-Fi / Drama',
    year: '2016',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%23991b1b'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3EST%3C/text%3E%3C/svg%3E"
  },
  {
    id: 6,
    type: 'books',
    title: 'The Hobbit',
    genre: 'High Fantasy',
    year: '1937',
    photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='%2315803d'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='14' text-anchor='middle'%3ETH%3C/text%3E%3C/svg%3E"
  }
];

export const mockMediaDetails = {
  'inception': {
    title: 'Inception',
    tagline: 'Your mind is the scene of the crime.',
    mediaType: 'movies',
    typeLabel: 'Movie',
    date: 'July 16, 2010',
    year: '2010',
    genre: 'Sci-Fi / Action / Thriller',
    rating: '8.8 / 10 IMDb • 87% Rotten Tomatoes',
    contentRating: 'PG-13',
    runtime: '2h 28m',
    creator: 'Christopher Nolan',
    creatorRole: 'Director & Writer',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy', 'Ken Watanabe', 'Cillian Murphy'],
    description: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction: stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.\n\nNow Cobb is being offered a chance at redemption: one last job could give him his life back only if he can accomplish the impossible—inception, the planting of an idea rather than the theft of one. If Cobb and his team succeed, it could be the perfect crime.",
    quote: "An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow to define or destroy you.",
    status: 'Released • 4 Academy Awards',
    language: 'English',
    studio: 'Warner Bros. Pictures / Syncopy'
  },
  'breaking bad': {
    title: 'Breaking Bad',
    tagline: 'Change the equation.',
    mediaType: 'tv',
    typeLabel: 'TV Series',
    date: 'January 20, 2008 – September 29, 2013',
    year: '2008 – 2013',
    genre: 'Crime / Drama / Thriller',
    rating: '9.5 / 10 IMDb • 96% Rotten Tomatoes',
    contentRating: 'TV-MA',
    runtime: '5 Seasons • 62 Episodes',
    creator: 'Vince Gilligan',
    creatorRole: 'Creator & Showrunner',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris', 'Giancarlo Esposito', 'Bob Odenkirk'],
    description: "Walter White, a struggling high school chemistry teacher diagnosed with stage-three terminal lung cancer, decides to turn his life around by partnering with his former student, Jesse Pinkman, to produce and distribute crystal methamphetamine.\n\nDriven by the desperation to secure his family's financial future before he passes, Walter descends into the perilous criminal underworld of Albuquerque, slowly shedding his morality and transforming into the formidable kingpin known as 'Heisenberg'.",
    quote: "I am not in danger, Skyler. I AM the danger. A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks!",
    status: 'Completed Series • 16 Primetime Emmys',
    language: 'English, Spanish',
    studio: 'Sony Pictures Television / AMC'
  },
  'dune': {
    title: 'Dune',
    tagline: 'Beyond fear, destiny awaits.',
    mediaType: 'books',
    typeLabel: 'Book / Novel',
    date: 'August 1, 1965',
    year: '1965',
    genre: 'Epic Sci-Fi / Space Opera / Philosophical',
    rating: '4.26 / 5 Goodreads • 8.0 / 10 Film IMDb',
    contentRating: 'All Ages / Epic',
    runtime: '604 Pages (412k words)',
    creator: 'Frank Herbert',
    creatorRole: 'Author',
    cast: ['Paul Atreides', 'Lady Jessica', 'Duke Leto Atreides', 'Baron Vladimir Harkonnen', 'Chani', 'Duncan Idaho'],
    description: "Set on the desert planet Arrakis, Dune tells the story of Paul Atreides, young scion of Duke Leto Atreides, whose family accepts stewardship of the perilous desert world. Arrakis is the universe's only source of 'melange' (the spice), the most valuable substance in existence, capable of extending life, expanding consciousness, and enabling faster-than-light space travel.\n\nWhen House Atreides is betrayed by the rival Harkonnens with the blessing of the Padishah Emperor, Paul and his mother Jessica flee into the deep desert. There, Paul unites the nomadic Fremen to reclaim his birthright and fulfill an ancient prophecy that will reshape the known universe.",
    quote: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear.",
    status: 'Classic • Hugo & Nebula Award Winner',
    language: 'English',
    studio: 'Chilton Books'
  },
  'interstellar': {
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    mediaType: 'movies',
    typeLabel: 'Movie',
    date: 'November 7, 2014',
    year: '2014',
    genre: 'Sci-Fi / Adventure / Drama',
    rating: '8.7 / 10 IMDb • 86% Audience Score',
    contentRating: 'PG-13',
    runtime: '2h 49m',
    creator: 'Christopher Nolan',
    creatorRole: 'Director & Co-Writer',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine', 'Matt Damon', 'John Lithgow'],
    description: "In Earth's near future, a global crop blight and crippling dust storms are rendering the planet uninhabitable. A former NASA pilot turned farmer, Joseph Cooper, is recruited by a secret remnant of NASA led by Professor John Brand.\n\nA mysterious gravitational anomaly near Saturn reveals a wormhole leading to a distant galaxy with potentially habitable planets. Cooper must leave his young children behind to captain the Endurance mission, venturing through the wormhole to find a new sanctuary for mankind.",
    quote: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space.",
    status: 'Released • Academy Award for Best Visual Effects',
    language: 'English',
    studio: 'Paramount Pictures / Warner Bros. / Syncopy'
  },
  'stranger things': {
    title: 'Stranger Things',
    tagline: 'Every ending has a beginning.',
    mediaType: 'tv',
    typeLabel: 'TV Series',
    date: 'July 15, 2016 – Present',
    year: '2016 – Present',
    genre: 'Sci-Fi / Horror / 80s Mystery',
    rating: '8.7 / 10 IMDb • 91% Rotten Tomatoes',
    contentRating: 'TV-14',
    runtime: '4 Seasons • 34 Episodes',
    creator: 'The Duffer Brothers',
    creatorRole: 'Creators & Executive Producers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour', 'Gaten Matarazzo', 'Caleb McLaughlin'],
    description: "When young Will Byers vanishes from the quiet town of Hawkins, Indiana in 1983, his friends, family, and local police chief uncover a mystery involving top-secret government experiments, terrifying supernatural forces, and a strange girl with shaved hair and telekinetic powers named Eleven.\n\nAs dark forces from an alternate dimension known as the 'Upside Down' seep into their world, the town must band together to defend their home.",
    quote: "Friends don't lie.",
    status: 'Ongoing • 12 Primetime Emmys',
    language: 'English',
    studio: '21 Laps Entertainment / Netflix'
  },
  'the hobbit': {
    title: 'The Hobbit',
    tagline: 'In a hole in the ground there lived a hobbit.',
    mediaType: 'books',
    typeLabel: 'Book / Novel',
    date: 'September 21, 1937',
    year: '1937',
    genre: 'High Fantasy / Adventure / Classic',
    rating: '4.29 / 5 Goodreads',
    contentRating: 'All Ages',
    runtime: '310 Pages',
    creator: 'J.R.R. Tolkien',
    creatorRole: 'Author',
    cast: ['Bilbo Baggins', 'Gandalf the Grey', 'Thorin Oakenshield', 'Smaug the Dragon', 'Gollum', 'Bard the Bowman'],
    description: "Bilbo Baggins is a hobbit who enjoys a quiet, content life in his cozy hole at Bag End, rarely venturing beyond the boundaries of the Shire. His peaceful existence is turned upside down when the wandering wizard Gandalf and a company of thirteen dwarves led by Thorin Oakenshield recruit him as their 'burglar' for an epic quest.\n\nTheir goal is to journey eastward across Middle-earth to reclaim the Lonely Mountain and its vast hoard of gold from the fearsome dragon Smaug.",
    quote: "May the wind under your wings bear you where the sun sails and the moon walks.",
    status: 'Classic Literature • Worldwide Bestseller',
    language: 'English',
    studio: 'George Allen & Unwin'
  }
};

export const getClubMediaDetails = (club) => {
  if (!club) return null;
  const key = club.name?.trim().toLowerCase();
  const known = mockMediaDetails[key];

  const type = club.mediaType || (club.type || 'movies');
  const typeLabel = type === 'tv' ? 'TV Series' : type === 'books' ? 'Book' : 'Movie';

  if (known) {
    return {
      ...known,
      img: club.img || club.photo || known.img,
      id: club.id
    };
  }

  // Dynamic fallback dummy data for any other club created
  return {
    title: club.name || 'Untitled Media',
    tagline: `Welcome to the official community for ${club.name || 'this title'}.`,
    mediaType: type,
    typeLabel: typeLabel,
    date: club.year ? `Released in ${club.year}` : 'Official Media Release',
    year: club.year || '2024',
    genre: club.genre || (type === 'books' ? 'Literature / Fiction' : 'Drama / Entertainment'),
    rating: '8.5 / 10 • Community Choice',
    contentRating: type === 'books' ? 'General Audience' : 'PG-13',
    runtime: type === 'books' ? '380 Pages' : type === 'tv' ? 'Multiple Seasons' : '2h 15m',
    creator: type === 'books' ? 'Original Author' : 'Director & Showrunner',
    creatorRole: type === 'books' ? 'Author' : 'Director',
    cast: ['Lead Character', 'Supporting Cast', 'Key Characters'],
    description: `Welcome to the official MediaClub for "${club.name}".\n\nThis is the dedicated space for fans to discuss plot details, exchange theories, share reviews, and participate in community watch parties and reading sessions.\n\nBrowse through the channels on the left to join ongoing discussions or introduce yourself to fellow members in #general.`,
    quote: `A world of imagination and deep discussion awaits inside the ${club.name} club.`,
    status: 'Active Club',
    language: 'English',
    studio: 'Official Release',
    img: club.img || club.photo,
    id: club.id
  };
};
