"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

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

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [incidentType, setIncidentType] = useState("All");
  const [cameraFilter, setCameraFilter] = useState("All");

  useEffect(() => {
    const fetchIncidents = () => {
      fetch("/api/incidents?resolved=false")
        .then((res) => res.json())
        .then((data) => {
          setIncidents(data);
          setLoading(false);
        });
    };

    fetchIncidents(); // Initial load
    const interval = setInterval(fetchIncidents, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const resolveIncident = async (id: number) => {
    await fetch(`/api/incidents/${id}`, { method: "PATCH" });
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    toast.success("Incident marked as resolved");
  };

  const filteredIncidents = incidents
    .filter((i) => incidentType === "All" || i.type === incidentType)
    .filter((i) => cameraFilter === "All" || i.camera.name === cameraFilter);

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />

      <nav className="bg-gray-900 text-white p-4 text-xl font-semibold shadow">
        SecureSight Dashboard
      </nav>

      <main className="flex flex-1">
        {/* Left Side - Video/Thumbnail */}
        <div className="w-2/3 p-4 border-r">
          <div className="bg-black h-[360px] mb-4 flex items-center justify-center text-white">
            {selectedIncident ? (
              <Image
                src={selectedIncident.thumbnailUrl}
                alt="Selected Incident"
                width={640}
                height={360}
                className="object-cover w-full h-full"
              />
            ) : (
              <div>Incident Video Player (Static Image)</div>
            )}
          </div>

          <div className="flex gap-2">
            <Image src="/thumbnails/thumb1.jpg" alt="Thumb 1" width={100} height={60} />
            <Image src="/thumbnails/thumb2.jpg" alt="Thumb 2" width={100} height={60} />
          </div>
        </div>

        {/* Right Side - Incidents */}
        <div className="w-1/3 p-4">
          <div className="font-semibold text-lg mb-2">Unresolved Incidents</div>

          {/* Filters */}
          <div className="flex gap-2 mb-2">
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="All">All Types</option>
              <option value="Fire">Fire</option>
              <option value="Intrusion">Intrusion</option>
            </select>

            <select
              value={cameraFilter}
              onChange={(e) => setCameraFilter(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="All">All Cameras</option>
              {[...new Set(incidents.map((i) => i.camera.name))].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : filteredIncidents.length === 0 ? (
            <div>No unresolved incidents.</div>
          ) : (
            filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="border p-2 mb-2 rounded shadow cursor-pointer"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="font-semibold">{incident.type}</div>
                <div className="text-sm text-gray-500">
                  {incident.camera.name} — {new Date(incident.tsStart).toLocaleString()}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resolveIncident(incident.id);
                  }}
                  className="mt-2 text-sm bg-green-600 text-white px-2 py-1 rounded"
                >
                  Mark as Resolved
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
