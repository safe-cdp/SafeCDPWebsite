// Update with your config settings.

// module.exports = {
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './data/artfolio.sqlite3'
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: './data/migrations'
//     }
//   },
//   testing: {
//     client: 'sqlite3',
//     connection: {
//       filename: './data/test.db3'
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: './data/migrations'
//     }
//   }
// };

const localPg = {
  host: 'localhost',
  database: 'artfolio',
  user: 'jorge',
  pass: 'jorge'
};

const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/artfolio.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  },
  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  }
};
