import React, { useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import fs from "fs";
import FormData from "form-data";
import api from "../utils/api.js";

export default function Upload({ setScreen }) {
  const [path, setPath] = useState("");
  const [caption, setCaption] = useState("");
  const [step, setStep] = useState(0);

  const submit = async () => {
  try {
    await initApi(); // 🔥 REQUIRED

    const form = new FormData();
    form.append("image", fs.createReadStream(path));
    form.append("caption", caption);

    await api.post("/posts", form, {
      headers: form.getHeaders()
    });

    setScreen("feed");
  } catch {
    setError("❌ Upload failed");
  }
};


  return (
    <Box flexDirection="column">
      <Text color="yellow">Upload Post</Text>

      {step === 0 && (
        <>
          <Text>Image path:</Text>
          <TextInput value={path} onChange={setPath} onSubmit={() => setStep(1)} />
        </>
      )}

      {step === 1 && (
        <>
          <Text>Caption:</Text>
          <TextInput value={caption} onChange={setCaption} onSubmit={submit} />
        </>
      )}
    </Box>
  );
}
