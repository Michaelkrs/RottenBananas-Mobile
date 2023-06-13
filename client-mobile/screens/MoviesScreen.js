import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MOVIES, GET_MOVIE_DETAIL } from "../queries/query";

const carouselData = [
  {
    title: "Interstellar",
    img: "https://images8.alphacoders.com/560/560736.jpg",
  },
  {
    title: "Top Gun: Maverick",
    img: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/05/top-gun-maverick-movie-review-1.jpg",
  },
  {
    title: "John Wick - Chapter 4",
    img: "https://variety.com/wp-content/uploads/2023/03/john-wick-chapter-4-keanu.jpg",
  },
  {
    title: "All Quiet on the Western Front",
    img: "https://occ-0-1217-1001.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbAFrGVOP1XOWpfk5HNwoD99oSsxKSCGRrVtHCQpCIVntZdDWeCbDPAzOxDdMOB-FmFCsIuhmXXseIlvJK1XTxG8Piis7JZnXvYQ.jpg?r=f77",
  },
];

function MoviesScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const [dispatch] = useLazyQuery(GET_MOVIE_DETAIL, {
    onCompleted: (movieDetail) => {
      navigation.navigate("DetailScreen", {
        movieDetail: movieDetail.movieDetail,
      });
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const renderIndicator = ({ index }) => (
    <View
      style={[
        styles.indicator,
        index === activeIndex && styles.activeIndicator,
      ]}
    />
  );

  if (loading) {
    return (
      <View styles={styles.loading}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Loading ...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View styles={styles.loading}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          {error.message}
        </Text>
      </View>
    );
  }

  const handlePress = (id) => {
    dispatch({ variables: { movieId: Number(id) } });
    // console.log(movieDetail, "inimoviedetail");
    // navigation.navigate("DetailScreen", {
    //   movieDetail: movieDetail?.movieDetail,
    // });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel
          data={carouselData}
          renderItem={({ item }) => {
            return (
              <View style={styles.carousel}>
                <Image
                  source={{ uri: item.img }}
                  style={{
                    width: 500,
                    height: 250,
                    resizeMode: "cover",
                  }}
                />
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0)",
                    "rgba(0,0,0,10)",
                    "rgba(0,0,0,100)",
                  ]}
                  style={{
                    position: "absolute",
                    left: -5,
                    right: -5,
                    bottom: -43,
                    height: 100,
                    // borderColor: "red",
                    // borderWidth: 2,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 25,
                  }}
                >
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                </View>
              </View>
            );
          }}
          sliderWidth={420}
          itemWidth={420}
          keyExtractor={(item, index) => index}
          containerCustomStyle={{ alignSelf: "center" }}
        />

        <View style={styles.indicatorContainer}>
          {carouselData.map((_, index) => (
            <View key={index} style={styles.indicatorWrapper}>
              {renderIndicator({ index })}
            </View>
          ))}
        </View>

        <FlatList
          data={data?.movies}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handlePress(item.id)}>
                <View style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={styles.imageCover}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          key={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.movies}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  loading: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movies: {
    // borderColor: "red",
    // borderWidth: 5,
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    width: 150,
    height: 225,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14213d",
  },
  imageCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  carousel: {
    // borderColor: "red",
    // borderWidth: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
    overflow: "hidden",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 3,
  },
  indicatorWrapper: {
    paddingHorizontal: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
  },
  activeIndicator: {
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "black",
  },
  carouselTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default MoviesScreen;
