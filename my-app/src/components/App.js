import React, { useState } from 'react';
import MovieList from './MovieList';
import Filter from './Filter';
import '../styles.css';

function App() {
    const [movies, setMovies] = useState([
        { title: 'Inception', description: 'A mind-bending thriller', posterURL: 'https://th.bing.com/th/id/OIP.6WES5nhdyXVDPrxHG0vCvgHaKz?rs=1&pid=ImgDetMain', rating: 8.8 },
        { title: 'The Matrix', description: 'A computer hacker learns about the true nature of reality', posterURL: 'https://th.bing.com/th/id/OIP.rZdNNSeHnwC-LuwpE1EYFgHaLI?rs=1&pid=ImgDetMain', rating: 8.7 },
        { title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space', posterURL: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 8.6 }
    ]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', description: '', posterURL: '', rating: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const addMovie = (e) => {
        e.preventDefault();
        console.log("Adding movie:", newMovie);
        if (newMovie.title && newMovie.rating) {
            setMovies([...movies, newMovie]);
            setNewMovie({ title: '', description: '', posterURL: '', rating: '' }); // Reset form
        } else {
            console.log("Movie title or rating is missing.");
        }
    };

    const handleFilter = ({ title, rating }) => {
        const filtered = movies.filter(movie => {
            return (
                (title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true) &&
                (rating ? movie.rating >= rating : true)
            );
        });
        setFilteredMovies(filtered);
    };

    const searchedMovies = filteredMovies.length > 0 ? filteredMovies : movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <h1>Movie App</h1>
            <form onSubmit={addMovie}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Poster URL"
                    value={newMovie.posterURL}
                    onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                    required
                />
                <button type="submit">Add Movie</button>
            </form>
            <Filter onFilter={handleFilter} />
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MovieList movies={searchedMovies} />
        </div>
    );
}

export default App;
