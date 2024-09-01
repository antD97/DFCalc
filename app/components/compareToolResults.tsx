'use client';

import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Box, boxVariants } from "./ui/layout/box";
import { useCompareToolData } from "./compareToolContext";
import compareAllV1 from "../util/v1/compareAllV1";
import { useGameData } from "./gameDataContext";
import { twMerge } from 'tailwind-merge'
import GunType from "../types/gunType";
import { IoIosArrowDown, IoIosArrowUp, IoIosConstruct } from "react-icons/io";
import { Tooltip } from "@mui/material";
import { LI, UL } from "./ui/list";
import { H } from "./ui/header";
import { P } from "./ui/paragraph";
import { MdIncompleteCircle } from "react-icons/md";

const gunNameColumn = {
  'short': 'Gun',
  'long': 'Gun Name',
  'description': 'The name of the gun.',
  'sortDirPreference': 'descending'
} as const;
const avgDamageColumn = {
  'short': 'Dmg',
  'long': 'Average Damage per Shot',
  'description': 'The average amount of damage dealt per shot with the specified settings.',
  'sortDirPreference': 'descending',
  'gunDataPropertyName': ['avgDamage', 'minAvgDamage']
} as const;
const dpsColumn = {
  'short': 'DPS',
  'long': 'Damage per Second',
  'description': 'The average amount of damage dealt per second with the specified settings.',
  'sortDirPreference': 'descending',
  'gunDataPropertyName': ['dps', 'minDps']
} as const;
const stkColumn = {
  'short': 'STK',
  'long': 'Shots to Kill',
  'description': <>The average amount of shots required to deal at least <span className="italic text-amber-500">Target Health</span> damage.</>,
  'sortDirPreference': 'ascending',
  'gunDataPropertyName': ['shotsToKill', 'maxShotsToKill']
} as const;
const ttkColumn = {
  'short': 'TTK',
  'long': 'Time to Kill',
  'description': <>The average amount of time in milliseconds to fire <span className="italic text-amber-500">Shots to Kill</span> shots.</>,
  'sortDirPreference': 'ascending',
  'gunDataPropertyName': ['timeToKill', 'maxTimeToKill']
} as const;

type Column = typeof gunNameColumn | typeof avgDamageColumn | typeof dpsColumn | typeof stkColumn | typeof ttkColumn;

type ColumnData = {
  column: Column,
  width: number | null
};

