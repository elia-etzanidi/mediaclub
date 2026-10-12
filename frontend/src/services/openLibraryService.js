// Open Library API Service for books
// Completely free and open REST API (no API key required)

const OPEN_LIBRARY_BASE = 'https://openlibrary.org';
const COVERS_BASE = 'https://covers.openlibrary.org/b/id';

const JUNK_METADATA_REGEX = /^(franchise|series|form|facet|nyt|award|place|person|time|dewey|lcsh|lccn|fast|id|level|class|grade|isbn):/i;
const JUNK_SUBSTRINGS = [
  /=/,
  /reading level/i,
  /translations into/i,
  /accessible/i,
  /open_syllabus/i,
  /specimens/i,
  /language materials/i,
  /fictional works by/i,
  /copyright/i,
  /protected daisy/i
];

/**
 * Clean up subject strings by removing metadata prefixes (franchise:, series:, form:),
 * colons, equals, library classification codes, and returning polished book genre tags.
 */
const cleanBookTag = (raw) => {
  if (!raw || typeof raw !== 'string') return '';
  let s = raw.trim();

  // Filter out any metadata tags with prefixes, colons, or equals
  if (s.includes(':') || s.includes('=')) return '';
  if (JUNK_METADATA_REGEX.test(s)) return '';

  for (const re of JUNK_SUBSTRINGS) {
    if (re.test(s)) return '';
  }

  s = s
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/^fiction,\s*/i, '')
    .replace(/_/g, ' ')
    .trim();

  if (s.length < 3 || s.length > 30) return '';

  // Return clean Title Case tag
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Dynamically detects book audience / classification from actual subjects
 * (e.g. "Classic", "Sci-Fi & Fantasy", "Young Adult", "Non-Fiction")
 * Returns null if no specific audience tag matches, rather than forcing a generic label.
 */
const detectBookAudience = (subjects = []) => {
  if (!Array.isArray(subjects) || subjects.length === 0) return null;
  const lower = subjects.map((s) => (typeof s === 'string' ? s.toLowerCase() : ''));

  if (lower.some((s) => s.includes('young adult') || s.includes('ya ') || s.includes('teen'))) {
    return 'Young Adult';
  }
  if (lower.some((s) => s.includes('children') || s.includes('juvenile') || s.includes("children's"))) {
    return "Children's";
  }
  if (lower.some((s) => s.includes('classic') || s.includes('classics'))) {
    return 'Classic';
  }
  if (lower.some((s) => s.includes('graphic novel') || s.includes('comic') || s.includes('manga'))) {
    return 'Graphic Novel';
  }
  if (lower.some((s) => s.includes('non-fiction') || s.includes('biography') || s.includes('memoir'))) {
    return 'Non-Fiction';
  }
  if (lower.some((s) => s.includes('science fiction') || s.includes('sci-fi') || s.includes('space opera'))) {
    return 'Sci-Fi';
  }
  if (lower.some((s) => s.includes('fantasy') || s.includes('magic') || s.includes('epic fantasy'))) {
    return 'Fantasy';
  }
  if (lower.some((s) => s.includes('mystery') || s.includes('thriller') || s.includes('detective') || s.includes('crime'))) {
    return 'Mystery & Thriller';
  }
  if (lower.some((s) => s.includes('romance'))) {
    return 'Romance';
  }
  if (lower.some((s) => s.includes('historical fiction') || s.includes('history'))) {
    return 'Historical';
  }
  if (lower.some((s) => s.includes('fiction'))) {
    return 'Fiction';
  }
  return null;
};

/**
 * Searches books by title / query on Open Library
 * @param {string} query - search query
 * @param {number} limit - maximum number of results (default 12)
 * @param {AbortSignal} signal - abort controller signal for cancellation
 * @returns {Promise<Array>} array of normalized book items
 */
