import { SiteFrame } from "@/components/site-frame";
import { Panel } from "@/components/panel";
import { posts } from "@/data/posts";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <SiteFrame title="SUGARANGEL">
      <Panel title={post.title}>
        <p className="text-sm text-[#9a7f62]">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <div className="mt-2 whitespace-pre-wrap">{post.content}</div>
      </Panel>
    </SiteFrame>
  );
}
