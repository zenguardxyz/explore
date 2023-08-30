//@ts-nocheck

import { Card, Chip, Image, Group, Skeleton } from "@mantine/core";
import {Icon24Hours} from "@tabler/icons"

// import {
//   Image,
//   ImageComponentProps,
// } from "../primitives/image/image.component";
import { useStyles } from "./generic-card.component.styles";

import Fingerprint from "../../assets/icons/fingerprint.png";
import Safe from "../../assets/icons/safe.png";
import Session from "../../assets/icons/session.png";
import Email from "../../assets/icons/mail.png";
import NFT from "../../assets/icons/ape.png";

export interface GenericCardProps {
  enabled?: boolean;
  title?: string;
  image?: string;
  loading?: boolean;
  onClick?: any;
}


export const GenericCard: React.FC<GenericCardProps> = (
  props
) => {
  const { enabled, width, title, loading = true, onClick, image} = props;

  const { classes } = useStyles();
  return (
    <Card className={classes.card} onClick={onClick} width={80} >

     { !loading && <>
      <Image src={image ? image : Safe} width={60} className={classes.image} /> 
      <p className={classes.p}>{title}</p>
      {enabled && <Chip checked color="green" variant="light" size="xs" radius="md">Enabled</Chip>}
      </>
     }

    { loading &&  <>

        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <Skeleton height={120} mt={6} radius="lg"  width="100%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6}  radius="xl"  width="100%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="60%" />
        </Group>
        </> }
    </Card>
  );
};