export const searchBooks = async (query, limit = 12, signal) => {
  if (!query || !query.trim()) return [];

  const cleanQuery = query.trim();
  const fields = 'title,author_name,first_publish_year,cover_i,key,subject,ratings_average,number_of_pages_median,publisher,first_sentence';
  const url = `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(cleanQuery)}&fields=${fields}&limit=${limit}`;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Open Library search failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.docs || !Array.isArray(data.docs)) return [];

    return data.docs.map((doc) => {
      const workKey = doc.key || '';
      const author = Array.isArray(doc.author_name) && doc.author_name.length > 0
        ? doc.author_name.slice(0, 2).join(', ')
        : 'Unknown Author';

      const year = doc.first_publish_year ? String(doc.first_publish_year) : '';

      // Extract top 2-3 genuine book tags for genre display (filtered of series:, franchise:, form: etc.)
      let genres = 'Literature';
      if (Array.isArray(doc.subject) && doc.subject.length > 0) {
        const cleaned = doc.subject
          .map(cleanBookTag)
          .filter(Boolean);
        const unique = [...new Set(cleaned)].slice(0, 3);
        if (unique.length > 0) {
          genres = unique.join(' / ');
        }
      }

      const coverId = doc.cover_i;
      const photo = coverId ? `${COVERS_BASE}/${coverId}-M.jpg` : null;
      const coverLarge = coverId ? `${COVERS_BASE}/${coverId}-L.jpg` : null;

      const rating = doc.ratings_average
        ? `${doc.ratings_average.toFixed(1)} / 5 Open Library`
        : null;

      const pages = doc.number_of_pages_median
        ? `${doc.number_of_pages_median} Pages`
        : null;

      const publisher = Array.isArray(doc.publisher) && doc.publisher.length > 0
        ? doc.publisher[0]
        : null;

      const firstSentence = Array.isArray(doc.first_sentence) && doc.first_sentence.length > 0
        ? doc.first_sentence[0]
        : null;

      const audience = detectBookAudience(doc.subject);

      return {
        id: workKey ? `book-${workKey.replace('/works/', '')}` : `book-${Date.now()}-${Math.random()}`,
        externalId: workKey,
        externalSource: 'OPEN_LIBRARY',
        type: 'books',
        mediaType: 'books',
        title: doc.title || cleanQuery,
        author,
        year,
        genre: genres,
        photo,
        coverLarge,
        rating,
        pages,
        publisher,
        firstSentence,
        audience
      };
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      return [];
    }
    console.warn('Open Library search error:', error);
    return [];
  }
};

/**
 * Fetches full work details and ratings for a book work key
 * @param {string} workKey - e.g. "/works/OL893414W"
 * @param {Object} seedMeta - metadata already known from search results
 * @returns {Promise<Object>} complete info board data
 */
