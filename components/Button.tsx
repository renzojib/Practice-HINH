import { PropsWithChildren, ReactElement } from "react";
import { Pressable, StyleSheet, Text } from "react-native";


type Props = PropsWithChildren<{
    value: string,
    onPress: () => void,
  }>;
function Button (prop: Props ) {
    return(<Pressable onPress={prop.onPress} >
        <Text style={styles.text}>{prop.value}</Text>
      </Pressable>
      );
}

const styles = StyleSheet.create({
    text: {
      color: "#fff"
    }
})

export default Button;