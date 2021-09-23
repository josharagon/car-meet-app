import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import SettingTab from "./SettingTab";
import { Input } from "react-native-elements/dist/input/Input";
import { TextInput } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const WelcomeNewUser = ({ name }) => {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedMake, setSelectedMake] = useState("acura");
  const [selectedModel, setSelectedModel] = useState("llx");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [carModifications, setCarModifications] = useState([]);
  const [selectedMod, setSelectedMod] = useState("Downpipe");
  const [brandName, setBrandName] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("manual");
  const [garage, setGarage] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dbRef = firebase.database().ref();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const checkUserNameAvailability = async () => {
    await dbRef;
    dbRef
      .child("users")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          Object.values(snapshot.val()).map((user) => {
            user.usernamename;
          });
        }
      });
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
    console.log(selectedYear);
    if (selectedMake && selectedModel && selectedYear) {
      carObj.make = selectedMake;
      carObj.model = selectedModel;
      carObj.year = selectedYear;
      garage.push(carObj);
      setSelectedMake("acura");
      setSelectedModel("llx");
      setSelectedYear("");
      setDisabled(true);
    } else {
      return;
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

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
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
        justifyContent: "center",
      }}
    >
      <SafeAreaView />
      {page === 0 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          Welcome to {"\n"} Meets {"\n"} {name}!
        </Animated.Text>
      )}
      {page === 1 && (
        <Animated.View
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 38,
              marginBottom: 10,
            }}
          >
            choose your username:
          </Text>
          <Input
            placeholderTextColor="#7d7d7d"
            color="#ffffff"
            value={input}
            placeholder="username"
            paddingLeft={20}
            onChangeText={(text) => setInput(text.replace(/\s/g, ""))}
          />
          <Text
            style={{
              position: "relative",
              bottom: 56,
              left: 10,
              fontSize: 20,
              color: "#ffffff",
            }}
          >
            @
          </Text>
        </Animated.View>
      )}
      {page === 2 && (
        <Animated.ScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          style={(styles.carPage, { opacity: fadeAnim })}
          justifyContent="center"
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 40,
              lineHeight: 40,
            }}
          >
            What's in your garage?
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#ffffff" }}>Year:</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              onChangeText={(text) => setSelectedYear(text)}
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
          <Button
            title="Add to Garage"
            disabled={disabled}
            onPress={() => addToGarage()}
          />
          <Text style={{ textAlign: "center", color: "#ffffff" }}>
            Your Garage:
          </Text>
          <FlatList
            data={handleGarageList()}
            textColor={{ color: "#ffffff" }}
            style={{ marginTop: 20, height: windowHeight / 5 }}
            renderItem={({ item }) => (
              <Text
                style={styles.item}
                onLongPress={() => console.log("longPress")}
              >
                {item.key}
              </Text>
            )}
          />
        </Animated.ScrollView>
      )}
      {page === 3 && (
        <Animated.ScrollView
          opacity={fadeAnim}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          justifyContent="center"
          alignSelf="center"
          alignItems="center"
        >
          <Text style={{ color: "#ffffff", fontSize: 30, marginBottom: 35 }}>
            Tell Us More About your {formatText(garage[0].model)}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Color:</Text>
              <TextInput
                style={({ width: windowWidth / 2 - 20 }, styles.input)}
                placeholder="Color"
                onChangeText={(text) => setSelectedColor(text)}
                value={selectedColor}
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
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Trim:</Text>
              <TextInput
                style={styles.input}
                placeholder="Trim (Optional)"
                onChangeText={(text) => setSelectedTrim(text)}
                value={selectedTrim}
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
          </View>
          <Text style={{ color: "#ffffff" }}>Color:</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Picker
              selectedValue={selectedMod}
              itemStyle={{
                color: "#ffffff",
                height: 100,
                width: windowWidth / 2 - 20,
              }}
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
              style={styles.input}
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
            title="Add to Mod List"
            disabled={disabled}
            onPress={() => addMod(selectedMod, brandName)}
          />
          <Text style={{ textAlign: "center", color: "#ffffff" }}>
            Your Modifications:
          </Text>
          <FlatList
            data={handleModList()}
            textColor={{ color: "#ffffff" }}
            style={{ marginTop: 20, height: windowHeight / 5 }}
            renderItem={({ item }) => (
              <Text
                style={styles.item}
                onLongPress={() => console.log("longPress")}
              >
                {item.key}
              </Text>
            )}
          />
        </Animated.ScrollView>
      )}
      {page === 4 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          5
        </Animated.Text>
      )}
      <Button
        title="Next"
        onPress={() => {
          // console.log(checkUserNameAvailability());
          setDisabled(false);
          fadeOut();
          setTimeout(() => {
            setPage(page + 1);
            fadeIn();
          }, 1000);
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          setDisabled(false);
          fadeOut();
          setTimeout(() => {
            setPage(page - 1);
            fadeIn();
          }, 1000);
        }}
      />
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
  "HPFP",
  "Meth Kit",
  "Super Charger",
  "Pro Charger",
  "BIG WANG",
  "NOS Kit",
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
      "focus-rs",
      "focus-st",
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
