import { SiteFrame } from "@/components/site-frame"
import { Panel } from "@/components/panel"
import { posts } from "@/data/post"
import { PostCard } from "@/components/post-card"
import { fetchMediumPosts, MediumPost } from "@/lib/medium"
import { MediumPosts } from "@/components/medium-posts"
import Link from "next/link"
import Image from "next/image"

export default async function BlogPage() {
  // Fetch Medium posts with error handling
  let mediumPosts: MediumPost[] = [];
  try {
    console.log('Fetching Medium posts for vidushianand09...');
    mediumPosts = await fetchMediumPosts('vidushianand09');
    console.log(`Successfully fetched ${mediumPosts.length} Medium posts`);
  } catch (error) {
    console.error('Failed to fetch Medium posts:', error);
    console.error('Error details:', error);
    // Continue with just local posts if Medium fetch fails
  }
  
  // Convert Medium posts to our Post format
  const convertedMediumPosts = mediumPosts.map((post, index) => ({
    slug: `medium-${index}`,
    title: post.title,
    date: post.pubDate,
    excerpt: post.description,
    content: post.content,
    type: 'medium' as const,
    externalLink: post.link
  }));

  // Note: allPosts variable removed as we now render posts separately
  return (
    <SiteFrame 
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="h-full flex flex-col space-y-3">
          <Panel title="personal blog" className="h-auto">
            <div className="flex flex-col items-center text-center space-y-4 px-3 py-3">
              <div>
                <p className="font-semibold">Scrabbled_scribbles_</p>
                <p className="text-sm">personal thoughts & experiences</p>
              </div>
              <Link 
                href="https://vidushianand.blogspot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
              >
                visit blog
              </Link>
            </div>
          </Panel>
          
          <div className="hidden md:block flex-1">
            <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
              <Image 
                src="https://i.pinimg.com/736x/53/d2/d7/53d2d7c80a7246668e5c208936e5f523.jpg" 
                alt="Blog decoration 1" 
                width={300}
                height={200}
                className="max-w-full max-h-[45%] object-contain rounded-lg"
              />
              <Image 
                src="https://i.pinimg.com/736x/50/df/32/50df32f78a250e5a553b425e15ac5aa4.jpg" 
                alt="Blog decoration 2" 
                width={300}
                height={200}
                className="max-w-full max-h-[45%] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="h-full flex flex-col min-h-0">
        <Panel title="blog" scrollable className="h-[650px]">
          <div className="space-y-3">
            {/* Show local posts first */}
            {posts.map((p) => (
              <PostCard 
                key={p.slug} 
                slug={p.slug} 
                title={p.title} 
                date={p.date} 
                excerpt={p.excerpt}
                type={p.type}
                externalLink={p.externalLink}
              />
            ))}
            
            {/* Show server-side Medium posts if available */}
            {convertedMediumPosts.map((p) => (
              <PostCard 
                key={p.slug} 
                slug={p.slug} 
                title={p.title} 
                date={p.date} 
                excerpt={p.excerpt}
                type={p.type}
                externalLink={p.externalLink}
              />
            ))}
            
            {/* Fallback client-side Medium posts for deployment */}
            {convertedMediumPosts.length === 0 && (
              <MediumPosts />
            )}
            
            {/* Show message if no posts at all */}
            {posts.length === 0 && convertedMediumPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No posts available at the moment.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posts from my Medium account will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </SiteFrame>
  )
}
