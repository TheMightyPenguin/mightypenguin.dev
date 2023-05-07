import fs from 'fs/promises';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import React from 'react';

type Props = {
  posts: { href: string; title: string }[];
};

const Blog: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <p>Blogs</p>
      {posts.map((post) => {
        return (
          <Link key={post.href} href={post.href}>
            {post.title}
          </Link>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const dir = path.join(process.cwd(), 'src', 'pages', 'blog');
  const filenames = (await fs.readdir(dir)).filter((filename) =>
    filename.endsWith('.mdx'),
  );

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const { frontmatter } = await compileMDX<{ title: string }>({
        source: await fs.readFile(path.join(dir, filename), 'utf8'),
        options: {
          parseFrontmatter: true,
        },
      });
      return {
        href: `/blog/${filename.replace('.mdx', '')}`,
        title: frontmatter.title ?? 'No title',
      };
    }),
  );

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
