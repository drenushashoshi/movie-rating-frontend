import { useEffect, useState } from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';
import { fetchMovieData } from './mutations';
import { MovieData } from './mutations';
import { Link } from 'react-router-dom';


export const MovieList = () => {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

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

    const handleCardHover = (id: string | null) => {
        setHoveredCardId(id);
    };

    return (
       
        <Grid columns={4} stackable>
            {movies.map((movie) => (


                <Grid.Column key={movie.id}>
                    <Link to={`/movie/${encodeURIComponent(movie.title)}`} key={movie.id}>
                    <Card
                        onMouseEnter={() => handleCardHover(movie.id)}
                        onMouseLeave={() => handleCardHover(null)}
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: hoveredCardId === movie.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                            backgroundColor: hoveredCardId === movie.id ? '#F2F2F2' : 'aliceblue',
                            border: '1.5px solid black',
                            borderRadius: '5px',
                            transition: 'box-shadow 0.3s, background-color 0.3s'
                        }}
                    >
                        <div
                            style={{
                                overflow:'hidden',
                                borderRadius: '10px 10px 0 0',
                            }}
                        >
                            <Image
                                src={movie.coverImageUrl}
                                wrapped
                                ui={false}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius:"30px"
                                }}
                            />
                        </div>
                        <Card.Content style={{ padding: '16px' }}>
                            <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                                {movie.title}
                            </Card.Header>
                            <Card.Meta style={{ fontSize: '0.9rem', color: '#777', marginTop: '8px' }}>
                                {movie.year}
                            </Card.Meta>
                            <Card.Description style={{ fontSize: '0.8rem',overflow:'hidden' }}>
                                {movie.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content style={{ padding: '16px' }}>
                            <p style={{ marginTop: '8px', fontSize: '16px', color: '#333' }}>
                                Average Rating: {movie.avgRating}
                            </p>
                        </Card.Content> 
                    </Card>
                    </Link>
                </Grid.Column>
               

               
            ))}
        </Grid>
       
    );
    
};

export default MovieList;
