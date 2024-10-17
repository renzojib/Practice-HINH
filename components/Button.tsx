import { PropsWithChildren, ReactElement } from "react";
import { Pressable, StyleSheet, Text } from "react-native";


type Props = PropsWithChildren<{
    value: string,
    onPress: () => void,
  }>;
function Button (prop: Props ) {
    return(
    <Pressable onPress={prop.onPress} >
        <Text>{prop.value}</Text>
      </Pressable>
      );
}

const styles = StyleSheet.create({
    
})

export default Button;