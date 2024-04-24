import { useState, useEffect } from 'react';
// import {useSelector} from 'react-redux';
import { Image, Button, Icon, Modal, Form } from 'semantic-ui-react'; 
import { variables } from '../../Variables';
import { getUserIdFromToken } from '../../Variables';
const userId = getUserIdFromToken();
console.log(userId);
interface RatedMovie {
  id: string;
  title: string;
  coverImageUrl: string;
  ratingScore: number;
  comment: string;
}

const RatedPage = () => {
//   const user = useSelector((state) => state.user);
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<RatedMovie | null>(null);
  const [newRating, setNewRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await fetch(`${variables.API_URL}rating/${userId}/your_ratings`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch rated movies');
        }
        const data = await response.json();
        setRatedMovies(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching rated movies:', error);
      }
    };

    fetchRatedMovies();
  }, []);

  const handleEditRating = (movie: RatedMovie) => {
    setSelectedMovie(movie);
    console.log(movie.id);
    setNewRating(movie.ratingScore);
    setNewComment(movie.comment);
  };

  const handleUpdateRating = async () => {
    try {
        const response = await fetch(`${variables.API_URL}rating/update/${selectedMovie?.id}/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ratingScore: newRating,
            comment: newComment,
          }),
        });
  
        if (response.ok) {
          // Update the state to reflect the changes
          const updatedMovies = ratedMovies.map(movie => {
            if (movie.id === selectedMovie?.id) {
              return {
                ...movie,
                ratingScore: newRating,
                comment: newComment,
              };
            }
            return movie;
          });
          setRatedMovies(updatedMovies);
          
          setSelectedMovie(null);
          
          console.log('Rating and comment updated successfully');
        } else {
          console.error('Failed to update rating and comment');
        }
      } catch (error) {
        console.error('Error updating rating and comment:', error);
      }
  };

  return (
    <div className="ui items">
      {ratedMovies.map((movie) => (
        <div className="item" key={movie.id}>
          <div className="ui small image">
            <Image src={movie.coverImageUrl} />
          </div>
          <div className="middle aligned content">
            <div className="header">{movie.title}</div>
            <div className="description">
                
              <p>Your Rating: {movie.ratingScore}</p>
              <p>Your Comment: {movie.comment}</p>
            </div>
            <div className="extra">
              <Button
                floated="right"
                onClick={() => handleEditRating(movie)}
              >
                <Icon name="edit" />
                Edit Rating
              </Button>
            </div>
          </div>
        </div>
      ))}
      {/* Modal or form for editing rating and comment */}
      <Modal open={selectedMovie !== null} onClose={() => setSelectedMovie(null)}>
        <Modal.Header>Edit Rating and Comment</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Rating"
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            />
            <Form.TextArea
              label="Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleUpdateRating}>Update</Button>
          <Button onClick={() => setSelectedMovie(null)}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RatedPage;
