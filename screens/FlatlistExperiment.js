
    import * as React from "react";
    import {
      Text,
      View,
      StyleSheet,
      FlatList,
      LayoutAnimation,
      UIManager,
      Platform,
      TouchableOpacity,
      Dimensions,
    } from "react-native";
    
    const { width } = Dimensions.get('window');
    
    const layoutAnimConfig = {
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut, 
      },
      delete: {
        duration: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    const dummyData = [
      {
        id: 1,
        name: "orange card",
        color: "orange",
      },
      {
        id: 2,
        name: "red card",
        color: "red",
      },
      {
        id: 3,
        name: "green card",
        color: "green",
      },
      {
        id: 4,
        name: "blue card",
        color: "blue",
      },
      {
        id: 5,
        name: "cyan card",
        color: "cyan",
      },
    
    ];
    
    export default function FlatlistExperiment() {
      const [data, setData] = React.useState(dummyData); 
      const removeItem = (id) => {
        let arr = data.filter(function(item) {
          return item.id !== id
        })
        setData(arr);
        LayoutAnimation.configureNext(layoutAnimConfig)
      };
    
      return (
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => removeItem(item.id)}
                >
                  <View style={[styles.card, {backgroundColor: item.color}]}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 120,
        backgroundColor: "#ecf0f1",
        padding: 8,
      },
      flatList: {
        paddingHorizontal: 16,
        paddingVertical: 16,
      },
      cardContainer: {
        height: 100,
        width: width * 0.5,
        marginRight: 8,
      },
      card: {
        height: 100,
        width: width * 0.5,
        borderRadius: 12,
        padding: 10,
      },
      text: { color: "white", fontWeight: 'bold' }
    });