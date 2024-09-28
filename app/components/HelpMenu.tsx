import { TextLine } from "./TextLine";

export function HelpMenu() {
  return (
    <TextLine>
      <p>Jack's Portfolio CLI Help</p>
      <div className="flex flex-wrap">
        <p className="ps-4 w-32">whois</p>
        <p>view username</p>
      </div>
      <div className="flex flex-wrap">
        <p className="ps-4 w-32">contact</p>
        <p>view contact info</p>
      </div>
      <div className="flex flex-wrap">
        <p className="ps-4 w-32">experience</p>
        <p>view overview of experience</p>
      </div>
      <div className="flex flex-wrap">
        <p className="ps-4 w-32">projects</p>
        <p>view overview of projects</p>
      </div>
      <div className="flex flex-wrap">
        <p className="ps-4 w-32">help</p>
        <p>see this menu</p>
      </div>
    </TextLine>
  )

}
