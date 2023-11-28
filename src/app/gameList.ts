import { LuDices } from 'react-icons/lu'
import { TbMathXPlusY, TbSpeakerphone, TbSleigh } from 'react-icons/tb'
import { GiDominoTiles, GiTRexSkull } from 'react-icons/gi'
import { FiSun } from 'react-icons/fi'
import { PiOrangeSlice } from 'react-icons/pi'
import { FaRegHeart, FaHippo } from 'react-icons/fa6'
import { IoWaterOutline } from 'react-icons/io5'
import { FaPencilAlt } from 'react-icons/fa'

export const gameList = [
  {
    title: 'Policz kropki',
    slug: '/policz-kropki',
    icon: LuDices,
    bgColor: 'bg-lime-600',
  },
  {
    title: 'Dodaj cyfry',
    slug: '/dodaj-cyfry',
    icon: TbMathXPlusY,
    bgColor: 'bg-sky-600',
  },
  {
    title: 'Rozpoznaj liczbę ze słuchu',
    slug: '/rozpoznaj-liczbe',
    icon: TbSpeakerphone,
    bgColor: 'bg-pink-600',
  },
  {
    title: 'Wskaż poprawne kostki',
    slug: '/wskaz-kostki',
    icon: GiDominoTiles,
    bgColor: 'bg-purple-600',
  },
]

export const englishQuizzes = [
  {
    title: 'Yellow',
    slug: '/english/yellow',
    icon: FiSun,
    bgColor: 'bg-yellow-500',
    language: 'en-US',
  },
  {
    title: 'Orange',
    slug: '/english/orange',
    icon: PiOrangeSlice,
    bgColor: 'bg-orange-500',
    language: 'en-US',
  },
  {
    title: 'Red',
    slug: '/english/red',
    icon: FaRegHeart,
    bgColor: 'bg-red-500',
    language: 'en-US',
  },
  {
    title: 'Blue',
    slug: '/english/blue',
    icon: IoWaterOutline,
    bgColor: 'bg-blue-500',
    language: 'en-US',
  },
]

export const typingGames = [
  {
    title: 'T-Rex',
    slug: '/przepisywanki/t-rex',
    icon: GiTRexSkull,
    bgColor: 'bg-green-600',
  },
  {
    title: 'Hipopotam',
    slug: '/przepisywanki/hipopotam',
    icon: FaHippo,
    bgColor: 'bg-purple-600',
  },
  {
    title: '5 kredek',
    slug: '/przepisywanki/5-kredek',
    icon: FaPencilAlt,
    bgColor: 'bg-blue-600',
  },
  {
    title: 'Jadą sanie',
    slug: '/przepisywanki/jada-sanie',
    icon: TbSleigh,
    bgColor: 'bg-red-600',
  },
]
