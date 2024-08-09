import express from "express"
import { taskRouter } from "../routes/tasks.routes.js"
const app = express();
app.use("/tasks", taskRouter);
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("servidor corriendo en el puerto 3000");
});
