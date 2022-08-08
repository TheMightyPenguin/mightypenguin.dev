declare module '@mdx-js/react' {
  import * as React from 'react';

  type ComponentType =
    | 'a'
    | 'blockquote'
    | 'code'
    | 'delete'
    | 'em'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'hr'
    | 'img'
    | 'inlineCode'
    | 'li'
    | 'ol'
    | 'p'
    | 'pre'
    | 'strong'
    | 'sup'
    | 'table'
    | 'td'
    | 'thematicBreak'
    | 'tr'
    | 'ul'
    | 'wrapper';

  export type Components = {
    [key in ComponentType]?: React.ComponentType<{ children: React.ReactNode }>;
  };

  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }

  export class MDXProvider extends React.Component<MDXProviderProps> {}
}

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
