import { ensureDir, emptyDir } from 'fs-extra';

const buildDir = 'build';

const dev = async () => {
  // Create the build directory if it doesn't exist.
  await ensureDir(buildDir);
  // Remove all the files inside the build directory.
  await emptyDir(buildDir);
};

process.on('unhandledRejection', (error: Error) => {
  console.error(error);
  process.exit(1);
});

dev();
