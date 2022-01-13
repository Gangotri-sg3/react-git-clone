
exports.up = function(knex) {
    return knex.schema.createTable('labels', (table)=>{
        table.increments('id').primary();
       table.string('label_name', 255).notNullable();
       table.string('description', 255);
       table.string('color', 255);
       table.string('font_color', 255);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('labels')
};