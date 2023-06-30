import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [roadmapItems, setRoadmapItems] = useState([]);

  useEffect(() => {
    fetch("/api/roadmap")
      .then((response) => response.json())
      .then((data) => setRoadmapItems(data));
  }, []);

  const handleUpvote = (id) => {
    fetch("/api/upvote", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedRoadmapItems = roadmapItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, upvotes: data.upvotes };
          }
          return item;
        });
        setRoadmapItems(updatedRoadmapItems);
      });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <div>
          {roadmapItems.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Upvotes: {item.upvotes}</p>
              <button
                className="upvote-button"
                onClick={() => handleUpvote(item.id)}
              >
                Upvote
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
