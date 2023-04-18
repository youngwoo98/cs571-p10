
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [enterLogout, setEnterLogout] = useState(false);


  useEffect(() => {
    fetch('https://cs571.org/s23/hw10/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_c49825b5bd469d794555",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);


  function handleLogin(username, password) {
    fetch('https://cs571.org/s23/hw10/api/login', {
      method: 'POST',
      headers: {
        'X-CS571-ID': 'bid_c49825b5bd469d794555',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          SecureStore.setItemAsync('userToken', json.token).then(() => {
            setIsLoggedIn(true);
            return true;
          });
        } else {
          return false;
        }
      });
  }

  function handleSignup(username, password) {
    fetch('https://cs571.org/s23/hw10/api/register', {
      method: 'POST',
      headers: {
        'X-CS571-ID': 'bid_c49825b5bd469d794555',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          const jwt = json.jwt;
          SecureStore.setItemAsync('userToken', jwt).then(() => {
          });
        }
      });
  }

  function handleLogout(callback) {
      setIsLoggedIn(false);  
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom}/>}
              </ChatDrawer.Screen>
            })
          }
            <ChatDrawer.Screen name="Logout" component={BadgerLogoutScreen}
              initialParams={{
                handleLogout: handleLogout,
                setIsLoggedIn: setIsLoggedIn,
              }}
            />
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} />
  }
}


