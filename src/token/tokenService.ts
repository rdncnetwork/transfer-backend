import { ethers } from 'ethers'
import { config } from '../config/config'
import { communityAbi } from '../constants/community'

const tokenTransferService = async (amount: string, recipient: string) => {
    try {
        console.log("🚀 ~ tokenTransferService ~ config.providerUrl:", config.providerUrl)
        // Connect to the network
        const provider = new ethers.JsonRpcProvider(config.providerUrl)
        
        console.log('🚀 ~ provider:', provider)
        if (!provider) throw new Error('No provider found')

        // Check if contract address is valid

        // Create a wallet instance
        const wallet = new ethers.Wallet(config.privateKey, provider)
        console.log('🚀 ~ wallet:', wallet)

        const contract = new ethers.Contract(
            config.contractAddress,
            communityAbi,
            wallet
        )

        // Convert amount to proper units (assuming 18 decimals)
        const decimals = 18
        const parsedAmount = ethers.parseUnits(amount, decimals)
        console.log('🚀 ~ parsedAmount:', parsedAmount)

        // Send the transaction
        const tx = await contract.withdrawTokens(recipient, parsedAmount)
        console.log('🚀 ~ tx:', tx)

        // Wait for transaction confirmation
        await tx.wait(3)

        console.log(`Transaction successful: ${tx.hash}`)
        return tx.hash
    } catch (error) {
        console.error('Transfer failed', error)
        throw error
    }
}

export { tokenTransferService }
