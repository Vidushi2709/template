import Link from "next/link";
import { Panel } from "@/components/panel";

type Props = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  type?: 'local' | 'medium';
  externalLink?: string;
};

export function PostCard({ slug, title, date, excerpt, type = 'local', externalLink }: Props) {
  const isMedium = type === 'medium';
  const linkHref = isMedium ? externalLink || slug : `/blog/${slug}`;
  const linkTarget = isMedium ? '_blank' : '_self';
  const linkRel = isMedium ? 'noopener noreferrer' : undefined;

  return (
    <Panel className="transition">
      <div className="space-y-1">
        <h3 className="text-lg font-extrabold tracking-wide text-[#ff71b3]">
          <Link href={linkHref} target={linkTarget} rel={linkRel}>
            {title}
            {isMedium && <span className="ml-2 text-xs">📖</span>}
          </Link>
        </h3>
        <p className="text-sm text-[#9a7f62]">
          {new Date(date).toLocaleDateString()}
        </p>
        <p>{excerpt}</p>
        {isMedium && (
          <p className="text-xs text-[#9a7f62] italic">
            Published on Medium • Click to read full article
          </p>
        )}
        <div className="pt-1">
          <Link
            href={linkHref}
            target={linkTarget}
            rel={linkRel}
            className="rounded-full border-[3px] border-[#f2c9a5] bg-[#fff7ef] px-3 py-1 text-sm font-semibold text-[#d86fa2] shadow-[0_2px_0_#e6b98f]"
          >
            {isMedium ? 'read on medium →' : 'read more →'}
          </Link>
        </div>
      </div>
    </Panel>
  );
}
