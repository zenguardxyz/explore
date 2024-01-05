import { Box, Center, Container, Group, Loader, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar, Chip } from "@mantine/core";
import { useStyles } from "./plugin-details.screen.styles";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconAt, IconCheck, IconCopy, IconPlugConnected, IconCheckbox, IconWallet, IconSettings, IconPlaylistAdd, IconPlus, IconCross, IconApps, IconMinus, IconEraser } from "@tabler/icons";
import { BackButton, ProgressStatus, Title } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { disableHook, disablePlugin, enablePlugin, loadPluginSettings, setHook, updatePlugin } from "../../logic/plugins";
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
  const [attestModal, setAttestModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [pluginSettings, setPluginSettings ] = useState(false);
  const [whitelistedAddresses, setWhitelistedAddresses ]: any = useState([]);
  const [whitelistAddress, setWhitelistAddress ]: any = useState();
  const [addedAddresses, setAddedAddresses ]: any = useState([]);
  const [removedAddresses, setRemovedAddresses ]: any = useState([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enabling, setEnabling] = useState(false);
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
        setAttested(await isValidAttestation(attestionId))

        const attestation = await loadAttestationDetails(attestionId);

        console.log(attestation)

        setAttestation(attestation);
        setAttestationData(await loadAttestationData(attestation.data))
    
      }
      catch(e)
      {
        setAttestation({})
        console.log(e)
      }
      
  })()   
  }, [])

  const handleToggle = useCallback(async () => {

    console.log(pluginDetails)
    if (pluginDetails?.enabled === undefined) return
    setEnabling(true);
    try {
        if (pluginDetails.enabled) 
        {
          if (pluginDetails.metadata.hook) 
            await disableHook()
          else
            await disablePlugin(pluginDetails.address)
        }
        else {
            if (pluginDetails.metadata.hook) 
            await setHook(pluginDetails.address, pluginDetails.metadata.requiresRootAccess)
           else 
            await enablePlugin(pluginDetails.address, pluginDetails.metadata.requiresRootAccess)
        }
        setEnabling(false);
    } catch (e) {
      setEnabling(false);
        console.warn(e)
    }
}, [pluginDetails])

console.log(addedAddresses)
console.log(removedAddresses)

const addAddress = async (address: string) => {

  if(address && !addedAddresses.includes(address) && !whitelistedAddresses.includes(address)) {
  setAddedAddresses([...addedAddresses, address])
  }

  if(removedAddresses.includes(address)) {
    let newSet = new Set(removedAddresses)
    newSet.delete(address)
    setRemovedAddresses(Array.from(newSet))
    }
}

const removeAddress = async (address: string) => {

  if(!removedAddresses.includes(address) && whitelistedAddresses.includes(address)) {
  setRemovedAddresses([...removedAddresses, address])
  }

  if(addedAddresses.includes(address)) {
    let newSet = new Set(addedAddresses)
    newSet.delete(address)
    setAddedAddresses(Array.from(newSet))
    }



}

