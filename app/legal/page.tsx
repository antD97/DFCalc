import HomeButton from "@/app/components/homeButton";
import { Box } from "@/app/components/ui/box";
import { H } from "@/app/components/ui/header";
import { P } from "@/app/components/ui/paragraph";
import { Metadata } from "next";

export const metadata: Metadata = { title: "DFCalc - Issues" };

export default function Legal() {
  const year = new Date().getFullYear();
  const copyrightYear = year > 2024 ? `2024-${year}` : '2024';

  return (
    <>
      <HomeButton />

      <div className="w-full py-16">
        <H level="1" variant="title">Legal</H>
        <H level="2" className="text-lg">Copyright and open-source licenses</H>
      </div>

      <Box className="font-mono" maxWidth="small">
        <P>
          DFCalc<br />
          Copyright © {copyrightYear} antD<br />
          All rights reserved
        </P>
      </Box>
    </>
  );
}
