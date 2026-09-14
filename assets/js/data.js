// ==========================================================================
// DATA.JS: Historical Top 5 Premier League Goalscorers (1992–2026)
// --------------------------------------------------------------------------
// This file acts as our game's central database.
// It stores all 34 Premier League seasons inside an Array of Objects.
//
// Key Rules for the Team to Understand:
//   1. Exactly 5 Cards: Every single season has exactly 5 slots in `topScorers`.
//   2. Positions 1 to 4: Players tied in these spots each get their OWN distinct card.
//   3. Card #5 Ties: Only when players tie for the final 5th spot do we set:
//        - `isTied: true`
//        - A combined `club` hint (e.g., "Nottingham Forest / Chelsea")
//        - A `tiedOptions` array listing the eligible players.
//      When a user guesses ANY of those options, that player claims the card!
//   4. `aliases`: Surnames or common nicknames so the user doesn't have to type
//      the full name perfectly (e.g., "rvp", "auba", "mo salah").
// ==========================================================================

const seasonsData = [
  {
    season: "2025-26",
    topScorers: [
      { rank: 1, name: "Erling Haaland", club: "Manchester City", goals: 27, aliases: ["haaland"] },
      { rank: 2, name: "Igor Thiago", club: "Brentford", goals: 22, aliases: ["thiago", "igor thiago"] },
      { rank: 3, name: "Antoine Semenyo", club: "Bournemouth / Manchester City", goals: 17, aliases: ["semenyo"] },
      { rank: 4, name: "Ollie Watkins", club: "Aston Villa", goals: 16, aliases: ["watkins"] },
      {
        rank: 5,
        goals: 15,
        isTied: true, // 2-way tie for the final card: either player can be guessed
        club: "Nottingham Forest / Chelsea",
        tiedOptions: [
          { name: "Morgan Gibbs-White", club: "Nottingham Forest", aliases: ["gibbs-white", "white"] },
          { name: "João Pedro", club: "Chelsea", aliases: ["joao pedro", "pedro"] }
        ]
      }
    ]
  },
  {
    season: "2024-25",
    topScorers: [
      { rank: 1, name: "Mohamed Salah", club: "Liverpool", goals: 29, aliases: ["salah", "mo salah"] },
      { rank: 2, name: "Alexander Isak", club: "Newcastle United", goals: 23, aliases: ["isak"] },
      { rank: 3, name: "Erling Haaland", club: "Manchester City", goals: 22, aliases: ["haaland"] },
      { rank: 4, name: "Bryan Mbeumo", club: "Brentford", goals: 20, aliases: ["mbeumo"] },
      { rank: 5, name: "Chris Wood", club: "Nottingham Forest", goals: 20, aliases: ["wood", "chris wood"] }
    ]
  },
  {
    season: "2023-24",
    topScorers: [
      { rank: 1, name: "Erling Haaland", club: "Manchester City", goals: 27, aliases: ["haaland"] },
      { rank: 2, name: "Cole Palmer", club: "Chelsea", goals: 22, aliases: ["palmer"] },
      { rank: 3, name: "Alexander Isak", club: "Newcastle United", goals: 21, aliases: ["isak"] },
      { rank: 4, name: "Phil Foden", club: "Manchester City", goals: 19, aliases: ["foden"] },
      {
        rank: 5,
        goals: 19,
        isTied: true,
        club: "Bournemouth / Aston Villa",
        tiedOptions: [
          { name: "Dominic Solanke", club: "AFC Bournemouth", aliases: ["solanke"] },
          { name: "Ollie Watkins", club: "Aston Villa", aliases: ["watkins"] }
        ]
      }
    ]
  },
  {
    season: "2022-23",
    topScorers: [
      { rank: 1, name: "Erling Haaland", club: "Manchester City", goals: 36, aliases: ["haaland"] },
      { rank: 2, name: "Harry Kane", club: "Tottenham Hotspur", goals: 30, aliases: ["kane"] },
      { rank: 3, name: "Ivan Toney", club: "Brentford", goals: 20, aliases: ["toney"] },
      { rank: 4, name: "Mohamed Salah", club: "Liverpool", goals: 19, aliases: ["salah", "mo salah"] },
      { rank: 5, name: "Callum Wilson", club: "Newcastle United", goals: 18, aliases: ["wilson"] }
    ]
  },
  {
    season: "2021-22",
    topScorers: [
      { rank: 1, name: "Mohamed Salah", club: "Liverpool", goals: 23, aliases: ["salah", "mo salah"] },
      { rank: 2, name: "Son Heung-min", club: "Tottenham Hotspur", goals: 23, aliases: ["son", "heung-min son"] },
      { rank: 3, name: "Cristiano Ronaldo", club: "Manchester United", goals: 18, aliases: ["ronaldo", "cr7"] },
      { rank: 4, name: "Harry Kane", club: "Tottenham Hotspur", goals: 17, aliases: ["kane"] },
      { rank: 5, name: "Sadio Mané", club: "Liverpool", goals: 16, aliases: ["mane"] }
    ]
  },
  {
    season: "2020-21",
    topScorers: [
      { rank: 1, name: "Harry Kane", club: "Tottenham Hotspur", goals: 23, aliases: ["kane"] },
      { rank: 2, name: "Mohamed Salah", club: "Liverpool", goals: 22, aliases: ["salah", "mo salah"] },
      { rank: 3, name: "Bruno Fernandes", club: "Manchester United", goals: 18, aliases: ["fernandes", "bruno"] },
      { rank: 4, name: "Patrick Bamford", club: "Leeds United", goals: 17, aliases: ["bamford"] },
      { rank: 5, name: "Son Heung-min", club: "Tottenham Hotspur", goals: 17, aliases: ["son", "heung-min son"] }
    ]
  },
  {
    season: "2019-20",
    topScorers: [
      { rank: 1, name: "Jamie Vardy", club: "Leicester City", goals: 23, aliases: ["vardy"] },
      { rank: 2, name: "Pierre-Emerick Aubameyang", club: "Arsenal", goals: 22, aliases: ["aubameyang", "auba"] },
      { rank: 3, name: "Danny Ings", club: "Southampton", goals: 22, aliases: ["ings"] },
      { rank: 4, name: "Raheem Sterling", club: "Manchester City", goals: 20, aliases: ["sterling"] },
      { rank: 5, name: "Mohamed Salah", club: "Liverpool", goals: 19, aliases: ["salah", "mo salah"] }
    ]
  },
  {
    season: "2018-19",
    topScorers: [
      { rank: 1, name: "Pierre-Emerick Aubameyang", club: "Arsenal", goals: 22, aliases: ["aubameyang", "auba"] },
      { rank: 2, name: "Sadio Mané", club: "Liverpool", goals: 22, aliases: ["mane"] },
      { rank: 3, name: "Mohamed Salah", club: "Liverpool", goals: 22, aliases: ["salah", "mo salah"] },
      { rank: 4, name: "Sergio Agüero", club: "Manchester City", goals: 21, aliases: ["aguero"] },
      { rank: 5, name: "Jamie Vardy", club: "Leicester City", goals: 18, aliases: ["vardy"] }
    ]
  },
  {
    season: "2017-18",
    topScorers: [
      { rank: 1, name: "Mohamed Salah", club: "Liverpool", goals: 32, aliases: ["salah", "mo salah"] },
      { rank: 2, name: "Harry Kane", club: "Tottenham Hotspur", goals: 30, aliases: ["kane"] },
      { rank: 3, name: "Sergio Agüero", club: "Manchester City", goals: 21, aliases: ["aguero"] },
      { rank: 4, name: "Jamie Vardy", club: "Leicester City", goals: 20, aliases: ["vardy"] },
      { rank: 5, name: "Raheem Sterling", club: "Manchester City", goals: 18, aliases: ["sterling"] }
    ]
  },
  {
    season: "2016-17",
    topScorers: [
      { rank: 1, name: "Harry Kane", club: "Tottenham Hotspur", goals: 29, aliases: ["kane"] },
      { rank: 2, name: "Romelu Lukaku", club: "Everton", goals: 25, aliases: ["lukaku"] },
      { rank: 3, name: "Alexis Sánchez", club: "Arsenal", goals: 24, aliases: ["sanchez", "alexis"] },
      { rank: 4, name: "Sergio Agüero", club: "Manchester City", goals: 20, aliases: ["aguero"] },
      { rank: 5, name: "Diego Costa", club: "Chelsea", goals: 20, aliases: ["costa", "diego costa"] }
    ]
  },
  {
    season: "2015-16",
    topScorers: [
      { rank: 1, name: "Harry Kane", club: "Tottenham Hotspur", goals: 25, aliases: ["kane"] },
      { rank: 2, name: "Sergio Agüero", club: "Manchester City", goals: 24, aliases: ["aguero"] },
      { rank: 3, name: "Jamie Vardy", club: "Leicester City", goals: 24, aliases: ["vardy"] },
      { rank: 4, name: "Romelu Lukaku", club: "Everton", goals: 18, aliases: ["lukaku"] },
      { rank: 5, name: "Riyad Mahrez", club: "Leicester City", goals: 17, aliases: ["mahrez"] }
    ]
  },
  {
    season: "2014-15",
    topScorers: [
      { rank: 1, name: "Sergio Agüero", club: "Manchester City", goals: 26, aliases: ["aguero"] },
      { rank: 2, name: "Harry Kane", club: "Tottenham Hotspur", goals: 21, aliases: ["kane"] },
      { rank: 3, name: "Diego Costa", club: "Chelsea", goals: 20, aliases: ["costa", "diego costa"] },
      { rank: 4, name: "Charlie Austin", club: "Queens Park Rangers", goals: 18, aliases: ["austin"] },
      { rank: 5, name: "Alexis Sánchez", club: "Arsenal", goals: 16, aliases: ["sanchez", "alexis"] }
    ]
  },
  {
    season: "2013-14",
    topScorers: [
      { rank: 1, name: "Luis Suárez", club: "Liverpool", goals: 31, aliases: ["suarez"] },
      { rank: 2, name: "Daniel Sturridge", club: "Liverpool", goals: 21, aliases: ["sturridge"] },
      { rank: 3, name: "Yaya Touré", club: "Manchester City", goals: 20, aliases: ["toure", "yaya toure"] },
      { rank: 4, name: "Sergio Agüero", club: "Manchester City", goals: 17, aliases: ["aguero"] },
      { rank: 5, name: "Wayne Rooney", club: "Manchester United", goals: 17, aliases: ["rooney"] }
    ]
  },
  {
    season: "2012-13",
    topScorers: [
      { rank: 1, name: "Robin van Persie", club: "Manchester United", goals: 26, aliases: ["van persie", "rvp"] },
      { rank: 2, name: "Luis Suárez", club: "Liverpool", goals: 23, aliases: ["suarez"] },
      { rank: 3, name: "Gareth Bale", club: "Tottenham Hotspur", goals: 21, aliases: ["bale"] },
      { rank: 4, name: "Christian Benteke", club: "Aston Villa", goals: 19, aliases: ["benteke"] },
      { rank: 5, name: "Michu", club: "Swansea City", goals: 18, aliases: ["michu"] }
    ]
  },
  {
    season: "2011-12",
    topScorers: [
      { rank: 1, name: "Robin van Persie", club: "Arsenal", goals: 30, aliases: ["van persie", "rvp"] },
      { rank: 2, name: "Wayne Rooney", club: "Manchester United", goals: 27, aliases: ["rooney"] },
      { rank: 3, name: "Sergio Agüero", club: "Manchester City", goals: 23, aliases: ["aguero"] },
      { rank: 4, name: "Yakubu", club: "Blackburn Rovers", goals: 17, aliases: ["yakubu"] },
      {
        rank: 5,
        goals: 17,
        isTied: true,
        club: "Fulham / Tottenham Hotspur",
        tiedOptions: [
          { name: "Clint Dempsey", club: "Fulham", aliases: ["dempsey"] },
          { name: "Emmanuel Adebayor", club: "Tottenham Hotspur", aliases: ["adebayor"] }
        ]
      }
    ]
  },
  {
    season: "2010-11",
    topScorers: [
      { rank: 1, name: "Dimitar Berbatov", club: "Manchester United", goals: 20, aliases: ["berbatov"] },
      { rank: 2, name: "Carlos Tevez", club: "Manchester City", goals: 20, aliases: ["tevez"] },
      { rank: 3, name: "Robin van Persie", club: "Arsenal", goals: 18, aliases: ["van persie", "rvp"] },
      { rank: 4, name: "Darren Bent", club: "Sunderland / Aston Villa", goals: 17, aliases: ["bent"] },
      { rank: 5, name: "Peter Odemwingie", club: "West Bromwich Albion", goals: 15, aliases: ["odemwingie"] }
    ]
  },
  {
    season: "2009-10",
    topScorers: [
      { rank: 1, name: "Didier Drogba", club: "Chelsea", goals: 29, aliases: ["drogba"] },
      { rank: 2, name: "Wayne Rooney", club: "Manchester United", goals: 26, aliases: ["rooney"] },
      { rank: 3, name: "Darren Bent", club: "Sunderland", goals: 24, aliases: ["bent"] },
      { rank: 4, name: "Carlos Tevez", club: "Manchester City", goals: 23, aliases: ["tevez"] },
      { rank: 5, name: "Frank Lampard", club: "Chelsea", goals: 22, aliases: ["lampard"] }
    ]
  },
  {
    season: "2008-09",
    topScorers: [
      { rank: 1, name: "Nicolas Anelka", club: "Chelsea", goals: 19, aliases: ["anelka"] },
      { rank: 2, name: "Cristiano Ronaldo", club: "Manchester United", goals: 18, aliases: ["ronaldo", "cr7"] },
      { rank: 3, name: "Steven Gerrard", club: "Liverpool", goals: 16, aliases: ["gerrard"] },
      { rank: 4, name: "Fernando Torres", club: "Liverpool", goals: 14, aliases: ["torres"] },
      { rank: 5, name: "Robinho", club: "Manchester City", goals: 14, aliases: ["robinho"] }
    ]
  },
  {
    season: "2007-08",
    topScorers: [
      { rank: 1, name: "Cristiano Ronaldo", club: "Manchester United", goals: 31, aliases: ["ronaldo", "cr7"] },
      { rank: 2, name: "Fernando Torres", club: "Liverpool", goals: 24, aliases: ["torres"] },
      { rank: 3, name: "Emmanuel Adebayor", club: "Arsenal", goals: 24, aliases: ["adebayor"] },
      { rank: 4, name: "Roque Santa Cruz", club: "Blackburn Rovers", goals: 19, aliases: ["santa cruz"] },
      {
        rank: 5,
        goals: 15,
        isTied: true, // 4-way tie for the final 5th spot
        club: "Portsmouth / Man City / Spurs / Everton",
        tiedOptions: [
          { name: "Benjani", club: "Portsmouth / Manchester City", aliases: ["benjani"] },
          { name: "Dimitar Berbatov", club: "Tottenham Hotspur", aliases: ["berbatov"] },
          { name: "Robbie Keane", club: "Tottenham Hotspur", aliases: ["keane", "robbie keane"] },
          { name: "Yakubu", club: "Everton", aliases: ["yakubu"] }
        ]
      }
    ]
  },
  {
    season: "2006-07",
    topScorers: [
      { rank: 1, name: "Didier Drogba", club: "Chelsea", goals: 20, aliases: ["drogba"] },
      { rank: 2, name: "Benni McCarthy", club: "Blackburn Rovers", goals: 18, aliases: ["mccarthy"] },
      { rank: 3, name: "Cristiano Ronaldo", club: "Manchester United", goals: 17, aliases: ["ronaldo", "cr7"] },
      { rank: 4, name: "Wayne Rooney", club: "Manchester United", goals: 14, aliases: ["rooney"] },
      { rank: 5, name: "Mark Viduka", club: "Middlesbrough", goals: 14, aliases: ["viduka"] }
    ]
  },
  {
    season: "2005-06",
    topScorers: [
      { rank: 1, name: "Thierry Henry", club: "Arsenal", goals: 27, aliases: ["henry"] },
      { rank: 2, name: "Ruud van Nistelrooy", club: "Manchester United", goals: 21, aliases: ["van nistelrooy", "nistelrooy"] },
      { rank: 3, name: "Darren Bent", club: "Charlton Athletic", goals: 18, aliases: ["bent"] },
      { rank: 4, name: "Robbie Keane", club: "Tottenham Hotspur", goals: 16, aliases: ["keane", "robbie keane"] },
      {
        rank: 5,
        goals: 16,
        isTied: true,
        club: "Manchester United / Chelsea",
        tiedOptions: [
          { name: "Wayne Rooney", club: "Manchester United", aliases: ["rooney"] },
          { name: "Frank Lampard", club: "Chelsea", aliases: ["lampard"] }
        ]
      }
    ]
  },
  {
    season: "2004-05",
    topScorers: [
      { rank: 1, name: "Thierry Henry", club: "Arsenal", goals: 25, aliases: ["henry"] },
      { rank: 2, name: "Andy Johnson", club: "Crystal Palace", goals: 21, aliases: ["johnson", "andy johnson"] },
      { rank: 3, name: "Robert Pirès", club: "Arsenal", goals: 14, aliases: ["pires"] },
      { rank: 4, name: "Jermain Defoe", club: "Tottenham Hotspur", goals: 13, aliases: ["defoe"] },
      {
        rank: 5,
        goals: 13,
        isTied: true,
        club: "Portsmouth / Middlesbrough / Chelsea",
        tiedOptions: [
          { name: "Yakubu", club: "Portsmouth", aliases: ["yakubu"] },
          { name: "Jimmy Floyd Hasselbaink", club: "Middlesbrough", aliases: ["hasselbaink"] },
          { name: "Frank Lampard", club: "Chelsea", aliases: ["lampard"] }
        ]
      }
    ]
  },
  {
    season: "2003-04",
    topScorers: [
      { rank: 1, name: "Thierry Henry", club: "Arsenal", goals: 30, aliases: ["henry"] },
      { rank: 2, name: "Alan Shearer", club: "Newcastle United", goals: 22, aliases: ["shearer"] },
      { rank: 3, name: "Louis Saha", club: "Fulham / Manchester United", goals: 20, aliases: ["saha"] },
      { rank: 4, name: "Ruud van Nistelrooy", club: "Manchester United", goals: 20, aliases: ["van nistelrooy", "nistelrooy"] },
      { rank: 5, name: "Mikael Forssell", club: "Birmingham City", goals: 17, aliases: ["forssell"] }
    ]
  },
  {
    season: "2002-03",
    topScorers: [
      { rank: 1, name: "Ruud van Nistelrooy", club: "Manchester United", goals: 25, aliases: ["van nistelrooy", "nistelrooy"] },
      { rank: 2, name: "Thierry Henry", club: "Arsenal", goals: 24, aliases: ["henry"] },
      { rank: 3, name: "James Beattie", club: "Southampton", goals: 23, aliases: ["beattie"] },
      { rank: 4, name: "Mark Viduka", club: "Leeds United", goals: 20, aliases: ["viduka"] },
      { rank: 5, name: "Michael Owen", club: "Liverpool", goals: 19, aliases: ["owen"] }
    ]
  },
  {
    season: "2001-02",
    topScorers: [
      { rank: 1, name: "Thierry Henry", club: "Arsenal", goals: 24, aliases: ["henry"] },
      { rank: 2, name: "Jimmy Floyd Hasselbaink", club: "Chelsea", goals: 23, aliases: ["hasselbaink"] },
      { rank: 3, name: "Ruud van Nistelrooy", club: "Manchester United", goals: 23, aliases: ["van nistelrooy", "nistelrooy"] },
      { rank: 4, name: "Alan Shearer", club: "Newcastle United", goals: 23, aliases: ["shearer"] },
      { rank: 5, name: "Michael Owen", club: "Liverpool", goals: 19, aliases: ["owen"] }
    ]
  },
  {
    season: "2000-01",
    topScorers: [
      { rank: 1, name: "Jimmy Floyd Hasselbaink", club: "Chelsea", goals: 23, aliases: ["hasselbaink"] },
      { rank: 2, name: "Marcus Stewart", club: "Ipswich Town", goals: 19, aliases: ["stewart"] },
      { rank: 3, name: "Thierry Henry", club: "Arsenal", goals: 17, aliases: ["henry"] },
      { rank: 4, name: "Mark Viduka", club: "Leeds United", goals: 17, aliases: ["viduka"] },
      { rank: 5, name: "Michael Owen", club: "Liverpool", goals: 16, aliases: ["owen"] }
    ]
  },
  {
    season: "1999-00",
    topScorers: [
      { rank: 1, name: "Kevin Phillips", club: "Sunderland", goals: 30, aliases: ["phillips"] },
      { rank: 2, name: "Alan Shearer", club: "Newcastle United", goals: 23, aliases: ["shearer"] },
      { rank: 3, name: "Dwight Yorke", club: "Manchester United", goals: 20, aliases: ["yorke"] },
      { rank: 4, name: "Michael Bridges", club: "Leeds United", goals: 19, aliases: ["bridges"] },
      { rank: 5, name: "Andy Cole", club: "Manchester United", goals: 19, aliases: ["cole", "andy cole"] }
    ]
  },
  {
    season: "1998-99",
    topScorers: [
      { rank: 1, name: "Jimmy Floyd Hasselbaink", club: "Leeds United", goals: 18, aliases: ["hasselbaink"] },
      { rank: 2, name: "Michael Owen", club: "Liverpool", goals: 18, aliases: ["owen"] },
      { rank: 3, name: "Dwight Yorke", club: "Manchester United", goals: 18, aliases: ["yorke"] },
      { rank: 4, name: "Nicolas Anelka", club: "Arsenal", goals: 17, aliases: ["anelka"] },
      { rank: 5, name: "Andy Cole", club: "Manchester United", goals: 16, aliases: ["cole", "andy cole"] }
    ]
  },
  {
    season: "1997-98",
    topScorers: [
      { rank: 1, name: "Dion Dublin", club: "Coventry City", goals: 18, aliases: ["dublin"] },
      { rank: 2, name: "Michael Owen", club: "Liverpool", goals: 18, aliases: ["owen"] },
      { rank: 3, name: "Chris Sutton", club: "Blackburn Rovers", goals: 18, aliases: ["sutton"] },
      { rank: 4, name: "Dennis Bergkamp", club: "Arsenal", goals: 16, aliases: ["bergkamp"] },
      {
        rank: 5,
        goals: 16,
        isTied: true,
        club: "Blackburn Rovers / Leeds United",
        tiedOptions: [
          { name: "Kevin Gallacher", club: "Blackburn Rovers", aliases: ["gallacher"] },
          { name: "Jimmy Floyd Hasselbaink", club: "Leeds United", aliases: ["hasselbaink"] }
        ]
      }
    ]
  },
  {
    season: "1996-97",
    topScorers: [
      { rank: 1, name: "Alan Shearer", club: "Newcastle United", goals: 25, aliases: ["shearer"] },
      { rank: 2, name: "Ian Wright", club: "Arsenal", goals: 23, aliases: ["wright", "ian wright"] },
      { rank: 3, name: "Robbie Fowler", club: "Liverpool", goals: 18, aliases: ["fowler"] },
      { rank: 4, name: "Ole Gunnar Solskjær", club: "Manchester United", goals: 18, aliases: ["solskjaer"] },
      { rank: 5, name: "Dwight Yorke", club: "Aston Villa", goals: 17, aliases: ["yorke"] }
    ]
  },
  {
    season: "1995-96",
    topScorers: [
      { rank: 1, name: "Alan Shearer", club: "Blackburn Rovers", goals: 31, aliases: ["shearer"] },
      { rank: 2, name: "Robbie Fowler", club: "Liverpool", goals: 28, aliases: ["fowler"] },
      { rank: 3, name: "Les Ferdinand", club: "Newcastle United", goals: 25, aliases: ["ferdinand", "les ferdinand"] },
      { rank: 4, name: "Dwight Yorke", club: "Aston Villa", goals: 17, aliases: ["yorke"] },
      { rank: 5, name: "Andrei Kanchelskis", club: "Everton", goals: 17, aliases: ["kanchelskis"] }
    ]
  },
  {
    season: "1994-95",
    topScorers: [
      { rank: 1, name: "Alan Shearer", club: "Blackburn Rovers", goals: 34, aliases: ["shearer"] },
      { rank: 2, name: "Robbie Fowler", club: "Liverpool", goals: 25, aliases: ["fowler"] },
      { rank: 3, name: "Les Ferdinand", club: "Queens Park Rangers", goals: 24, aliases: ["ferdinand", "les ferdinand"] },
      { rank: 4, name: "Stan Collymore", club: "Nottingham Forest", goals: 22, aliases: ["collymore"] },
      {
        rank: 5,
        goals: 21,
        isTied: true,
        club: "Newcastle / Man United / Spurs",
        tiedOptions: [
          { name: "Andy Cole", club: "Newcastle United / Manchester United", aliases: ["cole", "andy cole"] },
          { name: "Jürgen Klinsmann", club: "Tottenham Hotspur", aliases: ["klinsmann"] }
        ]
      }
    ]
  },
  {
    season: "1993-94",
    topScorers: [
      { rank: 1, name: "Andy Cole", club: "Newcastle United", goals: 34, aliases: ["cole", "andy cole"] },
      { rank: 2, name: "Alan Shearer", club: "Blackburn Rovers", goals: 31, aliases: ["shearer"] },
      { rank: 3, name: "Matt Le Tissier", club: "Southampton", goals: 25, aliases: ["le tissier"] },
      { rank: 4, name: "Chris Sutton", club: "Norwich City", goals: 25, aliases: ["sutton"] },
      { rank: 5, name: "Ian Wright", club: "Arsenal", goals: 23, aliases: ["wright", "ian wright"] }
    ]
  },
  {
    season: "1992-93",
    topScorers: [
      { rank: 1, name: "Teddy Sheringham", club: "Nottingham Forest / Tottenham Hotspur", goals: 22, aliases: ["sheringham"] },
      { rank: 2, name: "Les Ferdinand", club: "Queens Park Rangers", goals: 20, aliases: ["ferdinand", "les ferdinand"] },
      { rank: 3, name: "Dean Holdsworth", club: "Wimbledon", goals: 19, aliases: ["holdsworth"] },
      { rank: 4, name: "Micky Quinn", club: "Coventry City", goals: 17, aliases: ["quinn"] },
      {
        rank: 5,
        goals: 16,
        isTied: true,
        club: "Blackburn Rovers / Manchester City",
        tiedOptions: [
          { name: "Alan Shearer", club: "Blackburn Rovers", aliases: ["shearer"] },
          { name: "David White", club: "Manchester City", aliases: ["white"] }
        ]
      }
    ]
  }
];