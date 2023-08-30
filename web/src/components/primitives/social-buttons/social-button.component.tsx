//@ts-nocheck
import { Button } from "@mantine/core";
import Google from "../../../assets/icons/google.svg";
import MetaMask from "../../../assets/icons/meta-mask.svg";
import { Image } from "../image/image.component";

export function GoogleButton(props: any) {
  return (
    <Button
      leftIcon={<Image src={Google} width={20} />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function MetaMaskButton(props: any) {
  return (
    <Button
      leftIcon={<Image src={MetaMask} width={20} />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}
