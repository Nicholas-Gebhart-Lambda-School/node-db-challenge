exports.up = function(knex) {
  return knex.schema.createTable("resources", table => {
    table.increments();
    table.string("resource_name", 255).notNullable();
    table.string("resource_description", 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("resources");
};
