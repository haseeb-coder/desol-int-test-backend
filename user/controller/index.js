import { findOne } from '../schema';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { validateLogin } from '../validation';

class UserController {
  static generateToken(userId) {
    return sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static async login(req, res) {
    try {
      // Validate input
      await validateLogin(req.body);

      const { email, password } = req.body;
      const user = await findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isValid = await compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

      const token = UserController.generateToken(user._id);
      res.json({ token, userId: user._id });
    } catch (err) {
      res.status(400).json({ error: err.message || 'Server error' });
    }
  }
}

export default UserController;
