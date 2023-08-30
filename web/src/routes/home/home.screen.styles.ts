import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  voucherScreenContainer: {
    margin: "0 !important",
    padding: "10px !important",
    display: "flex"
  },
  actionsContainer: {
    margin: "30px 0 130px 0",
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
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
  heroImage: {

    width: "340px",
    marginTop: "50px",
    [`@media (max-width: 400px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
      width: "100%",
    },
  },
  settingsContainer: {
    borderRadius: "8px",
    width: "591px",
    margin: "45px auto 0 auto",
    minWidth: "591px",
    [`@media (max-width: 900px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
      width: "100%",
    },
  },

  title: {
    marginTop: "42px",
    marginBottom: "30px",
  },
  p: {
    fontWeight: 550,
    fontSize: "18px",
    color: "grey",
    lineHeight: "30px",
    textAlign: "center",
    marginTop: "32px",
  },
  test: {
    fontSize: "1rem",
  },

}));
