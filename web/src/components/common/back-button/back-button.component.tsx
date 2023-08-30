import { Container, Text } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label: string;
  onClick?: () => void;
}

export const BackButton = (props: BackButtonProps) => {
  const { label, onClick } = props;
  const navigate = useNavigate();
  const defaultAction = () => {
    navigate(-1);
  };
  return (
    <Container
      sx={{
        padding: "0px 10px 10px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <IconArrowBack />
      <Text size="sm" align="center">
        {" "}
        {label}
      </Text>
    </Container>
  );
};
