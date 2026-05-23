// data.jsx — Trip data
// Japan 2026 · Jul 29 – Aug 14 · 17 days

const TRIP = {
  title: "Japan '26",
  subtitle: "Seventeen days · Tokyo, Fuji, the open road & Kansai",
  startDate: "2026-07-29",
  endDate: "2026-08-14",
  totalDays: 17,
  hashtag: "#KKU旅",
};

const TRAVELERS = [
  { id: "07", name: "Phumipat Buaphet",   nick: "Phum",    code: "6630611007", hue: 8   },
  { id: "12", name: "Dechnarin Prabpala",  nick: "Dech",    code: "6630611012", hue: 200 },
  { id: "30", name: "Nonpawit Denyuk",     nick: "Non",     code: "6630611030", hue: 152 },
  { id: "33", name: "Auchukorn Veschapun", nick: "Au",      code: "6630611033", hue: 38  },
  { id: "43", name: "Worathep Panton",     nick: "Top",     code: "6630611043", hue: 282 },
];

const CITIES = {
  tokyo:   { name: "Tokyo",        kanji: "東京",     x: 690, y: 470, days: "Jul 29 – Aug 8" },
  fuji:    { name: "Fuji Five Lakes", kanji: "富士五湖", x: 655, y: 488, days: "Aug 3" },
  kamakura:{ name: "Kamakura",     kanji: "鎌倉",     x: 680, y: 495, days: "Aug 2" },
  mishima: { name: "Mishima",      kanji: "三島",     x: 640, y: 505, days: "Aug 8" },
  hamana:  { name: "Lake Hamana",  kanji: "浜名湖",   x: 590, y: 525, days: "Aug 8" },
  osaka:   { name: "Osaka",        kanji: "大阪",     x: 440, y: 555, days: "Aug 8 – 14" },
  kyoto:   { name: "Kyoto",        kanji: "京都",     x: 450, y: 540, days: "Aug 10" },
  nara:    { name: "Nara",         kanji: "奈良",     x: 460, y: 562, days: "Aug 11" },
  kobe:    { name: "Kobe",         kanji: "神戸",     x: 420, y: 558, days: "Aug 13" },
  himeji:  { name: "Himeji",       kanji: "姫路",     x: 380, y: 560, days: "Aug 13" },
};

// Weather (forecast / averages for late Jul – mid Aug)
const WEATHER = {
  tokyo: { hi: 32, lo: 25, icon: "☀️", note: "Hot & humid · brief PM showers" },
  fuji:  { hi: 26, lo: 17, icon: "⛅", note: "Cooler at altitude · pack layers" },
  osaka: { hi: 34, lo: 26, icon: "☀️", note: "Sticky heat · stay hydrated" },
  kyoto: { hi: 33, lo: 25, icon: "🌤️", note: "Temple shade is gold" },
  nara:  { hi: 33, lo: 24, icon: "☀️", note: "Same as Kyoto" },
  kobe:  { hi: 32, lo: 26, icon: "⛅", note: "Sea breeze helps" },
};

