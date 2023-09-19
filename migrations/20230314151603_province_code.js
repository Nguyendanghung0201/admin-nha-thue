
exports.up = function(knex) {
    return knex.schema.hasTable('province_code').then(exists => {
        if (!exists) {
            return knex.schema.createTable('province_code', table => {
                table.increments('id');
                table.string('code',255).notNullable();
                table.string('name',255).notNullable();
                table.string('area',255).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('province_code');
};


