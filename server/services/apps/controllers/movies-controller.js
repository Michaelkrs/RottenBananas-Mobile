const { Movie, Genre, Cast, sequelize } = require("../models/index");

class Controller {
  static async readMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [Genre, Cast],
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
        include: [
          {
            model: Cast,
            attributes: ["id", "name", "profilePict"],
          },
          {
            model: Genre,
          },
        ],
      });

      if (!movie) throw { name: "dataNotFound" };

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async addMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { movieData, castData } = req.body;

      const { title, synopsis, imgUrl, trailerUrl, rating, genreId, authorId } =
        movieData;

      let slug;

      if (title) {
        slug = title.split(/\s+/).join("-") + "-" + new Date().getTime();
      }

      const newMovie = await Movie.create(
        {
          title,
          slug,
          synopsis,
          imgUrl,
          trailerUrl,
          rating,
          genreId,
          authorId,
        },
        { transaction: t }
      );

      let castInput;

      castInput = castData.map((cast) => ({
        name: cast.name,
        profilePict: cast.profilePict,
        movieId: newMovie.id,
      }));

      // if (typeof casts === "object") {
      //   castInput = casts.map((cast) => ({
      //     name: cast.name,
      //     profilePict: cast.profilePict,
      //     movieId: newMovie.id,
      //   }));
      // } else {
      //   castInput = [
      //     {
      //       name: casts,
      //       movieId: newMovie.id,
      //     },
      //   ];
      // }

      await Cast.bulkCreate(castInput, { transaction: t });

      await t.commit();

      res.status(201).json(newMovie);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async editMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { movieData, castData } = req.body;

      const { title, synopsis, imgUrl, trailerUrl, rating, genreId, authorId } =
        movieData;

      const movieId = req.params.id;

      const findMovie = await Movie.findByPk(movieId);

      if (!findMovie) throw { name: "dataNotFound" };

      let slug;

      const genre = await Genre.findOne({
        where: {
          id: genreId,
        },
        transaction: t,
      });

      if (!genre) throw { name: "genreNotFound" };

      if (title) {
        slug = title.split(/\s+/).join("-") + "-" + new Date().getTime();
      }

      await Movie.update(
        {
          title,
          slug,
          synopsis,
          imgUrl,
          trailerUrl,
          rating,
          genreId,
          authorId,
        },
        {
          where: {
            id: movieId,
          },
          transaction: t,
        }
      );

      await Cast.destroy({
        where: {
          movieId: movieId,
        },
        transaction: t,
      });

      const castInput = castData.map((cast) => ({
        name: cast.name,
        profilePict: cast.profilePict,
        movieId: movieId,
      }));

      await Cast.bulkCreate(castInput, { transaction: t });

      await t.commit();

      res.status(201).json({
        message: `Movie with id ${movieId} edited`,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id;

      const findMovie = await Movie.findByPk(id);

      if (!findMovie) throw { name: "dataNotFound" };

      await Movie.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Movie with id ${id} has been deleted`,
      });

      res.status(201).json(updatedMovie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