const CompareToolResults = () => {
  const { gameData } = useGameData();
  const { compareAllArgs } = useCompareToolData();

  const [columns, setColumns] = useState<ColumnData[]>([
    { column: gunNameColumn, width: null },
    { column: avgDamageColumn, width: null },
    { column: dpsColumn, width: null },
    { column: stkColumn, width: null },
    { column: ttkColumn, width: null }
  ]);
  const [sortMode, setSortMode] = useState<{ column: Column, direction: 'ascending' | 'descending' }>({ column: ttkColumn, direction: ttkColumn.sortDirPreference });

  const fullWidthRef = useRef<HTMLTableElement>(null);

  const result = gameData ? compareAllV1({ gameData: gameData, ...compareAllArgs }) : null;
  const resultList = result === null ? null : Object.entries(result)
    .sort(([gunAName, gunAData], [gunBName, gunBData]) => {
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

  // adjust column widths
  useEffect(() => {
    if (fullWidthRef.current) {

      const updateColumnWidths = () => {
        const fullWidth = fullWidthRef.current!!.offsetWidth;

        const gunNameColWeight = 1.5;
        const otherColsWeight = 1.0
        const totalWeight = gunNameColWeight + (otherColsWeight * (columns.length - 1));

        const gunNameColTargetWidth = (gunNameColWeight / totalWeight) * fullWidth;
        const otherColsTargetWidth = (otherColsWeight / totalWeight) * fullWidth;

        const remWidth = parseFloat(getComputedStyle(document.documentElement).fontSize);

        const gunNameColMinWidth = 10 * remWidth;
        const otherColsMinWidth = 7 * remWidth;

        // table big enough to distribute by weights
        if (otherColsTargetWidth >= otherColsMinWidth) {
          setColumns(columns.map(columnData => {
            if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColTargetWidth }; }
            else { return { ...columnData, width: otherColsTargetWidth }; }
          }));
        }
        // non gun name columns would be too small if distributed by weights
        else {
          const tableWidthRemaining = fullWidth - (otherColsMinWidth * (columns.length - 1));
          // table big enough to stretch gun name column
          if (tableWidthRemaining >= gunNameColMinWidth) {
            setColumns(columns.map(columnData => {
              if (columnData.column.long === 'Gun Name') { return { ...columnData, width: tableWidthRemaining }; }
              else { return { ...columnData, width: otherColsMinWidth }; }
            }));
          }
          // all columns need to use their minimum widths
          else {
            setColumns(columns.map(columnData => {
              if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColMinWidth }; }
              else { return { ...columnData, width: otherColsMinWidth }; }
            }));
          }

        }



        // const gunNameColMinWidth = 10 * remWidth;

        // // table big enough to distribute by weights
        // if (gunNameColTargetWidth >= gunNameColMinWidth) {
        //   setColumns(columns.map(columnData => {
        //     if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColTargetWidth }; }
        //     else { return { ...columnData, width: otherColsTargetWidth }; }
        //   }));
        // }
        // // gun name column would be too small if distributed by weights
        // else {





        //   const tableWidthRemaining = headerWidth - gunNameColMinWidth;
        //   const otherColsTargetWidth = tableWidthRemaining / (columns.length - 1);

        //   const otherColsMinWidth = 7 * remWidth;

        //   // table big enough to distribute remaining columns evenly
        //   if (otherColsTargetWidth >= otherColsMinWidth) {
        //     setColumns(columns.map(columnData => {
        //       if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColMinWidth }; }
        //       else { return { ...columnData, width: otherColsTargetWidth }; }
        //     }));
        //   }
        //   // other columns would be too small if distributed by weights
        //   else {
        //     setColumns(columns.map(columnData => {
        //       if (columnData.column.long === 'Gun Name') { return { ...columnData, width: gunNameColMinWidth }; }
        //       else { return { ...columnData, width: otherColsMinWidth }; }
        //     }));
        //   }
        // }





      }

      const o = new ResizeObserver(entries => entries.forEach(e => updateColumnWidths()));
      o.observe(fullWidthRef.current!!);
    }
  }, []);

  return (
    <>
      {/* <H ref={headerRef} level="3" className="text-2xl pb-4">Results</H> */}
      <div ref={fullWidthRef} className="w-full"></div>

      <table className="block overflow-scroll max-h-96 rounded-none sm:rounded-lg">

        {/* headers */}
        <thead className="block w-fit sticky top-0 bg-neutral-900 z-10">
          <tr className="block">
            {columns.map(({ column, width }) => (
              <th
                key={column.long}
                style={{
                  width: width ? `${width}px` : undefined,
                  minWidth: width ? `${width}px` : undefined,
                  maxWidth: width ? `${width}px` : undefined
                }}
              >
                <div className={`w-full h-full flex ${column.long === 'Gun Name' ? 'justify-start' : 'justify-end'}`}>
                  <Tooltip
                    placement="top"
                    arrow
                    title={(
                      <>
                        <P className="text-sm font-normal pb-2">{column.long}</P>
                        <P className="text-sm font-normal pb-0">{column.description}</P>
                      </>
                    )}
                  >
                    <button
                      className="left-0 px-2 hover:underline"
                      onClick={() => {
                        if (sortMode.column.long === column.long) {
                          setSortMode({
                            ...sortMode,
                            direction: sortMode.direction === 'ascending' ? 'descending' : 'ascending'
                          });
                        } else {
                          setSortMode({ column, direction: column.sortDirPreference });
                        }
                      }}
                    >
                      {column.long !== 'Gun Name' && sortMode.column.long === column.long && sortMode.direction === 'ascending' && <IoIosArrowUp className="inline" />}
                      {column.long !== 'Gun Name' && sortMode.column.long === column.long && sortMode.direction === 'descending' && <IoIosArrowDown className="inline" />}
                      {column.short}
                      {column.long === 'Gun Name' && sortMode.column.long === column.long && sortMode.direction === 'ascending' && <IoIosArrowUp className="inline" />}
                      {column.long === 'Gun Name' && sortMode.column.long === column.long && sortMode.direction === 'descending' && <IoIosArrowDown className="inline" />}
                    </button>
                  </Tooltip>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* gun rows */}
        <tbody
          className={twMerge(boxVariants({ variant: 'inner', maxWidth: 'none' }), 'p-0 w-fit block shadow-none rounded-none')}
        >
          {resultList?.map(([gunName, gunData]) => (
            <motion.tr
              key={gunName}
              layout
              transition={{ duration: 0.5 }}
              className="block divide-x divide-neutral-900"
            >

              {/* gun columns */}
              {
                columns.map((({ column, width }) => {

                  const style = {
                    width: width ? `${width}px` : undefined,
                    minWidth: width ? `${width}px` : undefined,
                    maxWidth: width ? `${width}px` : undefined
                  };

                  // gun name column
                  if (column.long === 'Gun Name') {
                    return (
                      <td
                        key={`${gunName}-${column.short}`}
                        className="relative text-nowrap px-2"
                        style={style}
                      >
                        <Tooltip
                          placement="left"
                          arrow
                          title={
                            <div className="text-sm font-normal">
                              <P className="pb-0">Details</P>
                              <UL className="gap-0 *:ml-3 pb-2">
                                <LI>Base Damage: {gunData.damage}</LI>
                                {gunData.type === 'Shotgun' && (<LI>Num Bullets: {gunData.numBullets}</LI>)}
                                <LI>Classes: {gunData.characterClass.length === 4 ? 'All' : gunData.characterClass.join(', ')}</LI>
                              </UL>

                              <P className="pb-0">Base Range Multipliers</P>
                              <UL className="gap-0 *:ml-3 pb-2">
                                {[{ from: 0, multiplier: 1 }, ...gunData.damageFalloffMultipliers].map((dfm, i, allDfm) => {
                                  const isLast = i === allDfm.length - 1;
                                  const start = dfm.from.toFixed(1);
                                  const end = isLast ? null : allDfm[i + 1].from.toFixed(1);
                                  const multiplier = allDfm[i].multiplier;
                                  return <LI>{start}{end ? `→${end}` : '+'} meters: x{multiplier}</LI>;
                                })}
                              </UL>

                              {
                                (gunData.barrel || gunData.muzzle) && (<>
                                  <P className="pb-0">Attachments <IoIosConstruct className="inline text-amber-500" /></P>
                                  <UL className="gap-0 *:ml-3">
                                    {gunData.barrel && <LI>{gunData.barrel.name}</LI>}
                                    {gunData.muzzle && <LI>{gunData.muzzle.name}</LI>}
                                  </UL>

                                  <P className="pb-0">Range Multipliers with Attachments <IoIosConstruct className="inline text-amber-500" /></P>
                                  <UL className="gap-0 *:ml-3 pb-2">
                                    {[{ from: 0, multiplier: 1 }, ...gunData.withAttachmentsDamageFalloffMultipliers].map((dfm, i, allDfm) => {
                                      const isLast = i === allDfm.length - 1;
                                      const start = dfm.from.toFixed(1);
                                      const end = isLast ? null : allDfm[i + 1].from.toFixed(1);
                                      const multiplier = allDfm[i].multiplier;
                                      return <LI>{start}{end ? `→${end}` : '+'} meters: x{multiplier}</LI>;
                                    })}
                                  </UL>
                                </>)
                              }
                            </div>
                          }
                        >
                          <button className="hover:underline">
                            {gunName}
                            {(gunData.barrel || gunData.muzzle) && (<IoIosConstruct className="inline ml-2 text-amber-500" />)}
                          </button>
                        </Tooltip>
                        <div className="absolute right-2 top-0 text-white/25">{toShortGunType(gunData.type)}</div>
                      </td>
                    );
                  }

                  // other columns
                  else {
                    // non shotguns
                    if (gunData.type !== 'Shotgun') {
                      var content: string | number = gunData[column.gunDataPropertyName[0]];
                      if (content === Number.POSITIVE_INFINITY) { content = '∞'; }
                      const roundedCols: string[] = [avgDamageColumn.long, dpsColumn.long, stkColumn.long];
                      if (roundedCols.includes(column.long) && typeof content === 'number') { content = content.toFixed(1); }
                      return (
                        <td
                          key={`${gunName}-${column.short}`}
                          className="text-end px-2"
                          style={style}
                        >
                          {content}
                        </td>
                      );
                    }
                    // shotguns
                    else {
                      var content: string | number = gunData[column.gunDataPropertyName[0]];
                      var minContent: string | number = gunData[column.gunDataPropertyName[1]];

                      if (content === Number.POSITIVE_INFINITY) { content = '∞'; }
                      if (minContent === Number.POSITIVE_INFINITY) { minContent = '∞'; }

                      const roundedCols: string[] = [avgDamageColumn.long, dpsColumn.long, stkColumn.long];
                      if (roundedCols.includes(column.long)) {
                        if (typeof content === 'number') { content = content.toFixed(1); }
                        if (typeof minContent === 'number') { minContent = minContent.toFixed(1); }
                      }

                      return (
                        <td
                          key={`${gunName}-${column.short}`}
                          className="text-end px-2 text-nowrap"
                          style={style}
                        >
                          {minContent !== content && <span className="opacity-25">{minContent} - </span>}{content}
                        </td>
                      );
                    }
                  }
                }) as (columnData: ColumnData) => ReactNode)
              }
            </motion.tr>
          ))}
        </tbody>
      </table>
    </>
  );
  /*
    return (
      <>
        <H level="3" className="text-2xl pb-4">Results</H>
  
        <button onClick={() => { setSortMode('base damage') }}>sort by base damage</button>
        <button onClick={() => { setSortMode('damage') }}>sort by damage</button>
        <button onClick={() => { setSortMode('dps') }}>sort by dps</button>
        <button onClick={() => { setSortMode('shots to kill') }}>sort by shots to kill</button>
        <button onClick={() => { setSortMode('time to kill') }}>sort by time to kill</button>
  
        <table>
  
        </table>
  
        <div className="min-h-96">
  
        </div>
  
        <div className={`w-full grid ${gridClass} p-2`}>
          <div>Gun</div>
          <div className="text-end">Base</div>
          <div className="text-end">Damage</div>
          <div className="text-end">DPS</div>
          <div className="text-end">STK</div>
          <div className="text-end">TTK</div>
        </div>
        <div className={twMerge(boxVariants({ 'variant': 'inner', 'maxWidth': 'none' }), 'overflow-scroll max-h-96 p-0 shadow-none')}>
          <ul className="grid min-w-max divide-y divide-black/50">
            <AnimatePresence>
              {resultList && resultList.map(([gunName, gunData]) => (
                <motion.li
                  key={gunName}
                  layout
                  transition={{ duration: 0.3 }}
                  className={`p-2 text-end grid ${gridClass}`}
                >
                  <div className="relative text-start">
                    <div className="flex gap-2 items-center text-nowrap">
                      {/* {gunName === 'Desert Eagle' ? 'DE' : gunName} }
                      {gunName}
                      {
                        (gunData.barrel || gunData.muzzle) && (
                          <Tooltip disableFocusListener title={
                            <UL className="gap-0 *:ml-3">
                              {gunData.barrel && <LI>{gunData.barrel.name}</LI>}
                              {gunData.muzzle && <LI>{gunData.muzzle.name}</LI>}
                            </UL>
                          }>
                            <button><IoIosConstruct className="text-amber-500" /></button>
                          </Tooltip>
                        )
                      }
                    </div>
                    <div className="hidden absolute top-0 right-0 text-white/25 sm:block">{toShortGunType(gunData.type)}</div>
                  </div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                </motion.li>
                // <motion.li
                //   key={gunName}
                //   layout
                //   transition={{ duration: 0.3 }}
                //   className="flex *:basis-0 p-2"
                // >
                //   <div className="grow relative">
                //     <div className="flex gap-2 items-center text-nowrap">
                //       {gunName}
                //       {
                //         (gunData.barrel || gunData.muzzle) && (
                //           <Tooltip disableFocusListener title={
                //             <UL className="gap-0 *:ml-3">
                //               {gunData.barrel && <LI>{gunData.barrel.name}</LI>}
                //               {gunData.muzzle && <LI>{gunData.muzzle.name}</LI>}
                //             </UL>
                //           }>
                //             <button><IoIosConstruct className="text-amber-500" /></button>
                //           </Tooltip>
                //         )
                //       }
                //     </div>
                //     <div className="hidden absolute top-0 right-0 text-white/25 sm:block">{toShortGunType(gunData.type)}</div>
                //   </div>
                //   <div className="grow text-end">{gunData.damage}</div>
                //   <div className="grow text-end">{gunData.avgDamage.toFixed(1)}</div>
                //   <div className="grow text-end">{gunData.dps.toFixed(1)}</div>
                //   <div className="grow text-end">{gunData.shotsToKill}</div>
                //   <div className="grow text-end">{gunData.timeToKill}<span className="hidden sm:inline">ms</span></div>
                // </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </>
    );*/
};

function toShortGunType(gunType: GunType): string {
  switch (gunType) {
    case 'Assault Rifle': return 'AR';
    case 'Battle Rifle': return 'AR';
    case 'Light Machine Gun': return 'LMG';
    case 'Marksman Rifle': return 'MR';
    case 'Pistol': return 'P';
    case 'Shotgun': return 'SG';
    case 'Sniper Rifle': return 'SR';
    case 'Submachine Gun': return 'SMG';
  }
}

export default CompareToolResults;
