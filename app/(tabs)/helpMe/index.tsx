import { useEffect } from "react"
import { ImageBackground, StyleSheet, Text, View } from "react-native"

// background image for the app
const image = require("/assets/images/communityCircle.svg")

const HelpMe = () => {

    useEffect(() => {
        console.log(image)
    })

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.bgImage}>
                <Text style={styles.text}>Hello from Help Me in (Tabs)</Text>
            </ImageBackground>
        </View>
    )
}

export default HelpMe

const styles = StyleSheet.create({
    container: {
        /* @info Make the containing view fill the screen */
        flex: 1,
        flexDirection: 'column',
      },
    bgImage: {
        /* @info Make the image fill the containing view */
        flex: 1,
        /* @info Scale up the image to fill the container, preserving aspect ratio */
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000a0',
      },
})