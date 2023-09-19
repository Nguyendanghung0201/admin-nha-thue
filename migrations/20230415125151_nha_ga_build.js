/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('nha_ga_build').then(exists => {
        if (!exists) {
            return knex.schema.createTable('nha_ga_build', table => {
                table.increments('id');
                table.integer('build_id', 11).notNullable();
                table.integer('nha_ga_id', 11).notNullable();
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
exports.down = function (knex) {
    return knex.schema.dropTable('nha_ga_build');
};
