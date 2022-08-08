import Link from 'next/link';
import React from 'react';

import { _importMeta as metadata, meta as posts } from './**/*.mdx';

type Props = {
  links: { href: string }[];
};

const Blog: React.FC<Props> = () => {
  return (
    <div>
      <p>Blogs</p>
      {posts.map((post, index) => {
        const importedPath = metadata[index].importedPath;
        const href = `/blog${importedPath.replace('.mdx', '')}`;
        return (
          <Link key={post.title} href={href}>
            <a>{post.title}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;
