import { useState } from "react";
import { useRouter } from "next/router";

const NewNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const router = useRouter();

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const noteId = router.query.id;

    try {
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log("Something went wrong xd");
    }
  };

  return (
    <div className="container">
      <div className="mid">
        <h1>Edit Note</h1>
        <form className="note-form" onSubmit={submit}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            onChange={inputHandler}
            value={form.title}
            required
          />
          <label>Description: </label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={inputHandler}
            value={form.description}
            required
          ></textarea>
          <button type="submit">Update Note</button>
        </form>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/notes`);
  const notes = await res.json();

  const paths = notes.notes.map((note) => ({ params: { id: note._id } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/notes/${params.id}`);
  const { note } = await res.json();

  return { props: { note } };
}

export default NewNote;
