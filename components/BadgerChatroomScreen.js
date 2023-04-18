import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BadgerChatMessage from "./BadgerChatMessage";
import { Button, Modal } from "react-native-paper";


function BadgerChatroomScreen(props) {

    const [msg, setMsg] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555",
            }
        })
        .then(res => res.json())
        .then(json => {
            setMsg(json)
        })
        .catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const createPost = () => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c49825b5bd469d794555",
                "Authorization": "Bearer " + props.token
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        })
        .then(res => {
            if(res.status === 200){
                alert("Successfully posted message!");
                setModalPost(!modalPost);
                loadMessages();
            }
        })
    }


    return <View style={styles.container}>
                <View style={{ flex: 1, margin: 0 }}>
                    
                    <ScrollView style={{ flexGrow: 1, margin: 0 }}>
                        {
                            msg.length === 0 ?
                            <Text>No messages yet!</Text>
                            :
                            Object.values(msg.messages).map((prop) => {
                                return <BadgerChatMessage
                                    key={prop.id}
                                    poster={prop.poster}
                                    title={prop.title}
                                    content={prop.content}
                                    created={prop.created}
                                    style={{ zIndex: 0}}
                                />
                            })
                        }
                    </ScrollView>
                </View>
                
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {setModalPost(!modalPost)}}
                        style={{ backgroundColor: "#C41E3A", marginBottom: 10 }}
                        labelStyle={{ color: "white" }}
                    >
                        Add Post
                    </Button>
                    <Button
                        onPress={() => {loadMessages()}}
                        style={{ backgroundColor: "gray", marginBottom: 10 }}
                        labelStyle={{ color: "white" }}
                    >
                        Refresh
                    </Button>
                </View>

                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalPost}
                        onRequestClose={() => {
                            setModalPost(!modalPost);
                        }}>
                        <View style={styles.modalView}>
                            <Text
                                style={{ fontSize: 20, marginBottom: 10 }}
                            >Create A Post</Text>
                            <Text>Title</Text>
                            <TextInput
                                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setTitle(text)}
                            />
                            <Text>Body</Text>
                            <TextInput
                                style={{ height: 300, width: 200, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setBody(text)}
                            />
                            <Button
                                onPress={() => {createPost()}}
                                style={{ backgroundColor: "#C41E3A", margin: 10 }}
                                labelStyle={{ color: "white" }}
                            >
                                Create Post
                            </Button>
                            <Button
                                onPress={() => {setModalPost(!modalPost); loadMessages}}
                                style={{ backgroundColor: "gray", marginBottom: 10 }}
                                labelStyle={{ color: "white" }}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Modal>
        </View>  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        paddingBottom: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20,
        zIndex: 10,
      },
});

export default BadgerChatroomScreen;