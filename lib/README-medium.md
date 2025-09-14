# Medium Integration

This integration automatically fetches blog posts from your Medium account and displays them on your portfolio's blog page.

## How it works

1. **RSS Feed**: Fetches posts from `https://medium.com/feed/@vidushianand09`
2. **CORS Proxy**: Uses `api.allorigins.win` to bypass CORS restrictions
3. **Auto-update**: Posts are cached for 1 hour and automatically refresh
4. **Fallback**: If Medium posts fail to load, local posts are still displayed

## Features

- ✅ **Automatic Updates**: New Medium posts appear automatically
- ✅ **Mixed Content**: Shows both local and Medium posts together
- ✅ **Sorted by Date**: Posts are sorted newest first
- ✅ **External Links**: Medium posts open in new tabs
- ✅ **Visual Indicators**: Medium posts have a 📖 icon
- ✅ **Error Handling**: Graceful fallback if Medium is unavailable

## Configuration

To change the Medium username, update the username in `app/blog/page.tsx`:

```typescript
const mediumPosts = await fetchMediumPosts('your-username');
```

## Caching

Posts are cached for 1 hour using Next.js's `revalidate` option. This means:
- Fast loading for users
- Reduced API calls to Medium
- Automatic updates every hour

## Troubleshooting

If Medium posts aren't showing:
1. Check the console for error messages
2. Verify the Medium username is correct
3. Ensure the Medium account has public posts
4. Check if the CORS proxy service is working
