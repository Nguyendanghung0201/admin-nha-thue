
exports.up = function(knex) {
    return knex.schema.hasTable('city_code').then(exists => {
        if (!exists) {
            return knex.schema.createTable('city_code', table => {
                table.increments('id');
                table.string('code',255).notNullable();
                table.string('name',255).notNullable();
                table.integer('province_code',11).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('city_code');
};
