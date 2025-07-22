'use client';

import { useState } from 'react';

export function ResolveButton({ incidentId }: { incidentId: number }) {
  const [loading, setLoading] = useState(false);

  const markAsResolved = async () => {
    setLoading(true);
    await fetch(`/api/incidents/${incidentId}/resolve`, { method: 'POST' });
    window.location.reload();
  };

  return (
    <button
      onClick={markAsResolved}
      disabled={loading}
      className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
    >
      {loading ? 'Marking...' : 'Mark as Resolved'}
    </button>
  );
}
 
