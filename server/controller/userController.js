const express = require("express");
// const pool = require('../db');

exports.registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  try {
    console.log("I am here");
    // const response = await pool.query(
    //   `insert into users (name, email, password, role) values ('${name}', '${email}', '${password}', '${role}');`
    // );
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.loginUser = async (req, res) => {};

exports.getProfile = async (req, res) => {};
