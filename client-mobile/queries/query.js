import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMoviesQuery {
    movies {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
    }
  }
`;

export const GET_MOVIE_DETAIL = gql`
  query MovieDetail($movieId: ID) {
    movieDetail(movieId: $movieId) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      Genre {
        name
      }
      Casts {
        id
        name
        profilePict
      }
      authorName
    }
  }
`;