// Day-by-day. Each day has city, optional hero photo, blocks (timeline items).
const DAYS = [
  {
    n: 1, date: "2026-07-29", dow: "Wed", city: "tokyo", base: "In transit · HKT → SIN → NRT",
    title: "Travel day · 出発",
    summary: "Scoot out of Phuket at 13:15, six-hour self-transit at Changi, red-eye to Narita.",
    hero: "expressway",
    blocks: [
      { t: "10:30", tag: "🚗", label: "Meet at HKT Departures, Terminal Intl", note: "3 hr before flight · group photo" },
      { t: "13:15", tag: "✈️", label: "TR 657  HKT → SIN", note: "Scoot · 3h20m · land Changi 16:35" },
      { t: "16:35", tag: "🛬", label: "Self-transit at Changi T1", note: "Re-clear security · 6h30m layover" },
      { t: "18:00", tag: "🍜", label: "Dinner at Changi · Jewel food hall", note: "Rain Vortex photo op (free side)" },
      { t: "23:05", tag: "✈️", label: "TR 884  SIN → NRT", note: "Scoot · 7h overnight · sleep on board" },
    ],
    budget: 8308,
  },
  {
    n: 2, date: "2026-07-30", dow: "Thu", city: "tokyo", base: "Grande Morishita (check-in 16:00)",
    title: "Touchdown · 着いた！",
    summary: "Land at Narita 07:05, train into the city, drop bags in Morishita, half-day around Asakusa & Skytree.",
    hero: "sensoji",
    blocks: [
      { t: "07:05", tag: "🛬", label: "TR 884 lands Narita (NRT) T1", note: "Immigration + bags ~45 min" },
      { t: "08:30", tag: "🚆", label: "Narita Express → Tokyo → Sōbu line", note: "~90 min to Morishita Station" },
      { t: "10:30", tag: "🛏️", label: "Drop bags · Grande Morishita", note: "Check-in not until 16:00" },
      { t: "11:30", tag: "🍜", label: "Lunch: Ryōgoku chankō nabe", note: "Sumo-style hotpot, 10 min walk" },
      { t: "13:30", tag: "⛩️", label: "Sensō-ji & Nakamise-dōri", note: "Asakusa · 2 stops on Toei Ōedo" },
      { t: "15:30", tag: "🗼", label: "Tokyo Skytree (Sumida)", note: "Walk over from Asakusa via the river" },
      { t: "17:00", tag: "🛏️", label: "Real check-in · 9 nt · room rest", note: "Reset the body clock · nap if you can" },
      { t: "20:00", tag: "🍢", label: "Dinner: Hoppy-dōri yakitori", note: "Backstreet izakaya alley, Asakusa" },
    ],
    budget: 4200,
  },
  {
    n: 3, date: "2026-07-31", dow: "Fri", city: "tokyo", base: "Shinjuku",
    title: "Shibuya · Harajuku · Omotesandō",
    summary: "Crossing, crepes, Meiji forest, and a long Omotesandō stroll.",
    hero: "shibuya-crossing",
    blocks: [
      { t: "10:00", tag: "🦮", label: "Hachikō statue · Shibuya Scramble", note: "Best shot: Starbucks 2F window" },
      { t: "11:30", tag: "🌳", label: "Meiji Jingū", note: "Forest path · free" },
      { t: "13:00", tag: "🥞", label: "Lunch: Harajuku Gyōza Lou", note: "¥290 a plate · hidden side street" },
      { t: "14:30", tag: "🛍️", label: "Takeshita-dōri + Cat Street", note: "Crepe stop required" },
      { t: "17:00", tag: "🏙️", label: "Shibuya Sky sunset", note: "Reserve 17:30 slot · ¥2,500" },
      { t: "20:00", tag: "🍣", label: "Dinner: Uobei sushi (conveyor)", note: "Touchscreen, all ¥110" },
    ],
    budget: 5400,
  },
  {
    n: 4, date: "2026-08-01", dow: "Sat", city: "tokyo", base: "Shinjuku",
    title: "teamLab · Odaiba",
    summary: "Lose an afternoon inside a mirror room. Recover in the bay.",
    hero: "teamlab",
    blocks: [
      { t: "10:00", tag: "🎨", label: "teamLab Planets, Toyosu", note: "Reserved 10:30 slot · barefoot, wear shorts" },
      { t: "13:30", tag: "🍔", label: "Lunch: AquaCity food court", note: "Tonkatsu / sushi / freedom" },
      { t: "15:00", tag: "🤖", label: "Gundam Unicorn, DiverCity", note: "Transforms at 17:00" },
      { t: "17:30", tag: "🌉", label: "Rainbow Bridge walk", note: "Free · golden hour" },
      { t: "20:00", tag: "♨️", label: "Optional: Ōedo Onsen alternative", note: "Tattoo-friendly options nearby" },
    ],
    budget: 5800,
  },
  {
    n: 5, date: "2026-08-02", dow: "Sun", city: "kamakura", base: "Shinjuku (day trip)",
    title: "Kamakura day trip",
    summary: "Great Buddha, bamboo, then Enoshima for sunset by the sea.",
    hero: "kamakura-buddha",
    blocks: [
      { t: "08:30", tag: "🚆", label: "JR Yokosuka line → Kamakura", note: "~1h · ¥940" },
      { t: "10:00", tag: "🪷", label: "Hasedera + Kōtoku-in Daibutsu", note: "Big Buddha · ¥300" },
      { t: "12:30", tag: "🐟", label: "Lunch: Komachi-dōri shirasu rice", note: "Whitebait local specialty" },
      { t: "14:30", tag: "🎋", label: "Hōkoku-ji bamboo grove", note: "Matcha set ¥600" },
      { t: "16:30", tag: "🌊", label: "Enoden tram → Enoshima", note: "Iconic coastal line" },
      { t: "18:30", tag: "🌅", label: "Sunset · Sea Candle", note: "Return Shinjuku by 21:30" },
    ],
    budget: 4200,
  },
  {
    n: 6, date: "2026-08-03", dow: "Mon", city: "fuji", base: "Shinjuku (day trip)",
    title: "Mt. Fuji · Kawaguchiko",
    summary: "Highway bus out, lakeside views, Chureito pagoda if Fuji shows her face.",
    hero: "fuji-pagoda",
    blocks: [
      { t: "07:30", tag: "🚌", label: "Highway bus · Shinjuku → Kawaguchiko", note: "~2h · ¥2,200 · book seats" },
      { t: "10:00", tag: "🏔️", label: "Lake Kawaguchi north shore", note: "Classic Fuji-with-lake shot" },
      { t: "12:00", tag: "🍜", label: "Lunch: Hōtō Fudō", note: "Pumpkin udon · igloo restaurant" },
      { t: "14:00", tag: "⛩️", label: "Chureito Pagoda climb", note: "398 steps. Worth it." },
      { t: "16:00", tag: "🎡", label: "Fuji-Q? Or chill at Oishi Park", note: "Group vote en route" },
      { t: "19:30", tag: "🚌", label: "Return bus to Shinjuku", note: "Last bus 20:55" },
    ],
    budget: 5600,
  },
  {
    n: 7, date: "2026-08-04", dow: "Tue", city: "tokyo", base: "Shinjuku",
    title: "Ghibli · Kichijōji",
    summary: "A morning in Totoro's world, an afternoon in Inokashira Park, an evening of izakaya.",
    hero: "ghibli",
    blocks: [
      { t: "10:00", tag: "🎬", label: "Ghibli Museum, Mitaka", note: "Tickets booked — print confirmation!" },
      { t: "13:00", tag: "🍡", label: "Lunch: Sarutahiko coffee + sando", note: "Kichijōji north exit" },
      { t: "14:30", tag: "🌳", label: "Inokashira Park · swan boats", note: "¥800 / 30 min" },
      { t: "16:30", tag: "🛒", label: "Harmonica Yokochō stalls", note: "Cheap snacks + vintage" },
      { t: "19:00", tag: "🍶", label: "Dinner: Iseya yakitori (Kichijōji)", note: "Cash only · founded 1928" },
    ],
    budget: 4900,
  },
  {
    n: 8, date: "2026-08-05", dow: "Wed", city: "tokyo", base: "Shinjuku",
    title: "Tsukiji · Ginza · Tokyo Tower",
    summary: "Eat the market, walk the boulevard, end with the orange tower.",
    hero: "tokyo-tower",
    blocks: [
      { t: "07:30", tag: "🐟", label: "Tsukiji Outer Market breakfast", note: "Tamagoyaki, uni, otoro skewer" },
      { t: "10:30", tag: "🏯", label: "Imperial Palace East Gardens", note: "Free · close at 16:30" },
      { t: "13:00", tag: "🍣", label: "Sushi lunch · Sushi Zanmai Ginza", note: "Set lunch ¥1,650" },
      { t: "14:30", tag: "🛍️", label: "Ginza stroll · Itoya, Uniqlo flagship", note: "Sunday = pedestrian paradise" },
      { t: "18:00", tag: "🗼", label: "Tokyo Tower up close", note: "Better photographed than climbed" },
      { t: "20:00", tag: "🍻", label: "Izakaya Toranomon Yokochō", note: "Sleek vs. Omoide" },
    ],
    budget: 5500,
  },
  {
    n: 9, date: "2026-08-06", dow: "Thu", city: "tokyo", base: "Shinjuku",
    title: "DisneySea",
    summary: "Park open to close. Bring portable battery. Wear comfortable shoes.",
    hero: "disneysea",
    blocks: [
      { t: "07:30", tag: "🚆", label: "Maihama line · Disney Resort", note: "1-day passport ¥10,900" },
      { t: "09:00", tag: "🎢", label: "Park open · rope drop Soaring", note: "Get Premier Access for Tower of Terror" },
      { t: "12:30", tag: "🥟", label: "Lunch: Gyoza dog, Arabian Coast", note: "The Disney food meme" },
      { t: "17:00", tag: "🌊", label: "Fortress Explorations + Venetian Gondolas", note: "Sit-down break" },
      { t: "20:30", tag: "🎆", label: "Believe! Sea of Dreams show", note: "Mediterranean Harbor" },
      { t: "22:00", tag: "🚆", label: "Back to Shinjuku · pack tonight", note: "Big drive tomorrow" },
    ],
    budget: 14500,
  },
  {
    n: 10, date: "2026-08-07", dow: "Fri", city: "tokyo", base: "Grande Morishita (last night)",
    title: "Akihabara · last Tokyo day",
    summary: "Retro games in the morning, Don Quijote haul in the afternoon, pick up the rental, early night before the drive.",
    hero: "donki",
    blocks: [
      { t: "10:00", tag: "🎮", label: "Akihabara: Super Potato, Yodobashi", note: "Top — retro game shopping list" },
      { t: "13:00", tag: "🍜", label: "Lunch: Afuri yuzu ramen", note: "Citrus broth · light finish" },
      { t: "15:00", tag: "🛒", label: "Don Quijote · tax-free haul", note: "Passport required at counter" },
      { t: "17:00", tag: "📷", label: "Free slot — Nakameguro / Daikanyama", note: "Tsutaya bookstore" },
      { t: "18:30", tag: "🚗", label: "Pick up rental · Times Car Kanda", note: "8-seater · IDP ready" },
      { t: "20:00", tag: "🍱", label: "Konbini dinner + repack", note: "Early night before drive" },
    ],
    budget: 4600,
  },
  {
    // The user-provided Day 11 — preserve their Thai labels verbatim.
    n: 11, date: "2026-08-08", dow: "Sat", city: "tokyo", endCity: "osaka", base: "On the road · 東名/新東名",
    title: "Tokyo → Osaka road day",
    summary: "Seven hours of expressway, two service-area stops, one Skywalk, and ramen in Namba by 22:00.",
    hero: "expressway",
    drive: true,
    blocks: [
      { t: "10:30–11:45", tag: "🚗", label: "Kanda → Ebina SA",                    note: "ออกเดินทางจากโตเกียว" },
      { t: "11:45–12:45", tag: "🍈", label: "Ebina SA (ขาออก)",                    note: "แวะพัก + มื้อเที่ยง" },
      { t: "12:45–13:45", tag: "🛣️", label: "Ebina SA ➔ Mishima",                  note: "ขับรถช่วงบ่าย" },
      { t: "13:45–15:15", tag: "🌉", label: "Mishima Skywalk",                    note: "เดินเล่น ถ่ายรูป" },
      { t: "15:15–17:00", tag: "🛣️", label: "Mishima ➔ Hamanako",                 note: "ขึ้นเส้น Shin-Tomei" },
      { t: "17:00–18:00", tag: "🌅", label: "EXPASA Hamanako",                    note: "แวะพัก + มื้อเย็น" },
      { t: "18:00–21:30", tag: "🛣️", label: "Hamanako ➔ Namba",                   note: "ยิงยาวเข้าโอซาก้า" },
      { t: "21:30",       tag: "📍", label: "Namba, Osaka",                       note: "ถึงที่พักโดยสวัสดิภาพ" },
    ],
    budget: 11200,
    pinned: true,
  },
  {
    n: 12, date: "2026-08-09", dow: "Sun", city: "osaka", base: "Namba",
    title: "Osaka unpacked · Dōtonbori",
    summary: "Sleep in, castle in the afternoon, takoyaki crawl after dark.",
    hero: "dotonbori",
    blocks: [
      { t: "10:00", tag: "🛏️", label: "Sleep-in · breakfast in Namba", note: "Recovery from the drive" },
      { t: "12:30", tag: "🏯", label: "Osaka Castle + park", note: "¥600 · skip if it's 35°C" },
      { t: "15:00", tag: "🌆", label: "Umeda Sky Building", note: "Floating garden observatory" },
      { t: "18:30", tag: "🐙", label: "Dōtonbori takoyaki crawl", note: "Kukuru → Wanaka → Creo-ru" },
      { t: "21:00", tag: "📷", label: "Glico sign group photo", note: "Required by tradition" },
    ],
    budget: 5200,
  },
  {
    n: 13, date: "2026-08-10", dow: "Mon", city: "kyoto", base: "Namba (day trip)",
    title: "Kyoto day trip",
    summary: "Torii tunnel sunrise, golden pavilion at noon, geisha district at dusk.",
    hero: "fushimi-inari",
    blocks: [
      { t: "06:30", tag: "🚆", label: "Limited Express → Kyoto", note: "Beat the crowds" },
      { t: "08:00", tag: "⛩️", label: "Fushimi Inari · climb to Yotsutsuji", note: "1h round trip · early = empty" },
      { t: "11:00", tag: "🏯", label: "Kinkaku-ji (Golden Pavilion)", note: "¥500" },
      { t: "13:30", tag: "🍵", label: "Lunch: Nishiki Market", note: "Pickles, dashimaki, yuba" },
      { t: "16:00", tag: "🎋", label: "Arashiyama bamboo grove", note: "Going late = quieter" },
      { t: "19:00", tag: "👘", label: "Gion lantern walk · Hanami-kōji", note: "No flash photos of geisha" },
      { t: "21:30", tag: "🚆", label: "Return to Namba", note: "" },
    ],
    budget: 5800,
  },
  {
    n: 14, date: "2026-08-11", dow: "Tue", city: "nara", base: "Namba (day trip)",
    title: "Nara · deer & temples",
    summary: "Half-day in the deer park, back to Osaka for arcades and round-2 Dōtonbori.",
    hero: "nara-deer",
    blocks: [
      { t: "09:00", tag: "🦌", label: "Nara Park · feed the deer", note: "¥200 senbei · bow back, they bow first" },
      { t: "11:00", tag: "🏯", label: "Tōdai-ji Daibutsuden", note: "¥600 · the wooden hall is the headline" },
      { t: "13:00", tag: "🍣", label: "Lunch: kakinoha-zushi", note: "Persimmon-leaf sushi · Nara specialty" },
      { t: "15:00", tag: "🚆", label: "Back to Namba", note: "" },
      { t: "17:00", tag: "🎮", label: "Round 1 + Don Quijote, Shinsaibashi", note: "Arcade UFO catchers" },
      { t: "20:00", tag: "🥩", label: "Dinner: Yakiniku Maruyoshi", note: "Reserve · all-you-can-eat A5" },
    ],
    budget: 6100,
  },
  {
    n: 15, date: "2026-08-12", dow: "Wed", city: "osaka", base: "Namba",
    title: "Universal Studios Japan",
    summary: "Nintendo World, Hogwarts, Mario Kart. Park open to close.",
    hero: "usj",
    blocks: [
      { t: "07:30", tag: "🚇", label: "Yumesaki line · Universal City", note: "1-day Studio Pass ¥9,800" },
      { t: "09:00", tag: "🍄", label: "Super Nintendo World", note: "Power-Up Band recommended" },
      { t: "13:00", tag: "🍔", label: "Lunch: Three Broomsticks", note: "Butterbeer mandatory" },
      { t: "15:00", tag: "🧙", label: "Forbidden Journey + Spider-Man", note: "Express Pass 4 if budget allows" },
      { t: "20:00", tag: "🎆", label: "No Limit Parade · close", note: "" },
      { t: "22:00", tag: "🍜", label: "Late ramen: Kinryu Dōtonbori", note: "24h dragon ramen" },
    ],
    budget: 14200,
  },
  {
    n: 16, date: "2026-08-13", dow: "Thu", city: "kobe", base: "Namba (day trip)",
    title: "Kobe & Himeji",
    summary: "Drive west: white castle in the morning, beef for lunch, harbor at dusk.",
    hero: "himeji-castle",
    blocks: [
      { t: "08:00", tag: "🚗", label: "Drive · Namba → Himeji", note: "~1h45 · expressway" },
      { t: "10:00", tag: "🏯", label: "Himeji Castle", note: "¥1,000 · 'White Heron' · climb the keep" },
      { t: "13:00", tag: "🥩", label: "Lunch: Kobe beef teppanyaki", note: "Splurge meal · book Steakland" },
      { t: "16:00", tag: "🛥️", label: "Kobe Harborland + Meriken Park", note: "Port tower, photo stop" },
      { t: "19:30", tag: "🛣️", label: "Drive back to Namba", note: "Refuel before return tomorrow" },
    ],
    budget: 9800,
  },
  {
    n: 17, date: "2026-08-14", dow: "Fri", city: "osaka", base: "Namba → KIX → DMK → HKT",
    title: "Sayōnara · さようなら",
    summary: "Last konbini breakfast, return the car, midday AirAsia X to Don Mueang, evening Nok Air back to Phuket.",
    hero: "kix",
    blocks: [
      { t: "06:30", tag: "🍙", label: "FamilyMart breakfast + final pack", note: "Souvenir check · liquids in checked bag" },
      { t: "07:30", tag: "🚗", label: "Return rental car · Times KIX", note: "Refuel station next door" },
      { t: "08:30", tag: "✈️", label: "Check in · KIX Terminal 1", note: "Tax-refund counter first" },
      { t: "10:25", tag: "🛫", label: "XJ 613  AirAsia X · KIX → DMK", note: "Land Don Mueang 14:25" },
      { t: "14:25", tag: "🛬", label: "Self-transit at DMK", note: "4h25m · lounge / Magic Food Point" },
      { t: "18:50", tag: "✈️", label: "DD 530  Nok Air · DMK → HKT", note: "Arrive Phuket 20:20 · おつかれさま" },
    ],
    budget: 6585,
  },
];

