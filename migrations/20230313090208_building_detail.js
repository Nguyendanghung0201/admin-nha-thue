
exports.up = function(knex) {
    return knex.schema.hasTable('building_detail').then(exists => {
        if (!exists) {
            return knex.schema.createTable('building_detail', table => {
                table.increments('id');
                table.integer('build_id').notNullable();
                table.string('room_id', 255).notNullable();
                table.text('type').notNullable();
                table.string('name', 255).nullable();
                table.string('position', 255).nullable();
                table.string('traffic', 255).nullable();
                table.text('data').nullable();
                table.integer('status', 11).notNullable().defaultTo(1);
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('building_detail');
};
