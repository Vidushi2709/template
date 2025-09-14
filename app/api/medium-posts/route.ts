import { NextResponse } from 'next/server';
import { fetchMediumPosts } from '@/lib/medium';

export async function GET() {
  try {
    const posts = await fetchMediumPosts('vidushianand09');
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error fetching Medium posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts' },
      { status: 500 }
    );
  }
}
