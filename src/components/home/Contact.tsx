import { component$ } from '@builder.io/qwik';
import Text from '~/components/share/Text';
import Button from '~/components/share/Button';
import CV from '/icons/cv.svg';
import GithubSVG from '/icons/github.svg';

const MySkills = component$(() => {
  return (
    <div id="contact" class="relative w-full">
      <div class="flex flex-col">
        <Text as="h3" class="mb-2">
          Contact me
        </Text>
        <Text as="p" class="mb-9.5">
          Make a contact via email.
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
