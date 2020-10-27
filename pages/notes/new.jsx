import { useState } from "react";
import { useRouter } from "next/router";

const NewNote = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
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

    try {
      await fetch("http://localhost:3000/api/notes", {
        method: "POST",
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
        <h1>Create Note</h1>
        <form class="note-form" onSubmit={submit}>
          <label>Title: </label>
          <input type="text" name="title" onChange={inputHandler} required />
          <label>Description: </label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={inputHandler}
            required
          ></textarea>
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
};

export default NewNote;
