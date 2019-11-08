exports.up = function(knex) {
  return knex.schema.createTable("shared", table => {
    table.increments();
    table
      .integer("project_id", 64)
      .unsigned()
      .references("id")
      .inTable("projects")
      .notNullable();

    table
      .integer("resource_id", 64)
      .unsigned()
      .references("id")
      .inTable("resources")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shared");
};
