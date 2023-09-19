/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('khuyen').then(exists => {
        if (!exists) {
            return knex.schema.createTable('khuyen', table => {
                table.increments('id');
                table.text('content').nullable();
                table.integer('status', 11).notNullable().defaultTo(1);
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('khuyen');
};
