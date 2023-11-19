import type { APIContext } from 'astro'
import { open, readdir } from 'node:fs/promises'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export async function GET({ request }: APIContext) {
    const formData = await request.formData()
    let filesReturned = false;
    console.log(formData)
    let filenames:any = [];
    try {
        const filename = formData.get('filename');  
        if(existsSync(`/files/processed_midi/${filename}`)){
            filenames = await readdir(`/files/processed_midi/${filename}`)
            filesReturned = true;

        }
      // wroteFile = true
    } catch (e) {
      console.error(e)
    }

  return {
    status: filesReturned ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({filenames})
  }
}
