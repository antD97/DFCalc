'use client';

import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import { useGameData } from "@/app/components/gameDataContext";
import { Button, StateButton } from "@/app/components/ui/button";
import CustomScroll from "@/app/components/ui/customScroll";
import { H } from "@/app/components/ui/header";
import { P } from "@/app/components/ui/paragraph";
import { FC, useState } from "react";

const RequireSettings: FC = () => {
  const { gameDataState } = useGameData();
  const { attachmentRestrictions, dispatch } = useCompareToolData();

  const [selectedGun, setSelectedGun] = useState<string | null>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);

  const closeModal = () => { dispatch({ type: 'setNewAttachmentRestrictionsModalVisible', value: false }) };

  if (gameDataState.state !== 'loaded') { closeModal(); return null; }

  const { guns, attachments } = gameDataState.gameData;

  const filteredMuzzleAttachments = selectedGun ? Object.fromEntries(Object.entries(attachments.muzzle)
    .filter(([_, data]) => data.compatibleGuns.includes(selectedGun))
  ) : [];
  const filteredBarrelAttachments = selectedGun ? Object.fromEntries(Object.entries(attachments.barrel)
    .filter(([_, data]) => data.compatibleGuns.includes(selectedGun))
  ) : [];

  return (<>
    <P className="self-start"><u>Require</u> the selected gun to use the selected attachment.</P>

    <P className="self-start italic">"Require" restrictions always take priority over "Exclude" restrictions.</P>

    <H level="3" className="text-lg pb-4">Gun</H>
    <CustomScroll className={`max-h-48 w-full border-y-2 border-neutral-900 mb-4 text-sm`}>
      <div className="w-full flex flex-col gap-2 py-2">
        <div className="w-full flex flex-wrap justify-center gap-2">
          {
            Object.keys(guns).sort().map((gun) => {
              const isEnabled = selectedGun === gun;
              return (
                <StateButton
                  key={gun}
                  isEnabled={isEnabled}
                  onClick={() => {
                    if (isEnabled) { return; }
                    setSelectedGun(gun);
                    setSelectedAttachment(null);
                  }}
                >
                  {gun}
                </StateButton>
              );
            })
          }
        </div>
      </div>
    </CustomScroll>

    <H level="3" className="text-lg pb-4">Attachment</H>
    <CustomScroll className="max-h-48 w-full border-y-2 border-neutral-900 mb-4 text-sm">
      <div className="w-full flex flex-col gap-2 py-2">
        {
          Object.keys(filteredMuzzleAttachments).length + Object.keys(filteredBarrelAttachments).length === 0
            ? (<div className="text-center py-4 opacity-50">Empty</div>)
            : (
              <div className="w-full flex flex-wrap justify-center gap-2">
                {
                  Object.keys(filteredMuzzleAttachments).sort().map((attachment) => (
                    <StateButton
                      key={attachment}
                      isEnabled={selectedAttachment === attachment}
                      onClick={() => { setSelectedAttachment(attachment); }}
                    >
                      {attachment}
                    </StateButton>
                  ))
                }
                {
                  Object.keys(filteredBarrelAttachments).sort().map((attachment) => (
                    <StateButton
                      key={attachment}
                      isEnabled={selectedAttachment === attachment}
                      onClick={() => { setSelectedAttachment(attachment); }}
                    >
                      {attachment}
                    </StateButton>
                  ))
                }
              </div>
            )
        }
      </div>
    </CustomScroll>

    {
      (selectedGun !== null && selectedAttachment !== null)
        ? (() => {
          const attachmentRangeMultiplier = [...Object.entries(attachments.barrel), ...Object.entries(attachments.muzzle)]
            .find(([name, _]) => name === selectedAttachment)?.[1]
            .effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0;

          const attachmentRangeDescription = attachmentRangeMultiplier >= 0
            ? `(+${attachmentRangeMultiplier}x range)`
            : `(${attachmentRangeMultiplier}x range)`;

          return (
            <P className="self-start">
              This new restriction will:<br /> <u>Require</u> the <i className="text-amber-500">{selectedGun}</i> use
              the <i><span className="text-amber-500">{selectedAttachment}</span> {attachmentRangeDescription}</i>.
            </P>
          );
        }
        )() : (
          <P className="opacity-50">Select a gun and an attachment above.</P>
        )
    }

    <Button
      disabled={selectedGun === null || selectedAttachment === null}
      onClick={() => {
        if (selectedGun !== null && selectedAttachment !== null) {
          dispatch({
            type: 'setAttachmentRestrictions',
            value: [
              { type: 'requireAttachment', gun: selectedGun, attachment: selectedAttachment },
              ...attachmentRestrictions
            ]
          });
          closeModal();
        }
      }}
    >
      Add Restriction
    </Button>
  </>);
}

export default RequireSettings;