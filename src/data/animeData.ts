export interface Palette {
  primary: string;
  secondary: string;
  deep: string;
  glowRgb: string;
}

export interface Trailer {
  videoId: string;
  title: string;
  channel: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  fallbackThumbnail: string;
}

export interface Character {
  name: string;
  role: string;
  description: string;
  avatarUrl?: string;
  quote?: string;
}

export interface AnimeItem {
  id: string;
  title: string;
  japaneseTitle: string;
  romajiTitle?: string;
  tagline: string;
  description: string;
  synopsisLong: string;
  studio: string;
  episodes: string;
  years: string;
  score: number;
  genres: string[];
  palette: Palette;
  posterUrl: string;
  fallbackPosterUrl: string;
  heroBannerUrl?: string;
  trailer: Trailer;
  officialSite: string;
  englishLicensor: string;
  hoverFxClass: string;
  characters: Character[];
  highlights: string[];
  trivia: string;
}

export const ANIME_DATA: AnimeItem[] = [
  {
    id: "naruto-shippuden",
    title: "Naruto Shippuden",
    japaneseTitle: "ナルト 疾風伝",
    romajiTitle: "Naruto Shippūden",
    tagline: "Studio Pierrot · 720 Episodes",
    description: "A hot-headed young ninja from the Hidden Leaf Village carries a monstrous secret sealed inside him and vows to become Hokage.",
    synopsisLong: "Across 720 episodes, Naruto Uzumaki's journey from outcast prankster to world-saving hero blends high-voltage battles, jutsu spectacle, and an unforgettable story about friendship, rivalry, and redemption.",
    studio: "Studio Pierrot",
    episodes: "720 eps",
    years: "2002–2017",
    score: 8.7,
    genres: ["Shonen", "Action", "Ninja Fantasy", "Martial Arts"],
    palette: {
      primary: "#FF7F1A",
      secondary: "#F5C518",
      deep: "#10131A",
      glowRgb: "255, 127, 26"
    },
    posterUrl: "https://i.ytimg.com/vi/QczGoCmX-pI/maxresdefault.jpg",
    fallbackPosterUrl: "https://i.ytimg.com/vi/QczGoCmX-pI/hqdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/QczGoCmX-pI/maxresdefault.jpg",
    trailer: {
      videoId: "QczGoCmX-pI",
      title: "ROAD OF NARUTO | NARUTO 20th Anniversary Trailer | VIZ",
      channel: "VIZ Media",
      watchUrl: "https://www.youtube.com/watch?v=QczGoCmX-pI",
      embedUrl: "https://www.youtube-nocookie.com/embed/QczGoCmX-pI",
      thumbnailUrl: "https://i.ytimg.com/vi/QczGoCmX-pI/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/QczGoCmX-pI/hqdefault.jpg"
    },
    officialSite: "http://naruto-official.com/en",
    englishLicensor: "VIZ Media",
    hoverFxClass: "fx-rasengan",
    characters: [
      {
        name: "Naruto Uzumaki",
        role: "The Nine-Tails Jinchuriki",
        description: "Determined, boisterous, and unwavering in his ninja way never to give up on his comrades.",
        quote: "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!"
      },
      {
        name: "Sasuke Uchiha",
        role: "The Last Uchiha Prodigy",
        description: "Sole survivor of the Uchiha clan, driven by vengeance, darkness, and unmatched lightning prowess.",
        quote: "My dream doesn't exist in the future. It lies in the past. That's the only place it exists."
      },
      {
        name: "Kakashi Hatake",
        role: "The Copy Ninja of the Leaf",
        description: "Master of a thousand jutsu, beloved mentor, and calm tactical genius of Team 7.",
        quote: "In the ninja world, those who break the rules are scum, but those who abandon their friends are worse than scum."
      }
    ],
    highlights: ["Chakra Nature Transformation", "Pain's Assault on Konoha", "The 4th Great Ninja War"],
    trivia: "The 20th Anniversary 'ROAD OF NARUTO' PV re-animated iconic early clashes in modern ultra-crisp digital animation."
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    japaneseTitle: "鬼滅の刃",
    romajiTitle: "Kimetsu no Yaiba",
    tagline: "Animation by ufotable",
    description: "After demons slaughter his family and turn his sister Nezuko into one, kind-hearted Tanjiro joins the Demon Slayer Corps to find a cure.",
    synopsisLong: "Stunning ufotable animation, visceral sword-breathing combat, and an emotionally fierce brother-sister bond at its core made this Taisho-era dark fantasy one of anime's biggest global milestones.",
    studio: "ufotable",
    episodes: "55+ eps & films",
    years: "2019–Present",
    score: 8.9,
    genres: ["Dark Fantasy", "Action", "Historical", "Supernatural"],
    palette: {
      primary: "#C8102E",
      secondary: "#F5A623",
      deep: "#1A1A1A",
      glowRgb: "200, 16, 46"
    },
    posterUrl: "https://demonslayer-anime.com/infinitycastle/news/SYS/CONTENTS/5e9e6131-0c65-4920-9280-c0b71f270b3b/w300",
    fallbackPosterUrl: "https://i.ytimg.com/vi/9kb7vK11_Rw/maxresdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/9kb7vK11_Rw/maxresdefault.jpg",
    trailer: {
      videoId: "9kb7vK11_Rw",
      title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle | OFFICIAL TRAILER",
      channel: "Aniplex USA",
      watchUrl: "https://www.youtube.com/watch?v=9kb7vK11_Rw",
      embedUrl: "https://www.youtube-nocookie.com/embed/9kb7vK11_Rw",
      thumbnailUrl: "https://i.ytimg.com/vi/9kb7vK11_Rw/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/9kb7vK11_Rw/hqdefault.jpg"
    },
    officialSite: "https://demonslayer-anime.com/",
    englishLicensor: "Aniplex of America",
    hoverFxClass: "fx-flame",
    characters: [
      {
        name: "Tanjiro Kamado",
        role: "Sun Breathing Swordsman",
        description: "Endowed with an acute sense of smell and boundless empathy, even toward dying demons.",
        avatarUrl: "https://demonslayer-anime.com/portal/assets/img/chara/half/imgcharahalf_9.png",
        quote: "No matter how many people you may lose, you have no choice but to go on living."
      },
      {
        name: "Nezuko Kamado",
        role: "The Awakened Demon Maiden",
        description: "Tanjiro's sister who retained her human soul and fights beside him with fiery Blood Demon Art.",
        avatarUrl: "https://demonslayer-anime.com/portal/assets/img/chara/half/imgcharahalf_2.png",
        quote: "Humans are to be protected and saved. I will never hurt them."
      },
      {
        name: "Kyojuro Rengoku",
        role: "Flame Hashira",
        description: "The roaring pillar of fire whose incandescent spirit and honor illuminated the Mugen Train.",
        quote: "Set your heart ablaze. Go beyond your limits!"
      }
    ],
    highlights: ["Hinokami Kagura Dance", "Mugen Train Showdown", "Infinity Castle Trilogy"],
    trivia: "The Mugen Train feature film broke Japan's all-time box-office record previously held by Spirited Away."
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    japaneseTitle: "呪術廻戦",
    romajiTitle: "Jujutsu Kaisen",
    tagline: "Studio MAPPA",
    description: "A strong-but-ordinary high-schooler swallows a cursed relic and becomes the vessel of an ancient evil, joining sorcerers who hunt curses.",
    synopsisLong: "Enrolled at Tokyo Jujutsu High, Yuji Itadori and elite jujutsu sorcerers plunge into a world of grotesque curses and deadly Domain Expansions before the King of Curses takes total dominion. Dark, brutal, and endlessly stylish.",
    studio: "Studio MAPPA",
    episodes: "47 eps & film",
    years: "2020–Present",
    score: 8.8,
    genres: ["Dark Fantasy", "Supernatural", "Action", "Urban Shonen"],
    palette: {
      primary: "#7B2DDB",
      secondary: "#22D3EE",
      deep: "#0B0E1A",
      glowRgb: "123, 45, 219"
    },
    posterUrl: "https://www.mappa.co.jp/wp-content/uploads/2021/06/jujutsukaisen.jpg",
    fallbackPosterUrl: "https://i.ytimg.com/vi/MePL_vS-G9Q/maxresdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/MePL_vS-G9Q/maxresdefault.jpg",
    trailer: {
      videoId: "MePL_vS-G9Q",
      title: "JUJUTSU KAISEN S3: The Culling Game Part 1 Teaser Trailer",
      channel: "TOHO animation",
      watchUrl: "https://www.youtube.com/watch?v=MePL_vS-G9Q",
      embedUrl: "https://www.youtube-nocookie.com/embed/MePL_vS-G9Q",
      thumbnailUrl: "https://i.ytimg.com/vi/MePL_vS-G9Q/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/MePL_vS-G9Q/hqdefault.jpg"
    },
    officialSite: "https://jujutsukaisen.jp/",
    englishLicensor: "TOHO animation / Crunchyroll",
    hoverFxClass: "fx-cursed",
    characters: [
      {
        name: "Satoru Gojo",
        role: "The Strongest Jujutsu Sorcerer",
        description: "Wielder of the Limitless and the Six Eyes, possessing god-tier barrier and spatial manipulation.",
        quote: "Don't worry, I'm the strongest there is."
      },
      {
        name: "Yuji Itadori",
        role: "Vessel of Sukuna",
        description: "Superhuman physical prodigy driven by a dying vow to give people a 'proper death.'",
        quote: "I don't know how I'll feel when I'm dead, but I don't want to regret the way I lived."
      },
      {
        name: "Ryomen Sukuna",
        role: "King of Curses",
        description: "Ancient calamity incarnate whose malevolence and domain slicing cut through reality.",
        quote: "Any cursed spirit that opposes me shall know true despair."
      }
    ],
    highlights: ["Shibuya Incident Cataclysm", "Infinite Void Domain Expansion", "The Culling Game"],
    trivia: "MAPPA employed cinema-grade rotoscoping and dynamic dynamic lighting for Gojo's legendary Hollow Purple sequence."
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    romajiTitle: "Shingeki no Kyojin",
    tagline: "Wit Studio / MAPPA · 89 Episodes",
    description: "Humanity hides behind towering walls from giant humanoid monsters. When the walls fall, one vengeful boy joins the soldiers who hunt the Titans.",
    synopsisLong: "What begins as a desperate struggle for survival evolves into a staggering geopolitical drama examining cycles of war, freedom, and the moral cost of survival. A relentless, world-shaking masterpiece.",
    studio: "Wit Studio / MAPPA",
    episodes: "89 eps",
    years: "2013–2023",
    score: 9.1,
    genres: ["Dark Fantasy", "Military", "Mystery", "Post-Apocalyptic"],
    palette: {
      primary: "#A31621",
      secondary: "#E07B39",
      deep: "#1A1C20",
      glowRgb: "163, 22, 33"
    },
    posterUrl: "https://www.mappa.co.jp/wp-content/uploads/2021/06/shingeki_final-812x1150.jpg",
    fallbackPosterUrl: "https://i.ytimg.com/vi/E7WytLM2KvY/maxresdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/E7WytLM2KvY/maxresdefault.jpg",
    trailer: {
      videoId: "E7WytLM2KvY",
      title: "TVアニメ「進撃の巨人」最終PV | The Final Season Finale",
      channel: "Anime Pony Canyon",
      watchUrl: "https://www.youtube.com/watch?v=E7WytLM2KvY",
      embedUrl: "https://www.youtube-nocookie.com/embed/E7WytLM2KvY",
      thumbnailUrl: "https://i.ytimg.com/vi/E7WytLM2KvY/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/E7WytLM2KvY/hqdefault.jpg"
    },
    officialSite: "https://shingeki.tv",
    englishLicensor: "Pony Canyon / Crunchyroll",
    hoverFxClass: "fx-rumbling",
    characters: [
      {
        name: "Eren Yeager",
        role: "The Attack Titan / Founder",
        description: "Haunted by the fall of Shiganshina, relentlessly pursuing absolute freedom at any cataclysmic cost.",
        quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!"
      },
      {
        name: "Levi Ackerman",
        role: "Humanity's Strongest Soldier",
        description: "Scout Regiment captain whose razor-sharp blade speed and tactical precision turn battles single-handedly.",
        quote: "The only thing we're allowed to do is believe that we won't regret the choice we made."
      },
      {
        name: "Mikasa Ackerman",
        role: "Elite Scout Protector",
        description: "Peerless combat prodigy who dedicates her blade to shielding Eren and her comrades.",
        quote: "This world is cruel. And yet, so very beautiful."
      }
    ],
    highlights: ["Battle of Trost", "Return to Shiganshina", "The Rumbling of the Earth"],
    trivia: "The soundtrack composed by Hiroyuki Sawano and Kohta Yamamoto features motifs that foreshadowed twists years before they were animated."
  },
  {
    id: "one-piece",
    title: "One Piece",
    japaneseTitle: "ワンピース",
    romajiTitle: "One Piece",
    tagline: "Toei Animation · Since 1999 · 1,100+ eps",
    description: "Monkey D. Luffy sails the Grand Line with his crew to find the legendary One Piece and become King of the Pirates.",
    synopsisLong: "A rubber-bodied youth with a straw hat and an unbreakable spirit voyages across uncharted oceans with the Straw Hat Pirates. Mixing high-stakes political revolutions, ancient mysteries, and found-family warmth, it remains the reigning king of adventure anime.",
    studio: "Toei Animation",
    episodes: "1,100+ eps",
    years: "1999–Present",
    score: 9.0,
    genres: ["Adventure", "Fantasy", "Action", "Pirate Epic"],
    palette: {
      primary: "#E63E2E",
      secondary: "#F5B301",
      deep: "#1B2A4A",
      glowRgb: "230, 62, 46"
    },
    posterUrl: "https://de7i3bh7bgh0d.cloudfront.net/2026/03/27/20/52/56/4ab710d3-96d2-4350-b76a-56ddd81ef952/OnePiece111_blogsplash_1200x630.jpg",
    fallbackPosterUrl: "https://i.ytimg.com/vi/nlwLfTxss90/maxresdefault.jpg",
    heroBannerUrl: "https://dw9to29mmj727.cloudfront.net/promo/2016/5265-SeriesHeaders_OP_2000x800_wm.jpg",
    trailer: {
      videoId: "nlwLfTxss90",
      title: "ONE PIECE | Episode 1161 Trailer | A Dangerous Deal!",
      channel: "Toei Animation",
      watchUrl: "https://www.youtube.com/watch?v=nlwLfTxss90",
      embedUrl: "https://www.youtube-nocookie.com/embed/nlwLfTxss90",
      thumbnailUrl: "https://i.ytimg.com/vi/nlwLfTxss90/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/nlwLfTxss90/hqdefault.jpg"
    },
    officialSite: "https://one-piece.com/anime/",
    englishLicensor: "VIZ Media / Toei Animation",
    hoverFxClass: "fx-ocean",
    characters: [
      {
        name: "Monkey D. Luffy",
        role: "Captain of the Straw Hat Pirates",
        description: "Wielder of the Mythical Zoan Sun God Nika fruit, embodying joy, liberation, and immense tenacity.",
        quote: "If you don't take risks, you can't create a future!"
      },
      {
        name: "Roronoa Zoro",
        role: "The Three-Sword King of Hell",
        description: "First mate and swordsman who aims to surpass Dracule Mihawk as the greatest swordsman on earth.",
        quote: "Scars on the back are a swordsman's shame."
      },
      {
        name: "Nico Robin",
        role: "Archaeologist of Ohara",
        description: "Sole human capable of deciphering the ancient Poneglyphs and uncovering the Void Century.",
        quote: "I want to live! Take me out to the sea with you!"
      }
    ],
    highlights: ["Gear 5 Awakening", "Marineford War", "Egghead Island Arc"],
    trivia: "Eiichiro Oda's manga holds the Guinness World Record for the most copies published for the same comic book series by a single author."
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    japaneseTitle: "俺だけレベルアップな件",
    romajiTitle: "Ore dake Level Up na Ken",
    tagline: "Studio A-1 Pictures",
    description: "Sung Jinwoo, once the world's weakest hunter, gains a mysterious 'System' that lets him level up without limits.",
    synopsisLong: "After surviving a massacre in a double dungeon, E-rank hunter Sung Jinwoo receives a solitary quest log visible only to him. Ascending from prey to the all-conquering Shadow Monarch, his journey delivers relentless monster-slaying spectacle and pure dopamine progression.",
    studio: "A-1 Pictures",
    episodes: "24+ eps",
    years: "2024–Present",
    score: 8.6,
    genres: ["Dark Fantasy", "Action", "Dungeon Hunter", "Supernatural"],
    palette: {
      primary: "#6A1B9A",
      secondary: "#3DA9FC",
      deep: "#0D1117",
      glowRgb: "106, 27, 154"
    },
    posterUrl: "https://sololeveling-anime.net/assets/img/s3/s3_visual.jpg",
    fallbackPosterUrl: "https://i.ytimg.com/vi/byJ7pxxhaDY/maxresdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/byJ7pxxhaDY/maxresdefault.jpg",
    trailer: {
      videoId: "byJ7pxxhaDY",
      title: "Solo Leveling Season 2 -Arise from the Shadow- | Official Trailer | Crunchyroll",
      channel: "Crunchyroll",
      watchUrl: "https://youtube.com/watch?v=byJ7pxxhaDY",
      embedUrl: "https://www.youtube-nocookie.com/embed/byJ7pxxhaDY",
      thumbnailUrl: "https://i.ytimg.com/vi/byJ7pxxhaDY/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/byJ7pxxhaDY/hqdefault.jpg"
    },
    officialSite: "https://sololeveling-anime.net/",
    englishLicensor: "Crunchyroll",
    hoverFxClass: "fx-level-up",
    characters: [
      {
        name: "Sung Jinwoo",
        role: "The Shadow Monarch",
        description: "From 'the weakest hunter of mankind' to the sovereign of death commanding legions of loyal shadow soldiers.",
        quote: "Arise."
      },
      {
        name: "Cha Hae-In",
        role: "S-Rank Vice Guild Master",
        description: "Master swordswoman of the Hunters Guild whose sensitive scent perception uniquely accepts Jinwoo.",
        quote: "I can't smell any stench on you... you smell pleasant."
      },
      {
        name: "Igris the Bloodred",
        role: "Loyal Shadow Knight Commander",
        description: "Nobly chivalric knight resurrected as Jinwoo's first legendary shadow commander.",
        quote: "Sworn to guard the Shadow Monarch with unfaltering fealty."
      }
    ],
    highlights: ["The Double Dungeon Trial", "Red Gate Survival", "Jeju Island Raid"],
    trivia: "The anime adaptation features Hiroyuki Sawano's pulse-pounding soundtrack and vocals by TOMORROW X TOGETHER."
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    japaneseTitle: "ブルーロック",
    romajiTitle: "Blue Lock",
    tagline: "8bit Studio · High-Voltage Sports Battle",
    description: "Three hundred of Japan's best young strikers are sealed in the Blue Lock facility, where only one can emerge as the ace striker.",
    synopsisLong: "Following Japan's elimination from the 2018 World Cup, the eccentric Jinpachi Ego creates a prison-like soccer laboratory. To create the ultimate striker, three hundred high school forwards compete in cutthroat matches where the eliminated are banned from the national team forever.",
    studio: "8bit",
    episodes: "38+ eps & film",
    years: "2022–Present",
    score: 8.5,
    genres: ["Sports", "Psychological", "Battle Royale", "Drama"],
    palette: {
      primary: "#00CFFF",
      secondary: "#0E2A9E",
      deep: "#0B0E1A",
      glowRgb: "0, 207, 255"
    },
    posterUrl: "https://bluelock-pr.com/portalwp/wp-content/themes/bluelock-portal-web/_assets/images/fv/fv_tv3rd_000.png",
    fallbackPosterUrl: "https://i.ytimg.com/vi/w4V_e3iRxds/maxresdefault.jpg",
    heroBannerUrl: "https://i.ytimg.com/vi/w4V_e3iRxds/maxresdefault.jpg",
    trailer: {
      videoId: "w4V_e3iRxds",
      title: "TVアニメ『ブルーロック』ティザーPV | BLUE LOCK Teaser",
      channel: "Bandai Namco Filmworks",
      watchUrl: "https://www.youtube.com/watch?v=w4V_e3iRxds",
      embedUrl: "https://www.youtube-nocookie.com/embed/w4V_e3iRxds",
      thumbnailUrl: "https://i.ytimg.com/vi/w4V_e3iRxds/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/w4V_e3iRxds/hqdefault.jpg"
    },
    officialSite: "https://bluelock-anime-en.com/",
    englishLicensor: "Bandai Namco Filmworks / Crunchyroll",
    hoverFxClass: "fx-ego",
    characters: [
      {
        name: "Yoichi Isagi",
        role: "Spatial Awareness Striker",
        description: "Calculative striker who smells the scent of a goal and reconstructs puzzle pieces of the pitch to devour opponents.",
        avatarUrl: "https://bluelock-anime-en.com/wp-content/themes/anime/assets/images/chara01.png",
        quote: "I didn't come to Blue Lock to be a team player. I came to be the number one striker in the world!"
      },
      {
        name: "Meguru Bachira",
        role: "Dribbling Freestyle Genius",
        description: "Guided by the inner 'Monster', playing with joy, flair, and dizzying dribbling footwork.",
        quote: "I just want to play soccer with someone who can see my monster."
      },
      {
        name: "Seishiro Nagi",
        role: "Prodigious Trapping Virtuoso",
        description: "Naturally gifted slacker whose impossible first-touch ball trapping defies physical reality.",
        quote: "It's a pain to try hard, but winning is actually kinda interesting."
      }
    ],
    highlights: ["First Selection Survival", "Second Selection 3v3 Battles", "U-20 Japan National Clash"],
    trivia: "The manga won the 45th Kodansha Manga Award in the shonen category and inspired official merchandise collaborations with professional Japanese football leagues."
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    japaneseTitle: "僕のヒーローアカデミア",
    romajiTitle: "Boku no Hero Academia",
    tagline: "Studio Bones · 10th Anniversary Hub",
    description: "In a world where nearly everyone has a Quirk, quirkless Izuku Midoriya inherits the power of the greatest hero and enrolls at U.A. High.",
    synopsisLong: "Born without supernatural abilities in a superhuman society, young Izuku Midoriya's self-sacrificing heart catches the eye of All Might, the Symbol of Peace. Inheriting the sacred flame of One For All, Deku leads the next generation into the climactic Final War for the soul of humanity.",
    studio: "Studio Bones",
    episodes: "150+ eps & 4 films",
    years: "2016–Present",
    score: 8.6,
    genres: ["Superhero", "Action", "School Shonen", "Sci-Fi"],
    palette: {
      primary: "#E4002B",
      secondary: "#FFC72C",
      deep: "#0F1B3D",
      glowRgb: "228, 0, 43"
    },
    posterUrl: "https://myheroacademia.link/10-anniversary/assets/images/deku_d05.png",
    fallbackPosterUrl: "https://i.ytimg.com/vi/wQgQij8Ry4g/maxresdefault.jpg",
    heroBannerUrl: "https://myheroacademia.link/10-anniversary/assets/images/MHA_10A_TikTokCampaign_Banner_Horizontal.jpg",
    trailer: {
      videoId: "wQgQij8Ry4g",
      title: "『僕のヒーローアカデミア FINAL SEASON』本PV | MHA Final Season",
      channel: "TOHO animation",
      watchUrl: "https://www.youtube.com/watch?v=wQgQij8Ry4g",
      embedUrl: "https://www.youtube-nocookie.com/embed/wQgQij8Ry4g",
      thumbnailUrl: "https://i.ytimg.com/vi/wQgQij8Ry4g/maxresdefault.jpg",
      fallbackThumbnail: "https://i.ytimg.com/vi/wQgQij8Ry4g/hqdefault.jpg"
    },
    officialSite: "https://myheroacademia.link/",
    englishLicensor: "TOHO animation",
    hoverFxClass: "fx-plus-ultra",
    characters: [
      {
        name: "Izuku 'Deku' Midoriya",
        role: "Successor to One For All",
        description: "Analytical, selfless hero who broke through every physiological barrier to save friends and enemies alike.",
        avatarUrl: "https://myheroacademia.link/10-anniversary/assets/images/deku_d05.png",
        quote: "A smiling, dependable, cool hero... That's what I wanna be! That's why I'm giving it everything! For everyone!"
      },
      {
        name: "Katsuki Bakugo",
        role: "Explosion / Great Explosion Murder God",
        description: "Deku's childhood friend and fierce rival whose explosive quirk matches his ferociously prideful ambition.",
        quote: "I'm gonna be the number one hero! Better than All Might, better than anyone!"
      },
      {
        name: "All Might (Toshinori Yagi)",
        role: "The Symbol of Peace",
        description: "The 8th wielder of One For All whose bright smile reassured citizens across decades of turmoil.",
        quote: "It's fine now. Why? Because I am here!"
      }
    ],
    highlights: ["All Might vs All For One at Kamino", "Deku vs Shigaraki in Final War", "Heroes Rising Climactic Double Smash"],
    trivia: "The author Kohei Horikoshi was deeply inspired by classic Western comic heroes like Spider-Man and Superman when conceptualizing Deku and All Might."
  }
];

export const GLOBAL_STATS = [
  { value: "8", label: "Masterpiece Franchises", sublabel: "Curated legendary epics" },
  { value: "2,150+", label: "Total TV Episodes", sublabel: "Spanning 25+ years of broadcast" },
  { value: "7", label: "Top Animation Studios", sublabel: "MAPPA, ufotable, Toei, Bones & more" },
  { value: "8.8", label: "Average Global Score", sublabel: "Critically acclaimed worldwide" }
];
