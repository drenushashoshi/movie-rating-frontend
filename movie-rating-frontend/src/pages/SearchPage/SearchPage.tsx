import React, { useState, useEffect } from 'react';
import { Card, Loader, Input, Dropdown, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { searchAllMovies, searchMoviesByCategory, fetchCategories, Category, Movie } from './Search';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const formattedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchQuery) {
        const results = await searchAllMovies(searchQuery);
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  const handleCategoryChange = async (value: string) => {
    try {
      setLoading(true);
      setSelectedCategory(value);
      if (value !== 'all') {
        const results = await searchMoviesByCategory(value);
        setSearchResults(results);
      }
      setSelectedCategory('');
    } catch (error) {
      console.error('Error searching movies by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page-container">
      <Input
        action={{
          icon: 'search',
          onClick: handleSearch
        }}
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
        fluid
      />
      <Dropdown
        placeholder='Select Category'
        selection
        options={categories.map(category => ({ key: category.id, text: category.name, value: category.name }))}
        value={selectedCategory}
        onChange={(_event, { value }) => handleCategoryChange(value as string)}
        className="category-dropdown"
        fluid
      />
      {(searchQuery || searchResults.length > 0) && (
        <>
          {loading && <Loader active>Loading...</Loader>}
          <Grid columns={3}>
            {searchResults.map((movie, index) => (
              <Grid.Column key={index}>
                <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
                  <Card>
                    <div className="image-container">
                      <img src={movie.coverImageUrl} alt={movie.title} className="movie-image" />
                    </div>
                    <Card.Content>
                      <Card.Header>{movie.title}</Card.Header>
                      <Card.Meta>{movie.year}</Card.Meta>
                    </Card.Content>
                  </Card>
                </Link>
              </Grid.Column>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default SearchPage;
