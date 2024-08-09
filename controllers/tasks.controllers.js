import { newConnection } from "../src/database.js";

export const getTasks = async (req, res) => {
  const connection = await newConnection();
  const result = await connection.query("SELECT * FROM tasks");

  if (result[0].length === 0) {
    res.status(404).json({ message: "No hay tareas encontradas" });
  } else {
    res.status(200).json({ message: "Tareas encontradas", tasks: result[0] });
  }
  connection.end();
};

export const getTask = async (req, res) => {
  const connection = await newConnection();
  const { id } = req.params;
  const [result] = await connection.query("SELECT * FROM tasks WHERE id = ?", [
    id,
  ]);

  if (result.length === 0) {
    res.status(404).json({ message: "Tarea no encontrada" });
  } else {
    res.status(200).json({ message: "Tarea encontrada", task: result[0] });
  }
  connection.end();
};

export const createTask = async (req, res) => {
  const connection = await newConnection();
  const { title, description, isComplete } = req.body;
  const [result] = await connection.query(
    "INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)",
    [title, description, isComplete]
  );

  if (result.affectedRows === 0) {
    res.status(500).json({ message: "No se pudo insertar la tarea" });
  } else {
    res.status(201).json({
      message: "Tarea insertada",
      id: result.insertId,
      title,
      description,
      isComplete,
    });
  }
  connection.end();
};

export const updateTask = async (req, res) => {
  const connection = await newConnection();
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  const [result] = await connection.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
    [title, description, id, isComplete]
  );
  if (result.affectedRows === 0) {
    res.status(500).json({ message: "No se pudo actualizar la tarea" });
  } else {
    res.status(200).json({
      message: "Tarea actualizada",
      id,
      title,
      description,
      isComplete,
    });
  }
  connection.end();
};

export const deleteTask = async (req, res) => {
  const connection = await newConnection();
  const { id } = req.params;
  const [result] = await connection.query("DELETE FROM tasks WHERE id = ?", [
    id,
  ]);

  if (result.affectedRows === 0) {
    res.status(500).json({ message: "No se pudo borrar la tarea" });
  } else {
    res.status(200).json({ message: "Tarea borrada", id });
  }

  connection.end();
};
