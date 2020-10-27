import dbConnection from "../../../utils/dbConnection";
import Note from "../../../models/Note";

dbConnection();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) return res.json({ msg: "Note not found" });

        res.json({ note });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) return res.json({ msg: "Note not found" });

        res.json({ note });
      } catch (error) {
        res.json({ msg: "Error fetching data from database" });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) return res.json({ msg: "Note cannot be deleted" });

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
