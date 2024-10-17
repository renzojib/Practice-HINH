import { Image, StyleSheet, Text, View } from "react-native"
import { useEffect, useRef, useState } from "react"

// interface Layout {
//     height: number,
//     width: number,
//     pageX: number,
//     pageY: number,
//     x: number,
//     y: number,
// }

const HelpMe = () => {
    const image = require("../../../assets/images/communityCircle2.png")
    const [height, setHeight] = useState(0)
    // const [layout, setLayout] = useState({} as Layout);
    const viewRef = useRef(null);
    
    const handleLayout = (event: any) => {
        event.persist()
        setHeight(() => event.nativeEvent.layout.height)
        // remember that you can wrap the next line in a timeOut in order to access the .height
        // if the above version stops working
    };
    
    // useEffect(() => {
    //     if (viewRef.current) {
    //         viewRef.current.measure((x, y, width, height, pageX, pageY) => {
    //             console.log('Measured layout:', { x, y, width, height, pageX, pageY });
    //         });
    //     }
    // }, []);

    return (
        <View ref={viewRef} onLayout={handleLayout} style={styles.container}>
            <Image source={image} style={[styles.bgImage, {top: (height * 0.5) - (350 * 0.5) }]}/>
            <Text style={styles.text}>Help Me</Text>

        </View>
    )
}

export default HelpMe

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
})
