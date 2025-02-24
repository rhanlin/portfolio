import { component$ } from '@builder.io/qwik';
import { FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import Text from '~/components/Text';
import { Application } from '~/lib/playcanvas';
import MySkillsCanvas from './MySkillsCanvas';

const MySkills = component$(() => {
  return (
    <>
      <div id="skills" class="relative w-full h-[382px] min-h-[382px]">
        <div class="absolute w-full px-9.5 py-9.5">
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

        <Application
          usePhysics
          fillMode={FILLMODE_NONE}
          resolutionMode={RESOLUTION_AUTO}
        >
          <MySkillsCanvas />
        </Application>
      </div>
    </>
  );
});

export default MySkills;
