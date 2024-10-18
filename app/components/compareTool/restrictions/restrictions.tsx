'use client';

import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import { Accordion } from "@/app/components/ui/accordion";
import { Box } from "@/app/components/ui/box";
import { Button, StateButton } from "@/app/components/ui/button";
import CustomScroll from "@/app/components/ui/customScroll";
import CharacterClass from "@/app/types/characterClass";
import GunClass from "@/app/types/gunClass";
import { FC } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const allCharacterClasses = ['Assault', 'Support', 'Engineer', 'Recon'] as const;
const allGunClasses = [
  'Assault Rifle',
  'Marksman Rifle',
  'Submachine Gun',
  'Light Machine Gun',
  'Sniper Rifle',
  'Pistol'
] as const;

const Restrictions: FC<{ limitMaxHeight?: boolean }> = ({ limitMaxHeight = false }) => {
  const { requiredCharacterClasses, requiredGunClasses, attachmentRestrictions, dispatch } = useCompareToolData();

  return (
    <div className="h-full flex flex-col">
      <CustomScroll className={`grow min-h-0 py-4 border-y-2 border-neutral-900 ${limitMaxHeight ? 'max-h-96' : ''}`}>
        <div className="antialiased">
          <Box variant="inner" maxWidth="none" className="mb-4">
            <Accordion text="Character Class">
              <ul className="flex flex-col items-stretch gap-y-4">
                {
                  allCharacterClasses.map(charClass => {
                    const isEnabled = requiredCharacterClasses.includes(charClass);
                    return (
                      <li key={charClass} className="flex">
                        <StateButton
                          isEnabled={isEnabled}
                          onClick={() => {
                            let characterClasses: CharacterClass[];

                            // if every button is enabled, disable all other buttons
                            if (allCharacterClasses.every(c => requiredCharacterClasses.includes(c))) {
                              characterClasses = requiredCharacterClasses.filter(c => c === charClass);
                            }

                            // otherwise, toggle button state
                            else {
                              characterClasses = requiredCharacterClasses.includes(charClass)
                                ? requiredCharacterClasses.filter(c => c !== charClass)
                                : [...requiredCharacterClasses, charClass];
                            }

                            // if every button state is disabled, enable every button
                            if (characterClasses.length === 0) {
                              characterClasses = [...allCharacterClasses];
                            }

                            dispatch({ type: 'setCharacterClasses', value: characterClasses });
                          }}
                          className={filterBtnClassName(isEnabled)}
                        >
                          {charClass}
                        </StateButton>
                      </li>
                    );
                  })
                }
              </ul>
            </Accordion>
          </Box>

          <Box variant="inner" maxWidth="none" className="mb-4">
            <Accordion text="Gun Class">
              <ul className="flex flex-col items-stretch gap-y-4">
                {
                  allGunClasses.map(gunClass => {
                    const isEnabled = requiredGunClasses.includes(gunClass);
                    return (
                      <li key={gunClass} className="flex">
                        <StateButton
                          isEnabled={isEnabled}
                          onClick={() => {
                            let gunClasses: GunClass[];

                            // if every button is enabled, disable all other buttons
                            if (allGunClasses.every(c => requiredGunClasses.includes(c))) {
                              gunClasses = requiredGunClasses.filter(c => c === gunClass);
                            }

                            // otherwise, toggle button state
                            else {
                              gunClasses = requiredGunClasses.includes(gunClass)
                                ? requiredGunClasses.filter(c => c !== gunClass)
                                : [...requiredGunClasses, gunClass];
                            }

                            // if every button state is disabled, enable every button
                            if (gunClasses.length === 0) {
                              gunClasses = [...allGunClasses];
                            }

                            dispatch({ type: 'setGunClasses', value: gunClasses });
                          }}
                          className={filterBtnClassName(isEnabled)}
                        >
                          {gunClass}
                        </StateButton>
                      </li>
                    );
                  })
                }
              </ul>
            </Accordion>
          </Box>

          <Box variant="inner" maxWidth="none">
            <Accordion text="Attachments">
              <ul className="flex flex-col items-stretch gap-y-4">
                <li className="self-center flex flex-col items-center gap-y-2">
                  <div>Change which guns use which attachments.</div>
                  <Button
                    onClick={() => { dispatch({ type: 'setNewAttachmentRestrictionsModalVisible', value: true }); }}
                    className="w-fit"
                  >
                    New
                  </Button>
                </li>
                {
                  attachmentRestrictions.map((attachmentRestriction, i) => (
                    <li key={i}>
                      <Box variant="inner" maxWidth="none" className="relative flex flex-col items-center">
                        <button
                          onClick={() => {
                            dispatch({
                              type: 'setAttachmentRestrictions',
                              value: attachmentRestrictions.filter((_, j) => i !== j)
                            });
                          }}
                          className="absolute right-2 top-2 text-2xl hover:text-red-500"
                        >
                          <IoIosCloseCircleOutline />
                        </button>
                        {
                          attachmentRestriction.type === 'requireAttachment' && (<>
                            <div className="italic">{attachmentRestriction.gun}</div>
                            <div className="font-bold text-amber-500">MUST USE</div>
                            <div className="italic">{attachmentRestriction.attachment}</div>
                          </>)
                        }
                        {
                          attachmentRestriction.type === 'excludeAttachment' && (<>
                            <div className="italic">
                              {
                                attachmentRestriction.gun.type === 'all'
                                  ? 'ALL guns'
                                  : attachmentRestriction.gun.name
                              }
                            </div>
                            <div className="font-bold text-red-500">CANNOT USE</div>
                            <div className="italic">
                              {
                                attachmentRestriction.attachment.type === 'all'
                                  ? 'ANY attachment'
                                  : attachmentRestriction.attachment.name
                              }
                            </div>
                          </>)
                        }
                      </Box>
                    </li>
                  ))
                }
              </ul>
            </Accordion>
          </Box>
        </div>
      </CustomScroll>
    </div>
  );
};

const filterBtnClassName = (isEnabled: boolean) => `w-full mx-auto max-w-64
${isEnabled ? 'bg-transparent text-white border-white hover:bg-white/10 hover:cursor-pointer'
    : 'line-through'}`;

export default Restrictions;
