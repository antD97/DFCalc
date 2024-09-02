import { Column } from "@/app/components/compareTool/columns";
import { P } from "@/app/components/ui/paragraph";
import { Tooltip } from "@/app/components/ui/tooltip";
import { FC } from "react";

const ColumnHeaderTooltip: FC<{
  column: Column,
  children: React.ReactElement<unknown, any>;
}> = ({
  column,
  children
}) => {
    return (
      <Tooltip
        placement="top"
        arrow
        title={(
          <>
            <P className="pb-2">{column.long}</P>
            <P>{column.description}</P>
          </>
        )}
      >
        {children}
      </Tooltip>
    );
  };

export default ColumnHeaderTooltip;
