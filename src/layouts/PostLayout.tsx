/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';
import { PropsWithChildren } from 'react';

import FluidText from '@/components/FluidText/FluidText';
import Stack from '@/components/Stack/Stack';

const mdxComponents: MDXComponents = {
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

// this might be failing due to the mdx package, replace it with another one
const PostLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
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
        <Stack space="5x">{children}</Stack>
      </MDXProvider>
    </div>
  );
};

export default PostLayout;
