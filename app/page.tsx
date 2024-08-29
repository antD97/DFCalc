import { Box } from "@/app/components/ui/layout/box";
import { H } from "@/app/components/ui/header";
import { A } from "@/app/components/ui/anchor";
import { P } from "@/app/components/ui/paragraph";
import ToolSwitcher from "@/app/components/toolSwitcher";
import GameDataSelector from "@/app/components/gameDataSelector";
import { GameDataProvider } from "@/app/components/gameDataContext";

export default function Home() {
  return (
    <>
      <div className="w-full py-16">
        <H level="1" variant="title">DFCalc</H>
        <H level="2" className="text-lg">A <A href="https://www.playdeltaforce.com/en/index.html">Delta Force</A> tool by <A href="https://github.com/antD97">antD</A></H>
      </div>

      <Box variant="no-bg" className="mb-8 py-0">
        <P>
          DFCalc is a calculator tool designed for the
          game <A href="https://www.playdeltaforce.com/en/index.html">Delta Force</A>. Here you can find various tools
          to compare the in-game weapons. The "Compare All" tool can be used to compare every gun in the game across
          various stats from, damage per shot, shots to kill, and time to kill. The "Inspect One" tool can be used to
          learn about all the stats that impact how much damage a gun provides.
        </P>
        <P>
          Currently, all of the data used by calculations was recorded by me, antD, which means there likely will be
          mistakes. If you find any problems with the data that don't match what you experience in-game, visit
          the <A href="issues">issues</A> page to help correct it. If you'd like to help keep this tool up-to-date visit
          the <A href="contribute">contribute</A> page to see how you can help. All of the raw data used by the
          calculator can be found <A href="https://github.com/antD97/DFCalc/tree/main/public/data">here</A>.
        </P>
      </Box>

      <GameDataProvider>
        <GameDataSelector className="mb-8" />
        <ToolSwitcher />
      </GameDataProvider>
    </>
  );
}
