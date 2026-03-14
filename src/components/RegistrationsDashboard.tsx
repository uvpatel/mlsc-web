"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function RegistrationsDashboard({ slug }: { slug: string }) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await axios.get(`/api/events/${slug}/registrations`);
        setRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error("Failed to fetch registrations", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRegistrations();
  }, [slug]);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Name", "Email", "Year", "Mobile No", "ID No", "Department", "GitHub"];
    csvRows.push(headers.join(","));

    for (const reg of registrations) {
      if (!reg.userId) continue;
      const u = reg.userId;
      const values = [u.username, u.email, u.year, u.mobileno, u.idno, u.department, u.github || ""];
      // handle commas in data
      const escapedValues = values.map((v) => `"${String(v).replace(/"/g, '""')}"`);
      csvRows.push(escapedValues.join(","));
    }

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Event Registrations</h2>
        <button
          onClick={exportToCSV}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Export to CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 shadow-sm dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">ID No</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  No registrations found for this event.
                </td>
              </tr>
            )}
            {registrations.map((reg, idx) => (
              <tr key={reg._id} className="border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                <td className="px-4 py-3">{reg.userId?.username}</td>
                <td className="px-4 py-3">{reg.userId?.email}</td>
                <td className="px-4 py-3">{reg.userId?.year}</td>
                <td className="px-4 py-3">{reg.userId?.mobileno}</td>
                <td className="px-4 py-3">{reg.userId?.idno}</td>
                <td className="px-4 py-3">{reg.userId?.department}</td>
                <td className="px-4 py-3 capitalize">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
