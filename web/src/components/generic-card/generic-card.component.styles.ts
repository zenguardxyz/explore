import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    // alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    justifyContent: "center",
    // border:
      // theme.colorScheme === "dark" ? "1px solid  #25262B" : "1px solid #DEE2E6",
    width: "285px",
    // height: "200px",
    // background: theme.colorScheme === "dark" ? "#282927" : "#f1f1f1",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: "20px",
    color: theme.colorScheme === "dark" ? "#A6A7AB" : theme.colors.gray[7],
    "&:hover": {
      background: theme.colorScheme === "dark" ? "#56575c" : "#f1f1f1",
      cursor: "pointer",
      // borderColor: "#2ACB82",
      // boxShadow: "0 0 5px #2ACB82",
      maxWidth: '400px',
    }
  },
  cardSkeleton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "285px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: "20px",
    color: theme.colorScheme === "dark" ? "#A6A7AB" : theme.colors.gray[7],
  },
  p: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "18px",
    textAlign: "center",
    marginTop: "32px",
  },


  cardContainer: {
    padding: '20px',
    border: ' 1px solid #d9e1ec',
    borderRadius: '4px',
    transition: 'all .3s ease',
    cursor: 'pointer',
    background: '#fff',
    maxWidth: '400px',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#2ACB82',
      // boxShadow: '0 0 5px #2ACB82',
    },
  },
  imageContainer: {
    // height: '68px',
    // width: '68px',
    border: '1px solid transparant',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    // padding: '4px',
    height: '50px',
    width: '50px',
    display: 'block',
    alignSelf: 'center',
  },
  pluginName: {
    fontWeight: 600,
    fontSize: '16px',
    marginTop: '6px',
  },
  description: {
    fontWeight: 400,
    lineHeight: '24px',
    fontSize: '14px',
    marginTop: '-14px',
  },
  metaContainer: {},
  // description: {},
  badge: {
    marginTop: '-5px',
  },


}));
