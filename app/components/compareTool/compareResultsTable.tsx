'use client';

import ColumnHeaderTooltip from "@/app/components/compareTool/columnHeaderTooltip";
import { avgDamageColumn, Column, dpsColumn, gunNameColumn, stkColumn, ttkColumn } from "@/app/components/compareTool/columns";
import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import GunDataCell from "@/app/components/compareTool/gunDataCell";
import { useGameData } from "@/app/components/gameDataContext";
import { boxVariants } from "@/app/components/ui/box";
import compareAllV1, { ResultType } from "@/app/util/v1/compareAllV1";
import { motion } from "framer-motion";
import { Dispatch, FC, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from "use-debounce";

type ColumnState = { column: Column, width: number | null };
type SortMode = { column: Column, direction: 'ascending' | 'descending' }

const CompareResultsTable = () => {
  const { gameDataState } = useGameData();
  if (gameDataState.state !== 'loaded') {
    throw new Error('Compare results table cannot not be rendered with no loaded game data');
  }
  const gameData = gameDataState.gameData;

  const { compareAllArgs } = useCompareToolData();

  const [sortMode, setSortMode] = useState<SortMode>({ column: ttkColumn, direction: ttkColumn.sortDirPreference });

  // update result list on dependency change with debounce
  const debouncedCalcResult = useDebouncedCallback(() => compareAllV1({ gameData, ...compareAllArgs }), 1000);
  const result = useMemo(() => {
    const result = debouncedCalcResult();
    return result ? result : compareAllV1({ gameData, ...compareAllArgs });
  }, [gameData, compareAllArgs]);
  const sortedResultList = useMemo(() => sortResult(result, sortMode), [result, sortMode]);

  const [columnStates, setColumnStates] = useState<ColumnState[]>([
    { column: gunNameColumn, width: null },
    { column: avgDamageColumn, width: null },
    { column: dpsColumn, width: null },
    { column: stkColumn, width: null },
    { column: ttkColumn, width: null }
  ]);

  // adjust column widths
  const fullWidthRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gameDataState.state === 'loaded') { updateTableColumnWidths(fullWidthRef, columnStates, setColumnStates) }
  }, []);

  return (
    <>
      <div ref={fullWidthRef} className="w-full"></div>

      <table className="block overflow-scroll max-h-96 rounded-none sm:rounded-lg">

        {/* head */}
        <thead className="block w-fit sticky top-0 bg-neutral-900 z-10">
          <tr className="block">

            {/* column headers */}
            {columnStates.map(({ column, width }) => (
              <th key={column.long} style={cssRowWidths(width)}>
                <div className={`w-full h-full flex ${column.long === 'Gun Name' ? 'justify-start' : 'justify-end'}`}>
                  <ColumnHeaderTooltip column={column}>
                    <button
                      className="left-0 px-2 hover:underline"
                      onClick={() => { setSortMode(getNextSortMode(column, sortMode)) }}
                    >
                      {column.long !== 'Gun Name' && <SortArrow sortMode={sortMode} column={column} />}
                      {column.short}
                      {column.long === 'Gun Name' && <SortArrow sortMode={sortMode} column={column} />}
                    </button>
                  </ColumnHeaderTooltip>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* body */}
        <tbody className={twMerge(boxVariants({ variant: 'inner', maxWidth: 'none' }), 'p-0 w-fit block shadow-none rounded-none')}>

          {/* gun rows */}
          {sortedResultList.map(([gunName, gunResultData]) => (
            <motion.tr key={gunName} layout className="block divide-x divide-neutral-900">

              {/* gun cells */}
              {columnStates.map(({ column, width }) => (
                <GunDataCell
                  column={column}
                  gunName={gunName}
                  gunResultData={gunResultData}
                  style={cssRowWidths(width)}
                />
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table >
    </>
  );
};

function sortResult(result: ResultType, sortMode: SortMode) {
  return Object.entries(result).sort(([gunAName, gunAData], [gunBName, gunBData]) => {
    var compareVal = 0;
    switch (sortMode.column.long) {
      case 'Gun Name':
        compareVal = gunAName.localeCompare(gunBName);
        break;
      case 'Average Damage per Shot':
        compareVal = gunBData.avgDamage - gunAData.avgDamage;
        break;
      case 'Damage per Second':
        compareVal = gunBData.dps - gunAData.dps;
        break;
      case 'Shots to Kill':
        compareVal = gunBData.shotsToKill - gunAData.shotsToKill;
        break;
      case 'Time to Kill':
        compareVal = gunBData.timeToKill - gunAData.timeToKill;
        break;
    }
    if (sortMode.direction === 'descending') { return compareVal; }
    else { return -compareVal; }
  });
}

function updateTableColumnWidths(
  fullWidthRef: RefObject<HTMLDivElement>,
  columnStates: ColumnState[],
  setColumnStates: Dispatch<SetStateAction<ColumnState[]>>
) {
  if (fullWidthRef.current) {

    const updateColumnWidths = () => {
      if (!fullWidthRef.current) { return; }
      const fullWidth = fullWidthRef.current.offsetWidth;

      const gunNameColWeight = 1.5;
      const otherColsWeight = 1.0
      const totalWeight = gunNameColWeight + (otherColsWeight * (columnStates.length - 1));

      const gunNameColTargetWidth = (gunNameColWeight / totalWeight) * fullWidth;
      const otherColsTargetWidth = (otherColsWeight / totalWeight) * fullWidth;

      const remWidth = parseFloat(getComputedStyle(document.documentElement).fontSize);

      const gunNameColMinWidth = 10 * remWidth;
      const otherColsMinWidth = 7 * remWidth;

      // table big enough to distribute by weights
      if (otherColsTargetWidth >= otherColsMinWidth) {
        setColumnStates(columnStates.map(columnData => {
          if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColTargetWidth }; }
          else { return { ...columnData, width: otherColsTargetWidth }; }
        }));
      }
      // non gun name columns would be too small if distributed by weights
      else {
        const tableWidthRemaining = fullWidth - (otherColsMinWidth * (columnStates.length - 1));
        // table big enough to stretch gun name column
        if (tableWidthRemaining >= gunNameColMinWidth) {
          setColumnStates(columnStates.map(columnData => {
            if (columnData.column.long === 'Gun Name') { return { ...columnData, width: tableWidthRemaining }; }
            else { return { ...columnData, width: otherColsMinWidth }; }
          }));
        }
        // all columns need to use their minimum widths
        else {
          setColumnStates(columnStates.map(columnData => {
            if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColMinWidth }; }
            else { return { ...columnData, width: otherColsMinWidth }; }
          }));
        }
      }
    }

    const o = new ResizeObserver(entries => entries.forEach(e => updateColumnWidths()));
    o.observe(fullWidthRef.current!!);
  }
}

function cssRowWidths(width: number | null) {
  return {
    width: width ? `${width}px` : undefined,
    minWidth: width ? `${width}px` : undefined,
    maxWidth: width ? `${width}px` : undefined
  };
}

const getNextSortMode: (column: Column, sortMode: SortMode) => SortMode = (column, sortMode) =>
  sortMode.column.long == column.long
    ? { ...sortMode, direction: sortMode.direction === 'ascending' ? 'descending' : 'ascending' }
    : { column, direction: column.sortDirPreference };

const SortArrow: FC<{ sortMode: SortMode, column: Column }> = ({ sortMode, column }) => {
  if (sortMode.column.long === column.long) {
    if (sortMode.direction === 'ascending') { return <IoIosArrowUp className="inline" />; }
    else { return <IoIosArrowDown className="inline" />; }
  }
  return undefined;
};

export default CompareResultsTable;
