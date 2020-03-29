exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table)  {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('victim_id').notNullable();
        table.foreign('victim_id').references('id').inTable('victims');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};