import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { SKILLS } from '~/constants/skills';
import Card from '~/components/Card';
import Hello from './home/Hello';
import Work, { type WorkProps } from './home/Work';
import MySkills from './home/MySkills';
import Agent from './home/Agent';
import Contact from './home/Contact';

const workList: ({ id: string; backgroundImage: string } & WorkProps)[] = [
  {
    id: 'viverse-world',
    header: '',
    title: 'VIVERSE Wrold',
    skills: [SKILLS.next, SKILLS.playcanvas, SKILLS.tailwind],
    status: 'In progress',
    backgroundImage: '/images/viverse-world.webp',
  },
  {
    id: 'viverse-sdk',
    header: '',
    title: 'VIVERSE Creator Tools SDK',
    skills: [SKILLS.react, SKILLS.typescript, SKILLS.playcanvas],
    status: 'In progress',
    backgroundImage: '/images/viverse-creator-sdk.webp',
  },
  {
    id: 'cytc',
    header: 'Grain Temperature Monitoring System',
    title: 'cytcpro.com',
    skills: [SKILLS.nuxt, SKILLS.typescript, SKILLS.tailwind, SKILLS.figma],
    status: 'Completed',
    backgroundImage: '/images/cytcpro.webp',
  },
  {
    id: 'clc',
    header: 'Scheduling Management Backend',
    title: 'CLC Service Scheduling System',
    skills: [SKILLS.vue, SKILLS.tailwind, SKILLS.graphql, SKILLS.mysql],
    status: 'Completed',
    backgroundImage: '/images/clc-service-scheduling-system.webp',
  },
  {
    id: 'fpc',
    header: 'Custom Ship Management System',
    title: 'FPC E-Commerce',
    skills: [SKILLS.nuxt, SKILLS.typescript],
    status: 'Completed',
    backgroundImage: '/images/fpc-ecommerce.webp',
  },
  {
    id: 'amway-live-go',
    header: 'E-commerce Website Redesign',
    title: 'Amway Live GO',
    skills: [SKILLS.nuxt, SKILLS.typescript],
    status: 'Completed',
    backgroundImage: '/images/amway-live-go.webp',
  },
  {
    id: 'tsmc',
    header: 'Streamlined Welfare Website Management',
    title: 'TSMC CMS Revamp',
    skills: [SKILLS.next, SKILLS.typescript],
    status: 'Completed',
    backgroundImage: '/images/tsmc-cms-revamp.webp',
  },
  {
    id: 'cec',
    header: '',
    title: 'CEC SSO',
    skills: [SKILLS.vue],
    status: 'Completed',
    backgroundImage: '/images/cec-sso.webp',
  },
];

export default component$(() => {
  return (
    <div class="grid grid-cols-12 gap-5 mb-30">
      <Card
        wrapperClass="col-span-8 hello-card-bg-gradient"
        variant="30-50-50-30"
        class="bg-neutral-80 relative"
      >
        <div class="hello-bg-gradient animate-rotate-360"></div>
        <Hello />
      </Card>
      <Card wrapperClass="col-span-4" variant="50-30-30-50" class="px-0! py-0!">
        <Agent />
      </Card>

      {workList.map((work, i) => (
        <Card
          key={work.id}
          wrapperClass="col-span-6 h-[554px]"
          variant={
            i === 0 ? '50-30-30-30' : i === 1 ? '30-50-30-30' : '30-30-30-30'
          }
          backgroundImage={work.backgroundImage}
        >
          <Work
            header={work.header}
            title={work.title}
            skills={work.skills}
            status={work.status}
          />
        </Card>
      ))}
      <Card
        wrapperClass="col-span-9 hello-card-bg-gradient"
        class="px-0! py-0!"
        variant="50-30-50-30"
      >
        <MySkills />
      </Card>
      <Card
        wrapperClass="col-span-3"
        class="relative px-0! py-0! bg-primary"
        variant="30-50-30-50"
      >
        <div class="absolute w-full h-full px-9.5 py-9.5">
          <Contact />
        </div>
      </Card>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Rhan0 - Front-end Developer',
  meta: [
    {
      name: 'description',
      content: 'Hi 👋,',
    },
  ],
};
