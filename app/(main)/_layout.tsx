import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import utils, { clsx } from '../../utils';
import { icons } from '../../assets';
import { SvgProps } from 'react-native-svg';
import { View } from 'react-native';

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: icons.StatsIcon }),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: icons.HomeIcon }),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: utils.component.curryProps(TabBarIcon, { icon: icons.ProfileIcon }),
        }}
      />
    </Tabs>
  );
}

const TabBarIcon: React.FC<
  { icon: React.FC<SvgProps> } &
  React.ComponentProps<
    NonNullable<
      NonNullable<
        React.ComponentProps<typeof Tabs.Screen>['options']
      >['tabBarIcon']
    >
  >
> = ({ icon: Icon, focused }) => {
  return (
    <View className='relative bg-transparent h-[26px] w-[26px] flex justify-center flex-row'>
      <Icon className={clsx(
        'w-full h-full',
        focused ? 'text-cyan-400' : 'text-gray'
      )} />
      {focused && (
        <View className='w-1 h-1 bg-cyan-400 rounded-full absolute top-full mt-2'/>
      )}
    </View>
  );
}





