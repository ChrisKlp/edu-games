import dynamic from 'next/dynamic'
import Spinner from './Spinner'

type Props = {
  icon: string
  iconLib: string
}

export default function DynamicIcon({ icon, iconLib }: Props) {
  return dynamic(() => import(`${iconLib}`).then((mod) => mod[icon]), {
    ssr: false,
  })
}
