import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function Notes() {
  return (
    <div className="w-full h-full bg-slate-800">
      <ScrollArea className="w-full h-full p-1">
        <div>
          <div className="mb-6">
            <h1 className="text-lg font-bold">Who am I?</h1>
            <p>I{"'"}m a 21 year old college student with a passion for technology.</p>
          </div>
          <div className="mb-6">
            <h1 className="text-lg font-bold">Goals?</h1>
            <p>As I enter the workforce, my main hope is to have an impact.
              I want to contribute to a project that affects someone{"'"}s daily life,
              as that is what will motivate me to do my best.</p>
          </div>
          <div className="mb-6">
            <h1 className="text-lg font-bold">Hobbies?</h1>
            <ul>
              <li className="list-disc list-inside ms-2">
                Golfer, Snowboarder/Skier, Runner
              </li>
              <li className="list-disc list-inside ms-2">
                Fraternity Risk Manager, Website Coordinator, Professional Development Lead
              </li>
              <li className="list-disc list-inside ms-2">
                Lacrosse player, Football player, and Cross Country runner
              </li>
              <li className="list-disc list-inside ms-2">
                Lifelong Learner and Problem Solver,
              </li>
            </ul>
          </div>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
