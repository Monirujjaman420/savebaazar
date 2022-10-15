const users = require("../../models/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


/**List */
const List = async (req, res, next) => {
  try {
    const results = await users.find()
    res.status(200).json({
      status: true,
      data: results,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}
/* Login */
const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const account = await users.findOne({
      email
    })
    if (!account) {
      res.status(404).json({
        status: true,
        message: "Invalid Email || Password"
      })
    }
    
    /* Compare with password */
    const result = await bcrypt.compare(password, account.password)
    if (!result) {
        return res.status(404).json({
            status: false,
            message: "Invalid email or password."
        })
    }

    /* Generate JWT token */
    const token = await jwt.sign({
        id: account._id,
        name: account.name,
        role: account.role,
      },
      process.env.JWT_SECRET, {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      status: true,
      data: token,
      message: "User Login Successfully Done...!",
    });



  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* register */
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existUser = await users.findOne({
      email
    });
    if (existUser) {
      res.status(404).json({
        status: false,
        message: "Email Already Exists...!",
      });
    }

    /* Hash password */
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new users({
      name,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      status: true,
      message: "User Registration Successfully...!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**profile */
const Profile = async (req, res, next) => {
  try {
    /** user check */
    const existUser = await users.findById(req.user.id)
    console.log(existUser)
    if(!existUser){
      res.status(404).json({
        status: true,
        message: "Invalid User",
      });
    }

    res.status(201).json({
      status: true,
      data: existUser,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}
module.exports = {
  login,
  register,
  List,
  Profile
};