import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import api, { initApi } from "../utils/api.js";

export default function Feed({ setScreen }) {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("");

  // Load feed once
  useEffect(() => {
    const loadFeed = async () => {
      try {
        await initApi();
        const res = await api.get("/posts/feed");
        setPosts(res.data.posts || []);
      } catch {
        setStatus("❌ Please login first");
      }
    };

    loadFeed();
  }, []);

  // 🔥 ASYNC ACTIONS (outside useInput)
  const likePost = async () => {
    try {
      await initApi();
      await api.post(`/posts/${posts[selected]._id}/like`);
      setStatus("❤️ Liked");
    } catch {
      setStatus("❌ Like failed");
    }
  };

  const commentPost = async () => {
    setStatus("💬 Comment feature coming next");
  };

  // 🔥 INPUT HANDLER (SYNC ONLY)
  useInput(
    (input, key) => {
      if (key.upArrow) {
        setSelected((i) => Math.max(i - 1, 0));
      }

      if (key.downArrow) {
        setSelected((i) => Math.min(i + 1, posts.length - 1));
      }

      if (input.toLowerCase() === "l") {
        likePost();
      }

      if (input.toLowerCase() === "c") {
        commentPost();
      }

      if (input.toLowerCase() === "u") {
        setScreen("upload");
      }

      if (input.toLowerCase() === "q") {
        process.exit(0);
      }
    },
    { isActive: true }
  );

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
          ❤️ {post.likes.length} · {post.author.username} —{" "}
          {post.caption || "No caption"}
        </Text>
      ))}

      {status && (
        <Text color="yellow" marginTop={1}>
          {status}
        </Text>
      )}
    </Box>
  );
}
