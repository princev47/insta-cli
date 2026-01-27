import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import Feed from "./Feed.jsx";
import Upload from "./Upload.jsx";
import { initApi } from "../utils/api.js";

export default function App() {
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState("feed");

  useEffect(() => {
    // 🔥 ENSURE TOKEN IS LOADED BEFORE UI RENDERS
    initApi().then(() => setReady(true));
  }, []);

  if (!ready) {
    return <Text color="yellow">Loading InstaCLI…</Text>;
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyanBright">🚀 InstaCLI</Text>
      <Text dimColor>↑↓ navigate · L like · C comment · U upload · Q quit</Text>

      {screen === "feed" && <Feed setScreen={setScreen} />}
      {screen === "upload" && <Upload setScreen={setScreen} />}
    </Box>
  );
}
