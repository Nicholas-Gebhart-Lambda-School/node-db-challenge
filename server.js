const express = require("express");
const server = express();
const db = require("./data/db-config");
const bool = require("./utils");
const { checkProjects, checkTasks } = bool;

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h3>Hello World</h3>`);
});

server.get("/api/resources", (req, res) => {
  db("resources").then(resources => {
    res.status(200).json(resources);
  });
});

server.post("/api/resources", (req, res) => {
  const { resource_name, resource_description } = req.body;
  if (!resource_name) {
    res.status(404).json({ err: "resource_name field is required" });
  }
  db("resources")
    .insert({
      resource_name: resource_name,
      resource_description: resource_description
    })
    .then(id => {
      res.status(200).json(id);
    });
});

server.get("/api/projects", (req, res) => {
  db("projects").then(projects => {
    res.status(200).json(checkProjects(projects));
  });
});

server.post("/api/projects", (req, res) => {
  const { project_name, project_description } = req.body;
  if (!project_name) {
    res.status(404).json({ err: "project_name field is required" });
  }
  db("projects")
    .insert({ project_name, project_description })
    .then(id => {
      res.status(200).json({ message: "success!", id: id[0] });
    });
});

server.get("/api/tasks", (req, res) => {
  db.select(
    "p.project_name",
    "t.task_description",
    "p.project_description",
    "t.task_completed",
    "p.project_completed"
  )
    .from("projects as p")
    .join("tasks as t", "t.project_id", "p.id")
    .then(task => {
      res.status(200).json(checkProjects(checkTasks(task)));
    });
});

server.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.select(
    "p.project_name",
    "t.task_description",
    "p.project_description",
    "t.task_completed",
    "p.project_completed"
  )
    .from("projects as p")
    .join("tasks as t", "t.project_id", "p.id")
    .where({ "t.project_id": id })
    .then(task => {
      res.status(200).json(checkProjects(checkTasks(task)));
    });
});

// tasks: descriptiion! notes, completed
// projects: name!, description, completed

server.post("/api/tasks", (req, res) => {
  const {
    project_name,
    project_description,
    project_completed,
    project_id
  } = req.body;
  const { task_description, task_notes, task_completed } = req.body;
  const newProject = {
    project_name,
    project_description,
    project_completed
  };
  const newTask = { task_description, task_notes, task_completed, project_id };
  if (!project_name || !task_description) {
    res
      .status(404)
      .json({ err: "you must provide a project name and task description" });
  }
  db("projects")
    .insert(newProject)
    .then(() => {
      db("tasks")
        .insert(newTask)
        .then(say => say);
    })
    .then(() => {
      const result = { ...newTask, ...newProject };
      res.status(200).json({ ...result });
    });
});

// stretch
server.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(project => {
      res.status(200).json(project);
    });
});

server.put("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const { project_name, project_description } = req.body;
  db("projects")
    .where({ id })
    .update({ project_name, project_description })
    .then(id => {
      res.status(200).json(id);
    });
});

server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .del()
    .where({ id })
    .then(bool => {
      res
        .status(200)
        .json(!!Number(bool) ? { message: "deleted" } : { message: "error" });
    });
});

server.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { task_completed } = req.body;
  db("tasks")
    .where({ id })
    .first()
    .update({ task_completed })
    .then(id => {
      res.status(200).json(id);
    });
});

module.exports = server;
