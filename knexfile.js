// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'nha_thue',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'nha_thue',
      user:     'root',
      password: '123123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'nha_thue',
      user:     'root',
      password: '123123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      
    }
  }

};
