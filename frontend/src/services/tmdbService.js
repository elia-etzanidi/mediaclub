// TMDB (The Movie Database) API Service for Movies and TV Series

const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const MOVIE_GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const TV_GENRES = {
  10759: 'Action & Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648: 'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  37: 'Western'
};

/**
 * Retrieves configured TMDB API Key or Access Token
 * Checks Vite env first, then localStorage
 */
export const getTmdbApiKey = () => {
  const envKey = import.meta.env?.VITE_TMDB_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();

  try {
    const localKey = localStorage.getItem('tmdb_api_key');
    if (localKey && localKey.trim()) return localKey.trim();
  } catch {
    // localStorage might not be available in SSR
  }

  return '85cebf6114cb5315dd173941b52096f1';
};

/**
 * Saves TMDB API Key to localStorage for immediate live client use
 */
export const setTmdbApiKey = (key) => {
  if (!key) {
    localStorage.removeItem('tmdb_api_key');
    return;
  }
  localStorage.setItem('tmdb_api_key', key.trim());
};

export const hasTmdbApiKey = () => {
  return Boolean(getTmdbApiKey());
};

/**
 * Builds request options depending on whether user provided
 * a v3 API Key (32 hex characters) or v4 Bearer Read Access Token (starts with eyJ)
 */
const buildTmdbRequest = (endpoint, params = {}) => {
  const token = getTmdbApiKey();
  const url = new URL(`${TMDB_BASE}${endpoint}`);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  // Append query params
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  });

  if (token.startsWith('eyJ')) {
    // TMDB v4 Bearer Token
    headers['Authorization'] = `Bearer ${token}`;
  } else if (token) {
    // TMDB v3 API Key query parameter
    url.searchParams.set('api_key', token);
  }

  return { url: url.toString(), headers };
};

/**
 * Test if the configured key is valid by querying TMDB configuration
 */
export const testTmdbApiKey = async (testKey) => {
  const keyToTest = testKey || getTmdbApiKey();
  if (!keyToTest) return false;

  const url = new URL(`${TMDB_BASE}/configuration`);
  const headers = { 'Accept': 'application/json' };

  if (keyToTest.startsWith('eyJ')) {
    headers['Authorization'] = `Bearer ${keyToTest}`;
  } else {
    url.searchParams.set('api_key', keyToTest);
  }

  try {
    const res = await fetch(url.toString(), { headers });
    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Maps genre IDs to a readable string (e.g. "Sci-Fi / Action / Thriller")
 */
export const mapGenreIds = (genreIds = [], type = 'movie') => {
  const genreDict = type === 'tv' ? TV_GENRES : MOVIE_GENRES;
  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    return type === 'tv' ? 'TV Series' : 'Cinema / Film';
  }
  const names = genreIds
    .map((id) => genreDict[id])
    .filter(Boolean)
    .slice(0, 3);
  return names.length > 0 ? names.join(' / ') : (type === 'tv' ? 'TV Series' : 'Cinema');
};

/**
 * Searches movies on TMDB
 */
export const searchMovies = async (query, signal) => {
  if (!query || !query.trim() || !hasTmdbApiKey()) return [];

  const { url, headers } = buildTmdbRequest('/search/movie', {
    query: query.trim(),
    include_adult: false,
    language: 'en-US',
    page: 1
  });

  try {
    const response = await fetch(url, { headers, signal });
    if (!response.ok) {
      throw new Error(`TMDB movie search returned ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results.slice(0, 10).map((movie) => {
      const year = movie.release_date ? movie.release_date.split('-')[0] : '';
      const photo = movie.poster_path ? `${IMAGE_BASE}/w342${movie.poster_path}` : null;
      const backdrop = movie.backdrop_path ? `${IMAGE_BASE}/w1280${movie.backdrop_path}` : null;

      return {
        id: `tmdb-movie-${movie.id}`,
        externalId: String(movie.id),
        externalSource: 'TMDB',
        type: 'movies',
        mediaType: 'movies',
        title: movie.title,
        year,
        genre: mapGenreIds(movie.genre_ids, 'movie'),
        photo,
        backdrop,
        rating: movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10 TMDB` : null,
        voteCount: movie.vote_count,
        overview: movie.overview
      };
    });
  } catch (error) {
    if (error.name === 'AbortError') return [];
    console.warn('TMDB movie search error:', error);
    return [];
  }
};

/**
 * Searches TV Shows on TMDB
 */
