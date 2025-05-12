import { $, component$, useSignal } from '@builder.io/qwik';
import type {
  DocumentHead,
  StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { SKILLS } from '~/constants/skills';
import Card from '~/components/share/Card';
import Dialog from '~/components/share/Dialog';
import Text from '~/components/share/Text';
import Badge from '~/components/share/Badge';
import Button from '~/components/share/Button';
import Hello from '~/components/home/Hello';
import Work, { type WorkProps } from '~/components/home/Work';
import MySkills from '~/components/home/MySkills';
import Agent from '~/components/home/Agent';
import Contact from '~/components/home/Contact';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/share/Drawer';
import { useMediaQuery } from '~/hooks/useMediaQuery';

type Work = { id: string; backgroundImage: string } & WorkProps;

export default component$(() => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  console.log('[debug] isDesktop', isDesktop.value);

  const isDialogOpen = useSignal(false);
  const dialogDetail = useSignal<Work | null>(null);
  const workList: Work[] = [
    {
      id: 'viverse-world',
      header: '',
      title: $localize`VIVERSE Wrold`,
      skills: [SKILLS.next, SKILLS.playcanvas, SKILLS.tailwind],
      status: 'In progress',
      description: $localize`VIVERSE World is a metaverse platform that allows users to create, explore, and interact in a virtual environment. It offers a range of tools and features for content creation, social interaction, and immersive experiences.`,
      backgroundImage: '/images/viverse-world.webp',
      link: 'https://www.viverse.com/',
    },
    {
      id: 'viverse-sdk',
      header: '',
      title: $localize`VIVERSE Creator Tools SDK`,
      skills: [SKILLS.react, SKILLS.typescript, SKILLS.playcanvas],
      status: 'In progress',
      description: $localize`Creator Tools SDK is a browser extension built on top of PlayCanvas. It allows you to publish scenes from the PlayCanvas Editor to Viverse. In addition, it provides a no-code solution to help users quickly create interactive scene experiences, and offers the Viverse SDK for deeper integration and customization.`,
      backgroundImage: '/images/viverse-creator-sdk.webp',
      link: 'https://create.viverse.com/',
    },
    {
      id: 'cytc',
      header: $localize`Grain Temperature Monitoring System`,
      title: $localize`cytcpro.com`,
      skills: [SKILLS.vue, SKILLS.typescript, SKILLS.tailwind, SKILLS.figma],
      status: 'Completed',
      description: $localize`CYTC provides a grain storage temperature monitoring and management solution, improving traditional crop storage practices. With a digital service, users can easily manage and monitor the current condition of stored grains.`,
      backgroundImage: '/images/cytcpro.webp',
    },
    {
      id: 'clc',
      header: $localize`Scheduling Management System`,
      title: $localize`CLC Service Scheduling System`,
      skills: [SKILLS.vue, SKILLS.tailwind, SKILLS.graphql, SKILLS.mysql],
      status: 'Completed',
      description: $localize`CLC Service Scheduling System is a quarterly shift management platform that automates repetitive tasks to save time on workforce planning.`,
      backgroundImage: '/images/clc-service-scheduling-system.webp',
    },
    {
      id: 'fpc',
      header: $localize`Custom Ship Management System`,
      title: $localize`FPC E-Commerce`,
      skills: [SKILLS.nuxt, SKILLS.typescript, SKILLS.elementUi],
      status: 'Completed',
      description: $localize`Transformed previously unstructured form management into a customized shipping system, offering real-time monitoring, comprehensive data analytics, and streamlined document approvals with accurate tracking of review status.`,
      backgroundImage: '/images/fpc-ecommerce.webp',
    },
    {
      id: 'amway-live-go',
      header: $localize`E-commerce Website Redesign`,
      title: $localize`Amway Live Go`,
      skills: [SKILLS.nuxt, SKILLS.typescript, SKILLS.vuetify, SKILLS.socketIo],
      status: 'Completed',
      description: $localize`Redesigned Amway Taiwan's retail website to ensure users can easily find the information and products they need. Integrated Google Analytics tracking to monitor user behavior and optimize both user experience and marketing strategies. Additionally, incorporated live streaming services to enhance user trust and loyalty, effectively boosting site traffic and conversion rates.`,
      backgroundImage: '/images/amway-live-go.webp',
    },
    {
      id: 'tsmc',
      header: $localize`Streamlined Welfare Website Management`,
      title: $localize`TSMC CMS Revamp`,
      skills: [SKILLS.next, SKILLS.typescript, SKILLS.tailwind],
      status: 'Completed',
      description: $localize`A complete revamp of the Welfare Committee website CMS backend. The new backend features a "card-style" design, allowing content editors to intuitively drag and arrange cards for easy layout management.`,
      backgroundImage: '/images/tsmc-cms-revamp.webp',
    },
    {
      id: 'cec',
      header: '',
      title: $localize`CEC SSO`,
      skills: [SKILLS.vue],
      status: 'Completed',
      description: $localize`Single Sign-On (SSO) web page for the CEC (Continental Engineering Corporation) backend system.`,
      backgroundImage: '/images/cec-sso.webp',
    },
  ];

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 mb-30">
      <Card
        wrapperClass="md:col-span-8 hello-card-bg-gradient md:h-[460px]"
        variant="30-50-50-30"
        class="bg-neutral-80 relative"
      >
        <div class="hello-bg-gradient animate-rotate-360 pointer-events-none"></div>
        <Hello />
      </Card>
      <Card
        wrapperClass="h-[400px] md:h-[460px] md:col-span-4 "
        variant="50-30-30-50"
        class="px-0! py-0!"
      >
        <Agent />
      </Card>

      {workList.map((work, i) => (
        <Card
          key={work.id}
          wrapperClass="md:col-span-6 h-[400px] md:h-[480px] lg:h-[554px]"
          variant={
            i === 0 ? '50-30-30-30' : i === 1 ? '30-50-30-30' : '30-30-30-30'
          }
          backgroundImage={work.backgroundImage}
          onClick$={$(() => {
            dialogDetail.value = work;
            isDialogOpen.value = true;
          })}
        >
          <Work
            header={work.header}
            title={work.title}
            skills={work.skills}
            status={work.status}
            link={work.link}
          />
        </Card>
      ))}
      <Card
        wrapperClass="md:col-span-9 hello-card-bg-gradient"
        class="px-0! py-0!"
        variant="50-30-50-30"
      >
        <MySkills />
      </Card>
      <Card
        wrapperClass="h-[380px] md:col-span-3"
        class="relative px-0! py-0! bg-primary"
        variant="30-50-30-50"
      >
        <div class="absolute w-full h-full px-9.5 py-9.5">
          <Contact />
        </div>
      </Card>

      {isDesktop.value ? (
        <Dialog
          open={isDialogOpen.value}
          onOpenChange$={(open) => (isDialogOpen.value = open)}
          class="relative"
          size="xl"
        >
          <div class="w-full flex min-h-[458px]">
            <div class="shrink flex flex-col justify-between w-[55%] p-6">
              <div class="flex items-end mb-4">
                <Text as="h2">{dialogDetail.value?.title}</Text>
                {dialogDetail.value?.status === 'In progress' && (
                  <Button
                    variant="icon"
                    size="custom"
                    class="ml-3.5 mb-[8.75px] px-2.5 py-1 rounded-l-full rounded-r-full"
                  >
                    <Text as="span">{$localize`In progress`}</Text>
                  </Button>
                )}
              </div>
              <div class="flex-1">
                <Text as="h5">{dialogDetail.value?.description}</Text>
              </div>

              <div class="flex flex-wrap">
                {dialogDetail.value?.skills.map((s) => (
                  <Badge
                    key={s.skill}
                    skill={s.skill}
                    url={s.badgeUrl}
                    class="mr-2 md:mb-2"
                  />
                ))}
              </div>
            </div>
            <div
              class="w-[45%] h-[calc(100%-2px)] rounded-tr-[30px] rounded-br-[30px] absolute top-[50%] right-[1px] transform -translate-y-1/2 bg-center bg-cover overflow-hidden"
              style={
                dialogDetail.value?.backgroundImage
                  ? {
                      backgroundImage: `url(${dialogDetail.value.backgroundImage})`,
                    }
                  : {}
              }
            ></div>
          </div>
        </Dialog>
      ) : (
        <Drawer
          open={isDialogOpen.value}
          onOpenChange$={(open) => (isDialogOpen.value = open)}
          side="bottom"
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{dialogDetail.value?.title}</DrawerTitle>
              <DrawerDescription>
                {dialogDetail.value?.description}
              </DrawerDescription>
              <DrawerClose onClick$={() => (isDialogOpen.value = false)} />
            </DrawerHeader>

            <div class="p-4">
              <p>Drawer content goes here.</p>
            </div>

            <DrawerFooter>
              {/* <button
              onClick$={() => (isDialogOpen.value = false)}
              class="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Save
            </button> */}
              <div class="flex flex-wrap">
                {dialogDetail.value?.skills.map((s) => (
                  <Badge
                    key={s.skill}
                    skill={s.skill}
                    url={s.badgeUrl}
                    class="mr-2 md:mb-2"
                  />
                ))}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: 'en' }, { locale: 'tw' }],
  };
};

export const head: DocumentHead = () => {
  return {
    title: $localize`Rhan0 - Front-end Developer`,
    meta: [
      {
        name: $localize`description`,
        content: $localize`Hi 👋,`,
      },
    ],
  };
};
