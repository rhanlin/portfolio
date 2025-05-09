import { type Skill } from '~/types/skills';

type SkillConfig = {
  skill: string;
  logo?: string;
  color?: string;
  badgeName?: string;
  customUrl?: string;
};

const BadgeDomain = 'https://img.shields.io/badge';

const skillList: Record<string, SkillConfig> = {
  typescript: { skill: 'TypeScript', logo: 'typescript', color: 'black' },
  javascript: { skill: 'JavaScript', logo: 'javascript', color: 'black' },
  css: { skill: 'CSS3', logo: 'css3', color: 'black' },
  react: { skill: 'React', logo: 'react', color: 'black' },
  vue: {
    skill: 'Vue.js',
    logo: 'vuedotjs',
    color: 'black',
    badgeName: 'vuejs',
  },
  next: {
    skill: 'Next.js',
    logo: 'next.js',
    color: 'black',
    badgeName: 'Next',
    customUrl: `${BadgeDomain}/Next-black?style=flat&logo=next.js&color=black`,
  },
  nuxt: {
    skill: 'Nuxt.js',
    logo: 'nuxtdotjs',
    color: 'black',
    badgeName: 'Nuxt',
    customUrl: `${BadgeDomain}/Nuxt-002E3B?style=flat&logo=nuxtdotjs&color=black`,
  },
  tailwind: { skill: 'TailwindCSS', logo: 'tailwind-css', color: 'black' },
  playcanvas: {
    skill: 'PlayCanvas',
    logo: 'playcanvas',
    color: '000000',
    customUrl: `${BadgeDomain}/PlayCanvas-000000?style=flat&logo=playcanvas`,
  },
  graphql: {
    skill: 'Graphql',
    logo: 'graphql',
    color: 'black',
    badgeName: '-GraphQL',
    customUrl: `${BadgeDomain}/-GraphQL-E10098?style=flat&logo=graphql&color=black`,
  },
  figma: { skill: 'Figma', logo: 'figma', color: 'black' },
  mysql: { skill: 'Mysql', logo: 'mysql', color: 'black' },
  vuetify: {
    skill: 'Vuetify',
    logo: 'vuetify',
    customUrl: `${BadgeDomain}/Vuetify-1867C0?style=flat&logo=vuetify&logoColor=AEDDFF&color=black`,
  },
  socketIo: {
    skill: 'Socket.io',
    logo: 'socket.io',
    customUrl: `${BadgeDomain}/Socket.io-black?style=flate&logo=socket.io&badgeColor=010101&color=black`,
  },
  elementUi: {
    skill: 'Element.ui',
    logo: 'element.ui',
    customUrl: `${BadgeDomain}/-ElementUI-000000?style=flat&logo=element.ui`,
  },
};

export const SKILLS: Record<string, Skill> = Object.fromEntries(
  Object.entries(skillList).map(([key, cfg]) => [
    key,
    {
      skill: cfg.skill,
      badgeUrl: cfg.customUrl
        ? cfg.customUrl
        : `${BadgeDomain}/${cfg.badgeName ?? cfg.skill.toLowerCase()}-${cfg.color}.svg?style=flat&logo=${cfg.logo}&color=${cfg.color}`,
    },
  ]),
);
