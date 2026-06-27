export interface FeastDay {
  name: string;
  geezName?: string;
  date: string; // MM-DD for fixed feasts
  description: string;
  suggestedTopic: string;
}

export const FIXED_FEASTS: FeastDay[] = [
  {
    name: "Ethiopian New Year",
    geezName: "Enkutatash",
    date: "09-11",
    description: "The first day of the Ethiopian year, 1st of Meskerem",
    suggestedTopic: "Enkutatash — Ethiopian New Year. The first of Meskerem, the opening of a new year in the life of the Church.",
  },
  {
    name: "Finding of the True Cross",
    geezName: "Meskel",
    date: "09-27",
    description: "Feast commemorating the discovery of the True Cross by Empress Helena",
    suggestedTopic: "Meskel — the Finding of the True Cross. We celebrate the light of the Holy Cross revealed to the world.",
  },
  {
    name: "Feast of St. Tekle Haymanot",
    geezName: "Abune Tekle Haymanot",
    date: "08-24",
    description: "One of the most beloved saints of the Ethiopian Church, founder of Debre Libanos",
    suggestedTopic: "Feast of Abune Tekle Haymanot, the great ascetic and apostle of Ethiopia.",
  },
  {
    name: "Transfiguration",
    geezName: "Buhe",
    date: "08-19",
    description: "The Transfiguration of Our Lord on Mount Tabor",
    suggestedTopic: "Buhe — the Transfiguration of Our Lord Jesus Christ on Mount Tabor. Matthew 17:1–8.",
  },
  {
    name: "Dormition of the Theotokos",
    geezName: "Filseta",
    date: "08-22",
    description: "The Assumption of the Holy Virgin Mary, mother of God",
    suggestedTopic: "Filseta — the Dormition and Assumption of the Holy Virgin Mary, Theotokos and Mother of God.",
  },
  {
    name: "Ethiopian Christmas",
    geezName: "Genna",
    date: "01-07",
    description: "The Nativity of Our Lord Jesus Christ",
    suggestedTopic: "Genna — the Nativity of Our Lord Jesus Christ. The Word became flesh and dwelt among us. John 1:14.",
  },
  {
    name: "Epiphany",
    geezName: "Timkat",
    date: "01-19",
    description: "The Baptism of Our Lord in the Jordan River — the greatest feast of the Ethiopian Church",
    suggestedTopic: "Timkat — the Baptism of Our Lord Jesus Christ in the Jordan. Matthew 3:13–17. The Holy Trinity revealed.",
  },
  {
    name: "Feast of St. Gabriel",
    geezName: "Kidane Mihret",
    date: "01-26",
    description: "Monthly feast of the Archangel Gabriel",
    suggestedTopic: "Feast of the Archangel Gabriel, messenger of God and protector of the faithful.",
  },
  {
    name: "Covenant of Mercy",
    geezName: "Kidane Mihret",
    date: "03-21",
    description: "The Covenant of Mercy feast of the Holy Virgin Mary",
    suggestedTopic: "Kidane Mihret — the Covenant of Mercy. The Holy Virgin Mary intercedes for all who call upon her name.",
  },
  {
    name: "Feast of St. Yared",
    geezName: "Abune Yared",
    date: "05-11",
    description: "Patron saint of liturgical music and composer of the Ge'ez hymnody",
    suggestedTopic: "Feast of Abune Yared, composer of the sacred Ge'ez hymnody and father of Ethiopian liturgical music.",
  },
  {
    name: "Feast of the Apostles",
    geezName: "Hawaryat",
    date: "06-30",
    description: "The feast of the holy Apostles Peter and Paul",
    suggestedTopic: "Feast of the Holy Apostles. The Church is built on the foundation of the apostles and prophets, Christ Jesus himself being the cornerstone. Ephesians 2:20.",
  },
  {
    name: "Feast of St. Michael",
    geezName: "Abbo",
    date: "11-08",
    description: "The great feast of the Archangel Michael, champion of the faithful",
    suggestedTopic: "Feast of the Archangel Michael, prince of the heavenly host and defender of the people of God.",
  },
  {
    name: "Feast of St. George",
    geezName: "Kidus Giorgis",
    date: "04-23",
    description: "The feast of the great martyr St. George, beloved patron of Ethiopia",
    suggestedTopic: "Feast of Kidus Giorgis — the Great Martyr George, beloved patron saint of Ethiopia and the Tewahedo Church.",
  },
  {
    name: "Feast of St. Mary (Monthly)",
    geezName: "Kidist Mariam",
    date: "12-21",
    description: "Monthly feast of the Holy Virgin Mary",
    suggestedTopic: "Kidist Mariam — monthly feast of the Holy Virgin Mary, the Theotokos, Mother of God and our faithful intercessor.",
  },
];

export interface UpcomingFeast extends FeastDay {
  nextDate: Date;
  daysUntil: number;
}

export function getUpcomingFeasts(count: number = 6): UpcomingFeast[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result: UpcomingFeast[] = FIXED_FEASTS.map((feast) => {
    const [month, day] = feast.date.split("-").map(Number);

    // Try this year first
    let nextDate = new Date(today.getFullYear(), month - 1, day);
    if (nextDate < today) {
      // Push to next year
      nextDate = new Date(today.getFullYear() + 1, month - 1, day);
    }

    const daysUntil = Math.round(
      (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return { ...feast, nextDate, daysUntil };
  });

  return result
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, count);
}

export function formatFeastDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}
