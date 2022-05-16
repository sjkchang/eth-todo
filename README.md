# TODO List DAPP
## Setup Guide
### 1-Install Required Software
##### Download Node JS and NPM
[Node.js and NPM](https://nodejs.org/)
After installing, Verify Nodejs and NPM install with the following commands
```sh
node -v
npm -v
```

##### Install Truffle
The truffle framework will be used to compile and migrate smart contracts. To install run the following command in terminal
```sh
npm install -g truffle
```
##### Install Ganache
[Ganache](https://trufflesuite.com/ganache/)

##### Install and Setup MetaMask browser extention
[MetaMask](https://metamask.io/download/)

### 2-Setup Required Software
###### 1- Open MetaMask. Select Create Wallet
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/metamask.jpg)

###### 2- Select I Agree
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/metamask-agree.jpg)

###### 3- Enter a Password
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/metamask-create-password.jpg)

###### 4- Open Ganache. Select Quickstart.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/ganache-quickstart.jpg)

###### 5- Click on the Top right key icon
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/ganache-addresses.jpg)

###### 6- Copy the Private Key
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/copy-private-key.jpg)

###### 7- Back in METAMASK Import an Account.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/metamask-import-account.jpg)

###### 8- Enter the Private Key you Copied in step 6.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/metamask-enter-private-key.jpg)

###### 9- Add a network
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/add-network.jpg)

###### 10- Fill form with the following and save.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/network.jpg)

##### Start project
###### 1- In project root directory run 
```sh
truffle compile
truffle migrate --reset
cd .. client
npm install
npm run start
```

###### 2- Open http://localhost:3000/
You will be prompted to select an account with metamax. Select the account you just imported.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/select-account-2.jpg)

Connect the account to http://localhost:3000/. Once you connect the TODO List DAPP should show up on the browser.
![alt text](https://github.com/sjkchang/eth-todo/blob/master/images/connect.jpg)