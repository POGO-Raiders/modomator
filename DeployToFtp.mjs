import { fileURLToPath } from "url";
import { dirname } from "path";
import FtpDeploy from "ftp-deploy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load local env file if dotenv is available (CI provides env vars directly).
try {
  const dotenv = await import("dotenv");
  dotenv.config({ path: ".env.production.local" });
} catch {
  // Ignore missing dotenv module in CI or minimal environments.
}

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.POGORAIDERS_FTP_USER,
  password: process.env.POGORAIDERS_FTP_PASSWORD,
  host: process.env.POGORAIDERS_FTP_HOST,
  port: process.env.POGORAIDERS_FTP_PORT,
  localRoot: __dirname + "/build",
  remoteRoot: process.env.POGORAIDERS_FTP_REMOTE_ROOT,
  include: ["*"],
  exclude: [],
  deleteRemote: true,
  forcePasv: false,
  sftp: true,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err));

ftpDeploy.on("log", (data) => console.log("[log]", data));
