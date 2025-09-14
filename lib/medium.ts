export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  guid: string;
}

export async function fetchMediumPosts(username: string): Promise<MediumPost[]> {
  try {
    // Medium RSS feed URL format
    const rssUrl = `https://medium.com/feed/@${username}`;
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio Bot)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('No content received from Medium RSS feed');
    }
    
    const xmlText = data.contents;
    
    // Parse the RSS XML using a simple regex approach for server-side compatibility
    const posts: MediumPost[] = [];
    
    // Extract items using regex (more reliable than DOMParser in server environment)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];
      
      const title = cleanTitle(extractXmlContent(itemContent, 'title') || '');
      const link = extractXmlContent(itemContent, 'link') || '';
      const pubDate = extractXmlContent(itemContent, 'pubDate') || '';
      const description = extractXmlContent(itemContent, 'description') || '';
      const content = extractXmlContent(itemContent, 'content:encoded') || extractXmlContent(itemContent, 'encoded') || description;
      const guid = extractXmlContent(itemContent, 'guid') || link;
      
      if (title && link) {
        posts.push({
          title,
          link,
          pubDate,
          description: cleanDescription(description),
          content,
          guid
        });
      }
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

function extractXmlContent(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  if (!match) return null;
  
  let content = match[1].trim();
  
  // Remove CDATA sections
  content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  
  // Decode HTML entities
  content = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  return content;
}

function cleanTitle(title: string): string {
  // Remove CDATA sections first
  let cleaned = title.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  
  // Remove HTML tags and clean up the title
  cleaned = cleaned
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  
  return cleaned;
}

function cleanDescription(description: string): string {
  // Remove CDATA sections first
  let cleaned = description.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  
  // Remove HTML tags and clean up the description
  cleaned = cleaned
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  
  // Truncate if too long
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200) + '...';
  }
  
  return cleaned;
}

export function formatMediumDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}
