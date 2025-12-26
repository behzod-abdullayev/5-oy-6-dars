const Image = require("../schema/image.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

// Rasm URLini qo'shish
const uploadImage = async (req, res, next) => {
    try {
        const { url, title } = req.body;

        if (!url) {
           throw CustomErrorHandler.NotFound("url not found")
        }

        const newImage = new Image({ url, title });
        await newImage.save();

        res.status(201).json({ message: "Rasm saqlandi", image: newImage });
    } catch (error) {
        next(error)
    }
};

// Barcha rasm URLlarini olish
const getImages = async (req, res, next) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    uploadImage,
    getImages
}