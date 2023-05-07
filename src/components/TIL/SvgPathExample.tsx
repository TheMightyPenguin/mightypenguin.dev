import clsx from 'clsx';
import React from 'react';

import { path, pathLength } from './styles.css';

type Props = React.ComponentProps<'svg'> & {
  strokeDasharray?: React.ComponentProps<'path'>['strokeDasharray'];
};

const SvgPathExample = ({ strokeDasharray, ...svgProps }: Props) => {
  return (
    <svg
      width={752}
      height={94}
      viewBox="0 0 752 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        className={clsx(path)}
        d="M.5 53C25.5 13.833 99-41 193 53c117.5 117.5 78.5-68.5 298-15 175.6 42.8 246.5 4.833 260-19.5"
        stroke="#000"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray ?? pathLength}
      />
    </svg>
  );
};

export default SvgPathExample;
