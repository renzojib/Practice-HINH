import { PropsWithChildren, ReactElement, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";


type Props = PropsWithChildren<{
    value: string,
    onPress: () => void,
  }>;
function Button (prop: Props ) {
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  function handlePress() {
    setIsButtonPressed(true)
    setTimeout(() => {
      prop.onPress()
    }, 50)
  }

  return(
    <Pressable onPress={handlePress}
        style={[styles.button, isButtonPressed && styles.buttonPressed]}
        onPressOut={() => setIsButtonPressed(false)}>
      <Text style={styles.buttonText}>{prop.value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
      width: "80%",
      height: 60,
      backgroundColor: "#006d85df",
      marginVertical: 5,
      marginHorizontal: "auto",
      justifyContent: "center",
      borderRadius: 10,
      borderColor: "#005466ff",
      borderWidth: 2,
    },
    buttonPressed: {
      backgroundColor: "#79babeb2"
    },
    buttonText: {
      fontFamily: "GothicA1-Bold",
      textAlign: "center",
      color: "white",
      fontSize: 16,
    }
})

export default Button;