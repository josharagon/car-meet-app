import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import Button from "react-native-flat-button";

import ModificationCard from "./ModificationCard";

import { Picker } from "@react-native-picker/picker";

import * as firebase from "firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { Icon } from "react-native-elements";
import SettingTab from "./SettingTab";
import { Input } from "react-native-elements/dist/input/Input";
import { TextInput } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SimpleImagePicker from "./PhotoPicker";
import UserProfile from "./UserProfile";

const WelcomeNewUser = ({ name, setAccountType }) => {
  const [page, setPage] = useState(1);
  const [userNameAvailable, setUserNameAvailable] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedMake, setSelectedMake] = useState("acura");
  const [selectedModel, setSelectedModel] = useState("Ilx");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [colorError, setColorError] = useState(false);
  const [carModifications, setCarModifications] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedMod, setSelectedMod] = useState("Downpipe");
  const [brandName, setBrandName] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("manual");
  const [garage, setGarage] = useState([]);
  const [yearError, setYearError] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);
  const [garageError, setGarageError] = useState(false);
  const [nameError, setnameError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [n, setN] = useState(0);
  const [power, setPower] = useState({ hp: "", torque: "" });
  const [powerError, setPowerError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dbRef = firebase.database().ref();
  const scrollRef = useRef();

  const checkUserNameAvailability = async (attemptedUsername) => {
    await firebase
      .database()
      .ref()
      .child("users")
      .orderByChild("username")
      .equalTo(attemptedUsername)
      .on("value", function (snapshot) {
        if (snapshot.exists()) {
          return setUserNameAvailable(false);
        } else {
          console.log("its not taken");
          return setUserNameAvailable(true);
        }
      });
  };

  // console.log(checkUserNameAvailability("username"));

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formatText = (text) => {
    return text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => capitalize(word))
      .join(" ");
  };

  const addToGarage = () => {
    const carObj = {};
    if (selectedMake && selectedModel && selectedYear.length === 4) {
      setGarageError(false);
      setYearError(false);
      setInvalidYear(false);
      carObj.make = selectedMake;
      carObj.model = selectedModel;
      carObj.year = selectedYear;
      carObj.id = Math.floor(Math.random() * 100);
      garage.push(carObj);
      setSelectedMake("acura");
      setSelectedModel("Ilx");
      setSelectedYear("");
      setDisabled(true);
    } else if (selectedYear && selectedYear.length < 4) {
      setInvalidYear(true);
      setYearError(true);
    } else if (!selectedYear) {
      setInvalidYear(false);
      setYearError(true);
    }
  };

  const addMod = (part, brand) => {
    const mod = {};
    if (part && brand) {
      mod.type = part;
      mod.name = brand;
      carModifications.push(mod);
      setSelectedMod("Downpipe");
      setBrandName("");
      setDisabled(true);
      console.log(carModifications);
    } else {
      return;
    }
  };

  const handleGarageList = () => {
    return garage.map((car, index) => {
      return {
        key:
          car.year + " " + formatText(car.make) + " " + formatText(car.model),
        i: index,
      };
    });
  };

  const handleModList = () => {
    return carModifications.map((mod, index) => {
      return {
        key: mod.name + " " + mod.type,
      };
    });
  };

  const handleAdditionalCarInfo = (garageIndex) => {
    const car = garage[garageIndex];
    car.color = selectedColor;
    selectedTrim ? (car.trim = selectedTrim) : null;
  };

  let rootRef = firebase.database().ref();

  const checkUserName = async (name) => {
    let availableUsername = userNameAvailable;
    if (name.length > 3) {
      await rootRef
        .child("users")
        .orderByChild("username")
        .equalTo(name)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserNameAvailable(false);
            availableUsername = false;
          } else {
            setUserNameAvailable(true);
            availableUsername = true;
          }
        });
    }
    handleUserNameReq(name, availableUsername);
  };

  const handleUserNameReq = (name, available) => {
    console.log(available);
    if (name.length && available === true) {
      setSelectedUserName(userName);
      setPage(page + 1);
      console.log("submitted and name wasnt taken");
    } else if (name.length && available === false) {
      setSubmitted(true);
      console.log("submitted and name was taken");
    } else if (!name.length) {
      setSubmitted(true);
      console.log("submitted with no username");
    } else if (!name.length <= 3) {
      setLengthError(true);
      setSubmitted(true);
    }
  };

  const resetErrors = () => {
    setSubmitted(false);
    setLengthError(false);
    setUserNameAvailable(null);
  };

  const pageOneSubmit = () => {
    checkUserName(userName, userNameAvailable);
  };

  const pageTwoSubmit = () => {
    if (garage.length > 0 && yearError === false) {
      setPage(page + 1);
    } else if (garage.length === 0) {
      setGarageError(true);
    }
  };

  const pageThreeSubmit = () => {
    if (power.hp && power.torque && selectedColor) {
      if (garage.length - 1 === n) {
        setCarData();
        setPage(page + 1);
      } else {
        setCarData();
        setN(n + 1);
        reloadCarDetails();
        resetCarDetails();
        setImages([]);
      }
    } else if (
      power.hp === "" ||
      (power.torque === "" && selectedColor === "")
    ) {
      setPowerError(true);
      setColorError(true);
    } else if (power.hp === "" || power.torque === "") {
      setPowerError(true);
    } else if (selectedColor === "") {
      setColorError(true);
    }
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const reloadCarDetails = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const resetCarDetails = () => {
    setSelectedColor("");
    setSelectedTrim("");
    setPower({ hp: "", torque: "" });
    setCarModifications([]);
  };

  const setCarData = () => {
    const car = garage[n];
    car["color"] = selectedColor;
    car["trim"] = selectedTrim;
    car["power"] = power;
    car["modifications"] = carModifications;
    car["images"] = handleImage(images);
  };

  const handleImage = (images) => {
    let newArr = [];
    let imageCounter = 1;
    images.map((image) => {
      newArr.push({
        uri: image,
        dimensions: { width: 1080, height: 1920 },
        name: `${garage[n].year}${garage[n].make}${garage[n].model}${
          garage[n].id
        }${imageCounter.toString().length === 1 ? "0" : ""}${imageCounter}`,
      });
      imageCounter++;
    });
    return newArr;
  };

  const submitPost = async () => {
    const uploadURI = garage[n].images[0].uri;
    let fileName = garage[n].images[0].name;

    uploadImage(uploadURI, fileName)
      .then(() => {
        console.log("uploaded");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImage = async (uri, name) => {
    setIsUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(`${firebase.auth().currentUser.uid}/` + name);
    ref.put(blob).then(() => {
      setIsUploading(false);
    });
  };

  const storeUserData = async (garageArr) => {
    let user = firebase.auth().currentUser;
    await garageArr.forEach((car) => {
      car.images.map((image) => {
        uploadImage(image.uri, image.name + ".jpg");
      });
    });

    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        username: selectedUserName,
        email: user.providerData[0].email,
        tutorialCompleted: true,
        profile: garage,
      });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#202020",
        height: "100%",
        display: "flex",
        paddingTop: windowHeight * 0.11,
        paddingBottom: windowHeight * 0.05,
      }}
    >
      <SafeAreaView />
      {page === 0 && (
        <Animated.ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 66,
              lineHeight: 80,
            }}
          >
            Welcome to {"\n"} Meets {"\n"} {name}!
          </Text>
        </Animated.ScrollView>
      )}
      {page === 1 && (
        <Animated.ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
          alignItems="center"
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 26,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Create Username
          </Text>
          <Text
            style={{
              color: "#9d9d9d",
              fontSize: 15,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Pick a username for your new account. You can always change it
            later.
          </Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                paddingLeft: "8%",
                backgroundColor: "#353535",
                height: 50,
                width: windowWidth - 50,
                fontSize: 12,
                alignSelf: "center",
              }}
              placeholder="Username"
              onChangeText={(text) => {
                resetErrors();
                setUserName(text.replace(/ /g, "").toLowerCase());
              }}
              value={userName}
              placeholderTextColor="#7d7d7d"
              selectionColor="#ffffff"
              theme={{
                colors: {
                  text: "white",
                  primary: "white",
                  underlineColor: "transparent",
                  background: "#003489",
                },
              }}
            />

            <Text
              style={{
                position: "absolute",
                bottom: 39,
                left: "10%",
                fontSize: 15,
                color: "#7d7d7d",
              }}
            >
              @
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: 39,
                right: "9%",
                zIndex: 1,
              }}
            >
              <Icon
                name="close-circle-outline"
                type="ionicon"
                color="white"
                size={18}
                onPress={() => {
                  setUserName("");
                  setUserNameAvailable(null);
                  setSubmitted(false);
                  setLengthError(false);
                }}
              />
            </View>
          </View>
          {userName.length && userNameAvailable === false ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              username unavailable, please try a different one!
            </Text>
          ) : null}
          {!userName.length && submitted ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              please enter a username!
            </Text>
          ) : null}
          {userName.length && submitted && lengthError ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              please enter 4 or more characters!
            </Text>
          ) : null}

          <Button
            type="custom"
            containerStyle={{
              backgroundColor: "#2C95F6",
              width: windowWidth - 50,
              height: 50,
              marginVertical: 10,
              alignSelf: "center",
              borderRadius: 1,
            }}
            onPress={() => {
              pageOneSubmit();
            }}
          >
            Next
          </Button>
        </Animated.ScrollView>
      )}
      {page === 2 && (
        <Animated.View
          keyboardShouldPersistTaps="handled"
          style={(styles.carPage, { opacity: fadeAnim })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 26,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            What's in your garage?
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#ffffff" }}>Year:</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              onChangeText={(text) => {
                setYearError(false);
                setSelectedYear(text);
              }}
              value={selectedYear}
              placeholderTextColor="#7d7d7d"
              selectionColor="#ffffff"
              keyboardType="numeric"
              maxLength={4}
              theme={{
                colors: {
                  placeholder: "white",
                  text: "white",
                  primary: "white",
                  underlineColor: "transparent",
                  background: "#003489",
                },
              }}
            />
          </View>
          {yearError ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              please enter a year!
            </Text>
          ) : null}
          {invalidYear ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              please enter add a valid year! (ex. 2020)
            </Text>
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Picker
              selectedValue={selectedMake}
              itemStyle={{
                color: "#ffffff",
                height: 100,
                width: windowWidth / 2 - 20,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setDisabled(false);
                setSelectedMake(itemValue);
                setSelectedModel(carModels[itemValue].models[0]);
              }}
            >
              {Object.keys(carModels).map((item) => (
                <Picker.Item label={formatText(item)} value={item} key={item} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedModel}
              label="white"
              color="#ffffff"
              itemStyle={{
                color: "#ffffff",
                height: 100,
                width: windowWidth / 2 - 20,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setDisabled(false);
                setSelectedModel(itemValue);
              }}
            >
              {carModels[selectedMake].models.map((item) => (
                <Picker.Item label={formatText(item)} value={item} key={item} />
              ))}
            </Picker>
          </View>
          <Pressable disabled={true} style={{ opacity: disabled ? 0.5 : 1 }}>
            <Button
              type="custom"
              containerStyle={{
                backgroundColor: "#2C95F6",
                width: windowWidth - 50,
                height: 50,
                marginVertical: 15,
                alignSelf: "center",
                borderRadius: 1,
              }}
              disabled={disabled}
              onPress={() => addToGarage()}
            >
              Add to Garage
            </Button>
          </Pressable>
          <Text style={{ textAlign: "center", color: "#ffffff" }}>
            Your Garage:
          </Text>
          <Text style={{ textAlign: "center", color: "#ffffff", opacity: 0.3 }}>
            Long Press to remove from garage:
          </Text>
          <FlatList
            data={handleGarageList()}
            textColor={{ color: "#ffffff" }}
            scrollEnabled={false}
            style={{ marginTop: 20, height: windowHeight / 5 }}
            renderItem={({ item }) => (
              <Text
                style={styles.item}
                onLongPress={() => {
                  //remove car from garage
                  setGarage(garage.filter((_, i) => i !== item.i));
                }}
              >
                {item.key}
              </Text>
            )}
          />
          {garageError ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              please add a car to your garage!
            </Text>
          ) : null}
          <Button
            type="custom"
            containerStyle={{
              backgroundColor: "#2C95F6",
              width: windowWidth - 50,
              height: 50,
              alignSelf: "center",
              borderRadius: 1,
            }}
            onPress={() => pageTwoSubmit()}
          >
            Next
          </Button>
        </Animated.View>
      )}
      {page === 3 && (
        <Animated.ScrollView
          ref={scrollRef}
          opacity={fadeAnim}
          keyboardShouldPersistTaps="handled"
          // scrollEnabled={false}
          alignSelf="center"
          alignItems="center"
          style={{
            width: windowWidth - 50,
            height: windowHeight - 50,
            overflow: "hidden",
          }}
        >
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color="white"
            size={25}
            style={{ alignSelf: "left", paddingLeft: windowWidth * 0.045 }}
            onPress={() => {
              setPage(page - 1);
            }}
          />
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 5,
            }}
          >
            {garage.length - 1 > n && (
              <Icon
                name="arrow-right"
                type="material-community"
                color="white"
                size={30}
                onPress={() => setN(n + 1)}
              ></Icon>
            )}

            {n === garage.length - 1 && (
              <Icon
                name="check"
                type="material-community"
                color="white"
                size={30}
                onPress={() => setPage(4)}
              ></Icon>
            )}
          </View> */}
          <Text
            style={{
              color: "#ffffff",
              fontSize: 24,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Tell Us More About your {"\n"} {formatText(garage[n].make)}{" "}
            {formatText(garage[n].model)}
          </Text>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Color:</Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "#353535",
                  height: 50,
                  width: windowWidth - 120,
                  fontSize: 11,
                  alignSelf: "center",
                  borderColor: colorError ? "red" : null,
                }}
                placeholder="Color"
                onChangeText={(text) => {
                  setColorError(false);
                  setSelectedColor(text);
                }}
                value={selectedColor}
                placeholderTextColor="#7d7d7d"
                selectionColor="#ffffff"
                theme={{
                  colors: {
                    placeholder: "white",
                    text: "white",
                    primary: "white",
                    underlineColor: "transparent",
                  },
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Trim:</Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "#353535",
                  height: 50,
                  width: windowWidth - 120,
                  fontSize: 11,
                  alignSelf: "center",
                }}
                placeholder="Trim (Optional)"
                onChangeText={(text) => setSelectedTrim(text)}
                value={selectedTrim}
                placeholderTextColor="#7d7d7d"
                selectionColor="#ffffff"
                theme={{
                  colors: {
                    placeholder: "white",
                    text: "white",
                    primary: "white",
                    underlineColor: "transparent",
                  },
                }}
              />
            </View>

            <Text style={{ color: "#ffffff", textAlign: "center" }}>
              Power:
            </Text>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "#353535",
                  height: 50,
                  width: (windowWidth - 120) / 2,
                  fontSize: 11,
                  alignSelf: "center",
                  borderColor: powerError ? "red" : null,
                }}
                keyboardType="numeric"
                placeholder="Horsepower"
                onChangeText={(text) => {
                  setPowerError(false);
                  setPower({ ...power, hp: text });
                }}
                value={power.hp}
                placeholderTextColor="#7d7d7d"
                selectionColor="#ffffff"
                maxLength={4}
                theme={{
                  colors: {
                    placeholder: "white",
                    text: "white",
                    primary: "white",
                    underlineColor: "transparent",
                  },
                }}
              />

              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "#353535",
                  height: 50,
                  width: (windowWidth - 120) / 2,
                  fontSize: 11,
                  alignSelf: "center",
                  borderColor: powerError ? "red" : null,
                }}
                keyboardType="numeric"
                placeholder="Torque"
                onChangeText={(text) => {
                  setPowerError(false);
                  setPower({ ...power, torque: text });
                }}
                value={power.torque}
                placeholderTextColor="#7d7d7d"
                selectionColor="#ffffff"
                maxLength={4}
                theme={{
                  colors: {
                    placeholder: "white",
                    text: "white",
                    primary: "white",
                    underlineColor: "transparent",
                  },
                }}
              />
            </View>

            <Text style={{ color: "#ffffff", textAlign: "center" }}>
              Modifications:
            </Text>

            <Picker
              selectedValue={selectedMod}
              itemStyle={{
                color: "#ffffff",
                height: 100,
                width: windowWidth / 2 - 20,
                fontSize: 11,
                alignSelf: "center",
              }}
              style={{
                height: windowHeight / 15,
                transform: [
                  { scaleX: windowWidth / 350 },
                  { scaleY: windowWidth / 350 },
                ],
              }}
              ß
              onValueChange={(itemValue, itemIndex) => {
                setDisabled(false);
                setSelectedMod(itemValue);
              }}
            >
              {modifications.map((item) => (
                <Picker.Item label={formatText(item)} value={item} key={item} />
              ))}
            </Picker>

            <TextInput
              style={{
                height: 40,
                marginTop: 40,
                borderWidth: 1,
                padding: 10,
                backgroundColor: "#353535",
                height: 50,
                width: windowWidth - 120,
                fontSize: 9,
                alignSelf: "center",
              }}
              onChangeText={(text) => setBrandName(text)}
              value={brandName}
              placeholderTextColor="#7d7d7d"
              selectionColor="#ffffff"
              theme={{
                colors: {
                  placeholder: "white",
                  text: "white",
                  primary: "white",
                  underlineColor: "transparent",
                },
              }}
              placeholder={selectedMod + " " + "Brand Name"}
            />
          </View>
          <Button
            type="custom"
            containerStyle={{
              backgroundColor: "#2C95F6",
              width: windowWidth - 120,
              height: 50,
              marginVertical: 15,
              alignSelf: "center",
              borderRadius: 1,
            }}
            onPress={() => addMod(selectedMod, brandName)}
          >
            Add to Mod List
          </Button>
          <Text style={{ textAlign: "center", color: "#ffffff" }}>
            Mod List:
          </Text>
          <ScrollView
            verticle={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alignSelf="center"
            style={{
              width: windowWidth - 50,
              height: windowHeight / 5,
              display: "flex",
              marginBottom: 100,
            }}
          >
            {carModifications.map((modification) => {
              return (
                <ModificationCard
                  onPress={() => {
                    console.log("yo");
                  }}
                  onLongPress={() => console.log("index")}
                  type={modification.type.replace(/ /g, "")}
                  name={modification.name}
                  key={modification.name}
                />
              );
            })}
          </ScrollView>

          <Text
            style={{ textAlign: "center", color: "#ffffff", marginBottom: 9 }}
          >
            Upload Images:
          </Text>
          <SimpleImagePicker images={images} setImages={setImages} />
          {colorError && (
            <Text
              style={{ textAlign: "center", color: "red", marginBottom: 8 }}
            >
              Please enter the color of your {garage[n].model}
            </Text>
          )}
          {powerError && (
            <Text
              style={{ textAlign: "center", color: "red", marginBottom: 8 }}
            >
              Please enter the power (HP and TQ) of your {garage[n].model}
            </Text>
          )}
          <Button
            type="custom"
            containerStyle={{
              backgroundColor: "#2C95F6",
              width: windowWidth - 50,
              height: 50,
              alignSelf: "center",
              borderRadius: 1,
            }}
            onPress={() => {
              console.log("s", garage, "e");
              pageThreeSubmit();
            }}
          >
            Next
          </Button>
        </Animated.ScrollView>
      )}
      {page === 4 && (
        <Animated.View
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color="white"
            size={25}
            style={{ alignSelf: "left", paddingLeft: windowWidth * 0.045 }}
            onPress={() => {
              setPage(page - 1);
            }}
          />
          <Text
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontSize: windowWidth * 0.06,
            }}
          >
            preview your profile
          </Text>
          <UserProfile
            navigation={null}
            garageArr={garage}
            userName={userName}
          />
          {!isUploading ? (
            <Button
              onPress={() => {
                submitPost();
                storeUserData(garage);
                setAccountType(true);
              }}
            >
              upload to s3
            </Button>
          ) : null}
          {isUploading ? <ActivityIndicator color={"#fff"} /> : null}
        </Animated.View>
      )}
    </View>
  );
};

