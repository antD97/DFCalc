'use client';

import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import ExcludeSettings from "@/app/components/compareTool/restrictions/excludeSettings";
import RequireSettings from "@/app/components/compareTool/restrictions/requireSettings";
import { Box } from "@/app/components/ui/box";
import { StateButton } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import { Label } from "@/app/components/ui/label";
import { FC, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";


const NewAttachmentRestrictionsModal: FC = () => {
  const { dispatch } = useCompareToolData();
  const [restrictionType, setRestrictionType] = useState<'require' | 'exclude'>('require');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; }
  });

  return (
    <div className="fixed inset-0 bg-neutral-900/95 z-50 flex items-center justify-center">
      <div className="w-full max-h-screen overflow-y-scroll flex flex-col items-center">
        <H level="3" className="text-2xl my-4">New Attachment Restriction</H>
        <Box maxWidth="small" className="w-full flex flex-col items-center p-8 relative">

          <button
            onClick={() => { dispatch({ type: 'setNewAttachmentRestrictionsModalVisible', value: false }); }}
            className="absolute right-4 top-4 text-2xl hover:text-red-500"
          >
            <IoIosCloseCircleOutline />
          </button>

          <div className="self-start flex items-center mb-4">
            <Label>Type:</Label>
            <div className="flex gap-2">
              <StateButton
                isEnabled={restrictionType === 'require'}
                onClick={() => { setRestrictionType('require'); }}
              >
                Require
              </StateButton>
              <StateButton
                isEnabled={restrictionType === 'exclude'}
                onClick={() => { setRestrictionType('exclude'); }}
              >
                Exclude
              </StateButton>
            </div>
          </div>

          {restrictionType === 'exclude' && <ExcludeSettings />}
          {restrictionType === 'require' && <RequireSettings />}
        </Box>
      </div>
    </div>
  );
};

export default NewAttachmentRestrictionsModal;