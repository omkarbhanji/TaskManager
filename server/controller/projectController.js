const express = require("express");
const pool = require('../db');

exports.createProject = async(req, res) => {

    console.log("I am here with role: ", req.user.role);
    const data = req.body;
    const userId = req.user.id;

    

    try{

        const response = await pool.query(
      `insert into projects (name, description, created_by) values ('${data.name}', '${data.description}', '${userId}');`
    );

    console.log(response.rows);
    return res.status(201).json({ message: "Project created successfully" });


    }catch(err){
        return res.status(500).json({error: err.message});
    }
};

exports.getAllProjects = async(req, res) => {
    try{
        const response =  await pool.query(`select * from projects;`);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
};

exports.getProjectById = async(req, res) => {
    const projectId = parseInt(req.params.id);

  try {
     console.log("datatype is: ",typeof projectId);
    const projectRes = await pool.query(
      `SELECT * FROM projects WHERE id = $1`,
      [projectId]
    );

    if (projectRes.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasksRes = await pool.query(
      `SELECT * FROM tasks WHERE project_id = $1`,
      [projectId]
    );

    return res.status(200).json({
      project: projectRes.rows[0],
      tasks: tasksRes.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async(req, res) => {
 const projectId = req.params.id;
  const { name, description } = req.body;

  try {
    console.log("datatype is: ",typeof projectId);
    const existing = await pool.query(
      `SELECT * FROM projects WHERE id = ${projectId}`
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updated = await pool.query(
      `UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
      [name, description, projectId]
    );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updated.rows[0],
    });

  } catch (err) {
    console.error("Error updating project:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async(req, res) => {
    const projectId = req.params.id;

  try {

    const existing = await pool.query(
      `SELECT * FROM projects WHERE id = ${projectId}`
      
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }


    await pool.query(
      `DELETE FROM projects WHERE id = $1`,
      [projectId]
    );

    return res.status(200).json({
      message: `Project '${existing.rows[0].name}' deleted successfully.`
    });

  } catch (err) {
    console.error("Error deleting project:", err);
    return res.status(500).json({ error: err.message });
  }
};