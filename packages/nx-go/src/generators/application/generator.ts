import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { join, normalize } from 'path';
import { ApplicationGeneratorSchema } from './schema';

interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  projectSourceRoot: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ApplicationGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const projectSourceRoot = `${projectRoot}/src`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    projectSourceRoot,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );

  if (options.skipGoMod === false) {
    const modFile = 'go.mod'
    if (!tree.exists(`${modFile}`)) {
      const nxJson = tree.read('nx.json');
      const npmScope = nxJson ? JSON.parse(nxJson.toString()).npmScope : 'main'

      tree.write(`${modFile}`, `module ${npmScope}\n`)
    }
  }
}

export default async function (tree: Tree, options: ApplicationGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: normalizedOptions.projectSourceRoot,
    targets: {
      build: {
        executor: '@codeowners-company/nx-go:build',
        options: {
          outputPath: join(normalize('dist'), normalizedOptions.projectRoot),
          main: join(normalizedOptions.projectSourceRoot, 'main.go'),
        },
      },
      serve: {
        executor: '@codeowners-company/nx-go:serve',
        options: {
          main: join(normalizedOptions.projectSourceRoot, 'main.go'),
        },
      },
      test: {
        executor: '@codeowners-company/nx-go:test',
      },
      lint: {
        executor: '@codeowners-company/nx-go:lint',
      }
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
