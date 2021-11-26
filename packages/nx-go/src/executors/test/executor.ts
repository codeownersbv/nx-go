import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import { runGoCommand } from '../../utils/go-utils';
import { TestExecutorSchema } from './schema';

export default async function runExecutor(options: TestExecutorSchema, context: ExecutorContext) {
  if (!context.projectName) {
    throw new Error('No projectName')
  }
  const appRoot = context.workspace.projects[context.projectName].root
  const cwd = join(context.cwd, appRoot)

  const sources = `-v ./...`
  const cover = options.skipCover ? '' : '-cover'
  const race = options.skipRace ? '' : '-race'

  return runGoCommand('test', [sources, cover, race], { cwd });
}