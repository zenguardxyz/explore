import { useCallback, useEffect, useState } from 'react';
import { Button, Center, Container, Input, Select, Stack } from "@mantine/core";
import './Plugins.css';
import { loadPluginDetails, loadPlugins, PluginDetails } from '../../logic/plugins';
import { Plugin } from './Plugin';
import { useStyles } from "./plugins.screen.styles";
import { GenericCard, Image, Title, VoucherCard } from "../../components";


const mockPlugins = ["1","2", "3"]

function PluginList() {

  const { classes } = useStyles();
  const [showFlagged, setFilterFlagged] = useState<boolean>(false);
  const [details, setDetails] = useState<PluginDetails[]>([])
  const [plugins, setPlugins] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setPlugins([])
      const plugins = await loadPlugins(!showFlagged)
      let newDetails: any = []
      setPlugins(plugins)
      for(let i=0; i< plugins.length; i++) 
      {
         newDetails.push({... {module: plugins[i].integration} , ...await loadPluginDetails(plugins[i].integration)})
         setDetails(newDetails)
      }

      
    } catch (e) {
      console.warn(e)
    }
  }, [showFlagged])

  console.log(details)
  
  useEffect(() => {
      fetchData();
  }, [fetchData])

  const handleSearchPlugin = (searchString: string) => {

    setPlugins(details.filter((plugin: any) => plugin.metadata.name.toLowerCase().includes(searchString.toLowerCase())))
  }


  return (
    // <div className="Plugins">
    //   {/* <span>
    //     <FormControlLabel control={
    //       <Checkbox checked={showFlagged} onChange={(_, checked) => setFilterFlagged(checked) } inputProps={{ 'aria-label': 'controlled' }} />
    //     } label="Show Flagged PlugIns" />
    //     <Button onClick={fetchData}>Reload</Button>
    //   </span> */}
    //   <div className='Plugins-list'>
        
    //   </div>
    // </div>
    <Container>
    <Container className={classes.voucherScreenContainer}>
              <Container
          sx={{
            padding: 0,
            // marginTop: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            Explore Modules
          </h2>
          <Button color='green' variant='filled' onClick={()=> window.open("https://dashboard.zenguard.xyz")}>
            Submit Module
          </Button>
        </Container>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            variant='filled'
            placeholder='Search Modules'
            type='text'
            sx={{ width: '100%'}}
            onChange={(event: any)=>{ handleSearchPlugin(event.target.value) }}
            
          />
          <div>
            <Select
              // label='Sort By'
              variant='filled'
              placeholder='Pick value'
              data={['Show All', 'Only Enabled']}
              defaultValue='Show All'
              clearable
            />
          </div>
        </div>
      <div className={classes.actionsContainer}>
      {plugins.map((plugin) => 
        <Plugin
        address={plugin.integration}
        publisher={plugin.publisher}
        pluginDetails={plugin.metadata? {enabled: plugin.enabled, metadata: plugin.metadata}: null}
      />)}
      { !plugins.length && mockPlugins.map((plugin) => 
        <Plugin
        publisher={plugin}
        address={plugin}
      />)}
      </div>

    </Container>
  </Container>
  );
}


export default PluginList;
