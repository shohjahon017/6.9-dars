import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();
  const [loader, setLoader] = useState(false);

  function validatePassword(pw) {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 3;
  }
  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      usernameRef: usernameRef.current.value,
      passwordRef: passwordRef.current.value,
    };
    setLoader(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (
          data.message == "User Not found." ||
          data.message == "Invalid Password!"
        ) {
          alert(data.message);
        }
        if (data.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className=" w-1/3 flex flex-col p-5 gap-4 mt-4 mx-auto border rounded-lg"
      >
        <input
          className="border rounded-lg p-3 "
          ref={usernameRef}
          type="text"
          placeholder="Enter username..."
        />

        <input
          className="border rounded-lg p-3 "
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter password..."
        />

        <button
          disabled={loader}
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING" : "LOGIN"}
        </button>
        <Link to="/register">Registerga o`tish</Link>
      </form>
    </div>
  );
}

export default Login;
