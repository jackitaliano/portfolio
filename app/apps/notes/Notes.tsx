import { useEffect, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
};

const AUTO_COMPLETE_IDLE_MS = 4000;

export function Notes({ markdown }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(markdown);

  useEffect(() => {
    setContent(markdown);
  }, [markdown]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsEditing(false);
    }, AUTO_COMPLETE_IDLE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isEditing, content]);

  return (
    <div className="w-full h-full bg-[#131414] relative">
      <button
        type="button"
        aria-label={isEditing ? "Finish editing note" : "Edit note"}
        className="absolute bottom-2 right-2 z-20 w-8 h-8 rounded-full bg-slate-700/40 hover:bg-slate-700/60 flex items-center justify-center"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? <Check size={14} /> : <Pencil size={14} />}
      </button>
      <ScrollArea className="w-full h-full p-[var(--wm-app-pad)]">
        <div className="space-y-[var(--wm-notes-section-gap)] text-[length:var(--wm-notes-font-size)]">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[calc(100dvh-12rem)] bg-transparent text-inherit p-0 m-0 resize-none outline-none border-none shadow-none font-inherit leading-relaxed"
            />
          ) : (
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
              {content}
            </ReactMarkdown>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
