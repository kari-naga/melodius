import type { APIContext } from 'astro'
import { open } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export async function POST({ request }: APIContext) {
  const formData = await request.formData()
  console.log(formData.get(formData))
  let wroteFile = false
  const file = formData.get('file');
  const sourceCount = formData.get('sourceCount');
  const hasVocals = formData.get('vocals');
  console.log(formData)
  if (file instanceof File) {
    const fileData = {
      webkitRelativePath: file.webkitRelativePath,
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      buffer: {
        type: 'Buffer',
        value: new Uint8Array(await file.arrayBuffer()),
      },
    }
    const fileName = `/files/${fileData.name}`
    try {
      const fileHandle = await open(fileName, 'w');
      await fileHandle.writeFile(fileData.buffer.value);
      fileHandle.close()

      // split file into sources using spleeter 
      const exec_promise = promisify(exec)
      const spleet_command = `/root/miniconda3/bin/spleeter separate -p ` +
        `spleeter:${sourceCount}stems -o /files/split ${hasVocals ? '' : '-c'} ${fileName}`;
      const { stdout } = await exec_promise(spleet_command);
      console.log(stdout);
      wroteFile = true;

      // convert split mp3 into midis

      // fileHandle.close()
      // const exec_promise = promisify(exec)
      // const { stdout } = await exec_promise(`/root/miniconda3/bin/basic-pitch /files ${fileName}`)
      // console.log(stdout)
      // wroteFile = true
    } catch (e) {
      console.error(e)
    }
  }

  return new Response(wroteFile ? 'Successfully wrote file' : 'Failed to write file', {
    status: wroteFile ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
