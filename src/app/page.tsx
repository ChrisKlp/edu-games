import GameTile from '@/components/GameTile'
import { LuDices } from 'react-icons/lu'
import { TbMathXPlusY, TbSpeakerphone } from 'react-icons/tb'

export default function Home() {
  return (
    <section className="container pt-5">
      <p className="mb-6 text-center text-2xl font-bold text-sky-600">
        Wybierz grę:
      </p>
      <div className="grid grid-cols-2 gap-4">
        <GameTile
          link="/policz-kropki"
          title="Policz kropki"
          Icon={LuDices}
          className="bg-lime-600"
        />
        <GameTile
          link="/dodaj-cyfry"
          title="Dodaj cyfry"
          Icon={TbMathXPlusY}
          className="bg-sky-600"
        />
        <GameTile
          link="/rozpoznaj-liczbe"
          title="Rozpoznaj liczbę ze słuchu"
          Icon={TbSpeakerphone}
          className="bg-pink-600"
        />
      </div>
    </section>
  )
}
