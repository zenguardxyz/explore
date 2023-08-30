import { Container, Group, Progress, Text, Paper } from "@mantine/core";
import { Title } from "../../../components/primitives/text/text.component";
import { useStyles } from "./progress-status.component.styles";

interface ProgresStatusProps {
  title: string;
  status: number;
  description: string;
}

export const ProgressStatus = (props: ProgresStatusProps) => {
  const { title, status, description } = props;

  const { classes } = useStyles();
  return (
    <Paper className={classes.progressContainer} withBorder>
      <Group>
        <Title>{title}</Title>
        <Text size="sm" weight={500} className={classes.description}>
          {description}
        </Text>
      </Group>
      <Container p={0} mt={20} mb={10}>
        <Progress size="md" value={status} color="teal" />
        <Text size="xs" mt={10} weight={500} className={classes.description}>
          You have completed {status}%
        </Text>
      </Container>
    </Paper>
  );
};
