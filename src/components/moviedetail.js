import React, { useEffect, useState, useMemo } from 'react';
import { fetchMovie, submitReview } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button, Row, Col } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);
  const username = useSelector(state => state.auth.username);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('5');

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const hasReviewed = useMemo(() => {
    if (!selectedMovie || !selectedMovie.reviews) return false;
    return selectedMovie.reviews.some(r => r.username === username);
  }, [selectedMovie, username]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(submitReview(movieId, { username, review: reviewText, rating: Number(rating) }))
      .then(() => {
        navigate('/');
      });
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedMovie) {
    return <div>No movie data available.</div>;
  }

  return (
    <Card className="bg-dark text-dark p-4 rounded">
      <Card.Header>Movie Detail</Card.Header>
      <Card.Body>
        <Image className="image" src={selectedMovie.imageUrl} thumbnail />
      </Card.Body>
      <ListGroup>
        <ListGroupItem>{selectedMovie.title}</ListGroupItem>
        <ListGroupItem>
          {selectedMovie.actors.map((actor, i) => (
            <p key={i}>
              <b>{actor.actorName}</b> {actor.characterName}
            </p>
          ))}
        </ListGroupItem>
        <ListGroupItem>
          <h4>
            <BsStarFill /> {selectedMovie.avgRating != null ? Number(selectedMovie.avgRating).toFixed(2) : 'N/A'}
          </h4>
        </ListGroupItem>
      </ListGroup>
      <Card.Body className="card-body bg-white">
        <Row xs={1} sm={2} md={3} lg={4}>
          {selectedMovie.reviews.map((review, i) => (
            <Col key={i} className="mb-4">
              <Card className="h-100 bg-light">
                <Card.Body>
                  <Card.Title><b>{review.username}</b></Card.Title>
                  <Card.Text>{review.review}</Card.Text>
                  <Card.Text>
                    <BsStarFill className="text-warning" /> {review.rating}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>

      {!hasReviewed && (
        <Card.Body className="bg-light">
          <h5>Leave a Review</h5>
          <Form onSubmit={handleSubmitReview}>
            <Form.Group className="mb-2">
              <Form.Label>Rating</Form.Label>
              <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Submit Review</Button>
          </Form>
        </Card.Body>
      )}

      {hasReviewed && (
        <Card.Body className="bg-light text-muted text-center">
          You have already reviewed this movie.
        </Card.Body>
      )}
    </Card>
  );
};


export default MovieDetail;
