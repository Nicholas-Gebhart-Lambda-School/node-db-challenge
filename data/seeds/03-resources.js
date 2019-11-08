exports.seed = function(knex) {
  return knex("resources").insert([
    { resource_name: "coffee" },
    { resource_name: "water" },
    { resource_name: "tha hornace of death" },
    { resource_name: "windex" },
    { resource_name: "paper towels" }
  ]);
};
