const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  if (!email) {
    return res.redirect("/join?error=no_email");
  }
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 익명함수에는 함수명을 만들어준다.
exports.localCallback = (authError, user, info) => {
  if (authError) {
    console.error(authError);
    return next(authError);
  }
  if (!user) {
    return res.redirect(`/?error=${info?.message}`);
  }
  return req.login(user, (loginError) => {
    if (loginError) {
      console.error(loginError);
      return next(loginError);
    }
    return res.redirect("/");
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", localCallback)(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
