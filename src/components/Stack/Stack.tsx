import React, { Children, cloneElement, isValidElement } from 'react';
import { useStyles } from 'react-treat';

import * as styleRefs from './Stack.treat';

const Stack: React.FC = ({ children }) => {
  const styles = useStyles(styleRefs);
  return (
    <div>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }
        return (
          <div className={styles.bottomSpace}>
            {cloneElement(child, child.props, child.props.children)}
          </div>
        );
      })}
    </div>
  );
};

export default Stack;
