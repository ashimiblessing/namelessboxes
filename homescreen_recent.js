/**
 * React Native App
 * By Ashimi Blessing
 * @flow
 */

//import React, { Component } from "react";
//import { AppRegistry, StyleSheet, Text, View } from "react-native";

import React, { Component } from "react";

import {
  NetInfo,
  AppRegistry,
  StyleSheet,
  Image,
  View,
  ToolbarAndroid,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Text,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Linking,
  StatusBar
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Form,
  Item,
  Input,
  Label,
  Grid,
  Row,
  Col
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator } from "react-navigation";
//import RNImmediatePhoneCall from "react-native-immediate-phone-call";

import Modal from "react-native-modal";

import * as firebase from "firebase";

boxingStyle = function(myColor) {
  return {
    justifyContent: "center",

    width: 75,
    height: 75,
    borderRadius: 37.5,

    backgroundColor: myColor,
    flexDirection: "column",
    marginBottom: 7
  };
};

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: "center",
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 10
  };
};

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    isModalVisible: false,
    loading: false,
    usr: ""
  };

  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  async callHandler(who) {}

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    navigate("Welcome", { message: "Please Login" });
  }

  componentWillMount() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({ usr: user.displayName });
    } else {
      const dname = "User";
    }

    //  var user = firebase.auth().currentUser;
    //alert(user.displayName);
    /*






    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
    } else {
      const { navigate } = this.props.navigation;

      AsyncStorage.removeItem("logincookie");
      await firebase.auth().signOut();

      navigate("Welcome", { message: "Session Closed" });

      // No user is signed in.
    }

      */
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <Container style={styles.viewcontain}>
        <Header
          style={{ backgroundColor: "#f26c4d" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />
          <Body>
            <Text style={textisize(20, "white", "500")}>Dashboard</Text>
          </Body>
        </Header>
        <Content
  keyboardShouldPersistTaps="always"
  keyboardDismissMode="on-drag">
          <Grid>
            <Row style={styles.topsmall}>
              <Col>
                <Image
                  source={require("./images/doctors.jpg")}
                  style={styles.dashimg}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <TouchableHighlight
                  style={{
                    justifyContent: "center"
                  }}
                >
                  <Text style={styles.dname}>
                    Welcome {this.state.usr}
                  </Text>
                </TouchableHighlight>
              </Col>
            </Row>

            <Row size={1} style={styles.juxt}>
              <Col style={styles.box}>
                <TouchableOpacity
                  style={boxingStyle("#25363e")}
                  onPress={() => navigate("callMiddleMan")}
                >
                  <Icon active name="call" style={styles.headicon} />
                </TouchableOpacity>
                <Text style={styles.ctxt}>Call Specialists</Text>
              </Col>
              <Col style={styles.box}>
                <TouchableOpacity
                  style={boxingStyle("#8b7860")}
                  onPress={() => navigate("Appoint", { appoint: "book" })}
                >
                  <Icon active name="people" style={styles.headicon} />
                </TouchableOpacity>
                <Text style={styles.ctxt}>Appointments</Text>
              </Col>
            </Row>

            <Row size={1} style={styles.juxt}>
              <Col style={styles.box}>
                <TouchableOpacity
                  style={boxingStyle("#607d8b")}
                  onPress={() => navigate("Viewer", { parami: "account" })}
                >
                  <Icon active name="edit" style={styles.headicon} />
                </TouchableOpacity>

                <Text style={styles.ctxt}>Records</Text>
              </Col>

              <Col style={styles.box}>
                <TouchableOpacity
                  style={boxingStyle("#3e301f")}
                  onPress={() => navigate("requestVisit")}
                >
                  <Icon active name="accessibility" style={styles.headicon} />
                </TouchableOpacity>
                <Text style={styles.ctxt}>Request Home Visit </Text>
              </Col>
            </Row>
          </Grid>
        </Content>

        <Footer style={styles.foot}>
          <FooterTab>
            <Button onPress={() => navigate("Home")}>
              <Icon name="home" style={styles.ico} />
            </Button>
            <Button onPress={() => navigate("User")}>
              <Icon name="account-circle" style={styles.ico} />
            </Button>
            <Button onPress={() => this.signOut()}>
              <Icon name="highlight-off" style={styles.ico} />
            </Button>
            <Button onPress={() => navigate("addCard")}>
              <Icon name="info" style={styles.ico} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");
var topsmallheight = height * 0.35;
var tsimg = topsmallheight;

var styles = StyleSheet.create({
  viewcontain: {
    backgroundColor: "#ffffff"
  },

  topsmall: {
    height: height * 0.35,
    backgroundColor: "white"
  },

  figurecontain1: {
    height: 30,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 0,
    width: width
  },

  figurecontain2: {
    height: 30,
    backgroundColor: "green",
    position: "absolute",
    bottom: 30,
    width: width
  },

  thefigure: {
    fontWeight: "600",
    fontSize: 20
  },
  bottom: {
    backgroundColor: "white",
    alignSelf: "center",
    maxWidth: width * 0.8,
    marginTop: 20,
    height: height * 0.5
  },
  ctxt: {
    color: "#191919",
    fontWeight: "400",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 25
  },

  box: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: width * 0.015
  },
  headicon: {
    fontSize: 40,
    color: "white",
    alignSelf: "center"
  },

  ico: {
    color: "#efefef",
    fontSize: 27
  },
  juxt: {
    justifyContent: "center",
    maxWidth: width,
    alignItems: "center"
  },

  foot: {
    backgroundColor: "#494949"
  },
  dashimg: {
    maxWidth: width,
    height: tsimg
  },

  callbutton: {
    backgroundColor: "#f26c4d",
    marginTop: 20,
    marginTop: 10,
    width: 200,
    alignSelf: "center",
    justifyContent: "center"
  },
  cbuttontxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "600"
  },

  modalchild: {
    width: width * 0.7,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    height: undefined,
    padding: 22
  },

  closebutt: {
    width: 100,
    backgroundColor: "#efefef",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30
  },

  dname: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 25,

    color: "#181818",
    alignSelf: "center"
  },

  favico: {
    color: "#f26c4d",
    fontSize: 30,
    marginTop: 17
  }
});
