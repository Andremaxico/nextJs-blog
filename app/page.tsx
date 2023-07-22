import { Posts } from "./components/Posts";
import { ProfileAvatar } from "./components/ProfileAvatar";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="px-6 mx-auto">
      <ProfileAvatar />
      <p className="mt-12 text-3xl text-center dark:text-white">
        Hello and welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Andrii</span>
        </span>
      </p>
      <Posts />
    </div>
  )
}
