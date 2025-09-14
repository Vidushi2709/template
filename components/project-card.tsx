import Image from "next/image";
import Link from "next/link";
import { Panel } from "@/components/panel";

type Props = {
  title: string;
  description: string;
  image: string;
  link?: string;
  repo?: string;
};

export function ProjectCard({ title, description, image, link, repo }: Props) {
  return (
    <Panel>
      <div className="flex items-start gap-3">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} preview`}
          width={72}
          height={72}
          className="rounded-lg border-[3px] border-[#f2c9a5] bg-white p-1"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold tracking-wide text-[#ff71b3]">
            {title}
          </h3>
          <p className="text-[#7a6b55]">{description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {link ? (
              <Link
                href={link}
                className="rounded-full border-[3px] border-[#f2c9a5] bg-[#fff7ef] px-3 py-1 text-sm font-semibold text-[#d86fa2] shadow-[0_2px_0_#e6b98f]"
              >
                live
              </Link>
            ) : null}
            {repo ? (
              <Link
                href={repo}
                className="rounded-full border-[3px] border-[#f2c9a5] bg-[#fff7ef] px-3 py-1 text-sm font-semibold text-[#d86fa2] shadow-[0_2px_0_#e6b98f]"
              >
                repo
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Panel>
  );
}
