import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  settingsContainer: {
    // borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: "1.5rem",
    width: "900px",
    margin: "45px auto 0 auto",
    minWidth: "591px",
    [`@media (max-width: 900px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
      width: "100%",
    },
  },
  alert: {

      "&:hover": {
        cursor: "pointer",
        borderColor: "#7bc989",
      }
  },

  link: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",

      // borderColor: "#7bc989",
    }
},
  createScreenContainer: {
    padding: 0,
    marginTop: "66px",
    maxWidth: "1131px",
    [`@media (max-width: 900px)`]: {
      maxWidth: "100%",
      marginTop: "30px",
    },
  },
  progressbox: {
    width: "515px",
    maxWidth: "100%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
      padding: "0px",
    },
  },
  box: {
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    maxWidth: "100%",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      gap: "20px",
    },
  },
  button: {
    color: "#fff !important",
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
    width: "100%",
  },

  h3: {
    fontWeight: 600,
    fontSize: "22px",
    marginBottom: "20px",
    color: "#fff",
  },

  address: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#B3B4B7",
    textOverflow: "ellipsis",
  },

  formContainer: {
    padding: "30px",
    marginTop: "38px",

    borderRadius: "8px",
    flex: "2",
    // minWidth: "591px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
  },

  SuccessIcon: {
    width: "60px",
    height: "60px",
  },
  successText: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#2C7A7B",
    textAlign: "center",
    marginTop: "30px",
  },
  dataGrid: {
    margin: "0 auto",
    padding: "4rem",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "10px",
    },
  },
  ul: {
    listStyle: "none",
    padding: "0",
  },
  listContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  listHeading: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "16px",
    color: "#B3B4B7",
  },
  listValue: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "16px",
    color: "#fff",
  },

  voucherImage: {
    // backgroundImage: `url("/images/voucher.svg")`,
    position: "relative",
    width: "100%",
    height: "150px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "8px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: "150px",
    },
  },
  voucherDetailsContainer: {
    marginTop: "45px",
    borderRadius: "8px",
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

  ghostButton: {
    width: "100%",
    color: "#fff",
    background: "rgba(242, 241, 255, 0.06)",
    border: "1px solid rgba(132, 154, 170, 0.52)",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  voucherText: {
    fontWeight: "bold",
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
  },
  voucherTextBlue: {
    color: "transparent",
    textShadow: "0 0 5px rgba(255,255,255,0.9)",
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
  image: {
    marginTop: "20px",
  },
}));
