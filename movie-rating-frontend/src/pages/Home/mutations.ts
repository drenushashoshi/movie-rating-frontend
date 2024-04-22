import { variables } from '../../Variables';

export interface MovieData {
    id: string;
    title: string;
    description: string;
    year: string;
    coverImageUrl: string;
    avgRating: number;
}

export const fetchMovieData = async () => {
    try {
        const res = await fetch(variables.API_URL + 'movies'); // Assuming the endpoint to fetch movie data is '/movies'

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
