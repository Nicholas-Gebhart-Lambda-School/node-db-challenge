exports.up = function(knex) {
  return knex.schema.createTable("projects", table => {
    table.increments();
    table.string("project_name", 255).notNullable();
    table.string("project_description", 255);
    table
      .boolean("project_completed")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
