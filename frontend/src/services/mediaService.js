// Unified Media Service
// Coordinates TMDB for Movies & TV Shows and Open Library for Books

import { searchBooks, getBookDetails } from './openLibraryService';
import {
  searchMovies,
  searchTvShows,
  getMovieDetails,
  getTvDetails,
  hasTmdbApiKey,
  getTmdbApiKey,
  setTmdbApiKey,
  testTmdbApiKey
} from './tmdbService';
import { mockSearchResults, getClubMediaDetails as getMockMediaDetails } from '../pages/Home/components/mockData';

export {
  hasTmdbApiKey,
  getTmdbApiKey,
  setTmdbApiKey,
  testTmdbApiKey
};

/**
 * Searches media across TMDB (movies/tv) and Open Library (books)
 * @param {string} query - user input query
 * @param {'movies' | 'tv' | 'books'} filter - selected media type
 * @param {AbortSignal} signal - abort signal for debounced searches
 * @returns {Promise<{ results: Array, isLiveApi: boolean, needsKey?: boolean }>}
 */
export const searchMedia = async (query, filter = 'movies', signal) => {
  if (!query || !query.trim()) {
    return { results: [], isLiveApi: false };
  }

  const cleanQuery = query.trim().toLowerCase();

  // 1. Books: Always uses Open Library (no API key required)
  if (filter === 'books') {
    try {
      const liveBooks = await searchBooks(query, 12, signal);
      if (liveBooks.length > 0) {
        return { results: liveBooks, isLiveApi: true };
      }
    } catch (err) {
      console.warn('Open Library search failed, checking mock:', err);
    }

    // Fallback to mock books if offline or no results
    const fallback = mockSearchResults.filter(
      (item) => item.type === 'books' && item.title.toLowerCase().includes(cleanQuery)
    );
    return { results: fallback, isLiveApi: false };
  }

  // 2. Movies & TV Shows: Uses TMDB
  const hasKey = hasTmdbApiKey();

  if (hasKey) {
    try {
      if (filter === 'movies') {
        const liveMovies = await searchMovies(query, signal);
        if (liveMovies.length > 0) {
          return { results: liveMovies, isLiveApi: true };
        }
      } else if (filter === 'tv') {
        const liveTv = await searchTvShows(query, signal);
        if (liveTv.length > 0) {
          return { results: liveTv, isLiveApi: true };
        }
      }
    } catch (err) {
      console.warn('TMDB search error:', err);
    }
  }

  // Fallback to mock data if TMDB key is missing or query matched local mock
  const fallback = mockSearchResults.filter(
    (item) => item.type === filter && item.title.toLowerCase().includes(cleanQuery)
  );

  return {
    results: fallback,
    isLiveApi: false
  };
};

/**
 * Loads full, rich media details for a club info board
 * Dynamically dispatches to TMDB or Open Library based on club metadata
 * @param {Object} club - the club object
 * @returns {Promise<Object>} formatted media details for ClubInfoView
 */
export const getMediaDetailsForClub = async (club) => {
  if (!club) return null;

  // If club already has pre-cached full mediaDetails, use it
  if (club.mediaDetails && club.mediaDetails.description) {
    return club.mediaDetails;
  }

  const externalSource = club.externalSource;
  const externalId = club.externalId;
  const mediaType = club.mediaType || club.type || 'movies';

  // 1. Book from Open Library
  if (externalSource === 'OPEN_LIBRARY' || mediaType === 'books') {
    if (externalId) {
      try {
        const details = await getBookDetails(externalId, club);
        if (details) return details;
      } catch (err) {
        console.warn('Could not fetch Open Library book details:', err);
      }
    }
  }

  // 2. Movie or TV from TMDB
  if ((externalSource === 'TMDB' || externalId) && hasTmdbApiKey()) {
    try {
      if (mediaType === 'tv') {
        const details = await getTvDetails(externalId, club);
        if (details) return details;
      } else {
        const details = await getMovieDetails(externalId, club);
        if (details) return details;
      }
    } catch (err) {
      console.warn('Could not fetch TMDB details for club:', err);
    }
  }

  // 3. Fallback to mock / generated details
  return getMockMediaDetails(club);
};
