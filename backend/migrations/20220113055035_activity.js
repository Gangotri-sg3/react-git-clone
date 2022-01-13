exports.up = function(knex) {
    return knex.schema.createTable('activity', (table)=>{
        table.increments('id').primary();
       table.integer('issue_id').notNullable();
       table.integer('label_id').notNullable()
       table.timestamp('label_createdat').defaultTo(knex.fn.now());
       table.string('label_creator').notNullable();
       table.integer('assignee_id').notNullable()
       table.timestamp('assignee_createdat').defaultTo(knex.fn.now());
       table.string('assignee_creator').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("activity");
};