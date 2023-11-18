import type { APIContext } from 'astro'
import { open } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export async function POST({ request }: APIContext) {
  const formData = await request.formData()

  let wroteFile = false

  const file = formData.get('file')
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
      const fileHandle = await open(fileName, 'w')
      await fileHandle.writeFile(fileData.buffer.value)
      fileHandle.close()
      const exec_promise = promisify(exec)
      const { stdout } = await exec_promise(`/root/miniconda3/bin/basic-pitch /files ${fileName}`)
      console.log(stdout)
      wroteFile = true
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
