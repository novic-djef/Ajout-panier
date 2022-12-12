
import React from "react";
import { TrashIcon } from '@heroicons/react/24/outline';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  MaterialIcons,
} from "@expo/vector-icons";

class Pulsars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: [
        /* Sample data from walmart */
        {
          itemId: "1",
          name: "Paracetamol",
          quantity: "1kg",
          status: "Medicament pour mot de tete ",
          thumbnailImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlxQOOge1VXvw3rAbVhXuv21ZyfZMAgKYbZltmO9QuA&s",
          qty: 1,
          salePrice: "1200",
          checked: 0,
        },
        {
          itemId: "2",
          name: "Paracetamol",
          quantity: "500g",
          status: "Medicament pour mot de tete ",
          thumbnailImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNoTsl9Gq0E3r-MZrA9ZfBbJcPlMkcJJIxJDtQ_jlDIsLFxBrBU2jTxJ766aZq6T7GMnA&usqp=CAU",
          qty: 1,
          salePrice: "1500",
          checked: 0,
        },
        {
          itemId: "3",
          name: "Doliprane",
          quantity: "500g",
          status: "Medicament pour mot de tete ",
          thumbnailImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL85cuqLaaowIoMxxpj67ei8OG_VAr45yX77BnOpauEQ&s",
          qty: 1,
          salePrice: "123",
          checked: 0,
        },
        // {
        //   itemId: "4",
        //   name: "Doliprane",
        //   quantity: "500g",
        //   status: "Medicament pour mot de tete ",
        //   thumbnailImage:
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNoTsl9Gq0E3r-MZrA9ZfBbJcPlMkcJJIxJDtQ_jlDIsLFxBrBU2jTxJ766aZq6T7GMnA&usqp=CAU",
        //   qty: 5,
        //   salePrice: "1200",
        //   checked: 0,
        // },
        
       
     
      ],
    };
  }

  


  deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
            text: "Delete",
            onPress: () => {
              let updatedCart = this.state.cartItems; /* Clone it first */
              updatedCart.splice(
                index,
                1
              ); /* Remove item from the cloned cart state */
              this.setState(updatedCart); /* Update the state */
            },
          },
        ],
        { cancelable: false }
      );
    };
  
    quantityHandler = (action, index) => {
      const newItems = [...this.state.cartItems]; // clone the array
  
      let currentQty = newItems[index]["qty"];
  
      if (action == "more") {
        newItems[index]["qty"] = currentQty + 1;
      } else if (action == "less") {
        newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
      }
      this.setState({ cartItems: newItems }); // set new state
  };

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
        0
      );
    }
    return 0;
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });

    const { cartItems, cartItemsIsLoading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom: 12,
          
          }}
        >
          {/* ² */}
          <View style={[styles.centerElement, { height: 10 }]}>
            <Text style={{ fontSize: 18, color: "#000" }}>Panier d'achat</Text>
          </View>
        </View>

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            {cartItems &&
              cartItems.map((item, i) => (
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
                    margin: 12
                  }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        // this.props.navigation.navigate('ProductDetails', {productDetails: item})
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      <Image
                        source={{ uri: item.thumbnailImage }}
                        style={[
                          styles.centerElement,
                          { height: 80, width: 80, borderRadius: 50, backgroundColor: "#eeeeee" },
                        ]}
                      />
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
                        {item.qty * item.salePrice} Frs
                      </Text>
                      <Text>{item.status}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("less", i)}
                          style={{ borderWidth: 1, borderColor: "#cccccc" }}
                        >
                          <MaterialIcons
                            name="remove"
                            size={22}
                            color="#cccccc"
                          />
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
                          onPress={() => this.quantityHandler("more", i)}
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
                      onPress={() => this.deleteHandler(i)}
                    >
                      <TrashIcon name="md-trash" size={25} color="#ee4d2d" />
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
                 <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 35,
                    borderRadius: 5,
                    margin: 22,
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Prescription</Text>
              </TouchableOpacity>
                
                <View
                  style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#8f8f8f" }}>Total: </Text>
                  <Text>{this.subtotalPrice().toFixed(2)} Frs</Text>
                </View>
              </View>
           
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 32,
                paddingRight: 20,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 35,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Vider Panier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 35,
                    borderRadius: 10,
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Ajout au Panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default Pulsars;