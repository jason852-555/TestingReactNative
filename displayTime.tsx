import React, {Fragment, useState} from 'react';
import type {Node} from 'react';
import EditTime, {showPickerOverlay, state} from './editTime';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

var myinterval: any;

// Should be mutable by user
export let links = [
  {
    id: 1,
    title: 'Wake up', // Link to wake up playlist
    link: 'https://reactnative.dev/docs/tutorial',
    hour: 8,
    minutes: 0,
    timeLeft: '',
    notified: false,
  },
  {
    id: 2,
    title: 'Start study', // Link to React Native doc
    link: 'https://reactnative.dev/docs/style',
    hour: 10,
    minutes: 0,
    timeLeft: '',
    notified: false,
  },
  {
    id: 3,
    title: 'Lunch break', // Link to open rice
    link: 'https://reactnative.dev/docs/flexbox',
    hour: 12,
    minutes: 0,
    timeLeft: '',
    notified: false,
  },
  {
    id: 5,
    title: 'Tea time', // Link to open rice
    link: 'https://reactnative.dev/docs/components-and-apis',
    hour: 15,
    minutes: 0,
    timeLeft: '',
    notified: false,
  },
  {
    id: 4,
    title: 'Done for the day', // Link to Youtube
    link: 'https://reactnative.dev/docs/components-and-apis',
    hour: 18,
    minutes: 0,
    timeLeft: '',
    notified: false,
  },
];

const DisplayTime = (): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const [displayText, setDisplayText] = useState(links);
  myinterval = setInterval(() => {
    const currentTime = Date.now();
    const currentDate = new Date(currentTime);
    const currentHour = currentDate.getHours();
    var updateString = '';
    var id = 0;

    const updateText = displayText.map(() => {
      if (currentHour < links[id].hour) {
        const hourLeft = links[id].hour - (currentHour + 1);
        const presetDate = new Date(
          currentDate.setHours(links[id].hour, links[id].minutes, 0, 0),
        );
        const recordedDate = new Date(presetDate - currentTime);
        updateString =
          'Time left' +
          '\n' +
          hourLeft +
          'hr ' +
          recordedDate.getMinutes() +
          'mins ' +
          recordedDate.getSeconds() +
          'sec';
      } else {
        updateString = 'Done!!!';
      }
      links[id].timeLeft = updateString;
      id++;
    });
    setDisplayText(updateText);
  }, 1000);
  if (state.show) {
    clearInterval(myinterval);
  }
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      {links.map(({id, title, timeLeft}) => (
        <Fragment key={id}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              showPickerOverlay();
            }}
            style={linksStyles.linkContainer}>
            <Text style={linksStyles.link}>{title}</Text>
            <Text
              style={[
                linksStyles.description,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              {timeLeft}
            </Text>
          </TouchableOpacity>
        </Fragment>
      ))}
      <EditTime />
    </View>
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

export default DisplayTime;
