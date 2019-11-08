exports.seed = function(knex) {
  return knex("projects").insert([
    { project_name: "make small" },
    { project_name: "clean office" },
    { project_name: "make coffee" }
  ]);
};
