import { Box, Center, Container, Group, Loader, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar } from "@mantine/core";
import { useStyles } from "./account-details.screen.styles";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconAt, IconCheck, IconCopy, IconPlugConnected, IconCheckbox, IconWallet } from "@tabler/icons";
import { BackButton, ProgressStatus, Title } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { disablePlugin, enablePlugin } from "../../logic/plugins";
import { attestIntegration, isValidAttestation, createAttestation, loadAttestation, loadAttestationDetails, loadAttestationData, loadAttester } from "../../logic/attestation";
import { LoaderModal } from "../../components/modals/loader.component";
import { useHover } from "@mantine/hooks";
import Safe from "../../assets/icons/safe.png";

import { EAS_EXPLORER } from "../../logic/constants";
import { RoutePath } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";



export const AccountDetailsScreen = () => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const navigate = useNavigate();


  const [attested, setAttested] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docLink, setDocLink] = useState('');
  const [rating, setRating] = useState(5);
  const [address, setAddress ]: any = useState();
  const [attestationData, setAttestationData ]: any = useState();

  console.log(address)
 
  const { pluginDetails } = usePluginStore(
    (state: any) => state
  );


  useEffect(() => {

    ;(async () => {

      const provider =  new ethers.BrowserProvider(window.ethereum)
      setAddress((await provider.getSigner()).address)

  })()   
  }, [])

  return (
    <Paper withBorder className={classes.settingsContainer}>
    <Container className={classes.formContainer}>


      <Group mb={30}>
        <Title>User Info</Title>
      </Group>
      <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }} >

          <Stack>
          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Account details 🏦
            </Text>{" "}

          </Group> 

        {!address ?
        <>
          <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <Skeleton height={80} mt={6} radius="lg"  width="100%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6}  radius="xl"  width="100%" />
        </Group>  
        </>
        :
        <>

        <Group>   
                   
        <Avatar size={60}  src= {loadAttester(address)?.logo} alt="attester image" /> 
        <Stack>           
        <Text className={classes.link} size="md" weight={600} onClick={()=>{ window.open(loadAttester(address)?.link) }}>
        {loadAttester(address)?.name}
        </Text>

        <Text  className={classes.link} size="sm" opacity={0.65} onClick={()=>{ window.open(`https://etherscan.io/address/${address}`) }} >
              {address}
        </Text>{" "}
        </Stack>
        </Group>    
        <Divider />
        

        <Group >  
        <Text size="m" weight={600}>
        🛡️ Trust Score 
        </Text>{" "}     
        <Rating readOnly value={loadAttester(address)?.trust} count={10}/>
        </Group>
        <Divider />
          
        </>
        }


          </Stack>
          </Paper>


  
   



  </Container>
  </Paper>
  );
};
