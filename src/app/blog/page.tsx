import { allPosts } from '@/content/data';
import Link from 'next/link';

export default function BlogsListPage() {
  const items = allPosts.all();
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.pathname}>
            <Link href={`/blog${item.pathname}`}>{item.frontMatter.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
