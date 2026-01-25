import fs from "fs-extra";
import os from "os";
import path from "path";

const TOKEN_PATH = path.join(os.homedir(), ".insta-cli.json");

export const saveToken = async (token) => {
  await fs.writeJson(TOKEN_PATH, { token });
};

export const getToken = async () => {
  if (!(await fs.pathExists(TOKEN_PATH))) return null;
  const data = await fs.readJson(TOKEN_PATH);
  return data.token;
};

export const logout = async () => {
  if (await fs.pathExists(TOKEN_PATH)) {
    await fs.remove(TOKEN_PATH);
  }
};