// Reservations log
const RESERVATIONS = [
  { date: "2026-07-29", time: "13:15", type: "flight",  what: "TR 657  Scoot · HKT → SIN",     ref: "TR-657/SCOOT",   who: "All 5",  status: "confirmed", cost: 0 },
  { date: "2026-07-29", time: "23:05", type: "flight",  what: "TR 884  Scoot · SIN → NRT",     ref: "TR-884/SCOOT",   who: "All 5",  status: "confirmed", cost: 41540 },
  { date: "2026-07-30", time: "16:00", type: "hotel",   what: "Grande Morishita (×9 nt) · Morishita Stn.", ref: "AGODA-GM-7714", who: "All 5", status: "confirmed", cost: 43330 },
  { date: "2026-08-01", time: "10:30", type: "ticket",  what: "teamLab Planets Toyosu",     ref: "TL-7702-AUG01",  who: "All 5",  status: "confirmed", cost: 19000 },
  { date: "2026-08-03", time: "07:30", type: "transit", what: "Highway bus Shinjuku ↔ Kawaguchiko", ref: "FUJI-EXP-0803", who: "All 5", status: "confirmed", cost: 22000 },
  { date: "2026-08-04", time: "10:00", type: "ticket",  what: "Ghibli Museum, Mitaka",      ref: "GHIBLI-080426",  who: "All 5",  status: "confirmed", cost: 5000 },
  { date: "2026-08-06", time: "09:00", type: "ticket",  what: "Tokyo DisneySea 1-day passport", ref: "TDS-AUG06-G5", who: "All 5", status: "confirmed", cost: 54500 },
  { date: "2026-08-07", time: "18:00", type: "car",     what: "Times Car Rental · 8-seater (7 days)", ref: "TIMES-S87440", who: "Phum (driver)", status: "confirmed", cost: 64800 },
  { date: "2026-08-08", time: "21:30", type: "hotel",   what: "Hotel Namba (×6 nt)",         ref: "NAMBA-HTL-441",  who: "All 5",  status: "confirmed", cost: 48600 },
  { date: "2026-08-11", time: "20:00", type: "dining",  what: "Yakiniku Maruyoshi (×5)",     ref: "TableCheck#9912", who: "All 5",  status: "confirmed", cost: 0 },
  { date: "2026-08-12", time: "09:00", type: "ticket",  what: "USJ 1-day Studio Pass + Nintendo Area", ref: "USJ-NINT-AUG12", who: "All 5", status: "confirmed", cost: 49000 },
  { date: "2026-08-13", time: "13:00", type: "dining",  what: "Steakland Kobe lunch course (×5)", ref: "Steakland/CALL", who: "All 5",  status: "pending",   cost: 0 },
  { date: "2026-08-14", time: "10:25", type: "flight",  what: "XJ 613  AirAsia X · KIX → DMK",  ref: "XJ-613/AAX",     who: "All 5",  status: "confirmed", cost: 21000 },
  { date: "2026-08-14", time: "18:50", type: "flight",  what: "DD 530  Nok Air · DMK → HKT",  ref: "DD-530/NOKAIR",  who: "All 5",  status: "confirmed", cost: 11925 },
];

