import fs from 'fs';
import path from 'path';
import pool from '.';

async function createTables() {
  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema SQL commands
    await pool.query(schema);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error);
  } finally {
    await pool.end();
  }
}

createTables();
