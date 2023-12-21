import { Link, Route } from 'expo-router';
import { Text, View } from 'react-native';
import { icons } from '~/assets';
import { router, theme } from '~/features';
import { PageContainer } from '~/features/layout';
import utils, { clsx } from '~/utils';

export default (function Home() {
  return (
    <View className=''>
      <Header.Component />
    </View>
  );
} satisfies React.FC);


namespace Header {
  const BUTTON_LINKS: utils.types.Tuple<5, React.ComponentProps<typeof IconButton>> = [
    // TODO: fix links
    {
      title: 'Info',
      icon: icons.AtomIcon,
      background: 'bg-purple-400',
      path: '/info'
    },
    {
      title: 'Tips',
      icon: icons.TipIcon,
      background: 'bg-blue-600',
      path: '/tips'
    },
    {
      title: 'Trials',
      icon: icons.TipIcon,
      background: 'bg-cyan-400',
      path: '/trials'
    },
    {
      title: 'Community',
      icon: icons.ChatIcon,
      background: 'bg-red',
      path: '/community'
    },
    {
      title: 'Tips',
      icon: icons.TipIcon,
      background: 'bg-blue-600',
      path: '/tips'
    },
  ];
  export const Component: React.FC<{}> = () => {
    return (
      <PageContainer>
        <View className='px-[10px] flex w-full'>
          <View className='flex flex-row justify-between'>
            <View className='pt-2'>
              <theme.h1>Hi Stef 👋</theme.h1>
              <theme.h2.light>How can I help you today?</theme.h2.light>
            </View>
            <IconButton 
            title='Extra' 
            icon={icons.TipIcon} 
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
      </PageContainer>
    );
  }

  const IconButton: React.FC<{
    background: `bg-${string}`,
    className?: string,
    title: string,
    icon: icons.Type
    path: router.FsRoute | (`/${string}` & {}),
  }> = ({ icon: Icon, ...props }) => (
    <Link href={props.path} className={props.className}>
      <View className="relative flex flex-col items-center pb-5 pt-1">
        <View className={clsx('h-[50px] w-[50px] p-[10px] rounded-full', props.background)}>
          <Icon className='text-white' />
        </View>
        <theme.p.sm className='absolute bottom-0 w-[152%] mt-[2px] text-center font-medium'>
          {props.title}
        </theme.p.sm>
      </View>
    </Link>
  )
}
