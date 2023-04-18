import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text
            style={{padding: 10}}
        >Username</Text>
        <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChange={text => setUsername(text)}
        ></TextInput>    
        <Text
            style={{padding: 10}}
        >Password</Text>
        <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChange={text => setPassword(text)}
            secureTextEntry={true}
        ></TextInput>
        <Text
            style={{padding: 10}}
        >Confirm Password</Text>
        <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChange={text => setPasswordConfirm(text)}
            secureTextEntry={true}
        ></TextInput>
        <Button color="crimson" title="Signup" onPress={() => props.handleSignup(username, password)} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerRegisterScreen;