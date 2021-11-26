import { execSync } from "child_process"

export function runGoCommand(
  command: 'build' | 'fmt' | 'run' | 'test',
  params: string[],
  options: { cwd?: string; cmd?: string } = {},
): { success: boolean } {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'go'
  const cwd = options.cwd || process.cwd()

  // Create the command to execute
  const execute = `${cmd} ${command} ${params.join(' ')}`

  try {
    execSync(execute, { cwd, stdio: [0, 1, 2] })
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}
