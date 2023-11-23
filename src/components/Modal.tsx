'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
}

export default function Modal({ children }: Props) {
  const router = useRouter()

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => router.back()}>close</button>
      </form>
    </dialog>
  )
}
