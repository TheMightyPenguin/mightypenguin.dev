import { Components, MDXProvider } from '@mdx-js/react';
import React, { Children, cloneElement, Fragment, isValidElement } from 'react';

import Stack from '../components/Stack/Stack';

const mdxComponents: Components = {
  h1: (props) => <h1 {...props} style={{ color: 'red' }} />,
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
        <Stack>{children}</Stack>
      </MDXProvider>
    </div>
  );
};

export default PostLayout;
