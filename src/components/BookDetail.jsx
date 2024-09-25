import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Optionally, use the same API service
  const API_URL = `https://www.googleapis.com/books/v1/volumes/${id}`;
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY, // Optional
          },
        });
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id, API_URL, API_KEY]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error || !book) return <p className="text-center mt-8 text-red-500">Failed to load book details.</p>;

  const { volumeInfo } = book;
  const {
    title,
    authors,
    description,
    publishedDate,
    imageLinks,
    publisher,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
    previewLink,
  } = volumeInfo;

  const thumbnail = imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=No+Image';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Search
      </Link>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={thumbnail} alt={title} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Author(s):</strong> {authors ? authors.join(', ') : 'Unknown'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Publisher:</strong> {publisher || 'Unknown'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Published Date:</strong> {publishedDate || 'N/A'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Page Count:</strong> {pageCount || 'N/A'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Categories:</strong> {categories ? categories.join(', ') : 'N/A'}
          </p>
          {averageRating && (
            <p className="text-gray-700 mb-2">
              <strong>Average Rating:</strong> {averageRating} ({ratingsCount} ratings)
            </p>
          )}
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong>
            <br />
            {description ? (
              <span dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              'No description available.'
            )}
          </p>
          {previewLink && (
            <a
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Preview Book
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
