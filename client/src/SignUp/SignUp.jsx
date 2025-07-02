import React, { useState } from "react";

import axios from "axios";

import styles from './Signup.module.css';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailid, setEmailid] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username + password + emailid + name + gender + contact);

    try{
    const response = await axios.post("http://localhost:5000/admin/register", {
      username: username,
      password: password,
      emailid: emailid,
      name: name,
      gender,
      gender,
      contact: contact,
    });

    console.log(response.status);
  }
  catch(err){
    console.log(err);
    setErrorMessage(err.response.data.message);
  }
  };

  return (
  
   <div>
    <h2>New User ? Register Now</h2>
  <form onSubmit={handleSubmit} className={styles.form}>
    <label htmlFor="username" className={styles.label}>Username: </label>
    <input
      className={styles.input}
      type="text"
      placeholder="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <label htmlFor="password" className={styles.label}>Password: </label>
    <input
      className={styles.input}
      type="text"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <label htmlFor="email" className={styles.label}>Email address: </label>
    <input
      className={styles.input}
      type="text"
      placeholder="email"
      value={emailid}
      onChange={(e) => setEmailid(e.target.value)}
    />

    <label htmlFor="name" className={styles.label}>Full Name: </label>
    <input
      className={styles.input}
      type="text"
      placeholder="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <label htmlFor="gender" className={styles.label}>Gender: </label>
    <select
      name="gender"
      id="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className={styles.select}
    >
      <option value="default">-- Select gender --</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Not to specify">Not to specify</option>
    </select>

    <label htmlFor="contactNumber" className={styles.label}>Contact Number: </label>
    <input
      className={styles.input}
      type="number"
      value={contact}
      placeholder="Contact No."
      onChange={(e) => setContact(e.target.value)}
    />

    <button
      type="submit"
      disabled={!username || !password || !emailid || !name || !gender || !contact}
      className={styles.button}
    >
      Sign Up
    </button>
  </form>

  {errorMessage && (
    <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
  )}
</div>


  );
};

export default SignUp;
