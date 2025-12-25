const User = require("../schema/auth.schema"); 
const bcrypt = require("bcryptjs");
const sendMessage = require("../utils/email.sender");
const CustomErrorHandler = require("../utils/custom-error-handler");
const tokenGenerator = require("../utils/token-generator");

// register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "email, password and username are required",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
   throw CustomErrorHandler.UnAuthorized("use already exist")
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(401).json({
        message: "username already exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.ceil(Math.random() * 9)
    ).join("");

    await sendMessage(email, generatedCode);

    await User.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "registered successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "wrong password",
      });
    }

    const payload = {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };

    const token = tokenGenerator(payload);

    res.status(200).json({
      message: "success",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    register,
    login
}
