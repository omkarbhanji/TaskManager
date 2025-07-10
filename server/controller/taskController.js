const express = require("express");
const pool = require('../db');

exports.createTask  = async (req, res) => {
    const data = req.body;
    data.project_id = req.params.id;
   

    try{
        console.log("This is aprent id: ", data.parent_task_id);
        const response = await pool.query(`insert into tasks (project_id, title, description, assigned_to, estimated_time, parent_task_id) 
            values ($1, $2, $3, $4, $5, $6) RETURNING *`, [data.project_id, data.title, data.description, data.assigned_to, data.estimated_time, data.parent_task_id || null]);

            console.log(response);

            return res.status(201).json({message: 'Task added succesfully'});


    }catch(err){
      console.log(" i am in catch");
        return res.status(500).json({error: err.message});
    }
};

exports.getTaskById  = async (req, res) => {
    const task_id = req.params.id;

    try{

        const response = await pool.query(`select * from tasks where id = $1`, [task_id]);

        if (response.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

            console.log(response);

            return res.status(201).json({response});


    }catch(err){
        return res.status(500).json({error: err.message});
    }

};

exports.getAllTasks  = async (req, res) => {

    const project_id = req.params.id;

     try{

        const response = await pool.query(`select * from tasks where project_id = $1`, [project_id]);

            console.log(response);

            return res.status(201).json({response});


    }catch(err){
        return res.status(500).json({error: err.message});
    }


};

exports.updateTaskDetails  = async (req, res) => {

   const task_id = req.params.id;
  const {
    title,
    description,
    assigned_to,
    estimated_time,
    parent_task_id,
    is_completed
  } = req.body;

  try {
    const response = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         assigned_to = COALESCE($3, assigned_to),
         estimated_time = COALESCE($4, estimated_time),
         parent_task_id = COALESCE($5, parent_task_id),
         is_completed = COALESCE($6, is_completed)
       WHERE id = $7
       RETURNING *;`,
      [
        title,
        description,
        assigned_to,
        estimated_time,
        parent_task_id,
        is_completed,
        task_id
      ]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: response.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }

};

exports.deleteTask  = async (req, res) => {
const task_id = req.params.id;

  try {
    const response = await pool.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [task_id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      deletedTask: response.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.markTaskCompleted = async(req, res) => {
  const taskId = req.params.id;

  try {
    const taskRes = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [taskId]);
    if (taskRes.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = taskRes.rows[0];

    if (task.parent_task_id) {
      const parentRes = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [task.parent_task_id]);
      const parentTask = parentRes.rows[0];

      if (!parentTask.is_completed) {
        return res.status(400).json({ message: "Kindly complete the parent task first." });
      }
    }

    await pool.query(`UPDATE tasks SET is_completed = true WHERE id = $1`, [taskId]);
    res.status(200).json({ message: "Task marked as completed." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}