/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('khuyen_mai').then(exists => {
        if (!exists) {
            return knex.schema.createTable('khuyen_mai', table => {
                table.increments('id');
                table.integer('khuyen_id').nullable();
                table.integer('build_id').nullable();
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
    return knex.schema.dropTable('khuyen_mai');
};
