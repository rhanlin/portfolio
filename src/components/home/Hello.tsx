import { component$ } from '@builder.io/qwik';
import Text from '~/components/share/Text';
import Avatar from '~/components/share/Avatar';
import Button from '~/components/share/Button';
import CV from '~/assets/icons/cv.svg?url';
import GithubSVG from '~/assets/icons/github.svg?url';

const Hello = component$(() => {
  return (
    <>
      <div class="w-full flex flex-col justify-between xl:flex-row mb-10">
        <div class="flex items-center mb-4 xl:mb-0">
          <Avatar
            class="mr-8 min-w-[48px]"
            alt="Rhan0"
            src="https://avatars.githubusercontent.com/u/47688017?v=4"
          />
          <div class="flex flex-col">
            <Text as="h4">{$localize`Hi, I'm Rhan0.`}</Text>
            <Text as="label" class="text-neutral-10/30">
              {$localize`Front-end developer`}
            </Text>
          </div>
        </div>
        <div class="flex">
          <Button
            as="a"
            variant="icon"
            size="icon"
            class="mr-3 border-neutral-60/50 bg-neutral-80/50 active:bg-neutral-60/50 hover:bg-neutral-60/30"
          >
            <img src={CV} alt="CV" width={24} height={24} loading="lazy" />
          </Button>
          <Button
            as="a"
            variant="icon"
            size="icon"
            class="border-neutral-60/50 bg-neutral-80/50 active:bg-neutral-60/50 hover:bg-neutral-60/30"
          >
            <img
              src={GithubSVG}
              alt="github"
              width={24}
              height={24}
              loading="lazy"
            />
          </Button>
        </div>
      </div>
      <div class="max-w-[600px] mb-7">
        <Text as="h1">{$localize`Passionate about beauty and innovation.`}</Text>
      </div>
      <div class="max-w-[483px]">
        <Text as="h5">
          {$localize`I love exploring new knowledge, embracing challenges, and growing
          together with my team through the process.`}
        </Text>
      </div>
    </>
  );
});

export default Hello;
