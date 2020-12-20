import React from "react";
import { useStyles } from "react-treat";
import { Theme } from "../../theme/types";
import * as styleRefs from "./Box.treat";

type Props = {
  as?: string;
  padding: Theme["space"];
};

const Box: React.FC<Props> = ({ as: Component = "div" }) => {
  const styles = useStyles(styleRefs);
  // @ts-ignore
  return <Component className={`${styles.reset}`} />;
};
