const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();

const redis = new Redis(16391, process.env.REDIS_URL);

const APP_SERVER_URL = process.env.APP_SERVER_URL || "http://localhost:4002";

class Controller {
  static async getMovies(req, res, next) {
    try {
      let moviesCache = await redis.get("movies");

      if (moviesCache) {
        let moviesResult = JSON.parse(moviesCache);
        return res.status(200).json(moviesResult);
      }

      const response = await axios.get(`${APP_SERVER_URL}/movies`);

      redis.set("movies", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async postMovie(req, res, next) {
    try {
      const inputData = req.body;

      const response = await axios.post(`${APP_SERVER_URL}/movies`, inputData);

      redis.del("movies");

      res.status(201).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async getMovieDetail(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.get(`${APP_SERVER_URL}/movies/${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async editMovie(req, res, next) {
    try {
      const id = req.params.id;
      const inputData = req.body;

      const response = await axios.put(
        `${APP_SERVER_URL}/movies/${id}`,
        inputData
      );

      redis.del("movies");

      res.status(201).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.delete(`${APP_SERVER_URL}/movies/${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = Controller;
