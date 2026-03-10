export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface CommissionItem {
  id: number;
  title: string;
  category: "feed-ig" | "undangan" | "poster" | "banner" | "chibi" | "live2d";
  price: string;
  emoji: string;
  tags: string[];
  color: string;
  image: string;
  imageFull: string;
  width: number;
  height: number;
}
