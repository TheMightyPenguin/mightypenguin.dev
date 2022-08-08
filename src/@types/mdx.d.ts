declare module '*.mdx' {
  type FrontMatter = {
    layout: string;
    title: string;
    summary: string;
    publishedAt: string;
    draft: boolean;
    __resourcePath: string;
  };

  // from https://github.com/jescalan/babel-plugin-import-glob-array#adding-import-metadata
  type ImportMetadata = {
    absolutePath: string;
    importedPath: string;
  };

  export let meta: FrontMatter[];
  export let _importMeta: ImportMetadata[];
}
