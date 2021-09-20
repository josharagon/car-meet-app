const Images = [
  { image: require("./assets/images/meet1.jpg") },
  { image: require("./assets/images/meet2.jpg") },
  { image: require("./assets/images/meet3.jpg") },
];

export const onGoingMeets = [
  {
    name: "Nation Wide",
    coordinate: {
      latitude: 39.96124,
      longitude: -104.99162,
    },
    img: Images[0].image,
  },
  {
    name: "DKC",
    coordinate: {
      latitude: 39.766121,
      longitude: -104.780296,
    },
    img: Images[1].image,
  },
  {
    name: "SLS",
    coordinate: {
      latitude: 39.76852,
      longitude: -104.8103,
    },
    img: Images[2].image,
  },
];
