import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Optionally, use an API key for higher rate limits
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Fetch books based on search query and parameters
const fetchBooks = async (query, startIndex = 0, maxResults = 12) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: API_KEY, // Optional
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export { fetchBooks };
