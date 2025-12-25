const AutherSchema = require("../schema/auther.schema");
const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AutherSchema.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const auther = await AutherSchema.findById(id);
    if (!auther) {
      throw CustomErrorHandler.NotFound("author not found")
    }
   
    const foundedBook = await BookSchema.find({author_id: id})

    res.status(200).json({auther, foundedBook});
  } catch (error) {
    next(error)
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const {
      full_name,
      birth_year,
      death_year,
      img_url,
      bio,
      genre,
      period,
      creativity,
      region,
    } = req.body;

    await AutherSchema.create({
      full_name,
      birth_year,
      death_year,
      img_url,
      bio,
      genre,
      period,
      creativity,
      region,
    });

    res.status(201).json({
      message: "auther added",
    });
  } catch (error) {
    next(error)
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      birth_year,
      death_year,
      img_url,
      bio,
      genre,
      period,
      creativity,
      region,
    } = req.body;
    const author = await AutherSchema.findById(id);

    if (!author) {
      throw CustomErrorHandler.NotFound("author not found")
    }

    await AutherSchema.findByIdAndUpdate(id, {
      full_name,
      birth_year,
      death_year,
      img_url,
      bio,
      genre,
      period,
      creativity,
      region,
    });

    res.status(200).json({
      message: "author updated",
    });
  } catch (error) {
    next(error)
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AutherSchema.findById(id)

    if (!author) {
      throw CustomErrorHandler.NotFound("author not found")
    }

    await AutherSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "author deleted",
    });
  } catch (error) {
    next(error)
  }
};

const search = async (req, res, next) => {
  try {
    const { name } = req.query;

    const searchingResult = await AutherSchema.find({
      full_name: { $regex: name, $options: "i" }
    });

    res.status(200).json(searchingResult);
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
};
