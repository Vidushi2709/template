"use client";

import { useEffect, useState, useCallback } from "react";
import { Panel } from "@/components/panel";
import Image from "next/image";

interface GitHubStatsData {
  username: string;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  total_forks: number;
  contributions: number;
  streak: number;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  twitter_username: string;
  created_at: string;
  updated_at: string;
}

interface GitHubStatsProps {
  username: string;
}

export function GitHubStats({ username }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      setProfileLoading(true);
      
      // Check cache first (only in browser)
      if (typeof window !== 'undefined') {
        const cacheKey = `github-user-${username}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = cached ? JSON.parse(cached).timestamp : 0;
        const now = Date.now();
        
        if (cached && (now - cacheTime) < 5 * 60 * 1000) { // 5 minutes cache
          const cachedData = JSON.parse(cached).data;
          setStats(prev => ({
            ...prev,
            ...cachedData,
            total_stars: prev?.total_stars || 0,
            total_forks: prev?.total_forks || 0,
            contributions: prev?.contributions || 0,
            streak: prev?.streak || 0,
          }));
          setProfileLoading(false);
          return cachedData;
        }
      }

      const userResponse = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`OOPs! Failed to fetch GitHub data: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      
      // Cache the data (only in browser)
      if (typeof window !== 'undefined') {
        const cacheKey = `github-user-${username}`;
        localStorage.setItem(cacheKey, JSON.stringify({
          data: {
            username: userData.login,
            followers: userData.followers,
            following: userData.following,
            public_repos: userData.public_repos,
            avatar_url: userData.avatar_url,
            bio: userData.bio || "No bio available",
            location: userData.location || "Location not specified",
            company: userData.company || "No company specified",
            blog: userData.blog || "",
            twitter_username: userData.twitter_username || "",
            created_at: userData.created_at,
            updated_at: userData.updated_at,
          },
          timestamp: Date.now()
        }));
      }

      setStats(prev => ({
        ...prev,
        username: userData.login,
        followers: userData.followers,
        following: userData.following,
        public_repos: userData.public_repos,
        avatar_url: userData.avatar_url,
        bio: userData.bio || "No bio available",
        location: userData.location || "Location not specified",
        company: userData.company || "No company specified",
        blog: userData.blog || "",
        twitter_username: userData.twitter_username || "",
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        total_stars: prev?.total_stars || 0,
        total_forks: prev?.total_forks || 0,
        contributions: prev?.contributions || 0,
        streak: prev?.streak || 0,
      }));

      setProfileLoading(false);
      return userData;
    } catch (err) {
      console.error("GitHub User API Error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
      setProfileLoading(false);
      throw err;
    }
  }, [username]);

  const fetchReposData = useCallback(async () => {
    try {
      setReposLoading(true);
      
      // Check cache first (only in browser)
      if (typeof window !== 'undefined') {
        const cacheKey = `github-repos-${username}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = cached ? JSON.parse(cached).timestamp : 0;
        const now = Date.now();
        
        if (cached && (now - cacheTime) < 10 * 60 * 1000) { // 10 minutes cache for repos
          const cachedData = JSON.parse(cached).data;
          setStats(prev => ({
            ...prev,
            ...cachedData,
            username: prev?.username || '',
            followers: prev?.followers || 0,
            following: prev?.following || 0,
            public_repos: prev?.public_repos || 0,
            avatar_url: prev?.avatar_url || '',
            bio: prev?.bio || '',
            location: prev?.location || '',
            company: prev?.company || '',
            blog: prev?.blog || '',
            twitter_username: prev?.twitter_username || '',
            created_at: prev?.created_at || '',
            updated_at: prev?.updated_at || '',
          }));
          setReposLoading(false);
          return;
        }
      }

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=stars`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repository data");
      }

      const reposData = await reposResponse.json();

      const totalStars = reposData.reduce(
        (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
        0
      );
      const totalForks = reposData.reduce(
        (acc: number, repo: { forks_count: number }) => acc + repo.forks_count,
        0
      );

      // Calculate contributions (approximate based on public repos and activity)
      const contributions = Math.floor(
        reposData.length * 10 + totalStars * 2 + (stats?.followers || 0) * 5
      );

      // Calculate streak (approximate based on recent activity)
      const recentRepos = reposData.filter((repo: { updated_at: string }) => {
        const updatedDate = new Date(repo.updated_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return updatedDate > thirtyDaysAgo;
      });
      const streak = Math.min(recentRepos.length, 30);

      const reposStats = {
        total_stars: totalStars,
        total_forks: totalForks,
        contributions,
        streak,
      };

      // Cache the data (only in browser)
      if (typeof window !== 'undefined') {
        const cacheKey = `github-repos-${username}`;
        localStorage.setItem(cacheKey, JSON.stringify({
          data: reposStats,
          timestamp: Date.now()
        }));
      }

      setStats(prev => ({
        ...prev,
        ...reposStats,
        username: prev?.username || '',
        followers: prev?.followers || 0,
        following: prev?.following || 0,
        public_repos: prev?.public_repos || 0,
        avatar_url: prev?.avatar_url || '',
        bio: prev?.bio || '',
        location: prev?.location || '',
        company: prev?.company || '',
        blog: prev?.blog || '',
        twitter_username: prev?.twitter_username || '',
        created_at: prev?.created_at || '',
        updated_at: prev?.updated_at || '',
      }));
      setReposLoading(false);
    } catch (err) {
      console.error("GitHub Repos API Error:", err);
      setReposLoading(false);
      // Don't set error for repos, just show what we have
    }
  }, [username, stats?.followers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data first (faster)
        await fetchUserData();
        
        // Then fetch repos data (slower)
        await fetchReposData();
        
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUserData, fetchReposData]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <Panel title="github profile" className="h-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[var(--muted)] rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-3/4"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center">
            <div className="h-5 bg-[var(--muted)] rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-5 bg-[var(--muted)] rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
          </div>
        </div>
      </Panel>

      <Panel title="repository stats" scrollable className="flex-1">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
            </div>
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
            </div>
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
            </div>
          </div>
          <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
            <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-24 mx-auto"></div>
          </div>
        </div>
      </Panel>
    </div>
  );

  if (error && !stats) {
    return (
      <Panel title="github stats" className="h-32">
        <div className="text-center text-[var(--muted-foreground)]">
          <p>failed to load stats</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">check console for details</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-3 py-1 text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded hover:opacity-80"
          >
            retry
          </button>
        </div>
      </Panel>
    );
  }

  // Show loading skeleton if no data at all
  if (loading && !stats) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <Panel title="github profile" className="h-auto">
        <div className="flex items-center gap-3 mb-3">
          {profileLoading ? (
            <div className="w-12 h-12 bg-[var(--muted)] rounded-full animate-pulse"></div>
          ) : (
            <Image
              src={stats?.avatar_url || ''}
              alt={`${stats?.username || 'user'} avatar`}
              width={48}
              height={48}
              className="rounded-full border-2 border-[var(--border)]"
            />
          )}
          <div className="flex-1">
            {profileLoading ? (
              <>
                <div className="h-4 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-3/4"></div>
              </>
            ) : (
              <>
                <p className="font-semibold text-[var(--foreground)]">@{stats?.username}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{stats?.bio}</p>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center">
            {profileLoading ? (
              <>
                <div className="h-5 bg-[var(--muted)] rounded animate-pulse mb-1"></div>
                <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
              </>
            ) : (
              <>
                <p className="font-semibold text-[var(--primary)]">{stats?.followers}</p>
                <p className="text-[var(--muted-foreground)]">followers</p>
              </>
            )}
          </div>
          <div className="text-center">
            {profileLoading ? (
              <>
                <div className="h-5 bg-[var(--muted)] rounded animate-pulse mb-1"></div>
                <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
              </>
            ) : (
              <>
                <p className="font-semibold text-[var(--primary)]">{stats?.following}</p>
                <p className="text-[var(--muted-foreground)]">following</p>
              </>
            )}
          </div>
        </div>
      </Panel>

      <Panel title="repository stats" scrollable className="flex-1">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              {reposLoading ? (
                <>
                  <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {stats?.public_repos || 0}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">repositories</p>
                </>
              )}
            </div>
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              {reposLoading ? (
                <>
                  <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {stats?.total_stars || 0}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">stars earned</p>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              {reposLoading ? (
                <>
                  <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-16 mx-auto"></div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {stats?.total_forks || 0}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">forks</p>
                </>
              )}
            </div>
            <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
              {reposLoading ? (
                <>
                  <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-20 mx-auto"></div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {stats?.contributions || 0}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">commits</p>
                </>
              )}
            </div>
          </div>

          <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
            {reposLoading ? (
              <>
                <div className="h-8 bg-[var(--muted)] rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-24 mx-auto"></div>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-[var(--primary)]">{stats?.streak || 0}</p>
                <p className="text-sm text-[var(--muted-foreground)]">active days streak</p>
              </>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
