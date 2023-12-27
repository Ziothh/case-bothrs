import { Link } from 'expo-router';
import { icons } from "~/assets"
import { api, router, theme } from '~/features';
import { ScrollView, View } from '~/features/nativewind';
import utils, { clsx } from '~/utils';
import { PageContainer } from '~/features/layout';
import Icon from '~/components/icons/Icon';
import Card from '~/components/Card';


const Home: React.FC = () => {
  const tipOfDay = api.tip.tipOfDay.get.useQuery();
  const topics = api.topic.getLatest.useQuery()


  return (
    <PageContainer scrollable={false}>
      <Header.Component />

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View className='mt-3 h-full flex flex-col' style={{
          rowGap: 12
        }}>
          {tipOfDay.data && (
            <Card
              title='Tip of the day'
              icon='Tip'
              iconBg='bg-blue-600'
              buttonLeft={{
                href: '/tips',
                text: 'See all'
              }}
              buttonRight={{
                href: `/tips/${tipOfDay.data.id}`,
                text: 'Explore tip',
              }}
            >
              <Card.ImageContent
                title={tipOfDay.data.title}
                text={tipOfDay.data.text}
                image={utils.parseImageUrl(tipOfDay.data.imageUrl)}
              />
            </Card>
          )}

          {topics.data && topics.data.length !== 0 && (
            <Card
              title='Community'
              icon='Tip'
              iconBg='bg-pink-400'
              buttonLeft={{
                href: '/tips',
                text: 'See all'
              }}
              buttonRight={{
                href: '/tips/TODO',
                text: 'Explore tip',
              }}
            >
              <Card.GalleryContent
                title="This week's topics"
                cards={topics.data.map((x) => (
                  <View key={x.id} className={clsx(
                    'flex px-5 py-[12px] bg-background-500 rounded-[15px]',
                    topics.data.length > 1 && 'w-[290] mr-2'
                  )}>
                    <View className="flex flex-row mb-[18px]">
                      <icons.CommunityPostDecoration />
                      <View className="ml-4">
                        <theme.p.sm>
                          posted {utils.calculateRelativeMonthDate(x.createdAt)} ago	• {x.user.firstName} {x.user.lastName}
                        </theme.p.sm>
                        <theme.p.bold>{x.title}</theme.p.bold>
                      </View>
                    </View>
                    <theme.p.bold className="font-normal mb-2">
                      {x.text}
                    </theme.p.bold>
                  </View>
                ))}

              />
            </Card>
          )}


          <Card
            title='MG Update'
            icon='Atom'
            iconBg='bg-purple-600'
            buttonLeft={{
              href: '/tips',
              text: 'See all'
            }}
            buttonRight={{
              href: '/tips/TODO',
              text: 'Explore tip',
            }}
          >
            <Card.ImageContent
              title='Swallowing'
              text='If you struggle with swallowing, eat soft foods wherever possible. You can check out some of our soft food recipes for ideas here.'
              image={utils.parseImageUrl('/images/spaghet.jpg')}
            />
          </Card>

        </View>
      </ScrollView>

    </PageContainer>
  );
}
export default Home;

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
        <View className="flex justify-between flex-row w-full mt-[15px] pb-1">
          {BUTTON_LINKS.map((x, i) => (
            <IconButton key={i} {...x} className='flex-1' />
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
        <Icon.WithCircle name={props.icon} className={props.background} />
        <theme.p.sm className='absolute bottom-0 w-[152%] mt-[2px] text-center font-medium'>
          {props.title}
        </theme.p.sm>
      </View>
    </Link>
  )
}
