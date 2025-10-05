"use client";

import React from "react";
import { matches } from "@/lib/data/matches";
import { getTeamById } from "@/lib/data/teams";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function TeamRecentScoresChart({ teamId }: { teamId: string }) {
  const team = getTeamById(teamId);
  if (!team) return null;

  const teamMatches = matches
    .filter((m) => m.homeTeamId === team.id || m.awayTeamId === team.id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-6); // last 6 games

  const data = teamMatches.map((m) => {
    const isHome = m.homeTeamId === team.id;
    const teamScore = isHome ? m.homeScore : m.awayScore;
    return {
      date: new Date(m.date).toLocaleDateString(),
      score: typeof teamScore === "number" ? teamScore : 0,
      status: m.status,
    };
  });

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
          <XAxis dataKey="date" hide={false} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} domain={[0, "auto"]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(val: any) => [val, "Score"]} />
          <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
