const {Router} = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/auther.controller")
const authorValidationMiddleware = require("../middleware/author.validation.middleware")


const AuthorRouter = Router()

AuthorRouter.get("/get_all_authors", getAllAuthors)
AuthorRouter.get("/get_one_author/:id", getOneAuthor)
AuthorRouter.get("/search", search)
AuthorRouter.post("/add_author", authorValidationMiddleware, addAuthor )
AuthorRouter.put("/update_author/:id", updateAuthor)
AuthorRouter.delete("/delete_author/:id", deleteAuthor)



module.exports = AuthorRouter