export default WelcomeNewUser;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#353535",
    height: 50,
    width: 170,
    fontSize: 12,
    alignSelf: "center",
    // borderBottomColor: "#ffffff",
  },
  carPage: {
    backgroundColor: "#202020",
    height: "100%",
    display: "flex",
  },
  item: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    margin: 4,
  },
});

const modifications = [
  "Downpipe",
  "Turbo",
  "Exhaust",
  "Intake",
  "Suspension",
  "Wheels",
  "Tires",
  "Intercooler",
  "Headers",
  "Fuel System",
  "Super Charger",
  "Big Wang",
  "NOS",
  "Radiator",
  "Short Shifter",
  "Oil Cooler",
  "Pistons",
  "Rods",
  "Camshaft",
  "Transmission",
  "Clutch",
  "Brake Kit",
];

const carModels = {
  acura: { models: ["ilx", "rdx", "rlx", "tlx"] },
  "alfa-romeo": { models: ["4c", "4c-spider"] },
  "aston-martin": {
    models: ["db9-gt", "rapide-s", "v12-vantage-s", "v8-vantage", "vanquish"],
  },
  audi: {
    models: [
      "a3",
      "a3-sportback-e-tron",
      "a4",
      "a6",
      "a7",
      "a8",
      "q3",
      "q5",
      "q7",
      "r8",
      "rs-3",
      "rs-5",
      "rs-7",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "sq5",
      "tt",
      "tts",
      "ttrs",
      "allroad",
    ],
  },
  bmw: {
    models: [
      "2-series",
      "3-series",
      "330i",
      "330e",
      "318i",
      "318e",
      "320is",
      "M325i",
      "333i",

      "4-series",
      "4-series-gran-coupe",
      "5-series",
      "5-series-gran-turismo",
      "6-series",
      "6-series-gran-coupe",
      "7-series",
      "alpina-b6-gran-coupe",
      "alpina-b7",
      "activehybrid-5",
      "activehybrid-7",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m6-gran-coupe",
      "x1",
      "x3",
      "x4",
      "x5",
      "x5-m",
      "x5-edrive",
      "x6",
      "x6-m",
      "z4",
      "i3",
      "i8",
    ],
  },
  bentley: {
    models: ["continental-gt", "flying-spur", "mulsanne"],
  },
  buick: { models: ["cascada", "regal", "verano"] },
  cadillac: {
    models: [
      "ats",
      "ats-coupe",
      "ats-v",
      "ct6",
      "cts",
      "cts-v",
      "cts-v-coupe",
      "elr",
      "escalade",
      "escalade-esv",
      "srx",
      "xt5",
      "xts",
    ],
  },
  chevrolet: {
    models: [
      "camaro",
      "city-express",
      "colorado",
      "corvette",
      "cruze",
      "cruze-limited",
      "express",
      "express-cargo",
      "impala",
      "malibu",
      "malibu-limited",
      "ss",
      "silverado-1500",
      "sonic",
      "spark",
      "spark-ev",
      "suburban",
      "tahoe",
      "trax",
    ],
  },
  chrysler: { models: ["200", "300", "pacifica"] },
  dodge: {
    models: [
      "challenger",
      "charger",
      "dart",
      "durango",
      "grand-caravan",
      "journey",
      "viper",
    ],
  },
  fiat: { models: ["500", "500l", "500x"] },
  ferrari: {
    models: ["458-italia", "california-t", "f12-berlinetta", "ff"],
  },
  ford: {
    models: [
      "c-max-energi",
      "c-max-hybrid",
      "edge",
      "escape",
      "explorer",
      "f-450-super-duty",
      "fiesta",
      "flex",
      "focus-rS",
      "focus-sT",
      "fusion",
      "fusion-energi",
      "fusion-hybrid",
      "mustang",
      "shelby-gt350",
      "taurus",
      "transit-connect",
      "transit-van",
      "transit-wagon",
    ],
  },
  gmc: {
    models: [
      "acadia",
      "canyon",
      "savana",
      "savana-cargo",
      "sierra-2500hd",
      "sierra-3500hd",
      "terrain",
      "yukon",
      "yukon-xl",
    ],
  },
  honda: {
    models: [
      "accord",
      "accord-hybrid",
      "cr-v",
      "cr-z",
      "crosstour",
      "fit",
      "hr-v",
      "pilot",
    ],
  },
  hyundai: {
    models: [
      "accent",
      "azera",
      "elantra",
      "elantra-gt",
      "equus",
      "genesis",
      "genesis-coupe",
      "santa-fe",
      "santa-fe-sport",
      "sonata",
      "sonata-hybrid",
      "sonata-plug-in-hybrid",
      "tucson",
      "veloster",
    ],
  },
  infiniti: {
    models: [
      "q40",
      "q50",
      "q60-convertible",
      "q70",
      "qx50",
      "qx60",
      "qx70",
      "qx80",
    ],
  },
  jaguar: {
    models: ["f-pace", "f-type", "xe", "xf", "xj", "xk"],
  },
  jeep: {
    models: [
      "cherokee",
      "compass",
      "grand-cherokee",
      "grand-cherokee-srt",
      "patriot",
      "renegade",
    ],
  },
  kia: {
    models: [
      "forte",
      "k900",
      "optima",
      "optima-hybrid",
      "rio",
      "sedona",
      "sorento",
      "soul",
      "sportage",
    ],
  },
  lamborghini: { models: ["aventador", "huracan"] },
  "land-rover": {
    models: [
      "discovery-sport",
      "lr2",
      "lr4",
      "range-rover",
      "range-rover-evoque",
      "range-rover-sport",
    ],
  },
  lexus: {
    models: [
      "ct-200h",
      "es-300h",
      "es-350",
      "gs-200t",
      "gs-350",
      "gs-450h",
      "gs-f",
      "gx-460",
      "is-200t",
      "is-250",
      "is-250-c",
      "is-300",
      "is-350",
      "is-350-c",
      "ls-460",
      "ls-600h-l",
      "lx-570",
      "nx-200t",
      "nx-300h",
      "rc-200t",
      "rc-300",
      "rc-350",
      "rc-f",
      "rx-350",
      "rx-450h",
    ],
  },
  lincoln: {
    models: ["mkc", "mks", "mkt", "mkx", "navigator"],
  },
  mini: {
    models: [
      "cooper",
      "cooper-clubman",
      "cooper-countryman",
      "cooper-coupe",
      "cooper-paceman",
      "cooper-roadster",
    ],
  },
  maserati: {
    models: [
      "ghibli",
      "granturismo",
      "granturismo-convertible",
      "quattroporte",
    ],
  },
  mazda: {
    models: ["3", "5", "6", "cx-3", "cx-5", "mx-5-miata"],
  },
  mclaren: { models: ["650s-coupe", "650s-spider"] },
  "mercedes-benz": {
    models: [
      "amg-gt",
      "b-class-electric-drive",
      "cla-class",
      "cls-class",
      "g-class",
      "gl-class",
      "gla-class",
      "glc-class",
      "gle-class",
      "gle-class-coupe",
      "glk-class",
      "maybach",
      "metris",
      "sl-class",
      "slk-class",
      "sls-amg-gt-final-edition",
      "sprinter",
      "sprinter-worker",
    ],
  },
  mitsubishi: {
    models: [
      "lancer",
      "lancer-evolution",
      "mirage",
      "mirage-g4",
      "outlander",
      "outlander-sport",
      "i-miev",
    ],
  },
  nissan: {
    models: [
      "370z",
      "altima",
      "frontier",
      "gt-r",
      "juke",
      "maxima",
      "murano",
      "nv-cargo",
      "nv-passenger",
      "nv200",
      "pathfinder",
      "quest",
      "rogue",
      "rogue-select",
      "sentra",
      "titan-xd",
      "versa",
      "versa-note",
      "xterra",
    ],
  },
  porsche: {
    models: [
      "718-boxster",
      "911",
      "918-spyder",
      "boxster",
      "cayenne",
      "cayman",
      "macan",
      "panamera",
      "GT3",
      "GT3-RS",
      "GT2-RS",
      "GT4",
    ],
  },
  ram: {
    models: [
      "1500",
      "3500",
      "cv-tradesman",
      "promaster-cargo-van",
      "promaster-city",
      "promaster-window-van",
    ],
  },
  "rolls-royce": {
    models: [
      "dawn",
      "ghost-series-ii",
      "phantom",
      "phantom-coupe",
      "phantom-drophead-coupe",
      "wraith",
    ],
  },
  scion: {
    models: ["fr-s", "ia", "im", "iq", "tc", "xb"],
  },
  subaru: {
    models: [
      "brz",
      "crosstrek",
      "forester",
      "legacy",
      "outback",
      "wrx",
      "wrx-sti",
      "xv-crosstrek",
    ],
  },
  toyota: {
    models: [
      "4runner",
      "avalon",
      "avalon-hybrid",
      "camry",
      "camry-hybrid",
      "corolla",
      "highlander-hybrid",
      "land-cruiser",
      "mirai",
      "prius",
      "prius-plug-in",
      "prius-c",
      "prius-v",
      "rav4",
      "rav4-hybrid",
      "sequoia",
      "sienna",
      "supra",
      "tacoma",
      "tundra",
      "venza",
      "yaris",
    ],
  },
  volkswagen: {
    models: [
      "beetle",
      "beetle-convertible",
      "cc",
      "eos",
      "golf",
      "golf-gti",
      "golf-r",
      "golf-sportwagen",
      "jetta",
      "passat",
      "touareg",
      "e-golf",
    ],
  },
  volvo: {
    models: ["s60", "s80", "v60", "v60-cross-country", "xc60", "xc70", "xc90"],
  },
};
