
exports.up = function (knex) {
    return knex.schema.hasTable('building').then(exists => {
        if (!exists) {
            return knex.schema.createTable('building', table => {
                table.increments('id');
                table.string('name', 255).notNullable();
                table.string('real_id', 255).notNullable();
                table.text('address').notNullable();
                table.string('line', 255).nullable();
                table.string('infor', 255).nullable();
                table.string('phone', 255).nullable();
                table.text('images').nullable();
                table.integer('province_id').nullable();
                table.integer('city_id').nullable();
                table.integer('town_id').nullable();
                table.text('data').nullable();
                table.text('pdf').nullable();
                table.text('room').nullable();
                table.integer('status', 11).notNullable().defaultTo(1);
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('building');
};
