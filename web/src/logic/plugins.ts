import { ZeroAddress, EventLog, BigNumberish, ethers } from "ethers";
import { BaseTransaction } from '@safe-global/safe-apps-sdk';
import { PluginMetadata, loadPluginMetadata } from "./metadata";
import { getManager, getPlugin, getRegistry } from "./protocol";
import { getSafeInfo, isConnectedToSafe, submitTxs } from "./safeapp";
import { isModuleEnabled, buildEnableModule, isGuardEnabled, buildEnableGuard } from "./safe";
import { getJsonRpcProvider, getProvider } from "./web3";
import WhitelistHook from "./WhitelistHook.json"

const SENTINEL_MODULES = "0x0000000000000000000000000000000000000001"


export interface PluginDetails {
    metadata: PluginMetadata,
    enabled?: boolean
}

export const loadPluginDetails = async(pluginAddress: string): Promise<PluginDetails> => {
    const plugin = await getPlugin(pluginAddress)
    const metadata = await loadPluginMetadata(plugin)
    console.log(metadata)
    if (!await isConnectedToSafe()) return { metadata }
    const enabled = await isPluginEnabled(pluginAddress) || await isHookEnabled(pluginAddress)
    return  { metadata, enabled }
}


export const loadPluginSettings = async(plugin: string): Promise<string[]> => {


    // Initialize the sdk with the address of the EAS Schema contract address
    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)
    const pluginSettings =  new ethers.Contract(
        plugin,
        WhitelistHook.abi,
        bProvider
    )
    const safeInfo = await getSafeInfo()

    const addedEvents = (await pluginSettings.queryFilter(pluginSettings.filters.AddressWhitelisted)) as EventLog[]


    console.log(addedEvents)    

    let addedAddresses = addedEvents.filter((event: EventLog) => event.args.safeAccount == safeInfo.safeAddress || event.args.safeAccount == ZeroAddress).map((event: EventLog)  => event.args.account)
    console.log(addedAddresses)

    const removedEvents = (await pluginSettings.queryFilter(pluginSettings.filters.AddressRemovedFromWhitelist)) as EventLog[]
    // const removedAddresses = removedEvents.map((event: EventLog) => event.args.account)
    const removedAddresses = removedEvents.filter((event: EventLog) => event.args.safeAccount == safeInfo.safeAddress || event.args.safeAccount == ZeroAddress).map((event: EventLog)  => event.args.account)

    console.log(removedAddresses)
    for(let i=0; i< removedAddresses.length; i++) {
        const index = addedAddresses.indexOf(removedAddresses[i])
        if (index !== -1) {
           addedAddresses.splice(index, 1);
       }   
     }
    return addedAddresses 
}

export const loadPlugins = async(filterFlagged: boolean = true): Promise<string[]> => {
    const registry = await getRegistry()
    const addedEvents = (await registry.queryFilter(registry.filters.IntegrationAdded)) as EventLog[]
    const addedIntegrations = addedEvents.map((event: EventLog) => event.args.integration)
    if (!filterFlagged) return addedIntegrations;
    const flaggedEvents = (await registry.queryFilter(registry.filters.IntegrationFlagged)) as EventLog[]
    const flaggedIntegrations = flaggedEvents.map((event: EventLog) => event.args.integration)
    return addedIntegrations.filter((integration) => flaggedIntegrations.indexOf(integration) < 0)
}


export const loadAttestation = async(integration: string): Promise<string> => {

    const registry = await getRegistry()
    const { attestationId }  = await registry.checkAttest(integration)
    return attestationId

}


export const isPluginEnabled = async(plugin: string) => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const safeInfo = await getSafeInfo()
    const pluginInfo = await manager.enabledPlugins(safeInfo.safeAddress, plugin)
    return pluginInfo.nextPluginPointer !== ZeroAddress
}

export const isHookEnabled = async(hook: string) => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const safeInfo = await getSafeInfo()
    const pluginInfo = await manager.getEnabledHooks(safeInfo.safeAddress)
    return pluginInfo == hook
}

export const loadEnabledPlugins = async(): Promise<string[]> => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const safeInfo = await getSafeInfo()
    const paginatedPlugins = await manager.getPluginsPaginated(SENTINEL_MODULES, 10, safeInfo.safeAddress)
    return paginatedPlugins.array
}

