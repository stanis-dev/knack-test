export const dedupeByKey = <T extends { key: string }>(
  objects: T[],
  childToDedup?: keyof T
): T[] => {
  const seenData = new Map<string, T>();

  for (const obj of objects) {
    const key = obj.key;

    if (seenData.has(key)) {
      console.log("found a dup object!: ", obj.key);
      continue;
    }

    seenData.set(key, obj);

    if (childToDedup) {
      const child = obj[childToDedup];
      if (Array.isArray(child) && "key" in child[0]) {
        const childDeduped = dedupeByKey(child);
        seenData.set(key, { ...obj, [childToDedup]: childDeduped });
      }
    }
  }

  return Array.from(seenData.values());
};
