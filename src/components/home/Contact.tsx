import { component$ } from '@builder.io/qwik';
import Text from '~/components/share/Text';
import Button from '~/components/share/Button';
import CV from '~/assets/icons/cv.svg?url';
import GithubSVG from '~/assets/icons/github.svg?url';

const MySkills = component$(() => {
  return (
    <div id="contact" class="relative w-full">
      <div class="flex flex-col">
        <Text as="h3" class="mb-2">
          {$localize`Contact me`}
        </Text>
        <Text as="p" class="mb-9.5">
          {$localize`Make a contact via email.`}
        </Text>
        <Button as="a" variant="icon" size="icon" class="w-17.5 h-17.5">
          <img src={CV} alt="CV" width={28} height={28} loading="lazy" />
        </Button>
        <Button as="a" variant="icon" size="icon" class="w-17.5 h-17.5">
          <img
            src={GithubSVG}
            alt="github"
            width={28}
            height={28}
            loading="lazy"
          />
        </Button>
      </div>
    </div>
  );
});

export default MySkills;
