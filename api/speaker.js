import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "speakers.json");

function readSpeakers() {
  const fileData = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(fileData);
}

function writeSpeakers(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  let speakers = readSpeakers();

  // GET speaker(s)
  if (req.method === "GET") {
    if (req.query.id) {
      const speaker = speakers.find(
        s => s.speakerId === req.query.id
      );
      return speaker
        ? res.status(200).json(speaker)
        : res.status(404).json({ message: "Speaker not found" });
    }
    return res.status(200).json(speakers);
  }

  // ADD speaker
  if (req.method === "POST") {
    const newSpeaker = req.body;

    if (!newSpeaker || !newSpeaker.speakerId) {
      return res.status(400).json({ message: "Invalid speaker data" });
    }

    speakers.push(newSpeaker);
    writeSpeakers(speakers);

    return res.status(201).json({ message: "Speaker added successfully" });
  }

  // DELETE speaker
  if (req.method === "DELETE") {
    speakers = speakers.filter(
      s => s.speakerId !== req.query.id
    );
    writeSpeakers(speakers);

    return res.status(200).json({ message: "Speaker deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
