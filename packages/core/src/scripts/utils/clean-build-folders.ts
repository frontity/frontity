import { ensureDir, emptyDir } from "fs-extra";

export default async ({ outDir }: { outDir: string }) => {
  await ensureDir(outDir);
  await emptyDir(outDir);
  await ensureDir(`${outDir}/bundling/entry-points`);
};
