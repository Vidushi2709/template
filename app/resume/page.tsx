import { SiteFrame } from "@/components/site-frame"
import { Panel } from "@/components/panel"
import Link from "next/link"
import Image from "next/image"

export default function ResumePage() {
  return (
    <SiteFrame 
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="h-full flex flex-col space-y-3">
          <div className="hidden md:block flex-1">
            <div className="flex flex-col items-center justify-start h-full p-4 space-y-3 pt-8">
              <Image 
                src="https://i.pinimg.com/1200x/3b/17/d3/3b17d3fcf3000d1e12b5797fad9e142c.jpg" 
                alt="Resume decoration 1" 
                width={300}
                height={200}
                className="max-w-full max-h-[30%] object-contain rounded-lg"
              />
              <Image 
                src="https://i.pinimg.com/736x/15/de/68/15de68da040226be0bd83bae572e22af.jpg" 
                alt="Resume decoration 2" 
                width={300}
                height={200}
                className="max-w-full max-h-[30%] object-contain rounded-lg"
              />
              <Image 
                src="https://i.pinimg.com/736x/64/e0/43/64e04381e57ca5d5dfd72cc4e049039e.jpg" 
                alt="Resume decoration 3" 
                width={300}
                height={200}
                className="max-w-full max-h-[30%] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="h-full flex flex-col">
        <Panel title="resume" scrollable className="h-[650px]">
          <p className="mb-3">
            Go through my resume and see if you can hire me with a better offer than the one I have.
          </p>
          <div className="flex gap-2 mb-3">
            <Link
              href="/files/Vidushi Anand resume.pdf"
              download
              className="rounded-full border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] px-4 py-2 font-semibold text-[var(--primary)] shadow-[0_2px_0_rgba(0,0,0,0.08)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
            >
              download PDF
            </Link>
            <Link
              href="/files/Vidushi Anand resume.pdf"
              target="_blank"
              className="rounded-full border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] px-4 py-2 font-semibold text-[var(--primary)] shadow-[0_2px_0_rgba(0,0,0,0.08)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
            >
              open in new tab
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border-[3px] border-[var(--secondary)] bg-white">
            <object
              data="/files/Vidushi Anand resume.pdf"
              type="application/pdf"
              className="h-[600px] w-full"
            >
              <p className="p-4 text-center text-gray-600">
                Your browser doesn&apos;t support PDFs. 
                <a href="/files/Vidushi Anand resume.pdf" className="text-blue-600 underline" target="_blank">
                  Click here to download the PDF
                </a>
              </p>
            </object>
          </div>
        </Panel>
      </div>
    </SiteFrame>
  )
}
