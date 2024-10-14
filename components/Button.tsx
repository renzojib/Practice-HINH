import { PropsWithChildren, ReactElement } from "react";
import { Pressable, StyleSheet, Text } from "react-native";


type Props = PropsWithChildren<{
    value: string;
  }>;
function Button (prop: Props ) {
    return(
    <Pressable onPress={() => {}}>
        <Text>{prop.value}</Text>
      </Pressable>
      );
}

const styles = StyleSheet.create({
    
})

export default Button;