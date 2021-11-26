import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import { runGoCommand } from '../../utils/go-utils';
import { LintExecutorSchema } from './schema';

export default async function runExecutor(_options: LintExecutorSchema, context: ExecutorContext) {
  if (!context.projectName) {
    throw new Error('No projectName')
  }
  const appRoot = context.workspace.projects[context.projectName].root
  const cwd = join(context.cwd, appRoot)

  const sources = './...'

  return runGoCommand('fmt', [sources], { cwd });;
}
