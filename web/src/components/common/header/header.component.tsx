//@ts-nocheck
import {
  createStyles,
  Group,
  Image,
  ThemeIcon,
  Header,
  Box, 
  rem,
  useMantineTheme,
  MediaQuery,
  Burger
} from "@mantine/core";
import LogoLight from "../../../assets/logo/logo-light.svg";
import LogoDark from "../../../assets/logo/logo-dark.svg";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../navigation/route-path";

import { ActionIcon, Switch, useMantineColorScheme } from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconBrandDiscord,
  IconBrandGithub,
} from "@tabler/icons";

import usePluginStore from "../../../store/plugin/plugin.store";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  nav: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    background: theme.colorScheme === "dark" ? "1A1B1E" : "white",
    padding: "10px",

    borderBottom:
      theme.colorScheme === "dark" ? "1px solid  #25262B" : "1px solid #ECEEF5",
  },
  wrappera: {
    maxWidth: "1187px",
    margin: "0 auto",
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

  const { } =
  usePluginStore((state: any) => state);
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";

  // const [ opened, setOpened ] = useState(false);

  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Header  height={{ base: 70, md: 70 }} p="md">
      {/* <div className={classes.wrapper} style={{ display: 'flex', alignItems: 'center', height: '100%' }}> */}
  

      <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      })}
    >
       
         
        <Group position="apart">
          <Image
            onClick={() => {
              navigate(RoutePath.plugins);
            }}
            sx={{ cursor: "pointer" }}
            src={dark ? LogoDark : LogoLight}
            alt="Logo"
            width={"200px"}
          />

            
          
          <Group className={classes.container}>
            <ActionIcon
              className={classes.buttonContainer}
              // variant="filled"
              component="a"
              href="#"
              title="Discord"
              target="_blank"
            >
              {/* <Image src={Discord} height={18} width={18} /> */}
              <>
                <IconBrandDiscord size={18} />
              </>
            </ActionIcon>
            <ActionIcon
              className={classes.buttonContainer}
              // variant="filled"
              component="a"
              href="https://github.com/zenguardxyz/garden"
              title="github"
              target="_blank"
            >
              <>
                <IconBrandGithub size={18} />
              </>
              {/* <Image src={GitHub} height={18} width={18} /> */}
            </ActionIcon>

            <Group className={classes.container} position="center">
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
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </Group>
          </Group>
          </Box>
      {/* </div> */}
    </Header>
  );
};
