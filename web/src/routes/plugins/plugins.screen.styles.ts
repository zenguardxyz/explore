import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  voucherScreenContainer: {
    margin: "0 !important",
    padding: "10px !important",
  },
  actionsContainer: {
    margin: "30px 0 130px 0",
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    gridTemplateColumns: 'repeat(3, 1fr)',
    // display: "flex",
  },

  vouchersContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "24px",
    marginTop: "30px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  title: {
    marginTop: "42px",
    marginBottom: "30px",
  },
  test: {
    fontSize: "1rem",
  },
  button: {
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
  },
}));
