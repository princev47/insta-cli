import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import api, { initApi } from "../utils/api.js";



export default function Feed({ setScreen }) {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
  const loadFeed = async () => {
    await initApi();                 // 🔥 ENSURE TOKEN
    const res = await api.get("/posts/feed");
    setPosts(res.data.posts);
  };

  loadFeed();
}, []);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected(i => Math.max(i - 1, 0));
    }

    if (key.downArrow) {
      setSelected(i => Math.min(i + 1, posts.length - 1));
    }

    if (input.toLowerCase() === "l") {
      api.post(`/posts/${posts[selected]._id}/like`);
    }

    if (input.toLowerCase() === "u") {
      setScreen("upload");
    }

    if (input.toLowerCase() === "q") {
      process.exit(0);
    }
  });

  if (!posts.length) {
    return <Text>No posts yet</Text>;
  }

  return (
    <Box flexDirection="column" marginTop={1}>
      {posts.map((post, index) => (
        <Text
          key={post._id}
          color={index === selected ? "cyan" : "white"}
        >
          {index === selected ? "▶ " : "  "}
          ❤️ {post.likes.length} · {post.author.username} — {post.caption || "No caption"}
        </Text>
      ))}
    </Box>
  );
}
