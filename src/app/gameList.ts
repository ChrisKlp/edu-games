import { LuDices } from 'react-icons/lu'
import { TbMathXPlusY, TbSpeakerphone } from 'react-icons/tb'
import { GiDominoTiles } from 'react-icons/gi'
import { FiSun } from 'react-icons/fi'

const gameList = [
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
  {
    id: '51f4c4e4-b2e4-494e-a344-938d4d665ebe',
    title: 'Yellow',
    slug: '/english/yellow',
    icon: FiSun,
    bgColor: 'bg-yellow-500',
    language: 'en-US',
  },
]

export default gameList