export const searchTvShows = async (query, signal) => {
  if (!query || !query.trim() || !hasTmdbApiKey()) return [];

  const { url, headers } = buildTmdbRequest('/search/tv', {
    query: query.trim(),
    include_adult: false,
    language: 'en-US',
    page: 1
  });

  try {
    const response = await fetch(url, { headers, signal });
    if (!response.ok) {
      throw new Error(`TMDB TV search returned ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results.slice(0, 10).map((tv) => {
      const year = tv.first_air_date ? tv.first_air_date.split('-')[0] : '';
      const photo = tv.poster_path ? `${IMAGE_BASE}/w342${tv.poster_path}` : null;
      const backdrop = tv.backdrop_path ? `${IMAGE_BASE}/w1280${tv.backdrop_path}` : null;

      return {
        id: `tmdb-tv-${tv.id}`,
        externalId: String(tv.id),
        externalSource: 'TMDB',
        type: 'tv',
        mediaType: 'tv',
        title: tv.name,
        year,
        genre: mapGenreIds(tv.genre_ids, 'tv'),
        photo,
        backdrop,
        rating: tv.vote_average ? `${tv.vote_average.toFixed(1)} / 10 TMDB` : null,
        voteCount: tv.vote_count,
        overview: tv.overview
      };
    });
  } catch (error) {
    if (error.name === 'AbortError') return [];
    console.warn('TMDB TV search error:', error);
    return [];
  }
};

/**
 * Fetches full Movie details for info board
 * Includes cast, crew, release dates / certifications
 */
export const getMovieDetails = async (movieId, seedMeta = {}) => {
  const { url, headers } = buildTmdbRequest(`/movie/${movieId}`, {
    append_to_response: 'credits,release_dates',
    language: 'en-US'
  });

  let movie = {};
  try {
    const res = await fetch(url, { headers });
    if (res.ok) {
      movie = await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch TMDB movie details:', err);
  }

  const title = movie.title || seedMeta.title || 'Untitled Movie';

  // Format runtime (e.g. 148 -> "2h 28m")
  let runtime = 'Feature Film';
  if (movie.runtime && movie.runtime > 0) {
    const h = Math.floor(movie.runtime / 60);
    const m = movie.runtime % 60;
    runtime = h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  // Format release date (e.g. "July 16, 2010")
  let releaseDateStr = movie.release_date || seedMeta.year || 'Released';
  if (movie.release_date) {
    try {
      const d = new Date(movie.release_date);
      releaseDateStr = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      releaseDateStr = movie.release_date;
    }
  }

  // Find Director from credits
  let director = 'Director';
  if (movie.credits?.crew) {
    const dir = movie.credits.crew.find((c) => c.job === 'Director');
    if (dir) {
      director = dir.name;
    }
  }

  // Find top cast
  const cast = [];
  if (Array.isArray(movie.credits?.cast)) {
    movie.credits.cast.slice(0, 6).forEach((c) => {
      cast.push(c.name);
    });
  }
  if (cast.length === 0) {
    cast.push('Lead Cast', 'Ensemble Cast');
  }

  // Find US certification (PG-13, R, etc.)
  let contentRating = 'PG-13';
  if (movie.release_dates?.results) {
    const usRel = movie.release_dates.results.find((r) => r.iso_3166_1 === 'US');
    if (usRel && Array.isArray(usRel.release_dates)) {
      const cert = usRel.release_dates.find((d) => d.certification);
      if (cert && cert.certification) {
        contentRating = cert.certification;
      }
    }
  }

  // Rating string
  const ratingScore = movie.vote_average || (seedMeta.rating ? parseFloat(seedMeta.rating) : 8.5);
  const voteCount = movie.vote_count ? ` (${movie.vote_count.toLocaleString()} votes)` : '';
  const rating = `${ratingScore.toFixed(1)} / 10 TMDB${voteCount}`;

  // Genres
  let genres = seedMeta.genre;
  if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    genres = movie.genres.map((g) => g.name).slice(0, 3).join(' / ');
  }
  if (!genres) genres = 'Drama / Cinema';

  // Studios / Production Companies
  let studio = 'Major Studio Release';
  if (Array.isArray(movie.production_companies) && movie.production_companies.length > 0) {
    studio = movie.production_companies.slice(0, 2).map((p) => p.name).join(' / ');
  }

  // Spoken Language
  const language = movie.spoken_languages?.[0]?.english_name || movie.original_language?.toUpperCase() || 'English';

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}/w500${movie.poster_path}`
    : seedMeta.photo || seedMeta.img;

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE}/w1280${movie.backdrop_path}`
    : seedMeta.backdrop;

  const description = movie.overview || seedMeta.description || `Welcome to the official MediaClub for "${title}". Join fellow viewers in #general to discuss scenes, plot twists, reviews, and cinematography.`;

  return {
    title,
    tagline: movie.tagline || (seedMeta.tagline ? seedMeta.tagline : `The official club for ${title}.`),
    mediaType: 'movies',
    typeLabel: 'Movie',
    date: releaseDateStr,
    year: movie.release_date ? movie.release_date.split('-')[0] : (seedMeta.year || '2024'),
    genre: genres,
    rating,
    contentRating,
    runtime,
    creator: director,
    creatorRole: 'Director',
    cast,
    description,
    quote: movie.tagline || null,
    status: movie.status || 'Released',
    language,
    studio,
    img: posterUrl,
    backdrop: backdropUrl,
    id: seedMeta.id || `tmdb-movie-${movieId}`
  };
};

/**
 * Fetches full TV Series details for info board
 * Includes seasons, episode counts, creators, content ratings
 */
export const getTvDetails = async (tvId, seedMeta = {}) => {
  const { url, headers } = buildTmdbRequest(`/tv/${tvId}`, {
    append_to_response: 'credits,content_ratings',
    language: 'en-US'
  });

  let tv = {};
  try {
    const res = await fetch(url, { headers });
    if (res.ok) {
      tv = await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch TMDB TV details:', err);
  }

  const title = tv.name || seedMeta.title || 'Untitled Series';

  // Format seasons & episodes
  const seasonCount = tv.number_of_seasons || 1;
  const episodeCount = tv.number_of_episodes || 0;
  const runtime = episodeCount > 0
    ? `${seasonCount} Season${seasonCount > 1 ? 's' : ''} • ${episodeCount} Episodes`
    : `${seasonCount} Season${seasonCount > 1 ? 's' : ''}`;

  // Air dates
  let dateStr = 'TV Broadcast';
  const startYear = tv.first_air_date ? tv.first_air_date.split('-')[0] : seedMeta.year;
  const endYear = tv.status === 'Ended' && tv.last_air_date
    ? tv.last_air_date.split('-')[0]
    : 'Present';

  if (startYear) {
    dateStr = endYear === 'Present' || endYear === startYear
      ? `${startYear} – ${endYear}`
      : `${startYear} – ${endYear}`;
  }

  // Creator / Showrunner
  let creator = 'Creator';
  if (Array.isArray(tv.created_by) && tv.created_by.length > 0) {
    creator = tv.created_by.map((c) => c.name).join(', ');
  } else if (tv.credits?.crew) {
    const ep = tv.credits.crew.find((c) => c.job === 'Executive Producer');
    if (ep) creator = ep.name;
  }

  // Top Cast
  const cast = [];
  if (Array.isArray(tv.credits?.cast)) {
    tv.credits.cast.slice(0, 6).forEach((c) => {
      cast.push(c.name);
    });
  }
  if (cast.length === 0) {
    cast.push('Main Cast', 'Ensemble Cast');
  }

  // TV Content Rating (e.g. TV-MA, TV-14)
  let contentRating = 'TV-14';
  if (tv.content_ratings?.results) {
    const usRating = tv.content_ratings.results.find((r) => r.iso_3166_1 === 'US');
    if (usRating && usRating.rating) {
      contentRating = usRating.rating;
    }
  }

  // Rating
  const ratingScore = tv.vote_average || 8.6;
  const voteCount = tv.vote_count ? ` (${tv.vote_count.toLocaleString()} votes)` : '';
  const rating = `${ratingScore.toFixed(1)} / 10 TMDB${voteCount}`;

  // Genres
  let genres = seedMeta.genre;
  if (Array.isArray(tv.genres) && tv.genres.length > 0) {
    genres = tv.genres.map((g) => g.name).slice(0, 3).join(' / ');
  }
  if (!genres) genres = 'Drama / Television';

  // Network / Studio
  let studio = 'Television Network';
  if (Array.isArray(tv.networks) && tv.networks.length > 0) {
    studio = tv.networks.slice(0, 2).map((n) => n.name).join(' / ');
  } else if (Array.isArray(tv.production_companies) && tv.production_companies.length > 0) {
    studio = tv.production_companies[0].name;
  }

  const language = tv.spoken_languages?.[0]?.english_name || tv.original_language?.toUpperCase() || 'English';

  const posterUrl = tv.poster_path
    ? `${IMAGE_BASE}/w500${tv.poster_path}`
    : seedMeta.photo || seedMeta.img;

  const backdropUrl = tv.backdrop_path
    ? `${IMAGE_BASE}/w1280${tv.backdrop_path}`
    : seedMeta.backdrop;

  const description = tv.overview || seedMeta.description || `Welcome to the official MediaClub for "${title}". Join fans in #general for episode discussions, theories in #spoilers, and reviews.`;

  return {
    title,
    tagline: tv.tagline || (seedMeta.tagline ? seedMeta.tagline : `The official club for ${title}.`),
    mediaType: 'tv',
    typeLabel: 'TV Series',
    date: dateStr,
    year: startYear || '2024',
    genre: genres,
    rating,
    contentRating,
    runtime,
    creator,
    creatorRole: 'Creator & Showrunner',
    cast,
    description,
    quote: tv.tagline || null,
    status: tv.status || 'Active Series',
    language,
    studio,
    img: posterUrl,
    backdrop: backdropUrl,
    id: seedMeta.id || `tmdb-tv-${tvId}`
  };
};
