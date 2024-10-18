import { Image, StyleSheet, Text, View } from "react-native"
import { useState } from "react"
import Button from "@/components/Button"
import { router } from "expo-router"

const EmergencyContacts = () => {
    const image = require("../../../assets/images/communityCircle2.png")
    const [height, setHeight] = useState(0)

    return (
        <View onLayout={(event) => {
            setHeight(() => event.nativeEvent.layout.height);
          }} style={styles.container}>
            <View style={styles.back}>
          <Button value="Back" onPress={() => router.back()}></Button>
      </View>
            <Image source={image} style={[styles.bgImage, {top: (height * 0.5) - (350 * 0.5) }]}/>
            <Text style={styles.text}>Emergency Contacts</Text>

        </View>
    )
}

export default EmergencyContacts

const styles = StyleSheet.create({
    container: {
        borderTopColor: "white",
        borderTopWidth: 2,
        /* @info Make the containing view fill the screen */
        flex: 1,
        backgroundColor: "#009999",
      },
    bgImage: {
        /* @info Make the image fill the containing view */
        /* @info Scale up the image to fill the container, preserving aspect ratio */
        // resizeMode: "contain",
        position: "absolute",
        alignSelf: "center",
      },
      text: {
        color: 'white',
        fontSize: 32,
        fontFamily: "GothicA1-Regular",
        textAlign: 'center',
        marginTop: "5%",
      },
      back: {
        backgroundColor: "#004f71",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        width: "30%",
        marginTop: 25,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }
})