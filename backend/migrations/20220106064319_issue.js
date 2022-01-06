
exports.up = function(knex) {
    return knex.schema.createTable('issue', (table)=>{
        table.increments('id').primary();
       table.string('title', 255).notNullable();
       table.string('description', 255).notNullable();
       table.string('creator_id', 255);
       table.string('comments', 255);
       table.integer('assignee_id' );
       table.integer('lable_id');
       table.boolean('is_open')
       table.timestamp('created_at').defaultTo(knex.fn.now());

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("issue");
  
};
