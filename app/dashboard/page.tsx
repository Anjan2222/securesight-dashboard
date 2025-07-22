"use client";

import { useEffect, useState } from "react";

type Incident = {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  camera: {
    name: string;
    location: string;
  };
  resolved: boolean;
};

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((data) => setIncidents(data));
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <h2>Incidents</h2>
      <ul>
        {incidents.map((i) => (
          <li key={i.id}>
            {i.type} ({i.camera.name}) — {new Date(i.tsStart).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
