import { Pool } from "pg";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { User } from "./type";

const pool = new Pool({
  user: "test_user",
  host: "localhost",
  database: "etldb",
  password: "test_password",
  port: 5432,
});

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

const BUCKET_NAME = "etl-test-bucket";
const FILE_NAME = `users_1.json`;

async function fetchUsers() {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM users ORDER BY created_at DESC`;
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  } finally {
    client.release();
  }
}

async function transformAndUploadToS3(data: any) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);
    const params = {
      Bucket: BUCKET_NAME,
      Key: FILE_NAME,
      Body: jsonData,
      ContentType: "application/json",
    };

    await s3Client.send(new PutObjectCommand(params));
    console.log(
      `Arquivo enviado com sucesso: s3://${BUCKET_NAME}/${FILE_NAME}`
    );
  } catch (error) {
    console.error("Erro ao enviar para o S3:", error);
  }
}

async function exportData() {
  console.log("Buscando usuários do banco de dados...");
  const users = await fetchUsers();

  if (users.length === 0) {
    console.log("Nenhum usuário encontrado.");
    return;
  }

  console.log(
    `Foram encontrados ${users.length} usuários. Enviando para o S3...`
  );
  await uploadToS3(users);
}

exportData();
