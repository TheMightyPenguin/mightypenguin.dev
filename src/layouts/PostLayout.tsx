import { Components, MDXProvider } from '@mdx-js/react';
import React from 'react';

import FluidText from '@/components/FluidText/FluidText';
import Stack from '@/components/Stack/Stack';

const mdxComponents: Components = {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (props: any) => <h1 {...props} style={{ color: 'red' }} />,
  p: (props: any) => (
    <FluidText
      minSize="medium"
      maxSize="xlarge"
      targetPercentage={0.02}
      lineGap={18}
      {...props}
    />
  ),
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
        <Stack space="medium">{children}</Stack>
      </MDXProvider>
    </div>
  );
};

export default PostLayout;