// Budget categories (in THB · running total)
const BUDGET = {
  budgetPerPerson: 65000,    // THB
  spentPerPerson: 41280,     // calculated approx
  categories: [
    { key: "flights",    label: "Flights",            spent: 14893, total: 14893 },
    { key: "lodging",    label: "Lodging · Tokyo",     spent:  8666, total:  8666 },
    { key: "lodging2",   label: "Lodging · Osaka",     spent:  6800, total:  6800 },
    { key: "transit",    label: "Trains, NEX & bus",   spent:  3400, total:  6500 },
    { key: "car",        label: "Car rental + tolls",  spent: 13860, total: 15000 },
    { key: "food",       label: "Food & drink",        spent:  4200, total: 14000 },
    { key: "tickets",    label: "Attractions",         spent: 14200, total: 14200 },
    { key: "shopping",   label: "Shopping / gifts",    spent:     0, total:  8000 },
    { key: "misc",       label: "Misc / buffer",       spent:   640, total:  5000 },
  ],
};

const TODOS = [
  { id: "t1",  text: "Confirm Steakland Kobe reservation (call EN line)",        done: false, who: "Au"   },
  { id: "t2",  text: "Buy Suica/IC cards at Haneda arrivals",                    done: false, who: "All"  },
  { id: "t3",  text: "Print Ghibli Museum tickets (no phone entry!)",            done: true,  who: "Top"  },
  { id: "t4",  text: "International Driving Permit — Phum",                      done: true,  who: "Phum" },
  { id: "t5",  text: "Pocket Wi-Fi pickup voucher → in carry-on",                done: true,  who: "Dech" },
  { id: "t6",  text: "Split the rental car deposit on the group sheet",          done: false, who: "Non"  },
  { id: "t7",  text: "Download offline Google Maps for Tokyo + Kansai",          done: false, who: "All"  },
  { id: "t8",  text: "Set up Apple Wallet IC card for everyone",                 done: false, who: "All"  },
  { id: "t9",  text: "Pack: charger, adapter (Type A), umbrella, painkillers",   done: false, who: "All"  },
  { id: "t10", text: "Tax-refund passport photocopies",                          done: false, who: "Top"  },
];

