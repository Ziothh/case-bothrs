import type { db } from "@acme/api/client"
import Card from "~/components/Card"
import utils from "~/utils"
import { FsRoute } from "../router";

export const TipCard: React.FC<
  { titleUrl?: FsRoute | (string & {}) }
  & (
    | { title: string, tip: db.Tip }
    | {
      tip: db.Tip & {
        category: db.TipCategory | null
      }
    }
  )
> = (props) => (
  <Card
    title={'title' in props
      ? props.title
      : (props.tip.category?.name ?? 'Tip')
    }
    icon='Tip'
    url={props.titleUrl ?? `/tips/${props.tip.id}`}
    iconBg='bg-blue-600'
    buttonLeft={{
      href: '/tips',
      text: 'See all'
    }}
    buttonRight={{
      href: `/tips/${props.tip.id}`,
      text: 'Explore tip',
    }}
  >
    <Card.ImageContent
      title={props.tip.title}
      text={props.tip.text}
      image={utils.parseImageUrl(props.tip.imageUrl)}
    />
  </Card>
);
