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
  WebView,
  TextInput,
  TouchableOpacity,
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
import DateTimePicker from "react-native-modal-datetime-picker";
import xstyles from "./externalstyle";

import { StackNavigator } from "react-navigation";

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: align,
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 15
  };
};

export default class requestVisit extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    phoneNumber: "",
    email: "",
    datetime: "Pick a date",
    name: "",
    notes: "",
    isDateTimePickerVisible: false,
    messages: "",
    loading: false,
    userid: "",
    address: "",
    nicedate: "Pick a date"
  };

  constructor(props) {
    super(props);
    this.bookHandler = this.bookHandler.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      datetime: "" + date.toISOString(),
      nicedate: "" + date.toString()
    });
    this._hideDateTimePicker();
  };

  chargeHandler() {
    const { navigate } = this.props.navigation;

    const { phone, email, datetime, name, address, userid, token } = this.state;

    if (
      datetime !== "Pick a date" &&
      phone !== "" &&
      name !== "" &&
      address !== ""
    ) {
      Alert.alert(
        "Home Visit Pricing",
        "Please note that a Home Visit request will cost you NGN 10,000. Do you wish to continue?",
        [
          {
            text: "YES",
            onPress: () => navigate("addCard", { details: this.state })
          },

          {
            text: "NO",
            onPress: () => console.log("OK Pressed")
          }
        ],
        { cancelable: false }
      );

      //this.setState({ error: "", loading: true });
    } else {
      alert("Please complete all fields");
    }
  }

  bookHandler() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;

    this.setState({ error: "", loading: true });

    const { phone, email, datetime, name, address, userid, token } = this.state;

    try {
      var details = {
        UserId: userid,
        Name: name,
        Address: address,
        Date: datetime,
        Status: 1
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch("http://hbx.stripestech.com" + "/api/HBXCore/CreateHomeVisit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },

        body: formBody
      })
        .then(response => response.json())
        .then(async data => {
          //alert(JSON.stringify(data));
          if (data.hbx_response) {
            this.setState({ error: "", loading: false });

            navigate("Home");
            alert("Home visit request sent successfully");
          } else {
            //alert(JSON.stringify(data));
            this.setState({
              error:
                "There was a problem booking your home visit, please check all fields.",
              loading: false
            });
          }
        })
        .catch(error => {
          alert(JSON.stringify(error.message));
          this.setState({ error: "Sorry, " + error.message, loading: false });
        });
    } catch (e) {
      //alert(JSON.stringify(e.message));
      this.setState({ error: e.message, loading: false });
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          style={[
            styles.centering,
            { height: 80, marginTop: 60, marginBottom: 50 }
          ]}
          size="large"
          color="green"
        />
      );
    }

    return (
      <Button style={styles.button2} onPress={e => this.chargeHandler(e)}>
        <Text style={styles.buttontxt}>Submit Request</Text>
      </Button>
    );
  }

  async componentWillMount() {
    const { navigate } = this.props.navigation;

    try {
      const toks = await AsyncStorage.getItem("token");
      const userid = await AsyncStorage.getItem("userId");
      const emai = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const addr = await AsyncStorage.getItem("address");
      const phonen = await AsyncStorage.getItem("phoneNumber");

      if (
        toks !== "" ||
        userid !== "" ||
        name !== "" ||
        email !== "" ||
        addr !== "" ||
        phonen !== ""
      ) {
        this.setState({
          token: toks,
          userid: userid,
          email: emai,
          name: name,
          address: addr,
          phoneNumber: phonen
        });
      }
    } catch (e) {
      //silence is golden
    }
  }

  async componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    let min = new Date();

    return (
      <Container>
        <Header style={styles.headr} androidStatusBarColor="#394753">
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="keyboard-arrow-left" style={styles.ico} />
            </Button>
          </Left>

          <Body>
            <Text>Request Home Visit</Text>
          </Body>

          <Right />
        </Header>
        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: "white" }}
        >
          <Grid style={styles.viewcontain}>
            <Row style={styles.contenti}>
              <Col>
                <Form>
                  <Item stackedLabel>
                    <Label>Name</Label>
                    <Input
                      style={styles.nput}
                      onChangeText={text => this.setState({ name: "" + text })}
                      defaultValue={this.state.name}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Phone</Label>
                    <Input
                      style={styles.nput}
                      onChangeText={text =>
                        this.setState({ phoneNumber: "" + text })}
                      defaultValue={this.state.phoneNumber}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Date</Label>
                    <TouchableOpacity
                      onPress={() => this._showDateTimePicker()}
                      style={styles.datecontain}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#123456"
                        }}
                      >
                        {this.state.nicedate}
                      </Text>
                    </TouchableOpacity>
                  </Item>

                  <Item stackedLabel last>
                    <Label>Address</Label>
                    <Input
                      style={styles.nput}
                      onChangeText={text =>
                        this.setState({ address: "" + text })}
                      defaultValue={this.state.address}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode="datetime"
                    minimumDate={min}
                  />

                  <Text style={{ marginTop: 10 }}>
                    {this.state.error}
                  </Text>
                </Form>

                {this.renderButtonOrSpinner()}
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white"
  },

  login: {
    marginTop: 20,
    alignItems: "center"
  },
  top: {
    justifyContent: "center"
  },

  button2: {
    backgroundColor: "#f26c4d",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 25
  },
  buttontxt: {
    color: "white",
    alignSelf: "center",
    fontWeight: "600"
  },

  foot: {
    backgroundColor: "#494949"
  },

  head: {
    backgroundColor: "white"
  },

  ico: {
    color: "#f26c4d",
    fontSize: 27
  },

  contenti: {
    alignSelf: "center",
    marginHorizontal: 20
  },
  datecontain: {
    alignSelf: "flex-start",
    marginTop: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#123456",
    width: "auto",
    padding: 10,
    alignItems: "center",
    borderStyle: "dashed"
  },

  headr: {
    backgroundColor: "white",
    shadowOpacity: 0
  },
  headtxt: {
    color: "white"
  },

  nput: {}
});
