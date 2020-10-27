import { useRouter } from "next/router";
import Link from "next/link";

const Index = ({ note }) => {
  const router = useRouter();

  const noteId = router.query.id;

  const deleteHandler = async (e) => {
    try {
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log("Something went wrong deleting the note");
    }
  };

  return (
    <div className="container">
      <div className="note-content mid">
        <h1>Note</h1>
        <div className="note-container">
          <div className="note">
            <h6>Note Title:</h6>
            <h2>{note.title}</h2>
            <h6>Note Description:</h6>
            <p>{note.description}</p>
            <div className="controllers">
              <button
                className="edit"
                onClick={() => router.push(`/notes/${noteId}/edit`)}
              >
                Edit
              </button>
              <button onClick={deleteHandler}>Delete</button>
            </div>
          </div>
        </div>
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

export default Index;
