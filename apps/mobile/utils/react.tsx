import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'

export const contextFactory = <
  T extends (arg?: any) => any,
  P = Parameters<T>[0],
>(
  useValue: T,
  ContextWrapper: FC<PropsWithChildren> = ({ children }) => <>{children}</>,
): [
    useCtx: () => ReturnType<T>,
    CtxProvider: FC<PropsWithChildren<
      Exclude<P, undefined> extends never
      ? {}
      : {
        ctx: Parameters<T>[0]
      }
    >>
  ] => {
  const ctx = createContext<T>(null!)

  return [
    // @ts-ignore
    () => useContext(ctx),
    (props) => (
      <ContextWrapper>
        <ctx.Provider value={'ctx' in props ? useValue(props.ctx) : useValue()}>{props.children}</ctx.Provider>
      </ContextWrapper>
    )
  ]
}

export const useStateObject = <T,>(defaultState: T) => {
  const [value, set] = useState(defaultState);

  return {
    value,
    set
  } as const;
}
