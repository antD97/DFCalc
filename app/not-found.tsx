import HomeButton from "@/app/components/homeButton";
import { H } from "@/app/components/ui/header";
import { Metadata } from "next";

export const metadata: Metadata = { title: "DFCalc - Issues" };

export default function Error() {

  return (
    <>
      <HomeButton />
      <div className="w-full grow flex flex-col justify-center">
        <H level="1">404</H>
        <H level="2" className="text-lg">Not Found</H>
      </div>
    </>
  );
}
