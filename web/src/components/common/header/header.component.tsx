//@ts-nocheck
import {
  createStyles,
  Group,
  Image,
  ThemeIcon,
  Avatar,
  useMantineTheme,
  MediaQuery,
  Burger,
  Chip
} from "@mantine/core";
import LogoLight from "../../../assets/logo/logo-light.svg";
import LogoDark from "../../../assets/logo/logo-dark.svg";
import Base from "../../../assets/icons/base.png";
import ETH from "../../../assets/icons/eth.svg";
import Gnosis from "../../../assets/icons/gno.svg";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../navigation/route-path";
import { NetworkUtil } from "../../../logic/networks";

import { ActionIcon, Switch, useMantineColorScheme } from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconBrandDiscord,
  IconBrandGithub,
} from "@tabler/icons";

import usePluginStore from "../../../store/plugin/plugin.store";
import { useState, useEffect } from "react";
import { getProvider } from "../../../logic/web3";
import { Badge } from "@mantine/core";


const badgeIcons =   [
  { ids: ['84531'], img: Base },
  { ids: ['11155111', '5', '1'], img: ETH },
  { ids: ['100'], img: Gnosis}
  // Add more mappings as needed
];

function getIconForId(id) {
  for (const icon of badgeIcons) {
    if (icon.ids.includes(id.toString())) {
      return icon.img;
    }
  }
  // Return a default icon or handle the case when no mapping is found
  return 'defaultIcon';
}

const useStyles = createStyles((theme) => ({
  nav: {
    height: "64px",
    // display: "flex",
    // minWidth: "591px",
    [`@media (max-width: 900px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
      width: "100%",
    },
    gap: "2rem",
    alignItems: "center",
    background: theme.colorScheme === "dark" ? "1A1B1E" : "white",

    borderBottom:
      theme.colorScheme === "dark" ? "1px solid  #25262B" : "1px solid #ECEEF5",
  },


  wrapper: {
    maxWidth: "900px",
    // margin: "0 auto",
    borderRadius: "8px",
    margin: "10px auto 0 auto",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },
  maincontainear: {
    width: "1187px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },
  network: { 
    [`@media (max-width: 500px)`]: {
      visibility: "hidden",
    },
  },
  buttonContainer: {
    width: "30px",
    height: "30px",
    padding: "2px",
    border:
      theme.colorScheme === "dark"
        ? "1px solid 1px solid #25262B "
        : "1px solid #A6A7AB",
    borderRadius: "4px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  mode: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    [`@media (max-width: 500px)`]: {
      visibility: "hidden",
    },
  },
  root: {
    position: "relative",
    "& *": {
      cursor: "pointer",
    },
  },

  icon: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 4,
    color: theme.white,
  },

  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
}));

export const Head = (props) => {
  const {setOpened, opened} = props
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [network, setNetwork] = useState('');
  const [chainId, setChainId] = useState(11155111);

  const { } =
  usePluginStore((state: any) => state);
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";

  // const [ opened, setOpened ] = useState(false);

  const { classes } = useStyles();
  const navigate = useNavigate();


  useEffect(() => {

    ;(async () => {


      const provider = await getProvider()

      const chainId = (await provider.getNetwork()).chainId
      setChainId(chainId)
      setNetwork(`${NetworkUtil.getNetworkById(parseInt(chainId))?.name} ${NetworkUtil.getNetworkById(parseInt(chainId))?.type}`);

  })()   
  }, [])



  return (


       
      <nav className={classes.nav}>
        
      <div className={classes.wrapper}>
        <div className={classes.maincontainer}>
        <Group position="apart">
        <Group className={classes.container} >
          <Image
            onClick={() => {
              navigate(RoutePath.plugins);
            }}
            sx={{ cursor: "pointer" }}
            src={dark ? LogoDark : LogoLight}
            alt="Logo"
            width={"200px"}
          />
          <Badge checked={false} checkIcon={<IconBrandDiscord/>} size="sm" color="orange" variant="light">ALPHA</Badge>
          </Group>

          

            
          
          <Group className={classes.mode}>

          <Badge  pl={0} color="gray" variant="light" leftSection={ <Avatar
    alt="Avatar for badge"
    size={24}
    mr={5}
    src={getIconForId(chainId)}
  />} size="lg" className={classes.network} checked={false} icon={<IconSun />}>{network}</Badge>



            {/* <Group className={classes.container} position="center"> */}
              <div className={classes.container}>
                {dark ? (
                  <IconSun
                    size={24}
                    stroke={1.5}
                    onClick={() => toggleColorScheme()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IconMoonStars
                    size={24}
                    stroke={1.5}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleColorScheme()}
                  />
                )}
              </div>
            {/* </Group> */}
          </Group>
          </Group>

      {/* </div> */}
      </div>
      </div>
    </nav>
  );
};
