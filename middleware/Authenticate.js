import jwt from "jsonwebtoken";
import Login from "../model/LoginModal.js";

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken; // fetching cookies from browser
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); // checking the correction with with the SECRET_KEY

    const rootLogin = await Login.findOne({
      // checking the token present in database and which field
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootLogin) {
      throw new Error("Login not found");
    }
    req.token = token;
    req.rootLogin = rootLogin;
    req.userID = rootLogin._id;

    next();
  } catch (error) {
    res.status(401).send(" Nahi h Unauthorized : no token provided");
    console.log(error);
  }
};

export default Authenticate;
