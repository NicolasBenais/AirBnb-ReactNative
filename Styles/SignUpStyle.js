const styles = {
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    height: "100%",
    padding: 32,
    alignItems: "center",
    justifyContent: "space-around",
  },

  header: {
    alignItems: "center",
  },

  logo: {
    height: 200,
    width: 200,
  },

  h1: {
    fontSize: 28,
    fontWeight: "bold",
    color: "grey",
  },

  form: {
    width: "100%",
    marginTop: 32,
  },

  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "#FF5A5F",
    borderWidth: 2,
    marginBottom: 32,
    height: 40,
  },

  bottomContainer: {
    marginBottom: 60,
    alignItems: "center",
  },

  errorMessage: {
    color: "red",
  },

  submitButton: {
    marginBottom: 24,
    marginTop: 16,
    borderColor: "#FF5A5F",
    borderWidth: 3,
    padding: 12,
    borderRadius: 99,
    width: 200,
    alignItems: "center",
  },

  textButton: {
    fontSize: 22,
    color: "grey",
  },
};

export default styles;
