import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, SafeAreaView, FlatList, TextInput, Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Index from ".";


  const Acceuil = () => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');

    const [add, setAdd ] = useState(0)
    const [ProductsContext, setProductsContext] = useState("");
    const [cartItems, setCartItems] = useState([
        {
          id: "1",
          name: "Orid Dhall",
          quantity: "1kg",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/81f17QBywiL._SL1500_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "2",
          name: "Orid Dhall",
          quantity: "500g",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/81f17QBywiL._SL1500_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "3",
          name: "Toor Dhall",
          quantity: "1kg",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/81ieFDa5gHL._SY550_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "4",
          name: "Toor Dhall",
          quantity: "500g",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/81ieFDa5gHL._SY550_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "5",
          name: "Gram Dhall",
          quantity: "1kg",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/udhayam-gram-dal-228x228-1.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "6",
          name: "Gram Dhall",
          quantity: "500g",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/05/udhayam-gram-dal-228x228-1.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "7",
          name: "Moong Dhall",
          quantity: "1kg",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/12/819D8piBVKL._SL1500_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
        {
          id: "8",
          name: "Moong Dhall",
          quantity: "500g",
          status: "Currently Not Available",
          thumbnailImage:
            "https://annaistores.com/as_content/uploads/2020/12/819D8piBVKL._SL1500_.jpg",
          qty: 5,
          salePrice: "123",
          checked: 0,
        },
      
    ])
const cartItemsIsLoading= false
  
  const addToCart = (item) => {
    if (ProductsContext.indexOf(item) !== -1 ) return;
    setProductsContext([...ProductsContext, item])
    setAdd(add +1 );
    console.log(item)
  };
 

    useEffect(() => {
      fetchPosts();
      return () => {
  
      }
    }, [])
  
  
  
    const fetchPosts = () => {
      const apiURL = 'index';
      fetch(apiURL)
      .then((res) => res.json())
      .then(resjson => {
         setfilterdData(resjson);
         setMasterData(resjson);
      }).catch((error) => {
         console.log(error)
      })
    }
  
    const searchFilter = (text) => {
      if(text) {
        const newData = masterData.filter((item) => {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilterdData(newData);
        setSearch(text);
      } else{
        setfilterdData(masterData);
        setSearch(text);
      }
    }
  
    const ItemView = ({item}: any) => {
      return(
  
        <View >
          <Text >
          {item.id.toUpperCase()}{'. '}{item.title}
        </Text>
       
        <Pressable
         
                //onPress={() => addTocart(item)}
                
              >
                <Text style={{  justifyContent: 'flex-start', alignContent: 'flex-start', color: 'white'}}>Ajout panier </Text>
              </Pressable>
        </View>
      )
      
    }
    const ItemSeparatorView = () => {
      return(
        <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'  }} />
  
       
      )
    }
    
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
        >

      <SafeAreaView style={{flex: 1 }}>
        <View style={styles.container}>
          <View  style={{height: 70, width: 70, }}>
          
          <Index />

          </View>
          
         <View style={{backgroundColor: 'red', borderRadius:50, height: 20, width: 20, marginTop: -50, marginLeft: 40,}}> <Text style={{margin:6, marginTop: 1, color: '#fff'}}>{add} </Text> </View>
          <TextInput  
          style={styles.texrInputStyle}
          value={search}
          placeholder="effectuez votre recherche ici..."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text) 
            
           
          }
          />
          <FlatList
          data={filterdData}
          
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          />
      
          
        </View>
      </SafeAreaView>

 
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
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      <Image
                        source={{ uri: item.thumbnailImage }}
                        style={[
                          styles.centerElement,
                          { height: 60, width: 60, backgroundColor: "#eeeeee" },
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
                        { item.salePrice} Frs
                      </Text>
                      <Text>{item.status}</Text>
                      <View style={{ flexDirection: "row" }}>
                        
                       
                       
                      </View>
                    </View>
                  </View>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                       onPress={() => addToCart(item)}
                    >
                      <Ionicons name="ios-cart" size={25} color="#0faf9a" />
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
          
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 32,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
           
            </View>
          </View>
        )}
      </View>
    );
  }


  const styles = StyleSheet.create({
    centerElement: { 
      justifyContent: "center", 
      alignItems: "center" 
    },
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 15,
    },
    button: {
      backgroundColor: 'red',
      height:22,
      width: 90,
      
    },
    texrInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 30,
      borderColor: '#009688',
      backgroundColor: 'white',
    },
  
    
    card: {
      backgroundColor: '#f1f1f1',
      padding: 12,
      margin: 22,
      paddingRight: 40,
      paddingLeft: 40,
      borderRadius: 1,
    }
  });

export default Acceuil;
