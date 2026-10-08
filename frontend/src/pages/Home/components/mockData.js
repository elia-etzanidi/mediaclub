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
    channels: [{ id: 1, name: 'general' }, { id: 2, name: 'spoilers' }, { id: 3, name: 'theories' }, { id: 4, name: 'reviews' }], 
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
    channels: [{ id: 1, name: 'general' }, { id: 2, name: 'spoilers' }, { id: 3, name: 'episodes' }], 
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
