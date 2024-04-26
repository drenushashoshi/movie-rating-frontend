import { variables } from '../../Variables';

export interface Movie {
    id: string;
    title: string;
    description: string;
    year: string;
    coverImageUrl: string;
    avgRating: number;
}

export async function searchAllMovies(searchQuery: string | undefined): Promise<Movie[]> {
    try {
      if (!searchQuery) {
        throw new Error('No search query provided');
      }
      const url = variables.API_URL + `movies/search?query=${searchQuery}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data as Movie[];
    } catch (error) {
      console.error('Error searching all movies:', error);
      throw error;
    }
  }
  
  export async function searchMoviesByCategory(category: string): Promise<Movie[]> {
    try {
      if (!category || category === 'all') {
        throw new Error('Invalid category');
      }
      const url = variables.API_URL + `api/Category/${category}/movies`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data as Movie[];
    } catch (error) {
      console.error(`Error searching movies by category ${category}:`, error);
      throw error;
    }
  }

export interface Category {
    id: number;
    name: string;
  }
  
  export async function fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch(variables.API_URL + 'api/Category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      const categories = data.map((category: any) => ({
        id: category.id,
        name: category.name
      }));
      console.log('Fetched categories:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }