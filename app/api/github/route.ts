import { NextResponse } from 'next/server';
import { fetchGitHubRepos, fetchGitHubStats } from '@/lib/github';

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'underated-Genius';

  try {
    const [repos, stats] = await Promise.all([
      fetchGitHubRepos(username),
      fetchGitHubStats(username),
    ]);

    return NextResponse.json({ repos, stats }, { status: 200 });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
