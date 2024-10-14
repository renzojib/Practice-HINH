import { ImageBackground, Platform, StatusBar, StyleSheet, Text, View } from "react-native";

function Header () {
    return(
        <View style={styles.container}>
            <ImageBackground /*source={}*/ resizeMode="cover" style={styles.image}>
                <Text style={styles.header1}>History of the Web</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      borderTopColor: "#001f54",
      borderTopWidth: 2,
      width: "100%",
      height: 80,
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: 30,
    },
    header1: {
      textAlign: "center",
      marginVertical: "auto",
      fontSize: 32,
      color: "#DDDDDD",
      fontFamily: "CourierPrimeBold",
    }
  });

export default Header;