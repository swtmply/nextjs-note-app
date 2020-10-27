import dbConnection from "../../../utils/dbConnection";
import User from "../../../models/User";
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
        req.body.password = await bcrypt.hash(password, 10);

        const user = await User.findOne({ username: username });
        if (user) {
          return res.json({ msg: "user already exist" });
        } else {
          const users = await User.create(req.body);
          res.json({ msg: "User added", users });
        }
      } catch (error) {
        res.status(500).json({ msg: "Error creating user" });
      }
      break;
    default:
      res.status(400);
      break;
  }
};
