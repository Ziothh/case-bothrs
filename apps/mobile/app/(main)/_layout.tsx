import { Tabs } from 'expo-router';
import utils, { clsx } from '../../utils';
import { View } from '~/features/nativewind';
import Icon, { IconName } from '~/components/icons/Icon';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: 'Stats' }),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: 'Home' }),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: 'Profile' }),
        }}
      />
    </Tabs>
  );
}

const TabBarIcon: React.FC<
  { icon: IconName } &
  React.ComponentProps<
    NonNullable<
      NonNullable<
        React.ComponentProps<typeof Tabs.Screen>['options']
      >['tabBarIcon']
    >
  >
> = ({ icon, focused }) => {
  return (
    <View className='relative bg-transparent h-[26px] w-[26px] flex justify-center flex-row'>
      <Icon name={icon} className={clsx(
        'w-full h-full',
        focused ? 'text-cyan-400' : 'text-gray'
      )} />
      {focused && (
        <View className='w-1 h-1 bg-cyan-400 rounded-full absolute top-full mt-2'/>
      )}
    </View>
  );
}





