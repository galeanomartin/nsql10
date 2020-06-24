const { createAsset, transferAsset, getMyAssets} = require('./utils/BigchainDB')
const driver = require('bigchaindb-driver')

const assets = [[
        {type: "weapon", name: 'E-5 BLASTER RIFLE', price: '1200'},
        {type: "weapon", name: 'E-11 BLASTER RIFLE', price: '1500'},
        {type: "weapon", name: 'ELECTROSTAFF', price: '1500'},
        {type: "weapon", name: 'EE-3 CARBINE RIFLE', price: '1200'},
        {type: "weapon", name: 'THERMAL DETONATOR', price: '900'},
        {type: "weapon", name: 'Z6 ROTARY BLASTER CANNON', price: '1200'},
        {type: "weapon", name: 'DL-44 BLASTER', price: '700'},
        {type: "weapon", name: 'Z6 RIOT CONTROL BATON', price: '900'},
        {type: "weapon", name: '35c REPEATING CANNON', price: '700'},
        {type: "weapon", name: 'WOOKIE BOWCASTER', price: '1700'},
        {type: "weapon", name: 'LIGHTSABER', price: '2000'},
        {type: "weapon", name: 'EZRA’S LIGHTSABER', price: '2500'},
    ],
    [
        {type: "credit", name: 'imperial', price: '1'},
    ]
]

const DarthVader = {name: 'Darth Vader', keys: new driver.Ed25519Keypair()}
const BobaFett = {name: 'Boba Fett', keys: new driver.Ed25519Keypair()}
const Greedo = {name: 'Greedo', keys: new driver.Ed25519Keypair()}
const DinDjarin = {name: 'Din Djarin', keys: new driver.Ed25519Keypair()}


const transferDefaultAssetsToAdmin = async owner => {
    try {
        var i
        for (i = 0; i < assets.length; i++) {
            var j
            for (j = 0; j < assets[i].length; j++) {
                
                const item = assets[i][j];
                item.type === 'weapon' 
                ? await createAsset(owner.keys, item, 100)
                : await createAsset(owner.keys, item, 100000)
            }
        }
        return owner
    } catch (error) {
      console.log(error)
    }
};

const transferDefaultAssetsAdminToBountyHunter = async (ownerBefore, ownerAfter, amount) => {
    try{

        const ownerBeforeCredits = await getMyAssets(ownerBefore.keys, 'credit')
        const ownerBeforeCredit = ownerBeforeCredits[0]
        await transferAsset(ownerBefore.keys, ownerAfter.keys, ownerBeforeCredit, amount)

    } catch (error) {
        console.log(error)
    }
}

const saveCurrentUserDefault = currentUser => localStorage.setItem('currentUser', JSON.stringify(currentUser))
const saveUsers = users => localStorage.setItem('users', JSON.stringify(users))

const initApp = () => 
    localStorage.length === 0 
    ?
        saveCurrentUserDefault(DarthVader)
        & saveUsers([DarthVader, BobaFett, Greedo, DinDjarin])
        & transferDefaultAssetsToAdmin(DarthVader)
            .then(() => transferDefaultAssetsAdminToBountyHunter(DarthVader, BobaFett, 5000))
            .then(() => transferDefaultAssetsAdminToBountyHunter(DarthVader, Greedo, 3000))
            .then(() => transferDefaultAssetsAdminToBountyHunter(DarthVader, DinDjarin, 8000))

    : null

module.exports = {
    initApp: initApp
}