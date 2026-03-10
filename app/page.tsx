import { getGithubUser, getGithubRepos } from "@/lib/github";
import { GithubUser } from "@/lib/types";
import { COMMISSION_DESAIN } from "@/lib/data";
import Hero from "@/components/Hero";
import GithubSection from "@/components/GithubSection";
import HasilKarya from "@/components/HasilKarya";
import Footer from "@/components/Footer";

export const revalidate = 3600;

const FALLBACK_USER: GithubUser = {
  login: "DonatGula",
  name: null,
  avatar_url: "https://avatars.githubusercontent.com/u/DonatGula",
  bio: "Developer & Designer",
  public_repos: 0,
  followers: 0,
  following: 0,
  html_url: "https://github.com/DonatGula",
};

export default async function Home() {
  let user: GithubUser = FALLBACK_USER;
  let repos: Awaited<ReturnType<typeof getGithubRepos>> = [];

  try {
    [user, repos] = await Promise.all([getGithubUser(), getGithubRepos()]);
  } catch (e) {
    console.error("GitHub API error:", e);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero user={user} />
        <GithubSection user={user} repos={repos} />
        <HasilKarya items={COMMISSION_DESAIN} />
      </main>
      <Footer />
    </>
  );
}
