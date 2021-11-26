import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import { runGoCommand } from '../../utils/go-utils';
import { ServeExecutorSchema } from './schema';

export default async function runExecutor(options: ServeExecutorSchema, context: ExecutorContext) {
  if (!context.projectName) {
    throw new Error('No projectName')
  }
  const projectSourceRoot = context.workspace.projects[context.projectName].sourceRoot;
  const cwd = join(context.cwd, projectSourceRoot)

  // We strip the project root from the main file
  const mainFile = options.main?.replace(`${projectSourceRoot}/`, '')

  return runGoCommand('run', [mainFile], { cwd });
}
