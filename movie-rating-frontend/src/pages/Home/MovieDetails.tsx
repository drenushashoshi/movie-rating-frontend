import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailsByTitle, addRatingAndCommentToBackend, MovieData, fetchRatingsByUserId, RatingData } from './mutations';
import { Card, Loader, Button, Comment, Form, Header, Grid, Rating, RatingProps } from 'semantic-ui-react';
import { getUserIdFromToken } from '../../Variables'; // Importing the getUserIdFromToken function

const MovieDetail = () => {
    const { movieTitle } = useParams<{ movieTitle: string }>();
    const [movieDetail, setMovieDetail] = useState<MovieData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [userRating, setUserRating] = useState<number | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userAlreadyRated, setUserAlreadyRated] = useState<boolean>(false);
    const [fetchingUserRatings, setFetchingUserRatings] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!movieTitle) {
                    console.error('Movie title is undefined');
                    setLoading(false);
                    return;
                }

                // Fetch movie details
                const movieData = await fetchMovieDetailsByTitle(movieTitle);
                setMovieDetail(movieData);

                // Get userId from token
                const tokenUserId = getUserIdFromToken();
                if (tokenUserId) {
                    setUserId(tokenUserId);
                    setFetchingUserRatings(true);
                    const userRatings = await fetchRatingsByUserId(tokenUserId);
                    if (userRatings && Array.isArray(userRatings)) {
                        const userRatingForMovie = userRatings.find(rating => rating.title === movieData?.title);
                        if (userRatingForMovie) {
                            setUserAlreadyRated(true);
                            setComments([userRatingForMovie.comment || '']);
                            setUserRating(userRatingForMovie.rating || null);
                        }
                    }
                    setFetchingUserRatings(false);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie detail:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [movieTitle]);

    const handleCommentSubmit = async () => {
        try {
            if (userAlreadyRated) {
                handleEditRatingClick(); // Call the function to edit the rating
                return;
            }
            else{
            if (userRating === null || newComment.trim() === '') {
                console.error('Rating or comment is missing');
                return;
            }

            // Send rating and comment data to the backend
            const { response } = await addRatingAndCommentToBackend(movieDetail?.id || '', userId || '', userRating, newComment);
            console.log('Rating and comment added successfully:', response);

            setComments([...comments, newComment]);
            setNewComment('');
            setUserAlreadyRated(true);
        }
        } catch (error) {
            console.error('Error adding rating and comment:', error);
            // Handle error adding rating and comment
        }
    };

    const handleRatingChange = (_event: React.MouseEvent<HTMLElement>, data: RatingProps) => {
        const rating = Number(data.rating);
        setUserRating(isNaN(rating) ? null : rating);
    };

    const handleEditRatingClick = () => {
        // Logic to handle editing the rating goes here
        console.log("Editing the rating...");
        // You can implement logic to handle editing the existing rating
    };

    if (loading) {
        return <Loader active>Loading...</Loader>;
    }

    if (!movieDetail) {
        return <div>Error: Movie not found</div>;
    }

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Card fluid raised style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                        <Card.Content>
                            <Card.Header>{movieDetail.title}</Card.Header>
                            <Card.Meta>
                                Average Rating: {movieDetail.avgRating}
                            </Card.Meta>
                            <Card.Description>{movieDetail.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Comment.Group>
                            <Header as='h3' subheader='Rate and/or Comment:' dividing />
                                {!userAlreadyRated && (
                                    <Form reply onSubmit={handleCommentSubmit}>
                                        <Rating
                                            icon='star'
                                            rating={userRating || 0}
                                            maxRating={10}
                                            onRate={handleRatingChange}
                                        />
                                        <Form.TextArea
                                            placeholder='Add your comment...'
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <Button content='Submit' primary />
                                    </Form>
                                )}    
                                {userAlreadyRated && (
                                    <div>
                                        <p>You've already rated this movie.</p>
                                        <Button content='Edit Rating' primary onClick={handleEditRatingClick} />
                                    </div>
                                )}
                            </Comment.Group>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default MovieDetail;
