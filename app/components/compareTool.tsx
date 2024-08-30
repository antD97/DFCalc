'use client'

import { Slider } from "@mui/material";
import { FC, useState } from "react";
import { P } from "@/app/components/ui/paragraph";
import { Box } from "@/app/components/ui/layout/box";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { H } from "@/app/components/ui/header";
import { AnimatePresence, motion } from "framer-motion";

const CompareTool: FC = () => {
  const [distanceStr, setDistanceStr] = useState<string>('100');
  const [isDistanceStrValid, setIsDistanceStrValid] = useState<boolean>(true);
  const [distance, setDistance] = useState<number>(100);

  return (
    <div className="flex w-full gap-8">
      <Box className="basis-1/4 grow">
        <H level="3" className="text-2xl">Restrictions</H>
      </Box>
      <div className="basis-3/4 grow flex flex-col gap-8">
        <Box>
          <H level="3" className="text-2xl">Settings</H>
        </Box>
        <Box className="flex flex-col max-h-96">
          <H level="3" className="text-2xl pb-4">Result</H>

          <div className="overflow-y-scroll shadow-inner-lg">
            <AnimatedList />
          </div>
        </Box>
      </div>
    </div>
    // <Box>
    //   <div className="flex items-center">
    //     <Label>Distance (meters)</Label>
    //     <Input
    //       value={distanceStr}
    //       placeholder="0"
    //       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //         const ds = /\S/.test(event.target.value) ? event.target.value.replace(/^0+/, '') : '';
    //         setDistanceStr(ds);

    //         const valueAsNumber = Number(ds);
    //         if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
    //           setDistance(valueAsNumber);
    //           setIsDistanceStrValid(true);
    //         } else {
    //           setDistance(0);
    //           setIsDistanceStrValid(false);
    //         }
    //       }}
    //       className={`w-12 text-center ${isDistanceStrValid ? '' : 'text-red-500 focus:text-red-500 border-red-500 focus:border-red-500'}`}
    //     />
    //     <div className="px-4 w-full h-full">
    //       <Slider
    //         aria-label="Distance (meters)"
    //         value={distance}
    //         onChange={(event: Event, newValue: number | number[]) => {
    //           setDistance(newValue as number);
    //           setDistanceStr(String(newValue as number));
    //         }}
    //         max={200}
    //       />
    //     </div>
    //   </div>

    //   <P>
    //     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat fugiat, officia molestiae dolore amet rem quod dicta porro blanditiis atque aut ea suscipit mollitia, ipsam at iure non cumque exercitationem explicabo doloremque. Ex alias id mollitia quasi ratione perspiciatis totam facilis ipsam, accusantium sit eveniet, inventore quisquam molestias. Harum excepturi error officia fuga repudiandae laborum maxime minima molestiae sapiente iusto ipsam eos fugiat provident quod, quidem tempora dolore commodi esse voluptate hic. Laboriosam, earum. Autem tempora officia, repudiandae tenetur qui consectetur incidunt quas soluta reiciendis id pariatur officiis illum culpa ad, distinctio optio recusandae ut nisi tempore impedit sed omnis.
    //   </P>

    //   <div>
    //     <div className="flex">
    //       <div className="flex-1 text-nowrap p-4">Gun</div>
    //       <div className="flex-1 text-nowrap p-4">Damage per Shot</div>
    //       <div className="flex-1 text-nowrap p-4">Shots to Kill</div>
    //       <div className="flex-1 text-nowrap p-4">Time to Kill</div>
    //     </div>
    //   </div>
    // </Box>
  );
}

export default CompareTool;

const AnimatedList = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  return (
    <div>
      <button onClick={shuffleItems}>Shuffle</button>
      <ul className="flex flex-col">
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item}
              layout
              transition={{ duration: 0.3 }}
              className="first:mt-2 mb-2"
            >
              <Box variant="inner" className="p-2">
                Item {item}
              </Box>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};