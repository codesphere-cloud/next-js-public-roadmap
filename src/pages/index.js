import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [shippedItems, setShippedItems] = useState([]);

  // Fetch roadmap items
  useEffect(() => {
    fetch("/api/roadmap")
      .then((response) => response.json())
      .then((data) => setRoadmapItems(data.roadmapItems));
  }, []);
  // Fetch recently shipped items
  useEffect(() => {
    fetch("/api/roadmap")
      .then((response) => response.json())
      .then((data) => setShippedItems(data.shippedItems));
  }, []);

  const handleUpvote = (id, column, clicked_id) => {
    fetch("/api/upvote", {
      method: "POST",
      body: JSON.stringify({ 'id': id , 'column': column}),
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // handle voting for roadmap items
        const updatedRoadmapItems = roadmapItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, upvotes: data.upvotes, fires: data.fires, hearts: data.hearts};
          }
          return item;
        });
        setRoadmapItems(updatedRoadmapItems);
        // handle voting for shipped items
        const updatedShippedItems = shippedItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, upvotes: data.upvotes, fires: data.fires, hearts: data.hearts};
          }
          return item;
        });
        setShippedItems(updatedShippedItems);        
        document.getElementById(clicked_id).disabled = true;
      });
  };

  return (
    <>
      <Head>
        <title>Codesphere Roadmap</title>
        
      </Head>
      <main>
        <div class="roadmap">
        <div class="header">
              <img class="logo"  src="/logo-codesphere.png" alt="Company Logo"></img>
              <div>
                <div class="headline">Codesphere Roadmap</div>
                <div class="subheadline">See what's happening & what's next</div>
              </div>
        </div> 
        <h2>Cooming soon</h2>       
        <div>
          {roadmapItems.map((item) => (
            <div key={item.id} class="feature">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div class="voting-array">
                <button
                  id={"upvote_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'upvotes', 'upvote_'+item.id)}
                >
                  👍 {item.upvotes}
                </button>
                <button
                  id={"fire_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'fires', 'fire_'+item.id)}
                >
                  🔥 {item.fires}
                </button>
                <button
                  id={"heart_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'hearts', 'heart_'+item.id)}
                >
                  💜 {item.hearts}
                </button>
              </div>
            </div>
          ))}
        </div>
        <h2>Recently released</h2>  

        <div>
          {shippedItems.map((item) => (
            <div key={item.id} class="feature">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div class="voting-array">
                <button
                  id={"upvote_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'upvotes', 'upvote_'+item.id)}
                >
                  👍 {item.upvotes}
                </button>
                <button
                  id={"fire_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'fires', 'fire_'+item.id)}
                >
                  🔥 {item.fires}
                </button>
                <button
                  id={"heart_"+item.id}
                  className="upvote-button"
                  onClick={() => handleUpvote(item.id, 'hearts', 'heart_'+item.id)}
                >
                  💜 {item.hearts}
                </button>
              </div>
            </div>
          ))}
        </div>

        </div>
      </main>
    </>
  );
}
