import type { APIContext } from 'astro'
import { open, readdir } from 'node:fs/promises'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export async function POST({ request }: APIContext) {
  const formData = await request.formData()
  console.log(formData)
  let wroteFile = false
  const file = formData.get('file');
  const sourceCount = formData.get('sourceCount');
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
    const fileName = fileData.name.split('.')[0];
    if(!existsSync('/files')){
      mkdirSync('/files')
    }
    if(!existsSync('/files/raw')){
      mkdirSync('/files/raw')
    }
    const filePath = `/files/raw/${fileData.name}`
    try {
      const fileHandle = await open(filePath, 'w');
      await fileHandle.writeFile(fileData.buffer.value);

      fileHandle.close()

      // split file into sources using spleeter 
      const exec_promise = promisify(exec)
      const spleet_command = `/root/miniconda3/bin/spleeter separate -p ` +
        `spleeter:${sourceCount}stems -o /files/split ${filePath}`;
      const { stdout } = await exec_promise(spleet_command);
      wroteFile = true;
      const spleeter_output_dir = `/files/split/${fileName}`;
      try {
        const split_files = await readdir(spleeter_output_dir);
        const exec_promise = promisify(exec)
        if(!existsSync('/files/processed_midi')){
          mkdirSync('/files/processed_midi')
        }
        if(!existsSync(`/files/processed_midi/${fileName}`)){
          mkdirSync(`/files/processed_midi/${fileName}`)
        }
        for (const split_file of split_files){
          console.log(`=========Processing ${split_file}=========`);
          await exec_promise(`/root/miniconda3/bin/basic-pitch /files/processed_midi/${fileName} ${spleeter_output_dir}/${split_file}`)
          console.log(`Finished converting ${split_file} to MIDI`);
        }
      } catch (err) {
        console.error(err);
      }
      // convert split mp3 into midis

      // const exec_promise = promisify(exec)
      // const { stdout } = await exec_promise(`/root/miniconda3/bin/basic-pitch /files ${fileName}`)
      // console.log(stdout)
      // wroteFile = true
    } catch (e) {
      console.error(e)
    }
  }

  return new Response(wroteFile ? JSON.stringify("") : JSON.stringify('Failed to write file'), {
    status: wroteFile ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
