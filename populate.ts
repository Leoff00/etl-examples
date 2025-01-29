import { Pool } from "pg";

const pool = new Pool({
  user: "test_user",
  host: "localhost",
  database: "etldb",
  password: "test_password",
  port: 5432,
});

async function populateDB() {
  const client = await pool.connect();
  try {
    for (let i = 0; i < 10; i++) {
      const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`;
      const values = ["John Doe", `john${crypto.randomUUID()}@example.com`];
      const res = await client.query(query, values);
      console.log(`Usuário inserido com ID: ${res.rows[0].id}`);
    }
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
  } finally {
    client.release();
  }
}

populateDB();
