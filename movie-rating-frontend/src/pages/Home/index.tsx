import { Card, Image } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { fetchMovieData } from './mutations';
import { MovieData } from './mutations';
import { Link } from 'react-router-dom';

export const MovieList = () => {
    const [movies, setMovies] = useState<MovieData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovieData();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card.Group>
            {movies.map((movie) => (
                <Link to={`/movie/${encodeURIComponent(movie.title)}`} key={movie.id}>
                    <Card>
                        <Image src={movie.coverImageUrl} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{movie.title}</Card.Header>
                            <Card.Meta>{movie.year}</Card.Meta>
                            <Card.Description>{movie.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <p>Average Rating: {movie.avgRating}</p>
                        </Card.Content>
                    </Card>
                </Link>
            ))}
        </Card.Group>
    );
};

export default MovieList;
