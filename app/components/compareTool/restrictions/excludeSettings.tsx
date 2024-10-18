'use client';

import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import { useGameData } from "@/app/components/gameDataContext";
import { Button, StateButton } from "@/app/components/ui/button";
import CustomScroll from "@/app/components/ui/customScroll";
import { H } from "@/app/components/ui/header";
import { P } from "@/app/components/ui/paragraph";
import { FC, useState } from "react";

const ExcludeSettings: FC = () => {
  const { gameDataState } = useGameData();
  const { attachmentRestrictions, dispatch } = useCompareToolData();

  const [selectedGun, setSelectedGun]
    = useState<{ type: 'all' } | { type: 'name', name: string } | { type: 'none' }>({ type: 'none' });
  const [selectedAttachment, setSelectedAttachment]
    = useState<{ type: 'all' } | { type: 'name', name: string } | { type: 'none' }>({ type: 'none' });

  const closeModal = () => { dispatch({ type: 'setNewAttachmentRestrictionsModalVisible', value: false }) };

  if (gameDataState.state !== 'loaded') { closeModal(); return null; }

  const { guns, attachments } = gameDataState.gameData;

  const filteredMuzzleAttachments = selectedGun.type === 'none' ? []
    : Object.fromEntries(Object.entries(attachments.muzzle)
      .filter(([_, data]) => selectedGun.type === 'all' ? true : data.compatibleGuns.includes(selectedGun.name))
    );
  const filteredBarrelAttachments = selectedGun.type === 'none' ? []
    : Object.fromEntries(Object.entries(attachments.barrel)
      .filter(([_, data]) => selectedGun.type === 'all' ? true : data.compatibleGuns.includes(selectedGun.name))
    );

  return (<>
    <P className="self-start"><u>Exclude</u> the selected gun and attachment combination.</P>

    <H level="3" className="text-lg pb-4">Gun</H>
    <CustomScroll className={`max-h-48 w-full border-y-2 border-neutral-900 mb-4 text-sm`}>
      <div className="w-full flex flex-col gap-2 py-2">
        <div className="w-full flex justify-center">
          <StateButton
            isEnabled={selectedGun.type === 'all'}
            onClick={() => {
              if (selectedGun.type === 'all') { return; }
              setSelectedGun({ type: 'all' });
              setSelectedAttachment({ type: 'none' });
            }}
          >
            ALL
          </StateButton>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-2">
          {
            Object.keys(guns).sort().map((gun) => {
              const isEnabled = selectedGun.type === 'name' && selectedGun.name === gun;
              return (
                <StateButton
                  key={gun}
                  isEnabled={isEnabled}
                  onClick={() => {
                    if (isEnabled) { return; }
                    setSelectedGun({ type: 'name', name: gun });
                    setSelectedAttachment({ type: 'none' });
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
            : (<>
              <div className="w-full flex justify-center">
                <StateButton
                  isEnabled={selectedAttachment.type === 'all'}
                  onClick={() => { setSelectedAttachment({ type: 'all' }); }}
                >
                  ANY
                </StateButton>
              </div>
              <div className="w-full flex flex-wrap justify-center gap-2">
                {
                  Object.keys(filteredMuzzleAttachments).sort().map((attachment) => (
                    <StateButton
                      key={attachment}
                      isEnabled={selectedAttachment.type === 'name' && selectedAttachment.name === attachment}
                      onClick={() => { setSelectedAttachment({ type: 'name', name: attachment }); }}
                    >
                      {attachment}
                    </StateButton>
                  ))
                }
                {
                  Object.keys(filteredBarrelAttachments).sort().map((attachment) => (
                    <StateButton
                      key={attachment}
                      isEnabled={selectedAttachment.type === 'name' && selectedAttachment.name === attachment}
                      onClick={() => { setSelectedAttachment({ type: 'name', name: attachment }); }}
                    >
                      {attachment}
                    </StateButton>
                  ))
                }
              </div>
            </>)
        }
      </div >
    </CustomScroll >

    {
      (selectedGun.type !== 'none' && selectedAttachment.type !== 'none')
        ? (
          <P className="self-start">
            This new restriction will:<br />
            <u>Prevent</u>
            {selectedGun.type === 'all'
              ? (<> <i className="text-amber-500">ALL</i> guns </>)
              : (<> the <i className="text-amber-500">{selectedGun.name}</i> </>)}
            from using
            {selectedAttachment.type === 'all'
              ? (<> <i className="text-amber-500">ANY</i> attachment.</>)
              : (() => {
                const attachmentRangeMultiplier = [...Object.entries(attachments.barrel), ...Object.entries(attachments.muzzle)]
                  .find(([name, _]) => name === selectedAttachment.name)?.[1]
                  .effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0;

                const attachmentRangeDescription = attachmentRangeMultiplier >= 0
                  ? `(+${attachmentRangeMultiplier}x range)`
                  : `(${attachmentRangeMultiplier}x range)`;

                return (
                  <> the <i><span className="text-amber-500">{selectedAttachment.name}</span> {attachmentRangeDescription}</i>.</>
                );
              })()}
          </P>
        ) : (
          <P className="opacity-50">Select a gun and an attachment above.</P>
        )
    }

    <Button
      disabled={selectedGun.type === 'none' || selectedAttachment.type === 'none'}
      onClick={() => {
        if (selectedGun.type !== 'none' && selectedAttachment.type !== 'none') {
          dispatch({
            type: 'setAttachmentRestrictions',
            value: [
              {
                type: 'excludeAttachment',
                gun: selectedGun.type === 'all' ? { type: 'all' } : { type: 'name', name: selectedGun.name },
                attachment: selectedAttachment.type === 'all' ? { type: 'all' } : { type: 'name', name: selectedAttachment.name }
              },
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
};

export default ExcludeSettings;