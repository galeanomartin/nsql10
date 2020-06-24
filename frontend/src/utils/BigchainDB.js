const driver = require('bigchaindb-driver')
const API_PATH = 'https://test.ipdb.io/api/v1/'
const conn = new driver.Connection(API_PATH)

/**
 * 
 * @param {Ed25519Keypair} ownerBeforeKeypair
 * @param {Ed25519Keypair} ownerAfterKeypair
 * @param {Object} myAsset 
 * @param {BigInteger} amount 
 */
async function transferAsset(ownerBeforeKeypair, ownerAfterKeypair, myAsset, amount) {
    try {
        const txTransaction = await conn.getTransaction(myAsset.transaction_id)
        var txTransfer;

        if (myAsset.amount === `${amount}`) {
            
            txTransfer = driver.Transaction.makeTransferTransaction(
                [{ tx: txTransaction, output_index: myAsset.output_index }],
                [
                    driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(ownerAfterKeypair.publicKey), `${amount}`)
                ],
                null,
            )
    
        } else {
            txTransfer = driver.Transaction.makeTransferTransaction(
                [{ tx: txTransaction, output_index: myAsset.output_index }],
                [
                    driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(ownerAfterKeypair.publicKey), `${amount}`),
                    driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(ownerBeforeKeypair.publicKey), `${myAsset.amount - amount}`)
                ],
                null,
            )
        }
        
        let txTransferSigned = driver.Transaction.signTransaction(txTransfer, ownerBeforeKeypair.privateKey)
        return await conn.postTransactionCommit(txTransferSigned)
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {Ed25519Keypair} ownerKeypair 
 * @param {String} flag Representa el tipo de Activo
 */
async function getMyAssets(ownerKeypair, flag=null){
    try {
        const ownerOutputs = await conn.listOutputs(ownerKeypair.publicKey, false)
        const myAssets = []
        var i;
        var asset
        
        if (flag) {
            for (i = 0; i < ownerOutputs.length; i++) {
                const transaction = await conn.getTransaction(ownerOutputs[i].transaction_id)

                transaction.operation === 'CREATE' 
                    ? asset = transaction.asset.data
                    : asset = (await conn.searchAssets(transaction.asset.id))[0].data

                if (asset.type === flag) {
                    const myAsset = {
                        asset: asset,
                        transaction_id: ownerOutputs[i].transaction_id,
                        output_index: ownerOutputs[i].output_index,
                        amount: transaction.outputs[ownerOutputs[i].output_index].amount
                    }
                    myAssets.push(myAsset)
                }
            }
        } else {
            for (i = 0; i < ownerOutputs.length; i++) {
                const transaction = await conn.getTransaction(ownerOutputs[i].transaction_id)

                transaction.operation === 'CREATE' 
                    ? asset = transaction.asset.data 
                    : asset = (await conn.searchAssets(transaction.asset.id))[0].data

                const myAsset = {
                    asset: asset,
                    transaction_id: ownerOutputs[i].transaction_id,
                    output_index: ownerOutputs[i].output_index,
                    amount: transaction.outputs[ownerOutputs[i].output_index].amount
                }
                myAssets.push(myAsset)
            }
        }
        return myAssets
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {Ed25519Keypair} ownerKeypair 
 */
async function groupCredits(ownerKeypair) {
    try {
        const myAssets = await getMyAssets(ownerKeypair, "credit")
        var amountCredits = 0
        var i;
        for (i = 0; i < myAssets.length; i++) amountCredits = amountCredits + parseInt(myAssets[i].amount)

        return myAssets.length === 0 ? 0 : amountCredits
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {Ed25519Keypair} buyerKeypair 
 * @param {Ed25519Keypair} sellerKeypair 
 * @param {Object} asset Activo que se desea comprar
 */
async function buyAsset(buyerKeypair, sellerKeypair, asset) {
    try {
        // Obtener transacciones validas del Comprador
        const buyerAssets = await getMyAssets(buyerKeypair, "credit")
        const buyerAmountCredits = parseInt(await groupCredits(buyerKeypair))
        var assetPrice = parseInt(asset.asset.price)

        if (buyerAmountCredits >= assetPrice) {
            var i;
            for (i = 0; i < buyerAssets.length; i++) {
                
                if (buyerAssets[i].amount < assetPrice){
                    await transferAsset(buyerKeypair, sellerKeypair, buyerAssets[i], buyerAssets[i].amount)
                    assetPrice = assetPrice - buyerAssets[i].amount
                } else {
                    await transferAsset(buyerKeypair, sellerKeypair, buyerAssets[i], assetPrice)
                    break
                }
            }
            return await transferAsset(sellerKeypair, buyerKeypair, asset, 1)
        } else {
            console.log('No hay dinero suficiente')
        }

    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {Ed25519Keypair} ownerKeypair 
 * @param {Ed25519Keypair} assetData 
 * @param {BigInteger} amount Cantidad de activos (divisible)
 */
async function createAsset(ownerKeypair, assetData, amount) {
    try {
       const txCreateSimple = driver.Transaction.makeCreateTransaction(
            assetData,
            null,
            [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(ownerKeypair.publicKey), `${amount}`)
            ],
            ownerKeypair.publicKey
        )

        const txCreateSimpleSigned = driver.Transaction.signTransaction(txCreateSimple, ownerKeypair.privateKey)
           
        return await conn.postTransactionCommit(txCreateSimpleSigned)
 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    transferAsset: transferAsset,
    getMyAssets: getMyAssets,
    groupCredits: groupCredits,
    buyAsset: buyAsset,
    createAsset: createAsset
}