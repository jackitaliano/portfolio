import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
};

export function Notes({ markdown }: Props) {
  return (
    <div className="w-full h-full bg-[#131414]">
      <ScrollArea className="w-full h-full p-[var(--wm-app-pad)]">
        <div className="space-y-[var(--wm-notes-section-gap)] text-[length:var(--wm-notes-font-size)]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-[length:var(--wm-notes-h1-size)] font-bold mb-1">{children}</h1>,
              h2: ({ children }) => <h2 className="text-[length:var(--wm-notes-h2-size)] font-bold mb-1">{children}</h2>,
              p: ({ children }) => <p className="leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="space-y-1">{children}</ul>,
              li: ({ children }) => <li className="list-disc list-inside ms-2">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className="underline text-blue-300" target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="bg-slate-700 px-1 rounded text-sm">{children}</code>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