// Hero photo "placeholders" — we generate gradients keyed to each hero id.
const HERO_GRADIENTS = {
  "shinjuku-night":   ["#1d1b4b", "#9a3460", "#f6a07a"],
  "sensoji":          ["#8a2a1d", "#d96b3a", "#f3d7b5"],
  "shibuya-crossing": ["#0f3a55", "#3088b8", "#e9d8b7"],
  "teamlab":          ["#1b0a3a", "#7138c2", "#39d6e2"],
  "kamakura-buddha":  ["#2c4a2e", "#7da06d", "#e6dbb6"],
  "fuji-pagoda":      ["#a93a52", "#e08a7a", "#f6e3d2"],
  "ghibli":           ["#2f5e3a", "#88b07c", "#f6efd6"],
  "tokyo-tower":      ["#2a2229", "#cf4a2c", "#f3d7a4"],
  "disneysea":        ["#0d2b5c", "#39a0d8", "#f8d2a7"],
  "donki":            ["#fac312", "#e23a3a", "#1a1a1a"],
  "expressway":       ["#1d2236", "#4a6b85", "#d8b67a"],
  "dotonbori":        ["#7a1a2c", "#d0303f", "#f6cf7a"],
  "fushimi-inari":    ["#7a1d20", "#cf3f33", "#1d1a18"],
  "nara-deer":        ["#3a4a2d", "#a39067", "#e9dcb6"],
  "usj":              ["#0d2a55", "#e23a3a", "#f7c93c"],
  "himeji-castle":    ["#264a6b", "#a6c5d6", "#f6f0e6"],
  "kix":              ["#1a2a44", "#4a6e8c", "#e3b06a"],
};

window.TRIP = TRIP;
window.TRAVELERS = TRAVELERS;
window.CITIES = CITIES;
window.WEATHER = WEATHER;
window.DAYS = DAYS;
window.RESERVATIONS = RESERVATIONS;
window.BUDGET = BUDGET;
window.TODOS = TODOS;
window.HERO_GRADIENTS = HERO_GRADIENTS;
