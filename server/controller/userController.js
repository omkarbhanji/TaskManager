const express = require("express");
const pool = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'HELLO THIS IS A SECRET';

exports.registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  try {
    const response = await pool.query(
      `insert into users (name, email, password, role) values ('${name}', '${email}', '${password}', '${role}');`
    );
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try{

    console.log("I am here");
      const response = await pool.query(`select * from users where email = $1`, [email]);

      console.log(response.rows);

      if(response.rowCount === 0){
        res.status(400).json({message: 'user not found !'});
      }

      if(response.rows[0].password != password){
        return res.status(401).json({message: "Invalid credentials, password didnt match"});
      }

      if(response.rows[0].password == password){
        
        const token = jwt.sign({
            id: response.rows[0].id,
            email: response.rows[0].email,
            role: response.rows[0].role
        }, JWT_SECRET);

       return res.status(200).json({token});
      }
      // res.status(200).json({response});
  }catch(err){
return res.status(500).json({message: 'Internal Server error', error: err.message});
  }

};

exports.getProfile = async (req, res) => {
  
};
