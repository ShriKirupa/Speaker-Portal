let speakers = [
  {
    speakerId: "SPK-101",
    name: "Dr. Arun Kumar",
    designation: "Professor",
    organization: "IIT Madras",
    expertise: "Artificial Intelligence",
    email: "arun.kumar@example.com",
    phone: "9876543210"
  }
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method, query, body } = req;

  if (method === "GET") {
    if (query.id) {
      const speaker = speakers.find(s => s.speakerId === query.id);
      return speaker
        ? res.status(200).json(speaker)
        : res.status(404).json({ message: "Speaker not found" });
    }
    return res.status(200).json(speakers);
  }

  if (method === "POST") {
    speakers.push(body);
    return res.status(201).json({ message: "Speaker added" });
  }

  if (method === "PUT") {
    speakers = speakers.map(s =>
      s.speakerId === body.speakerId ? body : s
    );
    return res.status(200).json({ message: "Speaker updated" });
  }

  if (method === "DELETE") {
    speakers = speakers.filter(s => s.speakerId !== query.id);
    return res.status(200).json({ message: "Speaker deleted" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
