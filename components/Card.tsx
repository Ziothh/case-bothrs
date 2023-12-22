import React from "react"
import { icons } from "~/assets"
import Icon, { IconName } from "~/components/icons/Icon"
import { router, theme } from "~/features"
import { Image, Link, ScrollView, Text, View } from "~/features/nativewind"
import { clsx } from "~/utils"

const Card:
  & React.FC<{
    icon: IconName,
    title: string
    iconBg: `bg-${string}`
    buttonLeft: React.ComponentProps<typeof CardButton>
    buttonRight: React.ComponentProps<typeof CardButton>
    children: React.ReactNode
  }>
  & {
    ImageContent: typeof CardImageContent
    GalleryContent: typeof CardGalleryContent
  }
  = ({ icon, iconBg, title, children, buttonRight, buttonLeft }) => {
    return (
      <View className="bg-background-500 rounded-[15px]" style={{
        shadowColor: '#00000000',
        shadowOpacity: 0.3,
      }}>
        <View className="flex flex-row items-center px-4 py-[14px]">
          <Icon.WithCircle name={icon} className={clsx('mr-3', iconBg)} />
          <theme.h2.bold className="m-0">{title}</theme.h2.bold>
        </View>
        {children}

        <View className="flex flex-row border-t-[1px] border-background-600">
          <CardButton {...buttonLeft} />
          <View className="h-full w-[1px] bg-background-600" />
          <CardButton {...buttonRight} />
        </View>
      </View>
    );
  }
export default Card;

const CardButton: React.FC<{
  text: string
  href: router.FsRoute | (`/${string}` & {})
}> = (props) => (
  <Link href={props.href} className="flex flex-1 py-[15px]">
    <theme.p.bold className="text-center uppercase">
      {props.text}
    </theme.p.bold>
  </Link>
);

const CardImageContent: React.FC<{
  title: string
  text: string
  image?: string
}> = (props) => (
  <View className="relative">
    <View className="absolute inset-0 z-10 py-5 px-6 w-[56%]">
      <theme.h3 className="text-lg mb-1">{props.title}</theme.h3>
      <theme.p.bold className="text-lg">{props.text}</theme.p.bold>
    </View>
    <View className="w-full" style={{ aspectRatio: 350 / 193 }} >
      <Image
        source={require('~/assets/images/spaghet.jpg')}
        className="w-full h-full bg-red"
      />
    </View>
  </View>
);
Card.ImageContent = CardImageContent;


const CARD_PLACEHOLDER_DATA = {
  title: 'My MG experience',
  text: 'This is a sharing about my recovery from Myasthenia Gravis (MG). This disease started initially from my jaw. When I ate or chew something, I would feel tired soon and then had to stop chewing because I had no strength to do it...',
  userName: 'Dries Droopy',
} as const;

const CardGalleryContent: React.FC<{
  title: string
  // cards: 
}> = (props) => (
  <View className="bg-background-600 p-4">
    <theme.h3 className="px-2 mb-[10px]">{props.title}</theme.h3>
    <ScrollView className="pb-[10px]" horizontal showsHorizontalScrollIndicator={false}>
      {new Array(5)
        .fill(CARD_PLACEHOLDER_DATA)
        .map((x: typeof CARD_PLACEHOLDER_DATA, i) => (
          <View key={i} className="flex w-[290] px-5 py-[12px] mr-2 bg-background-500 rounded-[15px]" style={{
          }}>
            <View className="flex flex-row mb-[18px]">
              <icons.CommunityPostDecoration />
              <View className="ml-4">
                <theme.p.sm>
                  posted 2 days ago	• {x.userName}
                </theme.p.sm>
                <theme.p.bold>{x.title}</theme.p.bold>


              </View>
            </View>
            <theme.p.bold className="font-normal mb-2">
              {x.text}
            </theme.p.bold>
          </View>
        ))}
    </ScrollView>
  </View>
);
Card.GalleryContent = CardGalleryContent;
