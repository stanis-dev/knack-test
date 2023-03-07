import { expect } from "chai";
import { dedupeByKey } from "../dedupByKey";

describe("dedupeByKey", () => {
  const objects = [
    { key: "1", name: "object1", fields: [{ key: "f1" }, { key: "f2" }] },
    { key: "2", name: "object2", fields: [{ key: "f3" }, { key: "f4" }] },
    {
      key: "1",
      name: "duplicateObject",
      fields: [{ key: "f1" }, { key: "f2" }],
    },
    { key: "3", name: "object3", fields: [{ key: "f5" }, { key: "f6" }] },
  ];

  it("should deduplicate objects by key", () => {
    const deduped = dedupeByKey(objects);

    expect(deduped.length).to.equal(3);
    expect(deduped).to.deep.equal([
      { key: "1", name: "object1", fields: [{ key: "f1" }, { key: "f2" }] },
      { key: "2", name: "object2", fields: [{ key: "f3" }, { key: "f4" }] },
      { key: "3", name: "object3", fields: [{ key: "f5" }, { key: "f6" }] },
    ]);
  });

  it("should deduplicate objects by specified child key", () => {
    const objectsWithDuplicateFields = [
      { key: "1", name: "object1", fields: [{ key: "f1" }, { key: "f2" }] },
      { key: "2", name: "object2", fields: [{ key: "f3" }, { key: "f4" }] },
      {
        key: "3",
        name: "object3",
        fields: [
          { key: "f5" },
          { key: "f6" },
          { key: "f5" },
          { key: "f6" },
          { key: "f7" },
        ],
      },
    ];
    const deduped = dedupeByKey(objectsWithDuplicateFields, "fields");
    expect(deduped.length).to.equal(3);
    expect(deduped).to.deep.equal([
      { key: "1", name: "object1", fields: [{ key: "f1" }, { key: "f2" }] },
      { key: "2", name: "object2", fields: [{ key: "f3" }, { key: "f4" }] },
      {
        key: "3",
        name: "object3",
        fields: [{ key: "f5" }, { key: "f6" }, { key: "f7" }],
      },
    ]);
  });
});
