import { TextLine } from "./TextLine"

export function Projects() {
  return (
    <div>
      <TextLine>
        <div className="mb-2">
          <h1 className="text-blue-400">BIDARA - Open-Source Aerospace AI Research and Design Tool</h1>
          <h2 className="text-green-500">What:</h2>
          <p className="ps-4">- Developed a Research/Design tool for engineers to engage with design challenges and be able to draw on natural soltuions</p>
          <h2 className="text-green-500">Tools:</h2>
          <p className="ps-4">- JavaScript, Svelete, Node.js, Openai, Graph and Vector DBs</p>
        </div>
        <div className="mb-2">
          <h1 className="text-blue-400">OAIT - OpenAI Tools, a CLI Utility</h1>
          <h2 className="text-green-500">What:</h2>
          <p className="ps-4">- Developed automated and simplified access to access APIs frequently being used by my team through the CLI</p>
          <h2 className="text-green-500">Tools:</h2>
          <p className="ps-4">Go Lang</p>
        </div>
        <div className="mb-2">
          <h1 className="text-blue-400" >Audio Studio Code - Speech-To-Text IDE</h1>
          <h2 className="text-green-500">What:</h2>
          <p className="ps-4">- Developed context-based speec-to-code IDE from the ground up</p>
          <p className="ps-4">- Utilized speech recognition, CFGs, Recursive Decent Parsing, and custom-built IDE</p>
          <h2 className="text-green-500">Tools:</h2>
          <p className="ps-4">- Python, Google Speech Recognition, Firebase, Tkinter</p>
        </div>
      </TextLine>
      <TextLine>
        <p>`projects -m` for more projects</p>
      </TextLine>
    </div>
  )
}
