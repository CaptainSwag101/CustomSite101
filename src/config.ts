import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://captainswag101.github.io/CustomSite101", // replace this with your deployed domain
  author: "James Pelster",
  profile: "https://github.com/CaptainSwag101",
  desc: "Where I post various discussions and thoughts about my personal interests and hobbies.",
  title: "CustomSite101",
  ogImage: "@assets/images/what-is-nassp/thumb.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-US"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/CaptainSwag101",
    linkTitle: `CaptainSwag101 on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/james-pelster",
    linkTitle: `James Pelster on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: false,
  },
  {
    name: "Facebook",
    href: "",
    linkTitle: `${SITE.author} on Facebook`,
    active: false,
  },
  {
    name: "Instagram",
    href: "",
    linkTitle: `${SITE.author} on Instagram`,
    active: false,
  },
  {
    name: "Twitter",
    href: "",
    linkTitle: `${SITE.author} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "",
    linkTitle: `${SITE.author} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "",
    linkTitle: `${SITE.author} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "",
    linkTitle: `${SITE.author} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "",
    linkTitle: `${SITE.author} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "",
    linkTitle: `${SITE.author} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "",
    linkTitle: `${SITE.author} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "",
    linkTitle: `${SITE.author} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "",
    linkTitle: `${SITE.author} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "",
    linkTitle: `${SITE.author} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "",
    linkTitle: `${SITE.author} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "",
    linkTitle: `${SITE.author} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "",
    linkTitle: `${SITE.author} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "",
    linkTitle: `${SITE.author} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "",
    linkTitle: `${SITE.author} on Mastodon`,
    active: false,
  },
];
