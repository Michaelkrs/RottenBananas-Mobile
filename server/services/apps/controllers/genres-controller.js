const { Genre } = require("../models/index");

class Controller {
  static async readGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async readOneGenre(req, res, next) {
    try {
      const id = req.params.id;

      const genre = await Genre.findByPk(id);

      if (!genre) throw { name: "dataNotFound" };

      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      const { name } = req.body;

      const newGenre = await Genre.create({
        name,
      });

      res.status(201).json(newGenre);
    } catch (error) {
      next(error);
    }
  }

  static async editGenre(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const findGenre = await Genre.findByPk(id);

      if (!findGenre) throw { name: "dataNotFound" };

      await Genre.update(
        {
          name,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(201).json({
        message: `Genre with id ${id} edited`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const id = req.params.id;

      const findGenre = await Genre.findByPk(id);

      if (!findGenre) throw { name: "dataNotFound" };

      await Genre.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Genre with id ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
