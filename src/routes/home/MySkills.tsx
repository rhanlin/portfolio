import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import Text from '~/components/Text';
import { Application } from '~/lib/playcanvas';
import MySkillsCanvas from './MySkillsCanvas';

const MySkills = component$(() => {
  const isMounted = useSignal(false);
  useVisibleTask$(() => {
    setTimeout(() => {
      isMounted.value = true;
    }, 1500);
  });

  return (
    <>
      <div id="skills" class="relative w-full min-h-[382px]">
        <div class="absolute z-10 top-[1px] left-[1px] w-auto h-[calc(100%-2px)] px-9.5 py-9.5 backdrop-blur-[32px]">
          <div class="max-w-[260px] flex flex-col m-0">
            <Text as="p" class="mb-3.5">
              I constantly try to improve myself
            </Text>
            <Text as="h2" class="mb-6.5">
              Currently, I am learning Web3D.
            </Text>
            <Text as="h5">
              I am still learning TypeScript, and I also continuously practice
              prompt engineering.
            </Text>
          </div>
        </div>
        {/* <div class="absolute z-0 inset-0 overflow-hidden">
         
        </div> */}
        {/* absolute bottom-0 left-0 right-0 top-0 z-0  */}
        {isMounted.value && (
          <Application
            id="my-skills-app"
            usePhysics
            fillMode={FILLMODE_NONE}
            resolutionMode={RESOLUTION_AUTO}
            style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
            className="absolute z-0 top-[1px] left-[1px] rounded-tl-[50px] rounded-tr-[30px] rounded-bl-[50px] rounded-br-[30px]"
          >
            <MySkillsCanvas />
          </Application>
        )}
      </div>
    </>
  );
});

export default MySkills;
