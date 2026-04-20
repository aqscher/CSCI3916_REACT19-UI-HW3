import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link, Navigate } from 'react-router-dom';
import { Card, Row, Col, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { BsStarFill, BsSearch } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (loggedIn) {
            dispatch(fetchMovies());
        }
    }, [dispatch, loggedIn]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchMovies(searchQuery));
    };

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    if (!loggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <Container className="movie-list-container mt-4">
            <Form onSubmit={handleSearch} className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-light text-dark"
                    />
                    <Button variant="primary" type="submit">
                        <BsSearch /> Search
                    </Button>
                </InputGroup>
            </Form>

            {!movies || movies.length === 0 ? (
                <div className="text-light text-center">No movies found.</div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4}>
                    {movies.map((movie) => (
                        <Col key={movie._id} className="mb-4">
                            <Card className="movie-card bg-dark text-light h-100">
                                <Link to={`/movie/${movie._id}`} onClick={() => handleClick(movie)}>
                                    <Card.Img
                                        variant="top"
                                        src={movie.imageUrl}
                                        className="movie-card-img"
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        <BsStarFill className="text-warning" />{' '}
                                        {movie.avgRating != null ? Number(movie.avgRating).toFixed(2) : 'N/A'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default MovieList;