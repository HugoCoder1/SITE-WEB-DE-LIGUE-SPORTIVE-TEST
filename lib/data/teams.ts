export interface Team {
  id: string
  name: string
  city: string
  country: string
  logo: string
  primaryColor: string
  secondaryColor: string
  wins: number
  losses: number
  conference: "East" | "West"
}

export const teams: Team[] = [
  {
    id: "lagos-lions",
    name: "Lagos Lions",
    city: "Lagos",
    country: "Nigeria",
    logo: "/lagos-lions-basketball-logo.jpg",
    primaryColor: "#FF6B00",
    secondaryColor: "#1A1A1A",
    wins: 18,
    losses: 6,
    conference: "West",
  },
  {
    id: "cairo-pharaohs",
    name: "Cairo Pharaohs",
    city: "Cairo",
    country: "Egypt",
    logo: "/cairo-pharaohs-basketball-logo.jpg",
    primaryColor: "#FFD700",
    secondaryColor: "#000080",
    wins: 17,
    losses: 7,
    conference: "East",
  },
  {
    id: "johannesburg-thunder",
    name: "Johannesburg Thunder",
    city: "Johannesburg",
    country: "South Africa",
    logo: "/johannesburg-thunder-basketball-logo.jpg",
    primaryColor: "#00A651",
    secondaryColor: "#FFB81C",
    wins: 16,
    losses: 8,
    conference: "East",
  },
  {
    id: "nairobi-warriors",
    name: "Nairobi Warriors",
    city: "Nairobi",
    country: "Kenya",
    logo: "/nairobi-warriors-basketball-logo.jpg",
    primaryColor: "#DC143C",
    secondaryColor: "#006B3F",
    wins: 15,
    losses: 9,
    conference: "East",
  },
  {
    id: "accra-storm",
    name: "Accra Storm",
    city: "Accra",
    country: "Ghana",
    logo: "/accra-storm-basketball-logo.jpg",
    primaryColor: "#006B3F",
    secondaryColor: "#FCD116",
    wins: 14,
    losses: 10,
    conference: "West",
  },
  {
    id: "casablanca-eagles",
    name: "Casablanca Eagles",
    city: "Casablanca",
    country: "Morocco",
    logo: "/casablanca-eagles-basketball-logo.jpg",
    primaryColor: "#C1272D",
    secondaryColor: "#006233",
    wins: 12,
    losses: 12,
    conference: "West",
  },
  {
    id: "dakar-panthers",
    name: "Dakar Panthers",
    city: "Dakar",
    country: "Senegal",
    logo: "/dakar-panthers-basketball-logo.jpg",
    primaryColor: "#00853F",
    secondaryColor: "#FDEF42",
    wins: 10,
    losses: 14,
    conference: "West",
  },
  {
    id: "addis-kings",
    name: "Addis Kings",
    city: "Addis Ababa",
    country: "Ethiopia",
    logo: "/addis-kings-basketball-logo.jpg",
    primaryColor: "#078930",
    secondaryColor: "#FCDD09",
    wins: 8,
    losses: 16,
    conference: "East",
  },
]

export function getTeamById(id: string): Team | undefined {
  return teams.find((team) => team.id === id)
}

export function getTeamsByConference(conference: "East" | "West"): Team[] {
  return teams
    .filter((team) => team.conference === conference)
    .sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })
}
