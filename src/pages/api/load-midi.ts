// @ts-nocheck
import type { APIContext } from 'astro'
import { open, readdir } from 'node:fs/promises'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export async function GET({ request }: APIContext) {
    let filesReturned = false;
    let filenames:any = [];
    try {
        // const filename = params.get('filename'); 
        const filename = request.url.split("=")[1]
        console.log(`files/processed_midi/${filename}/`)
        if(existsSync(`files/processed_midi/${filename}`)){
            filenames = await readdir(`files/processed_midi/${filename}`)
            filesReturned = true;
        }
      // wroteFile = true
    } catch (e) {
      console.error(e)
    }
    console.log(filenames)
  return new Response(
  JSON.stringify({
    status: filesReturned ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      filenames: filenames,
    },
  }),
  {
    status: filesReturned ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
}
