
const { blackListToken } = require("../services/blackListToken.service");
const userService = require("../services/user.service");

module.exports.createUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password
    });
    const token = user.getJWT();

    const userObj = user.toObject();
    delete userObj.password

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 7000, //expire in 7D
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'Lax'
    });

    res.status(200).json(({
      token,
      success: true,
      message: "user register successfully",
      user: userObj
    }));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    })
  }

}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser({ email, password });
    const token = user.getJWT();
    const userObj = user.toObject();
    delete userObj.password;

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 7000, //expire in 7D
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'Lax'
    });

    res.status(200).json({
      token,
      success: true,
      user: userObj,
      message: "Login Succesfull",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

module.exports.getProfile = async (req, res) => {
  const user = req.authUser;
  try {
    res.status(200).json({
      success: true,
      message: 'Captain data fetch Successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


module.exports.logout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    });
    await blackListToken({ token });
    res.status(200).json({
      success: true,
      message: "Logout Successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

