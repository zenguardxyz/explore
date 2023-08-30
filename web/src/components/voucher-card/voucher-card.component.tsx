import { Badge, Card, Center, Container } from "@mantine/core";
import { Image } from "../primitives/image/image.component";
import { VoucherCardComponentProps } from "./voucher-card.component.props";
import { useStyles } from "./voucher-card.component.styles";
//@ts-ignore
import Safe from "../../assets/icons/safe.png";
import { AddressUtil } from "../../utils/address";

export const VoucherCard: React.FC<VoucherCardComponentProps> = (props) => {
  const { address, title, description, onClick } = props;
  const { classes } = useStyles();
  return (
    <Card className={classes.container} onClick={onClick}>
      <Center className={classes.imageContainer}>
        <Image src={Safe} alt="Doge" height={40} width={40} />
        {/* {redeemed && <Badge className={classes.badge}>Redeemed</Badge>} */}
      </Center>
      <Container className={classes.description}>
        <h3 className={classes.h3}>{AddressUtil.shorternAddress(address!)}</h3>
        <p className={classes.p}>{description}</p>
      </Container>
    </Card>
  );
};