export const getBookDetails = async (workKey, seedMeta = {}) => {
  const normalizedKey = workKey.startsWith('/works/')
    ? workKey
    : `/works/${workKey}`;

  let workData = {};
  let ratingsData = null;

  try {
    const res = await fetch(`${OPEN_LIBRARY_BASE}${normalizedKey}.json`);
    if (res.ok) {
      workData = await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch Open Library work data:', err);
  }

  // Fetch rating summary in parallel if possible
  try {
    const ratingRes = await fetch(`${OPEN_LIBRARY_BASE}${normalizedKey}/ratings.json`);
    if (ratingRes.ok) {
      ratingsData = await ratingRes.json();
    }
  } catch (err) {
    // Rating endpoint is optional
  }

  const title = workData.title || seedMeta.title || 'Untitled Book';

  // If pages are not provided in seedMeta, query Open Library for the real median pages
  let pagesFormatted = seedMeta.pages || null;
  if (!pagesFormatted && title) {
    try {
      const pageRes = await fetch(
        `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(title)}&fields=number_of_pages_median&limit=1`
      );
      if (pageRes.ok) {
        const pageData = await pageRes.json();
        const median = pageData.docs?.[0]?.number_of_pages_median;
        if (median && median > 0) {
          pagesFormatted = `${median} Pages`;
        }
      }
    } catch {
      // Ignore if page fetch fails
    }
  }

  // Parse description which can be string or object with .value
  let descriptionText = '';
  if (typeof workData.description === 'string') {
    descriptionText = workData.description;
  } else if (workData.description && typeof workData.description.value === 'string') {
    descriptionText = workData.description.value;
  }

  // Clean description markdown links e.g. [name](url) -> name
  descriptionText = descriptionText
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/-------+/g, '')
    .trim();

  if (!descriptionText) {
    descriptionText = seedMeta.tagline
      ? `${seedMeta.tagline}\n\nWelcome to the official MediaClub for "${title}". Join discussions about plot, characters, themes, and community reading sessions.`
      : `Welcome to the official MediaClub for "${title}".\n\nThis community is dedicated to discussing the story, characters, themes, and favorite passages. Share your reviews and thoughts in the channels!`;
  }

  // Extract cover
  let coverUrl = seedMeta.coverLarge || seedMeta.photo || seedMeta.img;
  if (!coverUrl && Array.isArray(workData.covers) && workData.covers.length > 0 && workData.covers[0] > 0) {
    coverUrl = `${COVERS_BASE}/${workData.covers[0]}-L.jpg`;
  }

  // Extract characters / key figures
  const castList = [];
  if (Array.isArray(workData.subject_people) && workData.subject_people.length > 0) {
    castList.push(...workData.subject_people.slice(0, 6));
  } else if (Array.isArray(workData.subjects) && workData.subjects.length > 0) {
    const potentialCharacters = workData.subjects
      .filter((s) => s.includes('(Fictitious character)') || s.includes('character'))
      .map((s) => s.replace(/\(Fictitious character\)/i, '').trim());
    if (potentialCharacters.length > 0) {
      castList.push(...potentialCharacters.slice(0, 6));
    }
  }

  // Fallback characters if none found in Open Library
  if (castList.length === 0) {
    castList.push('Protagonist', 'Key Characters', 'Supporting Cast');
  }

  // Rating string
  let ratingStr = seedMeta.rating;
  if (ratingsData?.summary?.average) {
    ratingStr = `${ratingsData.summary.average.toFixed(1)} / 5 Open Library (${ratingsData.summary.count || 'community'} ratings)`;
  } else if (!ratingStr) {
    ratingStr = '4.2 / 5 Open Library';
  }

  // Tagline or quote without outer quotation marks
  const rawSentence = (seedMeta.firstSentence || seedMeta.tagline || '')
    .trim()
    .replace(/^["“'”]+|["“'”]+$/g, '')
    .trim();

  const quote = rawSentence || null;
  const tagline = rawSentence
    || (seedMeta.author ? `An acclaimed work by ${seedMeta.author}.` : null);

  // Genres / Book tags (filters out franchise:, series:, form:, awards, etc.)
  let genreStr = '';
  if (Array.isArray(workData.subjects) && workData.subjects.length > 0) {
    const cleaned = workData.subjects
      .map(cleanBookTag)
      .filter(Boolean);
    const unique = [...new Set(cleaned)].slice(0, 4);
    if (unique.length > 0) {
      genreStr = unique.join(' / ');
    }
  }

  // If work subjects were all metadata or empty, clean seedMeta.genre
  if (!genreStr && seedMeta.genre) {
    const cleanedSeed = seedMeta.genre
      .split(/[/,•]/)
      .map(cleanBookTag)
      .filter(Boolean);
    if (cleanedSeed.length > 0) {
      genreStr = cleanedSeed.slice(0, 4).join(' / ');
    }
  }

  if (!genreStr) {
    genreStr = seedMeta.audience || 'Literature & Fiction';
  }

  // Dynamic audience / content category (e.g. Classic, Sci-Fi, Young Adult), or null
  const contentRating = seedMeta.audience || detectBookAudience(workData.subjects) || null;

  return {
    title,
    tagline,
    mediaType: 'books',
    typeLabel: 'Book / Novel',
    date: seedMeta.year ? `Published in ${seedMeta.year}` : 'Published Work',
    year: seedMeta.year || '',
    genre: genreStr,
    rating: ratingStr,
    contentRating, // Real literary category or null
    runtime: pagesFormatted, // Real page count (e.g. "608 Pages") or null
    creator: seedMeta.author || 'Author',
    creatorRole: 'Author',
    cast: castList,
    description: descriptionText,
    quote,
    status: 'Published Work',
    language: 'English',
    studio: seedMeta.publisher || 'Literary Publishing',
    img: coverUrl,
    id: seedMeta.id || normalizedKey
  };
};
