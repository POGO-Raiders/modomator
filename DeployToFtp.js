// import our environment variables
require("dotenv").config({ path: ".env.production.local" });

const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.POGORAIDERS_FTP_USER,
    // Password optional, prompted if none given
    password: process.env.POGORAIDERS_FTP_PASSWORD,
    host: process.env.POGORAIDERS_FTP_HOST,
    port: process.env.POGORAIDERS_FTP_PORT,
    localRoot: __dirname + "/build",
    remoteRoot: process.env.POGORAIDERS_FTP_REMOTE_ROOT,
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: [],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: false,
    // use sftp or ftp
    sftp: true,
};

ftpDeploy
    .deploy(config)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));

ftpDeploy.on("log", data => console.log("[log]", data));