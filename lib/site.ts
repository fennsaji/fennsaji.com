import fs from 'fs'
import path from 'path'

export const RESUME_PATH = '/resume.pdf'

export function hasResume(): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf'))
}
