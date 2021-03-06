import { Components, MDXProvider } from '@mdx-js/react';
import React from 'react';

import Stack from '@/components/Stack/Stack';

const mdxComponents: Components = {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (props: any) => <h1 {...props} style={{ color: 'red' }} />,
};

const PostLayout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        width: '100%',
        padding: 20,
      }}
    >
      <MDXProvider components={mdxComponents}>
        <Stack space="small">{children}</Stack>
      </MDXProvider>
    </div>
  );
};

export default PostLayout;
