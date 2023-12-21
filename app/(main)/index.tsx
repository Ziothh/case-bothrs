import { Link } from 'expo-router';
import { router, theme } from '~/features';
import { View } from '~/features/nativewind';
import utils from '~/utils';
import { PageContainer } from '~/features/layout';
import Icon from '~/components/icons/Icon';

export default (function Home() {
  return (
    <PageContainer>
      <Header.Component />

    </PageContainer>
  );
} satisfies React.FC);


namespace Header {
  const BUTTON_LINKS: utils.types.Tuple<5, React.ComponentProps<typeof IconButton>> = [
    // TODO: fix links
    {
      title: 'Info',
      icon: 'Atom',
      background: 'bg-purple-400',
      path: '/info'
    },
    {
      title: 'Tips',
      icon: 'Tip',
      background: 'bg-blue-600',
      path: '/tips'
    },
    {
      title: 'Trials',
      icon: 'Tip', // TODO: fix icon
      background: 'bg-cyan-400',
      path: '/trials'
    },
    {
      title: 'Community',
      icon: 'Chat',
      background: 'bg-red',
      path: '/community'
    },
    {
      title: 'Tips',
      icon: 'Tip',
      background: 'bg-blue-600',
      path: '/tips'
    },
  ];
  export const Component: React.FC<{}> = () => {
    return (
      <View className='px-[10px] flex w-full'>
        <View className='flex flex-row justify-between'>
          <View className='pt-2'>
            <theme.h1>Hi Stef 👋</theme.h1>
            <theme.h2.light>How can I help you today?</theme.h2.light>
          </View>
          <IconButton
            title='Extra'
            icon='Tip'
            background='bg-purple-600'
            path='/extra'
          />
        </View>
        <View className="flex justify-between flex-row w-full mt-[15px]">
          {BUTTON_LINKS.map((x, i) => (
            <IconButton key={i} {...x} className='bg-red flex-1' />
          ))}
        </View>
      </View>
    );
  }

  const IconButton: React.FC<{
    background: `bg-${string}`,
    className?: string,
    title: string,
    icon: React.ComponentProps<typeof Icon>['name']
    path: router.FsRoute | (`/${string}` & {}),
  }> = (props) => (
    <Link href={props.path} className={props.className}>
      <View className="relative flex flex-col items-center pb-5 pt-1">
        <Icon.WithCircle icon={props.icon} className={props.background} />
        <theme.p.sm className='absolute bottom-0 w-[152%] mt-[2px] text-center font-medium'>
          {props.title}
        </theme.p.sm>
      </View>
    </Link>
  )
}
