export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  visibility: string;
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  bio: string | null;
  contributions?: number;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.visibility === 'public')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 8);
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

export function isVercelDeployment(url: string | null): boolean {
  if (!url) return false;
  return url.includes('vercel.app') || url.startsWith('https://');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F1E05A',
    Python: '#3572A5',
    Rust: '#DEA584',
    Go: '#00ADD8',
    Java: '#B07219',
    'C++': '#F34B7D',
    CSS: '#563D7C',
    HTML: '#E34C26',
    Swift: '#FFAC45',
    Kotlin: '#7F52FF',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Shell: '#89E051',
  };
  return colors[language || ''] || '#6B7280';
}
