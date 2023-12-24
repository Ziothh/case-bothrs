import { View, Text } from "react-native"
import { clsx } from "./general"

export const withWrapper = <
  P extends Record<PropertyKey, any>,
  WP extends Record<PropertyKey, any>,
>(
  Component: React.FC<P>,
  WrapperComponent: React.FC<React.PropsWithChildren<WP>>,
  wrapperProps?: {} & WP
): React.FC<WP & P> => (props) => (
  <WrapperComponent {...wrapperProps ?? {}} {...props}>
    <Component {...props} />
  </WrapperComponent>
)


export function curryProps<T, P extends Partial<T>>(
  Component: React.FC<T>,
  props: P
): React.FC<Omit<T, keyof P>> {
  return (p) => <Component {...props as any} {...p} />
}

export const withDefaultClassNames = <
  P extends { className?: string },
  T extends
  | React.FC<P>
  | React.Component<P, any, any>
  | (typeof View | typeof Text),
>(
  Component: T,
  ...baseClassNames: clsx.ArgumentArray
  // @ts-ignore
): T => (({
  // @ts-ignore
  className,
  ...props
  // @ts-ignore
}: any) => <Component {...props} className={clsx(...baseClassNames, className)} />) as any
