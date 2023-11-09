import dynamic from 'next/dynamic'
import Spinner from './Spinner'

const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
  loading: () => <Spinner />,
})
