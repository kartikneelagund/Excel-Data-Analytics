import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // default role
    secretKey: "", // only needed if admin
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";

      // Only include secretKey if role = admin
      const payload =
        data.role === "admin"
          ? data
          : {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
              role: data.role,
            };

      const { data: res } = await axios.post(url, payload);
      console.log(res.message);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />

            {/* Secret key input (only if admin selected) */}
            {data.role === "admin" && (
              <input
                type="password"
                placeholder="Enter Admin Secret Key"
                name="secretKey"
                onChange={handleChange}
                value={data.secretKey}
                required
                autoComplete="off"
                className={styles.input}
              />
            )}

            {error && <div className={styles.error_msg}>{error}</div>}

            {/* Role dropdown and Sign Up button side by side */}
            <div className={styles.form_footer}>
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                className={styles.role_dropdown}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit" className={styles.blue_btn}>
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
