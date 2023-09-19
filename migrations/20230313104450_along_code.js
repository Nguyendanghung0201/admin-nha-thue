
exports.up = function (knex) {
    return knex.schema.hasTable('along_code').then(exists => {
        if (!exists) {
            return knex.schema.createTable('along_code', table => {
                table.increments('id');
                table.string('AlongCode', 255).notNullable();
                table.string('AlongName', 255).notNullable();
                table.string('AlongNo', 255).notNullable();
                table.string('AlongShortName', 255).notNullable();
                table.integer('province_id', 11).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('along_code');
};
