import { Card, Image } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { fetchMovieData } from './mutations';
import { MovieData } from './mutations';
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
                <Card key={movie.id}>
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
            ))}
        </Card.Group>
    );
};

export default MovieList;
