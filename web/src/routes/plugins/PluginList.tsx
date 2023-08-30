import { useCallback, useEffect, useState } from 'react';
import { Button, Center, Container, Stack } from "@mantine/core";
import './Plugins.css';
import { loadPlugins } from '../../logic/plugins';
import { Plugin } from './Plugin';
import { useStyles } from "./plugins.screen.styles";
import { GenericCard, Image, Title, VoucherCard } from "../../components";


const mockPlugins = ["1","2"]

function PluginList() {

  const { classes } = useStyles();
  const [showFlagged, setFilterFlagged] = useState<boolean>(false);
  const [plugins, setPlugins] = useState<string[]>([]);
  console.log(plugins)
  const fetchData = useCallback(async () => {
    try {
      setPlugins([])
      setPlugins(await loadPlugins(!showFlagged))
    } catch(e) {
      console.warn(e)
    }
  }, [showFlagged])

  
  useEffect(() => {
      fetchData();
  }, [fetchData])
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
      <Container sx={{ padding: 0, marginTop: "42px" }}>
        <Title text="Available Plugins" />
      </Container>
      <div className={classes.actionsContainer}>
      {plugins.map((plugin) => 
        <Plugin
        address={plugin}
      />)}
      { !plugins.length && mockPlugins.map((plugin) => 
        <Plugin
        address={plugin}
      />)}
      </div>

    </Container>
  </Container>
  );
}


export default PluginList;
