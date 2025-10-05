export interface Match {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number | null
  awayScore: number | null
  date: string
  time: string
  venue: string
  status: "scheduled" | "live" | "finished"
}

export const matches: Match[] = [
  {
    id: "match-1",
    homeTeamId: "lagos-lions",
    awayTeamId: "cairo-pharaohs",
    homeScore: 98,
    awayScore: 92,
    date: "2025-10-01",
    time: "19:00",
    venue: "Teslim Balogun Stadium",
    status: "finished",
  },
  {
    id: "match-2",
    homeTeamId: "johannesburg-thunder",
    awayTeamId: "nairobi-warriors",
    homeScore: 105,
    awayScore: 101,
    date: "2025-10-01",
    time: "20:00",
    venue: "Ellis Park Arena",
    status: "finished",
  },
  {
    id: "match-3",
    homeTeamId: "accra-storm",
    awayTeamId: "casablanca-eagles",
    homeScore: 88,
    awayScore: 95,
    date: "2025-10-02",
    time: "18:30",
    venue: "Accra Sports Stadium",
    status: "finished",
  },
  {
    id: "match-4",
    homeTeamId: "dakar-panthers",
    awayTeamId: "addis-kings",
    homeScore: 76,
    awayScore: 82,
    date: "2025-10-02",
    time: "19:30",
    venue: "Dakar Arena",
    status: "finished",
  },
  {
    id: "match-5",
    homeTeamId: "cairo-pharaohs",
    awayTeamId: "johannesburg-thunder",
    homeScore: null,
    awayScore: null,
    date: "2025-10-05",
    time: "20:00",
    venue: "Cairo Stadium",
    status: "scheduled",
  },
  {
    id: "match-6",
    homeTeamId: "nairobi-warriors",
    awayTeamId: "lagos-lions",
    homeScore: null,
    awayScore: null,
    date: "2025-10-05",
    time: "19:00",
    venue: "Nyayo National Stadium",
    status: "scheduled",
  },
  {
    id: "match-7",
    homeTeamId: "casablanca-eagles",
    awayTeamId: "dakar-panthers",
    homeScore: null,
    awayScore: null,
    date: "2025-10-06",
    time: "18:00",
    venue: "Complexe Sportif Mohammed V",
    status: "scheduled",
  },
  {
    id: "match-8",
    homeTeamId: "addis-kings",
    awayTeamId: "accra-storm",
    homeScore: null,
    awayScore: null,
    date: "2025-10-06",
    time: "17:00",
    venue: "Addis Ababa Stadium",
    status: "scheduled",
  },
]

export function getRecentMatches(limit = 4): Match[] {
  return matches
    .filter((match) => match.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getUpcomingMatches(limit = 4): Match[] {
  return matches
    .filter((match) => match.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit)
}

export function getMatchById(id: string): Match | undefined {
  return matches.find((match) => match.id === id)
}
