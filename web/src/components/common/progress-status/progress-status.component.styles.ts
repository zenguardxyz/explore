import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  progressContainer: {
    padding: "20px 30px 20px 30px",
    marginTop: "38px",

    borderRadius: "8px",
    flex: "2",
    width: "591px",
    maxWidth: "100%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
  },
  description: {
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
  },
}));
