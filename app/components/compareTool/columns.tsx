
export const gunNameColumn = {
  'short': 'Gun',
  'long': 'Gun Name',
  'description': 'The name of the gun.',
  'sortDirPreference': 'descending'
} as const;

export const avgDamageColumn = {
  'short': 'Dmg',
  'long': 'Average Damage per Shot',
  'description': 'The average amount of damage dealt per shot using the above settings.',
  'sortDirPreference': 'descending',
  'gunDataPropertyName': ['avgDamage', 'minAvgDamage']
} as const;

export const dpsColumn = {
  'short': 'DPS',
  'long': 'Damage per Second',
  'description': 'The average amount of damage dealt per second using the above settings.',
  'sortDirPreference': 'descending',
  'gunDataPropertyName': ['dps', 'minDps']
} as const;

export const stkColumn = {
  'short': 'STK',
  'long': 'Shots to Kill',
  'description': <>The average amount of shots required to deal at least <i>'Target Health'</i> damage.</>,
  'sortDirPreference': 'ascending',
  'gunDataPropertyName': ['shotsToKill', 'maxShotsToKill']
} as const;

export const ttkColumn = {
  'short': 'TTK',
  'long': 'Time to Kill',
  'description': <>The average amount of time in milliseconds to fire <i>'Shots to Kill'</i> shots.</>,
  'sortDirPreference': 'ascending',
  'gunDataPropertyName': ['timeToKill', 'maxTimeToKill']
} as const;

export type Column = typeof gunNameColumn | typeof avgDamageColumn | typeof dpsColumn | typeof stkColumn | typeof ttkColumn;
