import { Accordion } from "@/app/components/ui/accordion";
import { Box } from "@/app/components/ui/box";
import CustomScroll from "@/app/components/ui/customScroll";
import { H } from "@/app/components/ui/header";
import { FC } from "react";

const Restrictions: FC<{ limitMaxHeight?: boolean }> = ({ limitMaxHeight = false }) => {

  return (
    <>
      <div className="h-full max-h-full flex flex-col">
        <H level="3" className="text-2xl mb-4">Restrictions</H>

        <CustomScroll className={`grow min-h-0 py-4 border-y-2 border-neutral-900 ${limitMaxHeight ? 'max-h-96' : ''}`}>
          <div className="antialiased">
            <Box variant="inner" maxWidth="none" className="mb-4">
              <Accordion text="Character Class">
                <ul>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                </ul>
              </Accordion>
            </Box>

            <Box variant="inner" maxWidth="none" className="mb-4">
              <Accordion text="Gun Class">
                <ul>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                </ul>
              </Accordion>
            </Box>

            <Box variant="inner" maxWidth="none">
              <Accordion text="Attachments">
                <ul>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                  <li>d</li>
                </ul>
              </Accordion>
            </Box>
          </div>
        </CustomScroll>
        {/* </div> */}
      </div>
    </>
  );
};

export default Restrictions;
