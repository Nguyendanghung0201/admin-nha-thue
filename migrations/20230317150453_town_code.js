
exports.up = function (knex) {
    return knex.schema.hasTable('town_code').then(exists => {
        if (!exists) {
            return knex.schema.createTable('town_code', table => {
                table.increments('id');
                table.string('code', 255).notNullable();
                table.string('name', 255).notNullable();
                table.integer('city_code', 11).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('town_code');
};
