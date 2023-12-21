import { Route } from 'expo-router';
import { Text, View } from 'react-native';
import { icons } from '~/assets';
import { router } from '~/features';
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
  const BUTTON_LINKS: utils.types.Tuple<5, {
    className: `bg-${string}`,
    title: string,
    icon: icons.SVGIcon
    path: router.FsRoute,
  }> = [
      {
        title: 'Info',
        icon: icons.AtomIcon,
        className: 'bg-purple-400',
        path: '/'
      },
      {
        title: 'Tips',
        icon: icons.EyeIcon,
        className: 'bg-purple-400',
        path: '/'
      },
    ];
  export const Component: React.FC<{}> = () => {
    return (
      <PageContainer className=''>
        <View className=''>
          <View className="flex justify-between flex-row">
            {BUTTON_LINKS.map(x => (
              <View className={clsx('h-[50px] w-[50px] p-[10px] rounded-full', x.className)}>
                <x.icon className='text-white' />
              </View>
            ))}


          </View>


        </View>
      </PageContainer>
    );
  }

}
