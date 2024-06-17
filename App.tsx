/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Fragment, useState} from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  time: number;
}>;

// Should be mutable by user
let links = [
  {
    id: 1,
    title: 'Wake up', // Link to wake up playlist
    link: 'https://reactnative.dev/docs/tutorial',
    time: 8,
    timeLeft: "",
    notified: false,
  },
  {
    id: 2,
    title: 'Start study',  // Link to React Native doc
    link: 'https://reactnative.dev/docs/style',
    time: 10,
    timeLeft: "",
    notified: false,
  },
  {
    id: 3,
    title: 'Lunch break',  // Link to open rice
    link: 'https://reactnative.dev/docs/flexbox',
    time: 12,
    timeLeft: "",
    notified: false,
  },
  {
    id: 5,
    title: 'Tea time',  // Link to open rice
    link: 'https://reactnative.dev/docs/components-and-apis',
    time: 15,
    timeLeft: "",
    notified: false,
  },
  {
    id: 4,
    title: 'Done for the day',    // Link to Youtube
    link: 'https://reactnative.dev/docs/components-and-apis',
    time: 18,
    timeLeft: "",
    notified: false,
  },
];

function updateTime(){
  state = {
    dateString: moment(new Date()).format('YYYY-MM-DD'),
    date: new Date(),
    show: false
  };

onChange = (event: any, selectedDate: any) => {
    console.log(selectedDate)
    this.setState({dateString: moment(selectedDate).format('YYYY-MM-DD'), date: selectedDate})
  }
showOverlay = () => {
    this.setState({ show: true})
  }
hideOverlay = () => {
    this.setState({ show: false})
  }

    return (
       <View style={{ flex: 1, borderRadius: 100}}>
              <TouchableOpacity onPress={this.showOverlay} style={styles.inputContainerStyle}>
                {this.state.dateString ? (
                  <Text style={styles.textStyle}>{this.state.dateString}</Text>
                ) : (
                  <Text style={styles.placeholderStyle}>{this.props.placeholder}</Text>
                )}
              </TouchableOpacity>
              {Platform.OS === 'ios' ? (
                <Overlay isVisible={this.state.show} onBackdropPress={this.hideOverlay} overlayStyle={styles.overlayStyle}>
                  <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={this.hideOverlay}>
                      <Text style={{ paddingHorizontal: 15 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.hideOverlay}>
                      <Text style={{ paddingHorizontal: 15, color: 'green' }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                    style={{ backgroundColor: 'white' }}
                  />
                </Overlay>
              ) : (
                <>
                  {this.state.show &&
                  <DateTimePicker
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                    style={{ backgroundColor: 'white' }}
                  />
                  }
                </>
              )}
            </View>
          );
}

// main function
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [displayText, setDisplayText] = useState(links);
  setInterval(() => {
    const currentTime = Date.now()
    const currentDate = new Date(currentTime)
    const currentHour = currentDate.getHours()
    var updateString = ""
    var hourLeft = 0
    var presetDate = 0
    var loop = 0;
    // The preset date should be 18:00:00 everyday
    // We may make it mutable in the future.

     const updateText = displayText.map( blockInfo =>{
        if(currentHour<links[loop].time) {
           hourLeft = links[loop].time - (currentHour + 1)
           presetDate  = new Date(currentDate.setHours(links[loop].time,0,0,0))
           const recordedDate = new Date(presetDate - currentTime)
           updateString =  "Time left"+"\n"+hourLeft+
                           "hr "+recordedDate.getMinutes()+
                           "mins "+recordedDate.getSeconds()+"sec"
        } else {
           updateString = "Done!!!"
        }
        links[loop].timeLeft = updateString
        loop++
     });
     setDisplayText(updateText)
    }, 1000);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header/>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
      <View style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      {links.map(({id, title, link, timeLeft}) => (
        <Fragment key={id}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => Linking.openURL(link)}
            style={linksStyles.linkContainer}>
            <Text style={linksStyles.link}>{title}</Text>
            <Text
              style={[
                linksStyles.description,
                {
                  color: isDarkMode ? Colors.white : Colors.black
                  ,
                },
              ]}>
              {timeLeft}
            </Text>
          </TouchableOpacity>
        </Fragment>
      ))}
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const linksStyles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    textAlign: 'right',
    fontWeight: '400',
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
