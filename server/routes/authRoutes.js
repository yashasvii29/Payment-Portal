const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateAuthToken = require("../jwtTokenGen");
// signup
router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    console.log(user);
    const Email = await User.findOne({ email: user.email });
    if (Email) {
      return res.status(200).json({ msg: "email already exist" });
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      // console.log(user.password);
      let dbUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        gender: user.gender,
        profilePic: user.profilePic,
      });
      await dbUser.save();
      return res.status(200).json({ msg: "account has been created" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let userFormData = req.body;
    console.log(userFormData);

    let userDBInfo = await User.findOne({ email: userFormData.email });
    console.log(userDBInfo);

    if (!userDBInfo) {
      return res.status(400).json({ msg: "create account first" });
    }
    // console.log(userDBInfo);
    let validatePassword = await bcrypt.compare(
      userFormData.password,
      userDBInfo.password
    );
    console.log(validatePassword);
    if (!validatePassword) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    console.log(validatePassword);
    const token = generateAuthToken(userDBInfo);
    console.log(token);
    console.log(userDBInfo);
    res.status(200).json({
      data: {
        token: token,
        userDBInfo: userDBInfo,
      },
      msg: "Everything is fine,user loggedin",
    });
  } catch (e) {
    console.log("something went wrong");
    return res.status(400).json({ msg: "login issue" });
  }
});
router.get("/logout", (req, res) => {
  () => {
    req.logout();
  };
  res.status(200).json({ msg: "You have successfully logout" });
});

module.exports = router;
