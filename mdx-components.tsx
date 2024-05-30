import { MDXComponents } from 'mdxts/components'
import FluidText from '@/components/FluidText/FluidText';

export function useMDXComponents() {
  return {
		...MDXComponents,
		h1: function H1(props: any) {
			return <h1 {...props} style={{ color: 'pink' }} />;
		},
		p: function Paragraph(props: any) {
			return (
				<FluidText
					minSize="medium"
					maxSize="xlarge"
					targetPercentage={0.02}
					lineGap={18}
					{...props}
				/>
			);
		},
  } satisfies MDXComponents
}
 