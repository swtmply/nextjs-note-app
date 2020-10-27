import Link from "next/link";

const Index = ({ notes }) => {
  return (
    <div className="container">
      <div className="content">
        <h1>Notes</h1>
        <div className="notes-container">
          {notes.map((note) => (
            <Link key={note._id} href={`/notes/${note._id}`}>
              <div className="note">
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <button>View</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/notes`);
  const { notes } = await res.json();

  return { props: { notes } };
}

export default Index;
