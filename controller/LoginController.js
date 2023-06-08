import Login from "../model/LoginModal.js";

import bcrypt from "bcrypt";

const addSignin = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body; //

  if (!username || !email || !password) {
    return res.status(500).json({ message: "Plz fill the fields properly" });
  }

  try {
    const userExist = await Login.findOne({ email: email }); // returns entire collection if found
    console.log(userExist);
    if (userExist) {
      return res.status(500).json({ message: "Email Exists" });
    } else {
      const user = new Login(req.body);
      console.log(user);
      await user.save();
      res.status(200).json({ message: "User Registered Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addLogin = async (req, res) => {
  const { email, password } = req.body; //

  if (!email || !password) {
    return res.status(500).json({ error: "Plz fill the fields properly" });
  }

  try {
    console.log(req.body);

    const userExist = await Login.findOne({ email: email }); // returns entire collection if found

    console.log("user found", userExist);

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      console.log(isMatch);
      if (!isMatch) {
        return res.status(500).json({ error: "Invalid pass" });
      } else {
        return res.status(200).json({
          message: "login successful...",
          loginId: userExist._id,
          email: userExist.email,
          username: userExist.username,
          userType: userExist.userType,
        });
      }
    } else {
      return res.status(500).json({ error: "user not exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getLogin = async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;

    const LoginData = await Login.find({
      email: email,
    });
    return res.status(200).json(LoginData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addLogin, addSignin, getLogin };
