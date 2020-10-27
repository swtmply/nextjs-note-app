import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/User";
import fetch from "isomorphic-unfetch";
import jwt from "jsonwebtoken";

const login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const inputHanlder = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((data) => data.json());

      const verified = jwt.verify(res.token, process.env.TOKEN_SECRET);

      if (verified) {
        localStorage.setItem("auth-token", res.token);
        setUser({
          username: form.username,
          password: form.password,
        });
        router.push("/");
      }
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label>username</label>
        <input type="text" name="username" onChange={inputHanlder} />
        <label>password</label>
        <input type="password" name="password" onChange={inputHanlder} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default login;
