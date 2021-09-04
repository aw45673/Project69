import React from "react";
import { Text, View, TouchableOpacity, StyleSheet,Image,TextInput,KeyboardAvoidingView,ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
   constructor(){
       super();
       this.state={
           hasCameraPermissions: null,
           scanned: false,
           scannedData: '',
           buttonState: 'normal'
       }
   } 
   getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status==='granted',
            scanned:false,
            buttonState:'clicked'
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        const {buttonStatus}=this.state

       this.setState({
           scanned:true,
           scannedData:data,
           buttonState:'normal'
       })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonStatus;

        if(buttonState!=='normal' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){
            return (
                <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                   <View>
                        <Image 
                            source={require("../assets/scan.jpg")}
                            style={{width:200,height:200}}
                        />
                        <Text style={{textAlign:"center",fontSize:30}}>BarCode Scanner</Text>
                   </View>
                   <Text style={styles.displayText}>{ hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission" }</Text>
                    <TouchableOpacity
                        style={styles.scanButton}
                        title="Bar Code Scanner"
                        onPress={()=>{
                            this.getCameraPermissions
                        }}>
                        <Text Style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
        backgroundColor: '#66BB6A',
        width: 100,
        height: 50,
        borderWidth: 1.5 
    },
    submitButtonText:{
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    }
 });