import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select:true
  },
  userType: {
    type: String,
    select:true
  },
  login_addingdate: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

// hashing our password before save() function
loginSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("starting hashing");
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
  }
  next();
});

// generating token
loginSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Login = mongoose.model('Login', loginSchema);

export default Login;