import Link from "next/link";
import { FC } from "react";
import { IoIosHome } from "react-icons/io";

const HomeButton: FC = () => {
  return (
    <Link href="/" className="absolute text-2xl top-5 left-5 text-neutral-100 hover:text-neutral-300 active:text-neutral-400">
      <IoIosHome />
    </Link>
  );
}

export default HomeButton;