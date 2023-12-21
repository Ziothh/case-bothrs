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
