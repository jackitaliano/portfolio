"use client";
import $ from 'jquery';
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Props = {
  scrollId: string;
}

export function MoreButton({ scrollId }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const thresh = 250;

    window.addEventListener("scroll", () => {
      if (!buttonRef?.current) {
        return;
      }
      const currPosY = buttonRef.current.getBoundingClientRect().y;
      const windowHeight = window.innerHeight;

      const breakpoint = currPosY + thresh;
      console.log("breakpoint: ", breakpoint);
      console.log("windowHeight: ", windowHeight);

      if (currPosY + thresh < windowHeight) {
        setVisible(false);

      } else {
        setVisible(true);
      }
    })

  }, []);

  function scroll() {
    $('html, body').animate({ scrollTop: $(`#${scrollId}`).position().top, transitionTimingFunction: "linear" }, { duration: 100, easing: "linear" });
  }

  return (
    <div ref={buttonRef} className={`w-full h-16 flex justify-center items-end duration-500 ${!isVisible ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
      <Button variant="outline" size="icon" className="w-full bg-slate-900/25 backdrop-blur-xl border-none" onClick={scroll}>
        <ChevronDown />
      </Button>
    </div>
  )
}
