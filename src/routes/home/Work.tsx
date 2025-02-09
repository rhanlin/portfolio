import { component$ } from '@builder.io/qwik';
import Text from '~/components/Text';
import Button from '~/components/Button';
import Badge from '~/components/Badge';
import { type Skill } from '~/types/skills';
import ArrowSVG from '/icons/arrow.svg';

export type WorkProps = {
  header: string;
  title: string;
  skills: Skill[];
  status: 'In progress' | 'Completed';
};

const Work = component$<WorkProps>(({ header, title, skills = [], status }) => {
  return (
    <div class="p-1 h-full flex flex-col justify-between">
      <div class="">
        <Text as="h3" class="max-w-[350px] mx-auto my-0 text-center">
          {header}
        </Text>
      </div>
      <div class="flex flex-col">
        <div class="flex items-end mb-4">
          <Text as="h2" class="max-w-[300px]">
            {title}
          </Text>
          {status === 'In progress' ? (
            <Button
              variant="icon"
              size="custom"
              class="ml-3.5 mb-[8.75px] px-2.5 py-1 rounded-l-full rounded-r-full"
            >
              <Text as="span">In progress</Text>
            </Button>
          ) : (
            <Button variant="icon" size="icon" class="ml-3.5 rounded-full">
              <img
                src={ArrowSVG}
                alt="github"
                width={14}
                height={14}
                loading="lazy"
              />
            </Button>
          )}
        </div>

        <div class="flex flex-wrap">
          {skills.map((s) => (
            <Badge
              key={s.skill}
              skill={s.skill}
              logo={s.logo}
              color={s.color}
              class="mr-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Work;
