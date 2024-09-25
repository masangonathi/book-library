import { Link } from 'react-router-dom';

function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => {
        const { id, volumeInfo } = book;
        const { title, authors, imageLinks } = volumeInfo;
        const thumbnail = imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=No+Image';

        return (
          <div key={id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={thumbnail} alt={title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{authors ? authors.join(', ') : 'Unknown Author'}</p>
              <Link
                to={`/book/${id}`}
                className="text-blue-500 hover:underline font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
