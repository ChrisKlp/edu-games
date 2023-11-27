import { LuDices } from 'react-icons/lu'
import { TbMathXPlusY, TbSpeakerphone } from 'react-icons/tb'
import { GiDominoTiles, GiTRexSkull } from 'react-icons/gi'
import { FiSun } from 'react-icons/fi'
import { PiOrangeSlice } from 'react-icons/pi'
import { FaRegHeart } from 'react-icons/fa6'
import { IoWaterOutline } from 'react-icons/io5'

export const gameList = [
  {
    id: '6f5650aa-a0fa-4124-8c54-c01ab42b7222',
    title: 'Policz kropki',
    slug: '/policz-kropki',
    icon: LuDices,
    bgColor: 'bg-lime-600',
  },
  {
    id: 'e7ec40f7-9183-4a81-8612-0b42c017471a',
    title: 'Dodaj cyfry',
    slug: '/dodaj-cyfry',
    icon: TbMathXPlusY,
    bgColor: 'bg-sky-600',
  },
  {
    id: '4f931b28-f545-4cac-9834-1c4ef01857d7',
    title: 'Rozpoznaj liczbę ze słuchu',
    slug: '/rozpoznaj-liczbe',
    icon: TbSpeakerphone,
    bgColor: 'bg-pink-600',
  },
  {
    id: '507f51d8-ed2e-472f-a74f-5ca11755e5d2',
    title: 'Wskaż poprawne kostki',
    slug: '/wskaz-kostki',
    icon: GiDominoTiles,
    bgColor: 'bg-purple-600',
  },
]

export const englishQuizzes = [
  {
    id: '51f4c4e4-b2e4-494e-a344-938d4d665ebe',
    title: 'Yellow',
    slug: '/english/yellow',
    icon: FiSun,
    bgColor: 'bg-yellow-500',
    language: 'en-US',
  },
  {
    id: 'Efm1OaOk3opmYNZe4YVlImK4fEpoU7DRyBRsRqLrOkc=',
    title: 'Orange',
    slug: '/english/orange',
    icon: PiOrangeSlice,
    bgColor: 'bg-orange-500',
    language: 'en-US',
  },
  {
    id: 'WMUkgx9gyiC8nHLHvri3Xv6L5Bwrcn/algX+0s4tfj8=',
    title: 'Red',
    slug: '/english/red',
    icon: FaRegHeart,
    bgColor: 'bg-red-500',
    language: 'en-US',
  },
  {
    id: 'GWfJJELpGFY1/d8xs9ZSwkU/+kbtJNfp1H0d97yi51M=',
    title: 'Blue',
    slug: '/english/blue',
    icon: IoWaterOutline,
    bgColor: 'bg-blue-500',
    language: 'en-US',
  },
]

export const typingGames = [
  {
    id: 'f/eh0oT1H43Co9W0EvaryH9FCFIeskVOBSkPfCfwHWA=',
    title: 'T-Rex',
    slug: '/przepisywanki/t-rex',
    icon: GiTRexSkull,
    bgColor: 'bg-green-600',
  },
]
