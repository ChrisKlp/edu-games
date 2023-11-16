export enum Level {
  easy = 'easy',
  normal = 'normal',
}

export enum Numbers {
  'zero',
  'jeden',
  'dwa',
  'trzy',
  'cztery',
  'pięć',
  'sześć',
  'siedem',
  'osiem',
  'dziewięć',
  'dziesięć',
  'jedenaście',
  'dwanaście',
}

export type MathGameConfig = {
  MIN: number
  MAX: number
  MAX_ONE_NUMBER: number
  MAX_NUMBERS: number
  MIN_NUMBERS: number
}
