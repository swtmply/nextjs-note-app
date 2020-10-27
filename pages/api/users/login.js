import dbConnection from "../../../utils/dbConnection";
import User from "../../../models/User";
import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});

        res.json({
          users,
        });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "POST":
      try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) return res.json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

        res.json({
          token,
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
          },
        });
      } catch (error) {
        res.status(500).json({ msg: "Error fetching user" });
      }
      break;
    default:
      res.status(400);
      break;
  }
};
