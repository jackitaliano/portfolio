import { TextLine } from "./TextLine";

type Props = {
  text: string
}

export function Unknown({ text }: Props) {
  return (
    <TextLine>
      <p>{`'${text}': command not found`}</p>
    </TextLine>
  )
}
