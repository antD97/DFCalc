import HomeButton from "@/app/components/homeButton";
import { A } from "@/app/components/ui/anchor";
import { Box } from "@/app/components/ui/box";
import { H } from "@/app/components/ui/header";
import { UL } from "@/app/components/ui/list";
import { LI } from "@/app/components/ui/listItem";
import { P } from "@/app/components/ui/paragraph";
import { Metadata } from "next";

export const metadata: Metadata = { title: "DFCalc - Issues" };

export default function Issues() {
  const issuesUrl = "https://github.com/antD97/DFCalc/issues";
  const discordUrl = "https://discordapp.com/users/112740550049857536";
  const emailUrl = "mailto:antD97@proton.me";

  return (
    <>
      <HomeButton />

      <div className="w-full py-16">
        <H level="1" variant="title">Issues</H>
        <H level="2" className="text-lg">Miscalculations and typos</H>
      </div>

      <Box maxWidth="small">
        <P>
          Found a gun statistic that doesn't match what you see in game? Discovered a damage mechanic that the
          calculator doesn't account for? Want a new feature added? All issues and feature requests can be submitted on
          the <A href={issuesUrl}>GitHub issues page</A>.
        </P>
        <P>
          If you have any questions, feel free to contact me directly on <A href={discordUrl}>Discord</A> or
          through <A href={emailUrl}>email</A>.
        </P>
        <UL>
          <LI>Discord: <A href={discordUrl}>antD</A></LI>
          <LI>Email: <A href={emailUrl}>antD97@proton.me</A></LI>
        </UL>
      </Box>
    </>
  );
}
