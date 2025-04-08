// deploy.js
import ftp from 'basic-ftp';
import dotenv from 'dotenv';

dotenv.config();

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    });

    // Hochladen des gesamten dist-Ordners ins ROOT-Verzeichnis
    await client.uploadFromDir("dist/", "/");
    console.log("✅ Upload erfolgreich!");
  } catch (err) {
    console.error("❌ Fehler:", err);
  } finally {
    client.close();
  }
}

deploy();