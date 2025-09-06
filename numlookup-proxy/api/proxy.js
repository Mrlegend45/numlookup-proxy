// File: api/proxy.js
export default async function handler(req, res) {
  const { num } = req.query;

  if (!num) {
    return res.status(400).json({ status: "error", message: "Missing 'num' parameter" });
  }

  try {
    // Target API
    const target = `https://numlooking.rf.gd/?num=${encodeURIComponent(num)}`;

    const response = await fetch(target);
    const data = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
