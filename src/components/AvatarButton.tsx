'use client'

import { Session } from 'next-auth'
import Image from 'next/image'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  session: Session
  tabIndex?: number
}

function AvatarButton(
  { session, tabIndex }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    user: { name, image, email },
  } = session

  let avName = ''

  if (name) {
    const arrName = name.split(' ')
    avName = `${arrName[0][0]}${arrName[1][0]}`
  } else if (email) {
    avName = email[0]
  }

  return (
    <button ref={ref} tabIndex={tabIndex} className="avatar placeholder">
      <div className="w-10 rounded-full bg-neutral-content">
        {image ? (
          <Image src={image} width={50} height={50} alt="avatar" />
        ) : (
          <span className="text-md font-bold capitalize">{avName}</span>
        )}
      </div>
    </button>
  )
}

export default forwardRef(AvatarButton)
