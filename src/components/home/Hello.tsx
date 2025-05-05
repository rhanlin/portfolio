import { component$ } from '@builder.io/qwik';
import Text from '~/components/share/Text';
import Avatar from '~/components/share/Avatar';
import Button from '~/components/share/Button';
import CV from '/icons/cv.svg';
import GithubSVG from '/icons/github.svg';

const Hello = component$(() => {
  return (
    <>
      <div class="w-full flex justify-between mb-10">
        <div class="flex items-center">
          <Avatar
            class="mr-8"
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
          <Button as="a" variant="icon" size="icon" class="mr-3">
            <img src={CV} alt="CV" width={24} height={24} loading="lazy" />
          </Button>
          <Button as="a" variant="icon" size="icon">
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
