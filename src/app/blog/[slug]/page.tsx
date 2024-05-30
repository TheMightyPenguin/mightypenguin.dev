import { notFound } from 'next/navigation';
import { allPosts } from '@/content/data';

type Params = { slug: string };

type Props = { params: Params };

export const dynamicParams = false;

export default async function BlogPage({ params }: Props) {
  const { Content } = (await allPosts.get(params.slug)) ?? {};
  return Content ? <Content /> : notFound();
}

export function generateStaticParams(): Params[] {
  return allPosts.paths().map((pathname) => ({ slug: pathname }));
}
