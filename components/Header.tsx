import { ImageBackground, Text, View } from "react-native";

function Header () {
    return(
        <View style={styles.container}>
            <ImageBackground /*source={}*/ resizeMode="cover" style={styles.image}>
                <Text style={styles.header1}>History of the Web</Text>
            </ImageBackground>
        </View>
    )
}

const styles = {
    container: {

    },
    image: {

    },
    header1: {

    }
}

export default Header;