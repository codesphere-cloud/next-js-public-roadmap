import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const db = await open({
      filename: "./roadmap.db",
      driver: sqlite3.Database,
    });

    const roadmapItems = await db.all("SELECT * FROM roadmap");

    res.status(200).json(roadmapItems);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

CREATE TABLE IF NOT EXISTS roadmap (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL
);
