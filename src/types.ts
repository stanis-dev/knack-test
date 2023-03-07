export type AppField = {
  key: string
}

export type AppSceneView = {
  key: string
}

export type AppVersionObject = {
  key: string;
  name: string;
  type: string;
  fields: AppField[]
};

export type AppVersionScene = {
  views: AppSceneView[]
  key: string;
  slug: string;
};

export type AppVersion = {
  objects: AppVersionObject[];
  scenes: AppVersionScene[];
};

export type AppSchema = {
  versions: AppVersion[];
};
