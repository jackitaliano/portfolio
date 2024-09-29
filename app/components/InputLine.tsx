import { useRef, useState } from "react";
import { Path } from "./Path";
import "../css/animations.css";

type Props = {
  path: string;
  git?: {
    enabled: boolean;
    branch: string;
    changes: boolean;
    staged: boolean;
  };
  submit: FunctionStringCallback;
}

export function InputLine({ path, git, submit }: Props) {
  const [text, setText] = useState("");
  const spanRef = useRef<HTMLSpanElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (spanRef.current && textareaRef.current) {
  //     console.log("span", spanRef.current.offsetWidth);
  //     textareaRef.current.style.width = (spanRef.current.offsetWidth + 2) + "px";
  //   }
  // }, [text])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(text);
      setText("");
    }
  }

  function handleChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function stopBlinking() {
    if (!spanRef?.current) {
      return;
    }

    spanRef.current.style.opacity = "0.5";
  }
  function startBlinking() {
    if (!spanRef?.current) {
      return;
    }

    spanRef.current.style.opacity = "1";
  }

  return (
    <div className="w-full flex items-center h-5">
      <div className="pe-2">
        <Path path={path} git={git} />
      </div>
      <div className="w-full relative inline-block">
        <span ref={spanRef} className="absolute z-0 whitespace-pre cursor text-transparent">{text || " "}</span>
        <textarea ref={textareaRef} className="block relative w-full z-10 h-5 bg-transparent m-0 p-0 resize-none \
        outline-none border-none shadow-none caret-transparent \
        focus:outline-none focus:border-none focus:shadow-none focus:caret-transparent \
        overflow-hidden"
          autoFocus
          value={text}
          onFocus={startBlinking}
          onBlur={stopBlinking}
          onKeyDown={handleKeyDown}
          onChange={handleChangeText}
        ></textarea>
      </div>
    </div>
  )
}
