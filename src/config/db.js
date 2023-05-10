import Pool from 'pg-pool';

export const pool = new Pool({
    user: "blacklist",
    database: "poc_blacklist",
    password: "blacklist",
    port: 5432,
    host: "localhost",
  });
