exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      project_id: 1,
      task_description: "squish internal organs",
      table_notes: "yuh"
    },
    { project_id: 1, task_description: "squish stomach" },
    { project_id: 1, task_description: "equip hornace" },
    {
      project_id: 2,
      task_description: "add windex to water",
      table_notes: "clean"
    },
    { project_id: 2, task_description: "wipe the desk with the towels" },
    { project_id: 2, task_description: "celebrate" },
    { project_id: 3, task_description: "grind coffee", table_notes: "coffee" },
    { project_id: 3, task_description: "add water" },
    { project_id: 3, task_description: "bloom, brew, drink" }
  ]);
};
