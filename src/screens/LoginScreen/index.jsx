import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '404247399370-l7ln5ha9lh9i9d7os4p2me8s90890bqn.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
});

const LoginPage = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const user = await GoogleSignin.getCurrentUser();
          setUserInfo(user);
          navigation.navigate('Home',{ userInfo: user.user });
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSignInStatus();
  }, []);

  const signIn = async () => {
    try {
      
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      console.log(usrInfo)
      setUserInfo(usrInfo);
      navigation.navigate('Home',{ userInfo: usrInfo.user });
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Image source={require("../../../assets/6.png")}
          style={{ height: 450, width: 450 }}>
        </Image>
      </View>
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}>Expense Tracker</Text>
        {/* <CustomButton title="Login" color={'#2E8B57'} onPress={() => navigation.navigate('Home')} /> */}
        <View style={{ marginTop: 20 }}>
          <CustomButton title="SignUp with Google" onPress={() => { signIn() }} color={'#2E8B57'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginPage;