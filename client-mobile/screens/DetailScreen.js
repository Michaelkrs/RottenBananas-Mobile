import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback, useState } from "react";

const cast = [
  {
    id: 1,
    name: "Cillian Murphy",
    img: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQAnvdxEejqo0yPCAMyOGhtJ2iyN1M145DbZg3Z8c6KIMGvdwwrYnW4lMtuc9Ti1zgtgVsyT8Yq6vo2zlA",
  },
  {
    id: 2,
    name: "Robert Downey Jr.",
    img: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/01/12/16735402991293.jpg",
  },
  {
    id: 3,
    name: "Florence Pugh",
    img: "https://multiversonoticias.com.br/wp-content/uploads/2022/03/Florence-Pugh.jpg",
  },
  {
    id: 4,
    name: "Matt Damon",
    img: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTRbW4E8urKoY-mKlROFsubo-NU_g6K50DifrKW0LsOhm0u5hJA5xDcvs1RhMUNk83FI4PWp37UCc8MmBc",
  },
];

function DetailScreen({ route }) {
  const { movieDetail } = route.params;

  const CastCard = ({ item }) => {
    return (
      <View style={styles.castCard}>
        <Image
          source={{ uri: item.profilePict }}
          style={{
            width: 80,
            height: 80,
            maxHeight: 120,
            resizeMode: "cover",
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "white",
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: movieDetail?.imgUrl,
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,10)", "rgba(0,0,0,100)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 180,
              // borderColor: "red",
              // borderWidth: 2,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movieDetail?.title}</Text>
          </View>
          <View style={styles.pillContainer}>
            <View style={styles.pill}>
              <Text style={styles.subtitle}>{movieDetail?.Genre?.name}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.subtitle}>3h 18m</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.subtitle}>18+</Text>
            </View>
          </View>
        </View>

        <View style={styles.synopsisContainer}>
          <Text style={styles.synopsis}>{movieDetail?.synopsis}</Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={movieDetail?.Casts}
          renderItem={({ item }) => <CastCard item={item} />}
          keyExtractor={(item) => item.id}
        ></FlatList>

        <View style={styles.trailerContainer}>
          <Text style={styles.trailer}>Trailer</Text>
          <YoutubePlayer
            height={300}
            videoId={movieDetail?.trailerUrl.substring(32)}
          />
          <Text style={styles.name}>Author: {movieDetail?.authorName}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  imageContainer: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    width: "100%",
    height: 500,
    // borderColor: "red",
    // borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
  },
  titleContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 26,
    // fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
  pillContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pill: {
    backgroundColor: "#14213d",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  subtitle: {
    color: "white",
    fontSize: 13,
    // fontFamily: "Arial",
  },
  synopsisContainer: {
    paddingHorizontal: 20,
  },
  synopsis: {
    color: "white",
    fontSize: 16,
    // fontFamily: "Arial",
    lineHeight: 20,
    textAlign: "justify",
  },
  cast: {
    alignItems: "flex-start",
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  castCard: {
    marginHorizontal: 7,
    marginVertical: 20,
    height: 130,
    width: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  trailer: {
    color: "white",
    fontSize: 23,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  trailerContainer: {
    marginTop: -10,
  },
  name: {
    color: "white",
    fontSize: 16,
    // fontFamily: "Arial",
    lineHeight: 20,
    textAlign: "justify",
    paddingHorizontal: 20,
    bottom: 20,
  },
});

export default DetailScreen;
