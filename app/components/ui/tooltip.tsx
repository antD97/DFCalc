'use client';

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from "@mui/material";
import { createContext, FC, useContext } from "react";

const TooltipTitleContext = createContext<boolean>(false);

const Tooltip: FC<MuiTooltipProps> = ({ title, ...props }) => {
  return (
    <MuiTooltip
      title={<TooltipTitleContext.Provider value={true}>{title}</TooltipTitleContext.Provider>}
      {...props}
    />
  );
};

const isInTooltipTitle = () => useContext(TooltipTitleContext);

export { isInTooltipTitle, Tooltip };
