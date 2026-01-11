let speakers = [
  {
    "speakerId": "SPK-101",
    "name": "Dr. Arun Kumar",
    "designation": "Professor",
    "organization": "IIT Madras",
    "expertise": "Artificial Intelligence",
    "email": "arun.kumar@iitm.ac.in",
    "phone": "9876543210"
  },
  {
    "speakerId": "SPK-102",
    "name": "Dr. Meena Subramanian",
    "designation": "Associate Professor",
    "organization": "Anna University",
    "expertise": "Data Science",
    "email": "meena.sub@annauniv.edu",
    "phone": "9876543211"
  },
  {
    "speakerId": "SPK-103",
    "name": "Mr. Raghav Iyer",
    "designation": "Senior Software Engineer",
    "organization": "Google India",
    "expertise": "Cloud Computing",
    "email": "raghav.iyer@gmail.com",
    "phone": "9876543212"
  },
  {
    "speakerId": "SPK-104",
    "name": "Ms. Priya Sharma",
    "designation": "Data Analyst",
    "organization": "Infosys",
    "expertise": "Business Analytics",
    "email": "priya.sharma@infosys.com",
    "phone": "9876543213"
  },
  {
    "speakerId": "SPK-105",
    "name": "Dr. Suresh Balaji",
    "designation": "Professor",
    "organization": "NIT Trichy",
    "expertise": "Computer Networks",
    "email": "suresh.balaji@nitt.edu",
    "phone": "9876543214"
  }
  // remaining speakers unchanged
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method, query, body } = req;

  // ✅ FIXED GET (ALWAYS RETURNS ARRAY)
  if (method === "GET") {
    if (query.id) {
      const result = speakers.filter(
        s => s.speakerId === query.id
      );
      return res.status(200).json(result); // ← ARRAY
    }
    return res.status(200).json(speakers); // ← ARRAY
  }

  // POST (unchanged)
  if (method === "POST") {
    speakers.push(body);
    return res.status(201).json({ message: "Speaker added" });
  }

  // PUT (unchanged)
  if (method === "PUT") {
    speakers = speakers.map(s =>
      s.speakerId === body.speakerId ? body : s
    );
    return res.status(200).json({ message: "Speaker updated" });
  }

  // DELETE (unchanged)
  if (method === "DELETE") {
    speakers = speakers.filter(
      s => s.speakerId !== query.id
    );
    return res.status(200).json({ message: "Speaker deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
