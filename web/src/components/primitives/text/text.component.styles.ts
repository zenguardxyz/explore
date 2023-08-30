import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  h2: {
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "22px",
    color: theme.colorScheme === "dark" ? "#fff " : "#555770 ",
    margin: "0 !important",
    padding: "0 !important",
  },
  p: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "22px",
    color: theme.colorScheme === "dark" ? "#fff " : "#555770 ",
    margin: "0 !important",
    padding: "0 !important",
  },

  subtitle: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "18px",
    color: theme.colorScheme === "dark" ? "#fff " : "#555770 ",
    margin: "0 !important",
    padding: "0 !important",
  },
}));
