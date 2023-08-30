import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    justifyContent: "center",
    border:
      theme.colorScheme === "dark" ? "1px solid  #25262B" : "1px solid #DEE2E6",
    width: "200px",
    height: "200px",
    background: theme.colorScheme === "dark" ? "#282927" : "#f1f1f1",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: "40px",
    color: theme.colorScheme === "dark" ? "#A6A7AB" : theme.colors.gray[7],
    "&:hover": {
      cursor: "pointer",
      borderColor: "#2ACB82",
      boxShadow: "0 0 5px #2ACB82",
    }
  },
  p: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "18px",
    textAlign: "center",
    marginTop: "32px",
  },
  image: {
    marginTop: "20px",
  },


}));
