import { dedupeByKey } from "./dedupByKey";
import { AppSchema, AppVersion } from "./types";

export const sanitizeApp = (app: AppSchema) => {
  const sanitizedVersions: AppVersion[] = [];
  for (const version of app.versions) {
    const sanitizedObjects = dedupeByKey(version.objects, "fields");
    const sanitizedScenes = dedupeByKey(version.scenes, "views");

    sanitizedVersions.push({
      ...version,
      objects: sanitizedObjects,
      scenes: sanitizedScenes,
    });
  }

  return {
    ...app,
    versions: sanitizedVersions,
  };
};
