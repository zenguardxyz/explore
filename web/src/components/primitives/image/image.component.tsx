import React from "react";
import { Image as Img, ImageProps } from "@mantine/core";
import { images, Images } from "../../../utils/images";

export interface ImageComponentProps extends ImageProps {
  name?: Images;
  src?: string;
}

export const Image: React.FC<ImageComponentProps> = (props) => {
  const { name, src } = props;
  const url = name ? images[name] : src;

  return <Img src={url} {...props} />;
};
