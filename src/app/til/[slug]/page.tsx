import { notFound } from 'next/navigation';
import { allLearnings } from '@/content/data';

type Params = { slug: string };

type Props = { params: Params };

export const dynamicParams = false;

export default async function TilPage({ params }: Props) {
  const { Content } = (await allLearnings.get(params.slug))!;
  return Content ? <Content /> : notFound();
}

export function generateStaticParams(): Params[] {
  return allLearnings.paths().map((pathname) => ({ slug: pathname }));
}
