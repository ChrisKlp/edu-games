import { Client } from 'basic-ftp'
import { Readable } from 'stream'
import { getErrorMessage } from '../utils'

export async function uploadImage(img: Readable, name: string) {
  const client = new Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.FTP_PORT),
    })
    await client.cd(process.env.FTP_PATH as string)
    await client.uploadFrom(img, name)
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
  client.close()
}
