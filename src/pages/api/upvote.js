import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    const db = await open({
      filename: "./roadmap.db",
      driver: sqlite3.Database,
    });

    const statement = await db.prepare(
      "UPDATE roadmap SET upvotes = upvotes + 1 WHERE id = ?"
    );
    await statement.run(id);
    await statement.finalize();

    const updatedItem = await db.get("SELECT * FROM roadmap WHERE id = ?", id);

    res.status(200).json({ id: updatedItem.id, upvotes: updatedItem.upvotes });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
