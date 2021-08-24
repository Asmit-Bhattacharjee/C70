import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from "expo-permissions"

export default class BookTransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedStudentId: '',
            scannedBookId: ''
        }
    }
    getCameraPermissions = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: id,
            scanned: false
        })
    }
    handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state
        if (buttonState === "BookId") {
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            })
        }
        else if (buttonState === "StudentId") {
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            })
        }

    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState !== "normal" && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if (buttonState === "normal") {
            return (
                <View style={styles.container}>
                    <View>
                        <Image source={require("../assets/booklogo.jpeg")}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>WILY</Text>
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Book ID"
                            value={this.state.scannedBookId}
                        />
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={()=>{this.getCameraPermissions("BookId")}}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Student ID"
                            value={this.state.scannedStudentId}
                        />
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={()=>{this.getCameraPermissions("StudentId")}}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanButton: {
        backgroundColor: 'red',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    inputView:{
        flexDirection:'row',
        margin:20,
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    }
})