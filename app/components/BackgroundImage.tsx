import Image from "next/image"
import "../css/tmp.css"

export function BackgroundImage() {
  return (
    <div className="absolute w-screen h-screen p-0 m-0 -z-20">
      <div className="fixed w-screen h-screen p-0 m-0 bg-black/70 z-0">
      </div>
      <div className="fixed w-screen h-screen p-0 m-0 blur-xl -z-10">
        <Image className="object-fill w-full h-full" width="100" height="100" src="/static/images/nebula.jpeg" alt="" />
      </div>
    </div>
  )
}
