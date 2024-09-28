import { useState } from "react";
import { Path } from "./Path";

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

  return (
    <div className="w-full flex flex-wrap items-center h-5">
      <div className="pe-2">
        <Path path={path} git={git} />
      </div>
      <textarea className="w-fit h-5 bg-red-900 m-0 p-0 resize-none \
        outline-none border-none shadow-none caret-transparent \
        focus:outline-none focus:border-none focus:shadow-none focus:caret-transparent"
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleChangeText}
      ></textarea>
    </div>
  )
}
