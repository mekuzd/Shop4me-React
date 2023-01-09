import DefaultLayout from "../Layouts/DefaultLayout";
import Footer from "../component/Footer";
import { useContext, useRef, useState } from "react";
import { Context } from "../../Provider/Context";
import Alert from "../component/Alert";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { Store } = useContext(Context);
  const email = useRef(null);
  const state = useRef({ email: "", password: "" });
  const [alert, setalert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  useEffect(() => {
    email.current.focus();
  });

  const handleLogin = (e) => {
    e.preventDefault();
    let isregisteredUser = false;
    Store.find((store) => {
      if (
        store.email === state.current.email &&
        store.password === state.current.password
      ) {
        isregisteredUser = true;
      }
    });

    if (isregisteredUser == true) {
      setalert(true);
      setalertMessage("Login successful");
      let input = document.getElementsByTagName("input");
      for (let index = 0; index < input.length; index++) {
        input[index].value = "";
      }
    } else {
      setalert(true);
      setalertMessage("acc not registered go to sign up");
    }

    if (!state.current.email.includes("@")) {
      setalert(true);
      setalertMessage("include @ in email");
    } else if (state.current.password.length < 8) {
      setalert(true);
      setalertMessage("password length is less than 8");
    }
  };
  const closeAlert = () => {
    setalert(false);
  };

  return (
    <>
      <DefaultLayout>
        <main>
          <div className=" text-center  py-5 ">
            {alert && (
              <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
            )}
            <h1 className="fs-1 fw-bold text-warning">Login</h1>

            {/* form  */}
            <div className="form ">
              <form
                action=""
                onSubmit={handleLogin}
                className={`form-control  shadow p-3`}
              >
                {/* Email  */}
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    ref={email}
                    required
                    onChange={(e) => (state.current.email = e.target.value)}
                    type="text"
                    id="email"
                    className="form-control"
                  />
                </div>{" "}
                <br />
                {/* password  */}
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    required
                    onChange={(e) => (state.current.password = e.target.value)}
                    type="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-warning fs-5 w-25 my-4"
                >
                  Login
                </button>
              </form>
              <div className="my-3">
                <Link className="text-warning fs-5"> forgot password ?</Link>
                <br />
                <Link className="text-warning fs-5" to={"/signup"}>
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
      <footer>{<Footer />}</footer>
    </>
  );
};
export default Login;
