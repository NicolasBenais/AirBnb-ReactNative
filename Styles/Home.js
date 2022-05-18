const styles = {
  main: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "lightgrey",
  },

  container: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 20,
  },

  topContainer: {
    width: "100%",
  },

  containerImg: {
    width: "100%",
    height: 180,
    position: "relative",
  },

  price: {
    position: "absolute",
    bottom: 8,
    width: "27%",
    height: "26%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
    paddingTop: 10,
  },

  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },

  bottomLeftContainer: {
    width: "76%",
  },

  titleContainer: {
    fontSize: 16,
    fontWeight: "500",
  },

  rates: {
    flexDirection: "row",
    height: 48,
    alignItems: "center",
  },

  starsRates: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    marginRight: 8,
  },

  reviews: {
    color: "grey",
  },

  userPhoto: {
    borderRadius: 99,
    width: 80,
    height: 80,
  },
};

export default styles;
