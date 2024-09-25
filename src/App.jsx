import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import { useState } from 'react';
import { fetchBooks } from './services/bookService';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setStartIndex(0);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(searchQuery, 0);
      setBooks(data.items || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const newIndex = startIndex + 12;
    setStartIndex(newIndex);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(query, newIndex);
      setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]);
    } catch (err) {
      setError('Failed to load more books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-8">Book Library</h1>
                <Search onSearch={handleSearch} />
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <BookList books={books} />
                {books.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            }
          />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
