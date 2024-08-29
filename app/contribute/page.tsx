import { Box } from "@/app/components/ui/layout/box";
import { H } from "@/app/components/ui/header";
import { A } from "@/app/components/ui/anchor";
import { P } from "@/app/components/ui/paragraph";
import { Metadata } from "next";
import HomeButton from "@/app/components/homeButton";
import { LI, UL } from "../components/ui/list";

export const metadata: Metadata = { title: "DFCalc - Contribute" };

export default function Contribute() {
  const sourceUrl = "https://github.com/antD97/DFCalc";
  const prUrl = "https://github.com/antD97/DFCalc/pulls";
  const discordUrl = "https://discordapp.com/users/112740550049857536";
  const emailUrl = "mailto:antD97@proton.me";

  return (
    <>
      <HomeButton />

      <div className="w-full py-16">
        <H level="1" variant="title">Contribute</H>
        <H level="2" className="text-lg">Help keep DFCalc accurate and up-to-date</H>
      </div>

      <Box variant="no-bg" className="pt-0 max-w-screen-sm lg:max-w-none">
        <P>
          Want to help improve DFCalc? All project source code is
          available <A href={sourceUrl}>here</A>. Feel free to submit pull requests for fixes or new features. If you
          have any questions about the project, you can find me on Discord or send me an email.
        </P>
        <UL>
          <LI>Discord: <A href={discordUrl}>antD</A></LI>
          <LI>Email: <A href={emailUrl}>antD97@proton.me</A></LI>
        </UL>
      </Box>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Box maxWidth="small">
          <H level="3" className="text-2xl pb-4">Game Data</H>
          <P>
            One of the best ways to contribute is by helping keep available game data accurate and up-to-date. The
            calculator uses JSON data in order to run its calculations. The data mostly consists of damage statistics
            for the weapons of the game.
          </P>
          <P>
            The Havoc Warfare and Tactical Turmoil game modes use different damage mechanics and each needs to be
            updated periodically to match the most recent version of the game.
          </P>
          <P>
            If this sounds like something you'd be interested in helping update, send me a Discord message or email or
            directly submit a pull request <A href={prUrl}>here</A>.
          </P>
          <UL>
            <LI>
              Details on the JSON format can be
              found <A href="https://github.com/antD97/DFCalc/blob/main/app/gameData/v1/gameDataV1.ts">here</A>.
            </LI>
            <LI>
              Examples of the JSON format can be
              found <A href="https://github.com/antD97/DFCalc/tree/main/public/data">here</A>.
            </LI>
          </UL>
        </Box>
        <Box maxWidth="small">
          <H level="3" className="text-2xl pb-4">Other Improvements</H>
          <P>
            Want a new featured added, found a bug or typo that you want fixed, or maybe you just want to know where
            help is needed? This project is open to community contributions. You can submit pull
            requests <A href={prUrl}>here</A>, submit issue or feature requests <A href="/issues">here</A>, message me
            on Discord, or send me an email.
          </P>
        </Box>
      </div>
    </>
  );
}