const buildAddToWhitelist = async(plugin: string, addresses: string[]): Promise<BaseTransaction> => {
    

    // Initialize the sdk with the address of the EAS Schema contract address
    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeInfo = await getSafeInfo()

    const pluginSettings =  new ethers.Contract(
        plugin,
        WhitelistHook.abi,
        bProvider
    )

    return {
        to: plugin,
        value: "0",
        data: (await pluginSettings.addToWhitelist.populateTransaction(addresses)).data
    }
} 

const buildRemoveFromWhitelist = async(plugin: string, addresses: string[]): Promise<BaseTransaction> => {
    

    // Initialize the sdk with the address of the EAS Schema contract address
    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeInfo = await getSafeInfo()

    const pluginSettings =  new ethers.Contract(
        plugin,
        WhitelistHook.abi,
        bProvider
    )

    return {
        to: plugin,
        value: "0",
        data: (await pluginSettings.removeFromWhitelist.populateTransaction(addresses)).data
    }
} 


const buildEnablePlugin = async(plugin: string, requiresRootAccess: boolean): Promise<BaseTransaction> => {
    const manager = await getManager()

    return {
        to: await manager.getAddress(),
        value: "0",
        data: (await manager.enablePlugin.populateTransaction(plugin, requiresRootAccess)).data
    }
} 

const buildSetHook = async(plugin: string): Promise<BaseTransaction> => {
    const manager = await getManager()
    return {
        to: await manager.getAddress(),
        value: "0",
        data: (await manager.setHooks.populateTransaction(plugin)).data
    }
} 

export const updatePlugin = async(plugin: string, addedAddresses: string[], removedAddresses: string[]) => {

    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")

    const info = await getSafeInfo()
    const txs: BaseTransaction[] = []


    txs.push(await buildAddToWhitelist(plugin, addedAddresses))
    txs.push(await buildRemoveFromWhitelist(plugin, removedAddresses))
    
    if (txs.length == 0) return
    await submitTxs(txs)
}


export const enablePlugin = async(plugin: string, requiresRootAccess: boolean) => {

    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const managerAddress = await manager.getAddress()
    const info = await getSafeInfo()
    const txs: BaseTransaction[] = []
   
    if (!await isModuleEnabled(info.safeAddress, managerAddress)) {
        txs.push(await buildEnableModule(info.safeAddress, managerAddress))
        txs.push(await buildEnableGuard(info.safeAddress, managerAddress))
    }
    if (!await isPluginEnabled(plugin)) {
        txs.push(await buildEnablePlugin(plugin, requiresRootAccess))
    }
    if (txs.length == 0) return
    await submitTxs(txs)
}

export const setHook = async(plugin: string, requiresRootAccess: boolean) => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const managerAddress = await manager.getAddress()
    const info = await getSafeInfo()
    const txs: BaseTransaction[] = []
    if (!await isModuleEnabled(info.safeAddress, managerAddress)) {
        txs.push(await buildEnableModule(info.safeAddress, managerAddress))
        txs.push(await buildEnableGuard(info.safeAddress, managerAddress))
    }
    if (!await isHookEnabled(plugin)) {
        txs.push(await buildSetHook(plugin))
    }
    if (txs.length == 0) return
    await submitTxs(txs)
}

const buildDisablePlugin = async(pointer: string, plugin: string): Promise<BaseTransaction> => {
    const manager = await getManager()
    return {
        to: await manager.getAddress(),
        value: "0",
        data: (await manager.disablePlugin.populateTransaction(pointer, plugin)).data
    }
} 

const buildDisableHook = async(): Promise<BaseTransaction> => {
    const manager = await getManager()
    return {
        to: await manager.getAddress(),
        value: "0",
        data: (await manager.setHooks.populateTransaction(ZeroAddress)).data
    }
} 


export const disablePlugin = async(plugin: string) => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")
    const manager = await getManager()
    const txs: BaseTransaction[] = []
    const enabledPlugins = await loadEnabledPlugins()
    const index = enabledPlugins.indexOf(plugin)
    // Plugin is not enabled
    if (index < 0) return
    // If the plugin is not the first element in the linked list use previous element as pointer
    // Otherwise use sentinel as pointer
    const pointer = index > 0 ? enabledPlugins[index - 1] : SENTINEL_MODULES;
    await submitTxs([await buildDisablePlugin(pointer, plugin)])
}

export const disableHook = async() => {
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")

    // If the plugin is not the first element in the linked list use previous element as pointer
    // Otherwise use sentinel as pointer
    await submitTxs([await buildDisableHook()])
}

