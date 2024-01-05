//@ts-nocheck

import { Card, Chip, Image, Group, Skeleton } from "@mantine/core";
import {Icon24Hours} from "@tabler/icons"

// import {
//   Image,
//   ImageComponentProps,
// } from "../primitives/image/image.component";
import { useStyles } from "./generic-card.component.styles";
import { loadPublisher } from "../../logic/attestation";

import Safe from "../../assets/icons/safe.png";


export interface GenericCardProps {
  enabled?: boolean;
  publisher?: string;
  title?: string;
  image?: string;
  loading?: boolean;
  onClick?: any;
}


export const GenericCard: React.FC<GenericCardProps> = (
  props
) => {
  const { enabled, width, title, loading = true, onClick, image, publisher} = props;

  console.log(publisher)
  const { classes } = useStyles();
  return (
    <>
    

     { !loading && <Card className={classes.card} onClick={onClick} width={80} >
      <div className={classes.imageContainer}>
      <Image  src={image ? image : Safe} width={40}
                height={40} className={classes.image} /> 
      </div>
      <div>
              <p className={classes.pluginName}>{title}</p>
              <p className={classes.description}>
              Published By: {loadPublisher(publisher)?.name}.
              </p>
            </div>
      {enabled && <Chip checked color="green" variant="light" size="xs" radius="md">Enabled</Chip>}
      </Card>
     }
      
      

    { loading &&  <Card className={classes.cardSkeleton} width={80} >

        <Group
          style={{
            width: "100%",
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
        <Skeleton height={60} mt={6} radius="lg"  width="25%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6}  radius="xl"  width="80%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="80%" />
        </Group>
        </Card> }
    
    </>
  );
};
