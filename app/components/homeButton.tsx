import Link from "next/link";
import { FC } from "react";
import { IoIosHome } from "react-icons/io";

const HomeButton: FC = () => {
  return (
    <div className="absolute left-0 top-0 flex justify-center w-screen h-16">
      <div className="relative w-full max-w-screen-lg">
        <Link href="/" className="absolute text-3xl top-6 right-6 text-neutral-100 hover:text-neutral-300 active:text-neutral-400">
          <IoIosHome />
        </Link>
      </div>
    </div>
  );
}

export default HomeButton;
