import { component$ } from '@builder.io/qwik';
import Text from '~/components/share/Text';
import Button from '~/components/share/Button';
import Badge from '~/components/share/Badge';
import ArrowSVG from '~/assets/icons/arrow.svg?url';
import { type Skill } from '~/types/skills';

export type WorkProps = {
  header: string;
  title: string;
  skills: Skill[];
  status: 'In progress' | 'Completed';
  link?: string;
  description?: string;
};

const Work = component$<WorkProps>(({ header, title, skills = [], link }) => {
  return (
    <div class="p-1 h-full flex flex-col justify-between">
      <div class="">
        <Text as="h3" class="max-w-[350px] mx-auto my-4 md:my-0 text-center">
          {header}
        </Text>
      </div>
      <div class="flex flex-col">
        <div class="flex items-end mb-5">
          <Text as="h2" class="max-w-[300px]">
            {title}
          </Text>
          {link && (
            <Button
              as="a"
              href={link}
              target="_blank"
              variant="icon"
              size="icon"
              class="ml-3.5 rounded-full"
            >
              <img
                src={ArrowSVG}
                alt="github"
                width={14}
                height={14}
                loading="lazy"
              />
            </Button>
          )}
          {/* {status === 'In progress' ? (
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
            )} */}
        </div>

        <div class="flex flex-wrap">
          {skills.map((s) => (
            <Badge
              key={s.skill}
              skill={s.skill}
              url={s.badgeUrl}
              class="mr-2 md:mb-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Work;
