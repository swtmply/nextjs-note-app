import Router from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link href="/">
          <a className="brand">Note App</a>
        </Link>
        <Link href="/notes/new">
          <a className="create">New Note</a>
        </Link>
        {user.username ? (
          <Link href="/users/login">
            <a
              className="create"
              onClick={() => {
                setUser({
                  username: undefined,
                  password: undefined,
                });
                localStorage.setItem("auth-token", "");
              }}
            >
              Logout
            </a>
          </Link>
        ) : (
          <Link href="/users/login">
            <a className="create">Login</a>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
