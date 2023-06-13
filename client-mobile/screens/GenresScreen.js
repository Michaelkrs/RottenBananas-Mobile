import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function GenresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/78/f2/1c/78f21c0a1549b5fe6e8f74cef236e356.jpg",
        }}
        style={styles.image}
      />
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        UNDER MAINTENANCE
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        Sorry for the inconveniece
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default GenresScreen;
