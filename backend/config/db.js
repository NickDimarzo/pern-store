import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import pkg from 'pg';

dotenv.config();

// WITH NEON
// const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// creates a SQL connection using our environment variables
// export const sql = neon(
//   `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
// );

// this is a sql function we export that is used as a tagged template literal, 
// which allows us to write SQL queries safely


// for local connection
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const sql = (text, params) => pool.query(text, params);
