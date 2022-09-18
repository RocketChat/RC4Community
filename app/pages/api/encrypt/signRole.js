import crypto from "crypto-js";

export default function handler(req, res) {
  if (req.method === "POST") {
    const encrypted = crypto.AES.encrypt(req.body, process.env.EVENT_USER_PASSPHRASE);
    res.status(200).json({ hash: encrypted.toString() });
  } else {
    res.status(400).json({ error: "Unsupported Route Method" });
  }
}
