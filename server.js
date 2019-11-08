const express = require("express");
const server = express();
const db = require("./data/db-config");

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

module.exports = server;
