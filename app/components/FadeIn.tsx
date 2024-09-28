"use client";
import { ReactNode, useRef } from "react"

type Props = {
  children: ReactNode
}

export function FadeIn({ children }: Props) {
  // const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  // 	const observer = new IntersectionObserver(entries => {
  // 		entries.forEach(entry => setVisible(entry.isIntersecting));
  // 	})
  // 	observer.observe(domRef.current);
  // 	return () => {
  // 		observer.unobserve(domRef.current);
  // 	}
  //
  // }, []);

  return (
    <div ref={domRef} className={`w-full h-full animated `}>
      {children}
    </div>
  )
}
