
type Props = {
  imageSrc: string;
}

export function Image({ imageSrc }: Props) {

  return (
    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
      <img src={imageSrc} alt="" />
    </div>
  )
}
