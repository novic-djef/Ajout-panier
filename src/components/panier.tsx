

import React, { useContext, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Context from "../context/products";

const Panier = ({}) => {  
    const cartItemsIsLoading = false;
    const {  } = useContext(Context)
     const [cartItems, setCartItems] = useState([
            {
              id: "1",
              name: "Orid Dhall",
              quantity: "200g",
              status: "Currently Not Available",
              thumbnailImage:
                "https://annaistores.com/as_content/uploads/2020/05/81f17QBywiL._SL1500_.jpg",
              qty: 1,
              salePrice: "123",
              checked: 0,
            },
            {
              itemId: "2",
              name: "Orid Dhall",
              quantity: "500g",
              status: "Currently Not Available",
              thumbnailImage:
                "https://annaistores.com/as_content/uploads/2020/05/81f17QBywiL._SL1500_.jpg",
              qty: 1,
              salePrice: "123",
              checked: 0,
            },
           
          
    ])
    
  const deleteHandler = (i) => {
    Alert.alert(
      "etes vous sure de vouloir supprimer ce produit de votre panier?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => setCartItems(i),
        },
      ],
      { cancelable: false }
    );
  };

  const quantityHandler = (action, index) => {
    const newItems = [...action, index]; 

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

  };

  const subtotalPrice = () => {
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
        0
      );
    }
    return 0;
  };

    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
        >
          <View style={[styles.centerElement, { width: 50, height: 50 }]}>
            <Ionicons name="ios-cart" size={25} color="#000" />
          </View>
          <View style={[styles.centerElement, { height: 50 }]}>
            <Text style={{ fontSize: 18, color: "#000" }}>Panier d'achat</Text>
          </View>
        </View>
        {/* {cartItems === 0 && <Text >Votre panier d'achat est vide</Text>} */}
        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
           
          </View>
        ) : (
           
          <ScrollView>
            {cartItems?.map((item, i) => (
                            <View
                                key={i}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    marginBottom: 2,
                                    height: 120,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        alignSelf: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                        } }
                                        style={{ paddingRight: 10 }}
                                    >
                                        <Image
                                            source={{ uri: item.thumbnailImage }}
                                            style={[
                                                styles.centerElement,
                                                { height: 60, width: 60, backgroundColor: "#eeeeee" },
                                            ]} />
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            flexGrow: 1,
                                            flexShrink: 1,
                                            alignSelf: "center",
                                        }}
                                    >
                                        <Text numberOfLines={1} style={{ fontSize: 15 }}>
                                            {item.name}
                                        </Text>
                                        <Text numberOfLines={1} style={{ color: "#8f8f8f" }}>
                                            {item.quantity}
                                        </Text>
                                        <Text numberOfLines={1} style={{ color: "#333333" }}>
                                            {item.qty *  item.salePrice} Frs
                                        </Text>
                                        <Text>{item.status}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity
                                                onPress={() => quantityHandler("less", item)}
                                                style={{ borderWidth: 1, borderColor: "#cccccc" }}
                                            >
                                                <MaterialIcons
                                                    name="remove"
                                                    size={22}
                                                    color="#cccccc" />
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    borderTopWidth: 1,
                                                    borderBottomWidth: 1,
                                                    borderColor: "#cccccc",
                                                    paddingHorizontal: 7,
                                                    paddingTop: 3,
                                                    color: "#bbbbbb",
                                                    fontSize: 13,
                                                }}
                                            >
                                                {item.qty}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => quantityHandler("more", i)}
                                                style={{ borderWidth: 1, borderColor: "#cccccc" }}
                                            >
                                                <MaterialIcons name="add" size={22} color="#cccccc" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.centerElement, { width: 60 }]}>
                                    <TouchableOpacity
                                        style={[styles.centerElement, { width: 32, height: 32 }]}
                                        onPress={() => deleteHandler(i)}
                                    >
                                        <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
          </ScrollView>
        )}

        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: "#fff",
              borderTopWidth: 2,
              borderColor: "#f6f6f6",
              paddingVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.centerElement, { width: 60 }]}>
                <View
                  style={[styles.centerElement, { width: 32, height: 32 }]}
                ></View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></View>
            </View>
            <View style={{ flexDirection: "row" }}>
             
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#0faf9a"}}>Prescription</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#8f8f8f" }}>SubTotal: </Text>
                  <Text>{subtotalPrice().toFixed(2)} Frs</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 32,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Ajout Panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

export default Panier;