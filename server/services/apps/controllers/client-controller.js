const { Movie, Genre, Cast } = require("../models/index");

class Controller {
  static async readMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [Genre],
        order: [["id", "ASC"]],
      });

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async readMovieDetail(req, res, next) {
    try {
      const id = req.params.id;

      const movie = await Movie.findOne({
        where: {
          id,
        },
        include: [Genre, Cast],
      });

      if (!movie) throw { name: "dataNotFound" };

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
