import dbConnection from "../../../utils/dbConnection";
import User from "../../../models/User";

dbConnection();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) return res.json({ msg: "User not found" });

        res.json({ user });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) return res.json({ msg: "User not found" });

        res.json({ user });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await User.deleteOne({ _id: id });

        if (!deletedNote) return res.json({ msg: "User cannot be deleted" });

        res.json({ data: {} });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    default:
      res.json({ msg: "Error fetching data from database" });
      break;
  }
};
