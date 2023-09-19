
exports.up = function (knex) {
    return knex.schema.hasTable('company').then(exists => {
        if (!exists) {
            return knex.schema.createTable('company', table => {
                table.increments('id');
                table.string('company_id', 255).notNullable();
                table.string('short_name', 255).notNullable();
                table.string('province_code', 255).notNullable();
                table.string('name', 255).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('company');
};
