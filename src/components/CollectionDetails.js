import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCollectionDetails } from '../api/tmdb-api';

function CollectionDetails() {
  const { id } = useParams();
  const { data: collection, isLoading, isError } = useQuery(['collection', id], () => getCollectionDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching collection details</div>;

  return (
    <div>
      <h2>{collection.name}</h2>
      <p>{collection.overview}</p>
      <h3>Movies in this collection</h3>
      <ul>
        {collection.parts.map(movie => (
          <li key={movie.id}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionDetails;