export const SITE = {
  website: "localhost", // replace this with your deployed domain
  author: "James Pelster",
  profile: "https://github.com/CaptainSwag101",
  desc: "Where I post various discussions and thoughts about my personal interests and hobbies.",
  title: "CustomSite101",
  ogImage: "social-image.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Suggest Changes",
    url: "",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Los_Angeles", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
