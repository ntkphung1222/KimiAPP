// import { render } from 'react-dom';
// import { Platform, DeviceEventEmitter,NativeModules, NativeEventEmitter,Text, TouchableOpacity} from 'react-native';
// import RNMomosdk from 'react-native-momosdk';

// class Momo extends React.Component {
//     state = {
//         
//       };
// componentDidMount(){
//     EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
//         try{
//             console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
//               if (response && response.status == 0) {
//                 //SUCCESS: continue to submit momoToken,phonenumber to server
//                 let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
//                 let momoToken = response.data;
//                 let phonenumber = response.phonenumber;
//                 let message = response.message;
//                 let orderId = response.refOrderId;
//               } else {
//                 //let message = response.message;
//                 //Has Error: show message here
//               }
//         }catch(ex){}
//     });
//     //OPTIONAL
//     EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState',(response) => {
//         console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
//         // status = 1: Parameters valid & ready to open MoMo app.
//         // status = 2: canOpenURL failed for URL MoMo app 
//         // status = 3: Parameters invalid
//     })
// }

//     // TODO: Action to Request Payment MoMo App
//     onPress = async () => {
//         let jsonData = {};
//         jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
//         jsonData.action = "gettoken"; //DO NOT EDIT
//         jsonData.merchantname = merchantname; //edit your merchantname here
//         jsonData.merchantcode = merchantcode; //edit your merchantcode here
//         jsonData.merchantnamelabel = merchantNameLabel;
//         jsonData.description = billdescription;
//         jsonData.amount = 5000;//order total amount
//         jsonData.orderId = "ID20181123192300";
//         jsonData.orderLabel = "Ma don hang";
//         jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
//         console.log("data_request_payment " + JSON.stringify(jsonData));
//         if (Platform.OS === 'android'){
//         let dataPayment = await RNMomosdk.requestPayment(jsonData);
//         this.momoHandleResponse(dataPayment);
//         }else{
//         RNMomosdk.requestPayment(jsonData);
//         }
//     }

//     async function momoHandleResponse(response){
//     try{
//         if (response && response.status == 0) {
//         //SUCCESS continue to submit momoToken,phonenumber to server
//         let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
//         let momoToken = response.data;
//         let phonenumber = response.phonenumber;
//         let message = response.message;
// z
//         } else {
//         //let message = response.message;
//         //Has Error: show message here
//         }
//     }catch(ex){}
//     };
//     render() {
//             const RNMomosdkModule = NativeModules.RNMomosdk;
//             const EventEmitter = new NativeEventEmitter(RNMomosdkModule);

//             const merchantname = "CGV Cinemas";
//             const merchantcode = "CGV01";
//             const merchantNameLabel = "Nhà cung cấp";
//             const billdescription = "Fast and Furious 8";
//             const amount = 50000;
//             const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
//         return (
//             <TouchableOpacity onPress={() => onPress()}><Text>Thanh toán</Text></TouchableOpacity>
//         );
//     }   
// }

// export default Momo;
