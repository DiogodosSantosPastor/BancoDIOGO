import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App(){
    const logoToddyn = 'https://pbs.twimg.com/profile_images/1516079909214502913/LDvbq6L__400x400.jpg';

    return(
        <View style={styles.container}>
            <LinearGradient
            colors={['#fc6262', 'transparent']}
            style={styles.background}
            />
                <Image
                style={styles.logo}
                source={{
                uri: logoToddyn
                }}
                /> 
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D91111'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 500,
      },
    logo: {
        width: 250,
        height: 250,
        backgroundColor: 'transparent'
    },
});