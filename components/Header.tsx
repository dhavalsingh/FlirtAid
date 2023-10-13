import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/logo.png"
          className="sm:w-16 sm:h-16 w-12 h-12"
          width={128}
          height={128}
        />
    <div className="flex flex-col">
      <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
        Flirt Aid
      </h1>
      <p className="sm:text-xl text-lg ml-2">Crafting Connection, One Flirt at a Time.</p> {/* Added this line */}
    </div>
      </Link>
      <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a>
    </header>
  );
}
