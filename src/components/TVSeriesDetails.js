import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getTVSeriesDetails } from '../api/tmdb-api';

const TVSeriesDetails = () => {
  const { id } = useParams();
  const { data: tvSeries, isLoading, isError } = useQuery(['tvSeries', id], () => getTVSeriesDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching TV series details</div>;

  return (
    <div>
      <h1>{tvSeries.name}</h1>
      <p>{tvSeries.overview}</p>
      <h2>Genres</h2>
      <ul>
        {tvSeries.genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <h2>Cast</h2>
      <ul>
        {tvSeries.credits.cast.slice(0, 5).map(actor => (
          <li key={actor.id}>
            <Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}
          </li>
        ))}
      </ul>
      <h2>Similar TV Series</h2>
      <ul>
        {tvSeries.similar.results.slice(0, 5).map(similarSeries => (
          <li key={similarSeries.id}>
            <Link to={`/tv/${similarSeries.id}`}>{similarSeries.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVSeriesDetails;