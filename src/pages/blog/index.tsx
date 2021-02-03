import Link from 'next/link';
import React from 'react';

import { frontMatter as posts } from './**/*.mdx';

type Props = {
  links: { href: string }[];
};

const Blog: React.FC<Props> = () => {
  return (
    <div>
      <p>Blogs</p>
      {posts.map((post) => {
        const href = post.__resourcePath.replace('mdx', '');
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
