import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "250px",
    background: theme.colorScheme === "dark" ? "#141517" : "white",
    border:
      theme.colorScheme === "dark" ? "1px solid  #25262B" : "1px solid #DEE2E6",
    borderRadius: "8px",
    padding: "0 !important",
    cursor: "pointer",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100% !important",
    },
  },
  imageContainer: {
    maxWidth: "250px",
    minHeight: "180px",
    background: "#F2F1FF",
    position: "relative",
    padding: "2px",
    margin: "2px",
    borderTopRightRadius: "4px",
    borderTopLeftRadius: "4px",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "10px",
    color: "#fff",
    background: "#6663FD",
    borderRadius: "4px",
    fontWeight: 400,
    fontSize: "12px",
    padding: "12px",
  },
  h3: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "18px",
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
    margin: 0,
  },
  p: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
    padding: 0,
  },
  description: {
    padding: "18px 20px",
  },
}));
