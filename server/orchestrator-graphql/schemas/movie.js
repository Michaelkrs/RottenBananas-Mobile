const APP_SERVER_URL = process.env.APP_SERVER_URL || "http://localhost:4002";
const USER_SERVER_URL = process.env.USER_SERVER_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(16391, process.env.REDIS_URL);

const typeDefs = `#graphql
  # === DEFINE TYPES ===
  type Cast {
    id: ID,
    name: String,
    profilePict: String
  }

  type Genre {
    name: String
  }

  type Movie {
    id: ID,
    title: String,
    slug: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: String,
    Genre: Genre
    Casts: [Cast],
  }

  type MovieDetail {
    id: ID,
    title: String,
    slug: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: String,
    authorName: String,
    Genre: Genre
    Casts: [Cast],
  }

  type addMovieResponse {
    id: ID,
    title: String,
    slug: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: String
  }

  type deleteMovieResponse {
    message: String
  }

  type editMovieResponse {
    message: String
  }

  input movieInput {
    title: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: String
  }

  input castInput {
    name: String,
    profilePict: String
  }

  # === QUERIES AND MUTATIONS ===
  type Query {
    movies: [Movie],
    movieDetail(movieId: ID): MovieDetail
  }

  type Mutation {
    addMovie(movieData: movieInput, castData: [castInput]): addMovieResponse,
    deleteMovie(movieId: ID): deleteMovieResponse,
    editMovie(movieId: ID, movieData: movieInput, castData: [castInput]): editMovieResponse
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        let moviesCache = await redis.get("movies");

        if (moviesCache) {
          let moviesResult = JSON.parse(moviesCache);
          return moviesResult;
        }

        const { data } = await axios.get(`${APP_SERVER_URL}/movies`);

        redis.set("movies", JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    movieDetail: async (_, { movieId }) => {
      try {
        let { data } = await axios.get(`${APP_SERVER_URL}/movies/${movieId}`);

        const authorId = data.authorId;

        const { data: authorData } = await axios.get(
          `${USER_SERVER_URL}/users/${authorId}`
        );

        data.authorName = authorData.username;

        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { data } = await axios.post(`${APP_SERVER_URL}/movies`, args);

        redis.del("movies");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    deleteMovie: async (_, { movieId }) => {
      try {
        const { data } = await axios.delete(
          `${APP_SERVER_URL}/movies/${movieId}`
        );

        redis.del("movies");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    editMovie: async (_, args) => {
      try {
        const { movieId } = args;

        const { data } = await axios.put(
          `${APP_SERVER_URL}/movies/${movieId}`,
          args
        );

        redis.del("movies");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
