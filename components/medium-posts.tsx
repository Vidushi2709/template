"use client";

import { useState, useEffect } from 'react';
import { PostCard } from './post-card';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  guid: string;
}

export function MediumPosts() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/medium-posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch Medium posts:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">Loading Medium posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-red-500">Failed to load Medium posts: {error}</p>
        <p className="text-xs text-gray-400 mt-1">
          Visit my Medium profile directly: 
          <a 
            href="https://medium.com/@vidushianand09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            @vidushianand09
          </a>
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">No Medium posts available at the moment.</p>
        <p className="text-xs text-gray-400 mt-1">
          Visit my Medium profile: 
          <a 
            href="https://medium.com/@vidushianand09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            @vidushianand09
          </a>
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <PostCard
          key={`medium-${index}`}
          slug={`medium-${index}`}
          title={post.title}
          date={post.pubDate}
          excerpt={post.description}
          type="medium"
          externalLink={post.link}
        />
      ))}
    </>
  );
}
