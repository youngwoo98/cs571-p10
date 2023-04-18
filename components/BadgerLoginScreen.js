import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [incorrect, setIncorrect] = useState(false);


    function getValue(){
        SecureStore.getItemAsync("username").then((value) => {
            setUsername(value);
        });
    }


    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text
            style={{padding: 10}}
        >Username</Text>
        <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setUsername(text)}
        />
        <Text
            style={{padding: 10}}
        >Password</Text>
        <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
        />
        {
            incorrect ?
            <Text style={{color: "red", padding: 10}}>Incorrect username or password!</Text>
            :
            <></>
        }
        <Button color="crimson" title="Login" onPress={async () => {
            const loginSuccessful = await props.handleLogin(username, password);
            if (!loginSuccessful) {
                setIncorrect(true);
            }
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue As Guest" onPress={() => props.setIsLoggedIn(true)} />
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

export default BadgerLoginScreen;