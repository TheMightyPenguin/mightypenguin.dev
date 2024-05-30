import { allLearnings } from '@/content/data';
import Link from 'next/link';

export default function TilListPage() {
  const items = allLearnings.all();
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.pathname}>
            <Link href={`/til${item.pathname}`}>{item.frontMatter.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
