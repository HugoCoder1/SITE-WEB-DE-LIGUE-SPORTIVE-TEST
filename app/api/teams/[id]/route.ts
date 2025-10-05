import { NextResponse } from "next/server";
import { getTeamById } from "@/lib/data/teams";
import { getPlayersByTeam } from "@/lib/data/players";
import { matches } from "@/lib/data/matches";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const team = getTeamById(params.id);
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const roster = getPlayersByTeam(team.id);
  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  return NextResponse.json({ team, roster, matches: teamMatches });
}
