import { LuDices } from 'react-icons/lu'
import { TbMathXPlusY, TbSpeakerphone, TbSleigh } from 'react-icons/tb'
import { GiDominoTiles, GiTRexSkull } from 'react-icons/gi'
import { FiSun } from 'react-icons/fi'
import { PiOrangeSlice, PiGameControllerBold } from 'react-icons/pi'
import { FaRegHeart, FaHippo } from 'react-icons/fa6'
import { IoWaterOutline } from 'react-icons/io5'
import { FaPencilAlt } from 'react-icons/fa'
import { IconType } from 'react-icons'

export const getGameStyles = (
  slug: string,
): { bgColor: string; Icon: IconType } => {
  const allGames = {
    ...mathGameStyles,
    ...englishGameStyles,
    ...typingGameStyles,
  } as Record<string, any>

  if (slug in allGames) {
    return allGames[slug]
  }

  return {
    bgColor: 'bg-pink-600',
    Icon: PiGameControllerBold,
  }
}

const mathGameStyles = {
  'policz-kropki': {
    bgColor: 'bg-lime-600',
    Icon: LuDices,
  },
  'dodaj-cyfry': {
    bgColor: 'bg-sky-600',
    Icon: TbMathXPlusY,
  },
  'rozpoznaj-liczbe': {
    bgColor: 'bg-pink-600',
    Icon: TbSpeakerphone,
  },
  'wskaz-kostki': {
    bgColor: 'bg-purple-600',
    Icon: GiDominoTiles,
  },
}

const englishGameStyles = {
  yellow: {
    bgColor: 'bg-yellow-500',
    Icon: FiSun,
  },
  orange: {
    bgColor: 'bg-orange-500',
    Icon: PiOrangeSlice,
  },
  red: {
    bgColor: 'bg-red-500',
    Icon: FaRegHeart,
  },
  blue: {
    bgColor: 'bg-blue-500',
    Icon: IoWaterOutline,
  },
}

const typingGameStyles = {
  't-rex': {
    bgColor: 'bg-green-600',
    Icon: GiTRexSkull,
  },
  hipopotam: {
    bgColor: 'bg-purple-600',
    Icon: FaHippo,
  },
  '5-kredek': {
    bgColor: 'bg-blue-600',
    Icon: FaPencilAlt,
  },
  'jada-sanie': {
    bgColor: 'bg-red-600',
    Icon: TbSleigh,
  },
}
