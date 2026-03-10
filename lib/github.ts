import { GithubRepo, GithubUser } from "./types";

const GITHUB_USERNAME = "DonatGula";
const BASE = "https://api.github.com";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function getGithubUser(): Promise<GithubUser> {
  const res = await fetch(`${BASE}/users/${GITHUB_USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `${BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const data: GithubRepo[] = await res.json();
  return data.filter((r) => !r.fork).slice(0, 12);
}
