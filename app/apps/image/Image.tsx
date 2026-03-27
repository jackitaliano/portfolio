
import NextImage from 'next/image';

type Props = {
  imageSrc: string;
  alt: string;
}

export function Image({ imageSrc, alt }: Props) {

  return (
    <div className="relative w-full h-full bg-slate-800 flex items-center justify-center overflow-hidden">
      <NextImage src={imageSrc} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
  )
}
