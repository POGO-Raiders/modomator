import { fileURLToPath } from "url";
import { dirname } from "path";
import SftpClient from "ssh2-sftp-client";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load local env file if dotenv is available (CI provides env vars directly).
try {
  const dotenv = await import("dotenv");
  dotenv.config({ path: ".env.production.local" });
} catch {
  // Ignore missing dotenv module in CI or minimal environments.
}

const localRoot = `${__dirname}/build`;
const remoteRoot = process.env.POGORAIDERS_FTP_REMOTE_ROOT;
const client = new SftpClient();

try {
  await client.connect({
    host: process.env.POGORAIDERS_FTP_HOST,
    port: Number(process.env.POGORAIDERS_FTP_PORT),
    username: process.env.POGORAIDERS_FTP_USER,
    password: process.env.POGORAIDERS_FTP_PASSWORD,
  });
  console.log("[log] Connected to:", process.env.POGORAIDERS_FTP_HOST);

  if (remoteRoot && (await client.exists(remoteRoot))) {
    await client.rmdir(remoteRoot, true);
    console.log("[log] Deleted directory:", remoteRoot);
  }

  const uploaded = await client.uploadDir(localRoot, remoteRoot);
  console.log("finished:", uploaded);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
