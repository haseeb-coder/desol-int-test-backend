import User from "../schema/index.js";
import pkg from "jsonwebtoken";
import bcrypt from  'bcrypt'
const { sign } = pkg; 
import { validateLogin } from "../validations/index.js";

class UserController {
  static generateToken(userId) {
    return sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static async login(req, res) {
    try {
      await validateLogin(req.body);

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = UserController.generateToken(user._id);
      console.log('here')

      res.json({ token, userId: user._id });
    } catch (err) {
      res.status(400).json({ error: err.message || "Server error" });
    }
  }
}

export default UserController;
