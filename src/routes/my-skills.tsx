import { component$ } from '@builder.io/qwik';
import Text from '~/components/text';

const MySkills = component$(() => {
  return (
    <>
      <div id="skills" class="relative w-full">
        <div class="max-w-[260px] flex flex-col m-0">
          <Text as="p" class="mb-3.5">
            I constantly try to improve myself
          </Text>
          <Text as="h2" class="mb-6.5">
            Currently, I am learning Web3D.
          </Text>
          <Text as="h5">
            I am also learning TypeScript, NextJS. Other than that, I also
            constantly practice web design.
          </Text>
        </div>
      </div>
    </>
  );
});

export default MySkills;