const handleAddAttestation = async () => {

  setAttestModal(false);
  setCreating(true);
  const attestationId = await createAttestation([docLink, rating]);
  const attestation = await loadAttestationDetails(attestationId);

  console.log(attestation)

  setAttestation(attestation);
  setAttested(true);
  setCreating(false);
  setLoading(true);
  await attestIntegration(pluginDetails.address, attestationId)
  setLoading(false);
  
  
}

  return (
    <Paper  className={classes.settingsContainer}>
    <Container className={classes.formContainer}>
    {/* <Container className={classes.box}> */}
    <LoaderModal loading={creating} text={"Creating audit attestation"} />
    <LoaderModal loading={loading} text={"Attesting the Plugin"} />
    <Modal
      centered
      opened={settingsModal}
      onClose={() => setSettingsModal(false)}
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
      size={600}
    >
      <Box sx={{ padding: "30px" }}>
      <Title> Plugin Settings</Title>
  
      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Group>
          
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              
              // alignItems: "center",
              marginLeft: "10px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
               <Stack>
        <Group >
             <TextInput
              onChange={(event) => setWhitelistAddress(event.currentTarget.value)}
              placeholder="Address"
              label="Whitelist Address"
              size="md"
            />

          <Button
          // className={classes.button}
          size="md"
          variant="default"
          leftIcon={<IconPlus />} 
          onClick={ () => {  addAddress(whitelistAddress);}}
          sx={{
            display: "flex",
            flexDirection: "column",
            
            // alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          Add
        </Button>
        
        </Group>
        </Stack>
            
            <Text mt={"lg"} > Whitelisted Addresses
            </Text>

         

            { !pluginSettings && <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={30} mt={6}  radius="xl"  width="100%" />
        </Group>   
         }
            <Container 
            sx={{

              marginTop: "10px",
              justifyContent: "center",
            }}>

      

             
            { 
            pluginSettings && whitelistedAddresses.concat(addedAddresses).map((address: string) => (<Chip 
              sx={{
                // alignItems: "center",
                marginTop: "15px",
                justifyContent: "center",
              }}
              onChange={(checked) => { if(checked) addAddress(address); else removeAddress(address);}}
              defaultChecked color="green" variant="outline" radius="md">{address}</Chip> )) 
            
            }
            </Container>

            <Button
          // className={classes.button}
          variant="default"
          leftIcon={<IconCheckbox />} 
          onClick={async () => {await updatePlugin(pluginDetails.address, addedAddresses, removedAddresses); }}
          sx={{
            display: "flex",
            flexDirection: "column",
            
            // alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          Save Settings
        </Button>

            
          </Container>
        </Group>
        </Paper>
      </Box>
    </Modal>
    <Modal
      centered
      opened={attestModal}
      onClose={() => setAttestModal(false)}
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
      size={600}
    >
      <Box sx={{ padding: "30px" }}>
      <Title> Audit attestation details</Title>
  
      <Paper  withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Group>
          
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              
              // alignItems: "center",
              marginLeft: "10px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
             <TextInput
              onChange={(event) => setDocLink(event.currentTarget.value)}
              placeholder="Audit proof doc link"
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
          sx={{
            display: "flex",
            flexDirection: "column",
            
            // alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          Add Attestation
        </Button>

            
          </Container>
        </Group>
        </Paper>
      </Box>
    </Modal>
    {/* <Paper className={classes.formContainer} withBorder> */}
      {/* <BackButton label="Back to Previous" onClick={backButtonHandler} /> */}
      <Group mb={30}>
        <Title>Plugin Details</Title>
      </Group>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Group align='flex-start'>
        <Group
        >     
        <Image src={ pluginDetails.metadata?.iconUrl ? pluginDetails.metadata?.iconUrl : Safe } width={60}  />   
        <Stack>           
        <Text size="md" weight={600}>
        {pluginDetails.metadata?.name}
        </Text>{" "}

        <Text size="sm" weight={600}>
              ⚙️ Version: {pluginDetails.metadata?.version}
        </Text>{" "}
        </Stack>
        </Group>  
         <Group style={{  marginLeft: 'auto' }} >
         


            <Button
                // loading={registering}
                onClick={() => { handleToggle() }}
                leftIcon={pluginDetails.enabled ? <IconEraser /> : <IconPlus />} 
                radius="md"
                loading={enabling}
                color={ pluginDetails.enabled ? "red" : "dark" }
                variant={ pluginDetails.enabled ? "outline" : "filled" }
                style={{
                  background:
                  pluginDetails.enabled ? "": "#81af6f" ,
                }}
              >
               { pluginDetails.enabled ? "Disable" : "Enable" }
              </Button>

              { pluginDetails.metadata?.hook && <Button
                // loading={registering}
                onClick={async () => { setSettingsModal(true); setPluginSettings(false); setWhitelistedAddresses(await loadPluginSettings(pluginDetails.address)); setPluginSettings(true);}}
                leftIcon={<IconSettings />} 
                color={ "gray" }
                variant={ "outline" }
                radius="md"
              >
                Settings
              </Button>
              }

           <Button style={{  marginLeft: 'auto' }}
                      // loading={registering}
                      onClick={() => { window.location =pluginDetails.metadata.appUrl }}
                      leftIcon={<IconApps />} 
                      variant="outline"
                      radius="md"
                      color='gray'
                      // sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[1]}}
                    >
                    OPEN APP
                </Button>





              </Group>

            </Group>


          </Paper>

          <Paper withBorder radius="md" p="xl" style={{
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
          {
            !attested && <Paper >
            <Alert ref={ref} icon={<IconAlertCircle size="10rem" />}  title="Unaudited plugin" color="red" >
               The plugin has not been audited yet.
            </Alert> 
            </Paper>
          } 
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
                   
        <Avatar size={60}  src= {loadAttester(attestation.attester)?.logo} alt="attester image" /> 
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
        </>

          </>
          }

          <Group >  

          {  ! attested && <Button
          // className={classes.button}
          variant="default"
          leftIcon={<IconCheckbox />} 
          onClick={() => { setAttestModal(true) }}
        >
          Add Audit Attestation
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
