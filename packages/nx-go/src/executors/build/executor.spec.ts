import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

describe('Build Executor', () => {
  let options: BuildExecutorSchema;

  const projectName = 'test-app';

  beforeAll(async () => {
    ensureNxProject('@codeowners-company/nx-go', 'dist/packages/nx-go');
    await runNxCommandAsync(
      `generate @codeowners-company/nx-go:app ${projectName}`
    );

    await runNxCommandAsync(`build ${projectName}`);

    options = {
      outputPath: 'tmp/nx-e2e/proj/dist/apps/test-app',
      main: 'tmp/nx-e2e/proj/apps/test-app/src/main.go',
    };
  });

  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
