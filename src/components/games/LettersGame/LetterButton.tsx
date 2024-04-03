import { cn } from '@/lib/utils'

type Props = {
  letter: string
  selectedLetter: string | null
  onClick: () => void
}

export default function LetterButton({
  letter,
  selectedLetter,
  onClick,
}: Props) {
  const shadowStyle =
    selectedLetter === letter ? '' : 'after:shadow-[0_0_0_2px_#ff0000]'

  return (
    <button
      type="button"
      className={cn(
        "relative w-12 flex-shrink-0 rounded-lg bg-white p-2 py-4 text-2xl font-semibold capitalize drop-shadow-xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-lg after:content-['']",
      )}
      onClick={onClick}
    >
      {selectedLetter || '_'}
    </button>
  )
}
