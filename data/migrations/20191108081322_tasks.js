exports.up = function(knex) {
  return knex.schema.createTable("tasks", table => {
    table.increments();
    table.string("task_description", 255).notNullable();
    table.string("task_notes", 255);
    table
      .boolean("task_completed")
      .defaultTo(false)
      .notNullable();

    table
      .integer("project_id", 64)
      .unsigned()
      .references("id")
      .inTable("projects")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks");
};
