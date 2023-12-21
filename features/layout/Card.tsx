import { icons } from "~/assets"
import { router } from ".."
import { View } from "../nativewind"

type CardButtonProps = {
  text: string
  href: router.FsRoute | (`/${string}` & {})
}

export const Card: React.FC<{
  icon: icons.Type,
  title: string
  buttonLeft: CardButtonProps
  buttonRight: CardButtonProps
  children: React.ReactNode
}> = ({ icon: Icon, children, buttonRight, buttonLeft }) => {
  return (
    <View>
    
    </View>
  );
}
