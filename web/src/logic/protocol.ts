import { Interface, ethers, Signer } from "ethers"
import protocolDeployments from "@safe-global/safe-core-protocol"
import { getProvider, getJsonRpcProvider } from "./web3"
import { PROTOCOL_CHAIN_ID } from "./constants";
import { NetworkUtil } from "./networks";

// NetworkUtil.getNetworkById()

const Metadata_PROVIDER_ABI = [
    "function retrieveMetadata(bytes32 metadataHash) external view returns (bytes metadata)"
]

const PLUGIN_ABI = [
    "function metadataHash() public view returns (bytes32 metadataHash)",
    "function metadataProvider() external view returns (uint256 providerType, bytes location)"
]

export const getManager = async() => {
    const provider = await getProvider()
    console.log('asd')
    
    const registryInfo = protocolDeployments[PROTOCOL_CHAIN_ID][0].contracts.SafeProtocolManagerAttestation;
    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        provider
    )
}

export const getRegistry = async(signer?: Signer) => {

    const provider = await getProvider()
    const bProvider = await getJsonRpcProvider()
    const chainId =  (await provider.getNetwork()).chainId.toString()
    console.log(chainId)
    console.log(chainId as keyof typeof protocolDeployments)
    // chainId as keyof typeof protocolDeployments
    const registryInfo = protocolDeployments[chainId as keyof typeof protocolDeployments][0].contracts.SafeProtocolRegistryAttestation;

    console.log(registryInfo)

    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        signer ? signer : bProvider
    )
}

export const getPlugin = async(pluginAddress: string) => {
    const provider = await getProvider()
    console.log(new Interface(PLUGIN_ABI))
    return new ethers.Contract(
        pluginAddress,
        PLUGIN_ABI,
        provider
    )
}

export const getMetadataProvider = async(providerAddress: string) => {
    const provider = await getProvider()
    return new ethers.Contract(
        providerAddress,
        Metadata_PROVIDER_ABI,
        provider
    )
}