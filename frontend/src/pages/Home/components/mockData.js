export const currentUser = {
  username: 'DemoUser',
  email: 'demouser@example.com',
  pfp: 'https://via.placeholder.com/40',
  createdAt: 'October 15, 2023'
};

export const initialClubs = [
  { 
    id: 1, 
    name: 'General Chat', 
    img: 'https://via.placeholder.com/50', 
    channels: [{ id: 1, name: 'welcome' }, { id: 2, name: 'general' }], 
    members: [{ id: 1, name: 'Alice Smith', img: 'https://via.placeholder.com/32' }] 
  },
  { 
    id: 2, 
    name: 'Gaming Lounge', 
    img: 'https://via.placeholder.com/50', 
    channels: [{ id: 4, name: 'lfg' }], 
    members: [{ id: 4, name: 'Diana Prince', img: 'https://via.placeholder.com/32' }] 
  }
];

export const initialPeople = [
  { id: 101, name: 'Alice Smith', img: 'https://via.placeholder.com/50/FF5733/FFFFFF' }
];

export const mockSearchResults = [
  { id: 1, type: 'movies', title: 'Inception', genre: 'Sci-Fi', year: '2010', photo: 'https://via.placeholder.com/40x56/004643/FFFFFF?text=M' },
  { id: 2, type: 'tv', title: 'Breaking Bad', genre: 'Drama', year: '2008', photo: 'https://via.placeholder.com/40x56/357979/FFFFFF?text=TV' },
  { id: 3, type: 'books', title: 'Dune', genre: 'Sci-Fi', year: '1965', photo: 'https://via.placeholder.com/40x56/91a1a4/FFFFFF?text=B' },
];
