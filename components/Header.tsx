import { ImageBackground, Platform, StatusBar, StyleSheet, Text, View } from "react-native";

function Header () {
    return(
        <View style={styles.container}>
          <View style={{marginVertical: "auto", padding: 10}}>
                <Text style={styles.header1}>HELP
                <Text style={[styles.header1, styles.yellowGreen]}> IS HERE</Text>
                </Text>
                <Text style={styles.subHeader1}>Cuyahoga Community College</Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      borderTopColor: "#268787ff",
      borderTopWidth: 2,
      width: "100%",
      backgroundColor: "#009999",
      height: 100,
    },
    header1: {
      textAlign: "center",
      fontSize: 45,
      color: "#DDDDDD",
      fontFamily: "GothicA1-Black",
      textShadowColor: 'black', 
      textShadowOffset: { width: -1, height: 0 },
      textShadowRadius: 1,
    },
    yellowGreen: {
      color: "#c3c554ff",
    },
    subHeader1: {
      fontSize: 20,
      marginTop: -5,
      color: "white",
      textAlign: "center",
      fontFamily: "CrimsonText-Regular",
      textShadowColor: 'black', 
      textShadowOffset: { width: -1, height: 0 },
      textShadowRadius: 1,
    }
  });

export default Header;