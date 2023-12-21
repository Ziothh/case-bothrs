import { styled } from "nativewind";
import { icons } from "~/assets";
import { View } from "~/features/nativewind";
import { clsx } from "~/utils";

export type IconName = keyof typeof icons extends `${infer I}Icon` ? I : never;

const STYLED_ICONS = Object
  .entries(icons)
  .reduce((acc, [name, Component]) => ({
    ...acc,
    [name]: styled(Component)
  }), {} as Record<
    `${IconName}Icon`,
    ReturnType<typeof styled<React.ComponentProps<icons.Type>>>
  >);


const Icon: 
& React.FC<
  & { name: IconName }
  & React.ComponentProps<icons.Type>
> 
// Subcomponents
& { WithCircle: typeof IconCircle }
= ({ name, ...props }) => {
  const Icon = STYLED_ICONS[`${name}Icon`];

  console.log({ Icon })

  return <Icon {...props} />
}


const IconCircle: React.FC<{
  icon: IconName,
  className: string
}> = (props) => {
  console.log(props)

  return (
    <View className={clsx('h-[50px] w-[50px] p-[10px] rounded-full', props.className)}>
      <Icon name={props.icon} className='text-white' />
    </View>
  );
}

Icon.WithCircle = IconCircle;

export default Icon;
