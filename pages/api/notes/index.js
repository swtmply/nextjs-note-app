import dbConnection from "../../../utils/dbConnection";
import Note from "../../../models/Note";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({});

        res.json({
          notes,
        });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "POST":
      try {
        const note = await Note.create(req.body);

        res.json({ msg: "Note added", note });
      } catch (error) {
        res.json({ msg: "Error creating note" });
      }
      break;
    default:
      res.status(400);
      break;
  }
};
