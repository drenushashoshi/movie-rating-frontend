import { variables } from '../../Variables';

export interface MovieData {
    id: string;
    title: string;
    description: string;
    year: string;
    coverImageUrl: string;
    avgRating: number;
}

export interface RatingData {
    comments: string[];
}

export const fetchMovieData = async () => {
    try {
        const res = await fetch(variables.API_URL + 'movies');

        if (!res.ok) {
            throw new Error('Failed to fetch movie data');
        }

        const data: MovieData[] = await res.json();
        console.log(data);
        
        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
};

export const fetchMovieDetailsByTitle = async (title: string): Promise<MovieData | null> => {
    try {
        const res = await fetch(`${variables.API_URL}movies/${encodeURIComponent(title)}`);

        if (!res.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data: MovieData = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

export const fetchRatingsByMovieId = async (movieId: string): Promise<RatingData> => {
    try {
        const res = await fetch(`${variables.API_URL}movies/${movieId}/ratings`);

        if (!res.ok) {
            throw new Error('Failed to fetch ratings');
        }

        const data: RatingData = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

export const addRatingAndCommentToBackend = async (movieId: string, userId: string, ratingScore: number, comment: string) => {
    try {
        const response = await fetch(`${variables.API_URL}rating/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId: movieId,
                userId: userId,
                ratingScore: ratingScore,
                comment: comment
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add rating and comment');
        }

        return response.json();
    } catch (error) {
        console.error('Error adding rating and comment:', error);
        throw error;
    }
};
export const fetchRatingsByUserId = async (userId: string): Promise<RatingData | null> => {
    try {
        const res = await fetch(`${variables.API_URL}rating/${userId}/your_ratings`);

        if (!res.ok) {
            throw new Error('Failed to fetch user ratings');
        }

        const data: RatingData = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching user ratings:', error);
        return null;
    }
};

