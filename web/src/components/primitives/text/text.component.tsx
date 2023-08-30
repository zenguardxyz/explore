import React from "react";
import { useStyles } from "./text.component.styles";

/**
 * heading
 *
 * subheading
 *
 * label
 *
 * paragraph
 */

export interface TextComponentProps {
  children?: React.ReactNode;
  text?: string;
  centered?: string;
}

export const Title: React.FC<TextComponentProps> = (props) => {
  const { classes } = useStyles();
  const { text, children } = props;
  return <h2 className={classes.h2}>{text ? text : children}</h2>;
};

export const SubTitle: React.FC<TextComponentProps> = (props) => {
  const { classes } = useStyles();
  const { text, children } = props;
  return <h2 className={classes.subtitle}>{text ? text : children}</h2>;
};

export const Paragraph: React.FC<TextComponentProps> = (props) => {
  const { classes } = useStyles();
  const { text, children } = props;
  return <h2 className={classes.p}>{text ? text : children}</h2>;
};
