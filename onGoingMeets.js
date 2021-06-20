const Images = [
  { image: require("./assets/meet1.jpg") },
  { image: require("./assets/meet2.jpg") },
  { image: require("./assets/meet3.jpg") },
];

export const onGoingMeets = [
  {
    name: "Meet1",
    coordinate: {
      latitude: 39.96124,
      longitude: -104.99162,
    },
    img: Images[0].image,
  },
  {
    name: "Meet2",
    coordinate: {
      latitude: 39.766121,
      longitude: -104.780296,
    },
    img: Images[1].image,
  },
  {
    name: "Meet3",
    coordinate: {
      latitude: 39.76852,
      longitude: -104.8103,
    },
    img: Images[2].image,
  },
];
