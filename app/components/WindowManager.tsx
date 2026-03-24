"use client";
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useRef } from "react";
import { Window, WindowContext } from './Window';

type WindowChildProps = {
  index?: number;
  ctx?: WindowContext;
}

type Props = {
  children: ReactNode;
}

export function WindowManager({ children }: Props) {
  const topRef = useRef(0);
  const windowChildren = Children.toArray(children).filter((child): child is ReactElement<WindowChildProps> => isValidElement(child));

  const maxIndex = windowChildren.reduce((highest, child) => {
    if (typeof child.props.index !== "number") {
      return highest;
    }
    return Math.max(highest, child.props.index);
  }, 0);

  if (topRef.current < maxIndex) {
    topRef.current = maxIndex;
  }


  const windowCtx: WindowContext = {
    enterCallback: (setZIndexCallback) => {
      topRef.current += 1;
      setZIndexCallback(topRef.current);
    }
  }

  return (
    <div>
      {windowChildren.map((child, i) =>
        cloneElement(child, {
          key: child.key ?? i,
          ctx: windowCtx,
        })
      )}
    </div>
  )

}
