// ---------------------------------------------------------------------------
// All site content lives here so it can be edited in one place.
// Images currently point at the live daka-marketing.com server (same files the
// Laravel site uses). To self-host, copy them into /public and change ASSET_BASE
// to "" (e.g. "/aronk/img/alx_neww-min.png").
// ---------------------------------------------------------------------------

export const ASSET_BASE = "https://daka-marketing.com";
export const asset = (path: string) => `${ASSET_BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;

export const site = {
  name: "Daka Marketing",
  tagline: "Daka Marketing is a team of creative strategists that are digitally creating meaningful impacts for brands.",
  url: "https://daka-marketing.com",
  phone: "+251925754141",
  phoneDisplay: "+251 925 754 141",
  email: "aaronkamil4@gmail.com",
  office: "Shimeket Commercial Center, Addis Ababa",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.779088406521!2d38.72313227894452!3d8.992464566550893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87f662a4828d%3A0xe6e7b01dc7668e06!2sShimeket%20commercial%20center!5e0!3m2!1sen!2set!4v1745315521376!5m2!1sen!2set",
  gaId: "G-E16DGNK4LN",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/dakamarketing?igsh=ZDA3dTlhZGR0dWk4" },
    { label: "TikTok", href: "https://www.tiktok.com/@daka_marketing?_r=1&_t=ZM-92BK9oteWZE" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/dakaethiopia" },
    { label: "YouTube", href: "https://www.youtube.com/@AronKamil-" },
  ],
  keywords: [
    "Digital Marketing in Ethiopia",
    "Marketing in Ethiopia",
    "Digital Marketing Agency Addis Ababa",
    "Lead Generation Ethiopia",
    "Content Marketing Ethiopia",
    "Digital Marketing Strategy",
    "Online Business Growth",
  ],
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: "6+", label: "Years of experience" },
  { value: "190+", label: "Effective campaigns & projects" },
  { value: "22+", label: "Different sectors" },
  { value: "70+", label: "Clients from 3 countries" },
];

export const featuredIn = [
  { name: "EBC", image: asset("aronk/img/ebc.jpeg") },
  { name: "EBS", image: asset("aronk/img/ebs.webp") },
  { name: "JTV", image: asset("aronk/img/jtv.jpg") },
];

export const approach = [
  {
    title: "Goal defines it all",
    body: "What do you want to achieve? Understanding your business goals allows us to tailor your strategies to ensure it hits the mark and drives results.",
  },
  {
    title: "Ideas worth exploring",
    body: "We brainstorm ideas that can guarantee the goals to be achieved. We present these ideas to you and leave you dumbfounded. :)",
  },
  {
    title: "Execution beats everything",
    body: "An unexecuted strategy is useless. We assemble teams, equipment and structures and deliver the expected results in no time.",
  },
];

export type Service = { slug: string; title: string; short: string; body: string; image: string; tags: string[] };

export const services: Service[] = [
  {
    slug: "content-marketing",
    title: "Content Marketing (Series)",
    short: "Daily, cinematic storytelling that turns your business into a character people follow.",
    body: "In a country where brands must behave like characters, you can’t show up one day and disappear the next; people expect a continuous story. Just like a movie character never goes a day without a plot, your business needs a daily narrative that excites audiences, especially as competition in Ethiopia accelerates. As a content marketing agency in Ethiopia, we ideate, script, structure, shoot, edit, and distribute the kind of Ethiopian business content that keeps your brand alive. Our process transforms your business into a memorable personality, built through consistent, cinematic storytelling. If you want powerful branding in Ethiopia and culturally relevant content in Ethiopia, this is where your brand becomes truly interesting.",
    image: asset("aronk/img/content_new.png"),
    tags: ["Ideation", "Scripting", "Production", "Editing", "Distribution"],
  },
  {
    slug: "cohesive-digital-presence",
    title: "Cohesive Digital Presence",
    short: "One tone, one message, everywhere — so your brand is remembered, not just seen.",
    body: "What would people say about your brand if asked today, and do they even pronounce your company name correctly? In a crowded market, being top-of-mind in your sector requires intention, not luck, and we help you build that clarity from the ground up. As a leading marketing agency in Ethiopia, we craft a cohesive tone, clear messaging, and complete brand information that reaches both the masses and your exact target audience. Through strategic positioning and competitor research in Ethiopia, we ensure your brand isn’t just seen, but remembered. This isn’t about fame; it’s about influence, because with the right strategy, the brand itself becomes the influencer in Ethiopia.",
    image: asset("aronk/img/cohesion_new.png"),
    tags: ["Positioning", "Messaging", "Competitor Research", "Brand Voice"],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    short: "Full-funnel systems that move buyers from first hearing about you to choosing you.",
    body: "Many Ethiopian businesses still misunderstand what a lead actually is, even though every buyer goes through a stage between hearing about your brand and finally choosing it. We guide your entire process from the top to the bottom, ensuring every stage is optimized through strategic Lead Generation in Ethiopia. With guaranteed return on investment for every payment you make, you get measurable value, not vague promises. Whether you need a broad lead list in Ethiopia or industry-specific targeting like real estate leads in Ethiopia, we build systems that work for every business.",
    image: asset("aronk/img/leads_new.png"),
    tags: ["Funnels", "Paid Ads", "Lead Lists", "Tracking"],
  },
  {
    slug: "software-automation",
    title: "Marketing Software & Automation",
    short: "Websites, CRMs and AI tools built with marketing logic first.",
    body: "Digital marketing isn’t just about promotion; it’s also about integrating software and intelligent tools that make your marketing sharper, faster, and more effective. When we develop systems, we bring marketing logic first, ensuring every tool supports real growth through AI marketing in Ethiopia and practical business workflows. From high-converting websites and CRM systems to automation platforms and ERP software, our solutions blend technology with strategy for true performance.",
    image: asset("aronk/img/software_new.png"),
    tags: ["Websites", "CRM", "Automation", "AI Tools", "ERP"],
  },
];

export type Project = {
  slug: string;
  name: string;
  sector: string;
  image: string;
  tags: string[];
  summary: string;
  video?: string; // YouTube id
  legacyPath: string;
};

// NOTE: summaries are written from the service tags on the current site.
// Replace them with the real case-study story (goals, what you did, results).
export const projects: Project[] = [
  {
    slug: "alx-ethiopia",
    name: "ALX Ethiopia",
    sector: "Education & Tech",
    image: asset("aronk/img/alx_neww-min.png"),
    tags: ["Digital Marketing", "Production", "Mascot Development"],
    summary: "A full digital marketing engagement for ALX Ethiopia, from content production to developing a mascot that gave the brand a recognisable character.",
    legacyPath: "/alx",
  },
  {
    slug: "new-leaf-fertility-center",
    name: "New Leaf Fertility Center",
    sector: "Healthcare",
    image: asset("aronk/img/newleaf_new-min.png"),
    tags: ["Digital Marketing Strategy", "Production", "Social Media Marketing"],
    summary: "Strategy, production and social media marketing for a fertility center — communicating a sensitive subject with clarity and warmth.",
    legacyPath: "/newleaf",
  },
  {
    slug: "celavie-chicken-and-burger",
    name: "Celavie Chicken & Burger",
    sector: "Food & Hospitality",
    image: asset("aronk/img/celavie_new-min.png"),
    tags: ["Digital Marketing", "Production", "Graphics Design", "Campaign"],
    summary: "Campaigns, production and design built around direct conversion — getting people from the feed to the counter.",
    video: "PE5JPRKyMoQ",
    legacyPath: "/celavie",
  },
  {
    slug: "teklehaimanot-general-hospital",
    name: "Teklehaimanot General Hospital",
    sector: "Healthcare",
    image: asset("aronk/img/tgh_new-min.png"),
    tags: ["Digital Marketing", "Production", "Graphics Design", "Campaign"],
    summary: "Informative campaigns and production for a general hospital, making services and specialists easy for patients to discover.",
    video: "moCTKP0qw9g",
    legacyPath: "/tgh",
  },
  {
    slug: "gm-furniture",
    name: "GM Furniture",
    sector: "Retail & Interiors",
    image: asset("aronk/img/gm.jpg"),
    tags: ["Digital Marketing", "Production", "Graphics Design", "Campaign"],
    summary: "Product-led content and campaigns that show furniture the way people imagine it in their own homes.",
    legacyPath: "/gm_furniture",
  },
];

export const showreel = [
  { title: "Product Promotion", client: "Yagout Pay", id: "beERQpGkRq8" },
  { title: "Direct Conversion", client: "Celavie Chicken and Burger", id: "PE5JPRKyMoQ" },
  { title: "Aesthetic Overview", client: "Jomoo", id: "D-uo4A6tsEk" },
  { title: "Informative Ad", client: "Teklehaimanot General Hospital", id: "moCTKP0qw9g" },
  { title: "Informative", client: "Candace International School", id: "-VLxHa4w_88" },
  { title: "Holiday Special", client: "Ergendo Trading", id: "CBNKiO5Sywc" },
  { title: "Event Recap", client: "Daye Bensa Coffee", id: "la-iseRJgHg" },
  { title: "Aesthetic Overview", client: "Private Center Real Estate", id: "EbllbST3Hc0" },
];

// Bios on the old site were copy-pasted placeholders; these are neutral
// role descriptions — swap in real ones.
export const team = [
  { name: "Aron Kamil", role: "Founder & Creative Director", photo: asset("images/Daka teams/aron.jpg"), video: "qOmqXMVmQZg" },
  { name: "Rimna Alemseged", role: "Project Manager", photo: asset("images/Daka teams/rimna.jpg"), video: "NNoI1kaaKQU" },
  { name: "Selamawit", role: "Finance", photo: asset("images/Daka teams/Selam.jpg"), video: "ptjWuSAGPQM" },
  { name: "Abraham Anteneh", role: "Video Editor & Production Manager", photo: asset("images/Daka teams/abri.jpg"), video: "ohTEbRbs6FA" },
  { name: "Kaleab Alebachew", role: "Videographer", photo: asset("images/Daka teams/Kal.jpg"), video: "1ifwufLU71o" },
  { name: "Beckham Tadesse", role: "Video Editor & Graphics Designer", photo: asset("images/Daka teams/beckham.jpg"), video: "YTNUnEGCb44" },
  { name: "Yabneh Kebede", role: "Host & Content Creator", photo: asset("images/Daka teams/Yabneh.jpg"), video: "TaJkTgU3UTc" },
  { name: "Maedot Asrat", role: "Software Developer", photo: asset("images/Daka teams/maedot.jpg"), video: "eJoKAkx4LfU" },
];

const p = (f: string) => asset(`aronk/img/private/${f}`);
const n = (f: string) => asset(`aronk/img/ngo/${f}`);
const i = (f: string) => asset(`aronk/img/International/${f}`);

export const partners = {
  private: [
    "tgh.jpg", "celavie.jpg", "polar.png", "iceaddis-logo.svg", "gm.png", "liesak.png", "tina.webp",
    "add_global.png", "lyte.jpg", "tona.png", "gari.png", "united.jpg", "luminous.png", "everlink.jpg",
    "hahu.png", "maed.png", "shirgud.png", "newleaf.png", "wecare.jpg", "melanin.jpg", "skill.png",
    "synergy.jpg", "private.png", "bala.png", "conlink.png", "greater.png", "worthy.jpg", "amazing.jpg",
    "andemamma.jpg", "hillbottom.jpg", "golden.jpg",
  ].map(p),
  ngo: [
    "united.jpg", "abri.png", "et.png", "cecoe-logo.png", "yagout-logo.png", "feapd.png", "aayv.jpg",
    "cpu.jpg", "pts.png", "wifa.png",
  ].map(n),
  international: [
    n("ccba.png"), i("alx.jpeg"), i("fyn.png"), i("habtamu.png"), i("global.jpg"), i("katim.png"),
    i("wondo.png"), i("mathios.png"),
  ],
};
