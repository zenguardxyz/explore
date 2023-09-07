import { Box, Center, Container, Group, Loader, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar } from "@mantine/core";
import { useStyles } from "./plugin-details.screen.styles";
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
import { getProvider } from "../../logic/web3";
import { NetworkUtil } from "../../logic/networks";
import { PROTOCOL_CHAIN_ID } from "../../logic/constants"



export const PluginDetailsScreen = () => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const navigate = useNavigate();


  const [attested, setAttested] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docLink, setDocLink] = useState('');
  const [rating, setRating] = useState(5);
  const [attestation, setAttestation ]: any = useState();
  const [attestationData, setAttestationData ]: any = useState();
  const [chainId, setChainId]: any = useState(PROTOCOL_CHAIN_ID);

 
  const { pluginDetails } = usePluginStore(
    (state: any) => state
  );


  useEffect(() => {

    ;(async () => {

      if( !pluginDetails.address) {

        navigate(RoutePath.plugins)

      }

     
      try {

        const provider =  await getProvider()
        const chainId =  (await provider.getNetwork()).chainId
        setChainId(chainId)
        const attestionId = await loadAttestation(pluginDetails.address)
        console.log(attestionId)
        setAttested(await isValidAttestation(attestionId))

        const attestation = await loadAttestationDetails(attestionId);

        console.log(attestation)

        setAttestation(attestation);
        setAttestationData(loadAttestationData(attestation.data))
    
      }
      catch(e)
      {
        setAttestation({})
        console.log(e)
      }
      
  })()   
  }, [])

  const handleToggle = useCallback(async () => {

    if (pluginDetails?.enabled === undefined) return
    try {
        if (pluginDetails.enabled)
            await disablePlugin(pluginDetails.address)
        else 
            await enablePlugin(pluginDetails.address, pluginDetails.metadata.requiresRootAccess)
    } catch (e) {
        console.warn(e)
    }
}, [pluginDetails])

const handleAddAttestation = async () => {

  setCreating(true);
  const attestation = await createAttestation([docLink, rating])
  setCreating(false);
  setLoading(true);
  await attestIntegration(pluginDetails.address, attestation )
  setLoading(false);
  
  
}

  return (
    <Paper withBorder className={classes.settingsContainer}>
    <Container className={classes.formContainer}>
    {/* <Container className={classes.box}> */}
    <LoaderModal loading={loading} text={"Attesting the Plugin"} />
    <Modal
      centered
      opened={creating}
      onClose={() => setCreating(false)}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      withCloseButton={false}
      // overlayOpacity={0.5}
      size={320}
    >
      <Box sx={{ padding: "20px" }}>
        <Group>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              
              // alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
             <TextInput
              onChange={(event) => setDocLink(event.currentTarget.value)}
              placeholder="Your name"
              label="Document link"
              size="md"
            />
            
            <Text mt={"lg"} > Audit Rating
            </Text>

            <Rating sx={{ paddingBottom: "20px" }} onChange={setRating} defaultValue={rating} count={10}/>

            <Button
          // className={classes.button}
          variant="default"
          leftIcon={<IconCheckbox />} 
          onClick={() => { handleAddAttestation()}}
        >
          Add Attestation
        </Button>

            
          </Container>
        </Group>
      </Box>
    </Modal>
    {/* <Paper className={classes.formContainer} withBorder> */}
      {/* <BackButton label="Back to Previous" onClick={backButtonHandler} /> */}
      <Group mb={30}>
        <Title>Plugin Details</Title>
      </Group>

      <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Stack>
        <Group
        >     
        <Image src={ pluginDetails.metadata?.iconUrl } width={60}  />   
        <Stack>           
        <Text size="md" weight={600}>
        {pluginDetails.metadata?.name}
        </Text>{" "}

        <Text size="sm" weight={600}>
              ⚙️ Version: {pluginDetails.metadata?.version}
        </Text>{" "}
        </Stack>
        </Group>  
       <Group >
         


            <Button
                // loading={registering}
                onClick={() => { handleToggle() }}
                leftIcon={<IconPlugConnected />} 
                color={ pluginDetails.enabled ? "red" : "dark" }
                variant={ pluginDetails.enabled ? "outline" : "filled" }
                style={{
                  background:
                  pluginDetails.enabled ? "": "#81af6f" ,
                }}
              >
               { pluginDetails.enabled ? "Disable Plugin" : "Enable Plugin" }
              </Button>


              </Group>

              </Stack>


          </Paper>

          <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }} >

          <Stack>
          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Audit details 🛡️
            </Text>{" "}

          </Group> 

        {!attestation ?
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
          { attested && <> 
            <Paper >
          <Alert ref={ref} className={classes.alert} onClick={()=>{window.open(NetworkUtil.getNetworkById(Number(chainId))?.easExplorer + attestation.uid)}} icon={<IconCheck size="10rem" />}  title="Verified plugin" color="green" >
             The plugin has been audited and attested. Click here to know more on EAS.
          </Alert> 
          </Paper>


        <> 
        <Text style={{
                    marginTop: 20
                  }} size="md" weight={600}>
              Audited by
            </Text>{" "}
            <Divider />
        <Group>   
                   
        <Avatar size={60}  src= {loadAttester(attestation.attester).logo} alt="attester image" /> 
        <Stack>           
        <Text className={classes.link} size="md" weight={600} onClick={()=>{ window.open(loadAttester(attestation.attester).link) }}>
        {loadAttester(attestation.attester).name}
        </Text>

        <Text  className={classes.link} size="sm" opacity={0.65} onClick={()=>{ window.open(`https://etherscan.io/address/${attestation.attester}`) }} >
              {attestation.attester}
        </Text>{" "}
        </Stack>
        </Group>    
        <Divider />

   
        <Text size="m" weight={600} className={classes.link} onClick={()=>{ window.open(attestationData ? attestationData[0].value.value : "") }} >
        🔗  Document Link
        </Text>{" "}
        

        <Group >  
        <Text size="m" weight={600}>
        🛡️ Audit Rating 
        </Text>{" "}     
        <Rating readOnly value={attestationData ? parseInt(attestationData[1].value.value) : 0} count={10}/>
        </Group>
        <Divider />
        </>

          </>
          }

          <Group >  

          {  ! attested && <Button
          // className={classes.button}
          variant="default"
          leftIcon={<IconCheckbox />} 
          onClick={() => { setCreating(true) }}
        >
          Add Attestation
        </Button>
        }
        </Group >
        </>
        }


          </Stack>
          </Paper>


  
   



  </Container>
  </Paper>
  );
};
