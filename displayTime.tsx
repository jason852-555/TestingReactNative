import React, {Fragment, useState} from 'react';
import type {Node} from 'react';
import EditTime, {showPickerOverlay, state} from './editTime';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {defaultValue} from './defaultTime';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

var textCountDownInterval: any;

const DisplayTime = (): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const [displayText, setDisplayText] = useState(defaultValue);
  textCountDownInterval = setInterval(() => {
    const currentTime = Date.now();
    const currentDate = new Date(currentTime);
    const currentHour = currentDate.getHours();
    var updateString = '';
    var id = 0;

    const updateText = displayText.map(() => {
      if (currentHour < defaultValue[id].hour) {
        const hourLeft = defaultValue[id].hour - (currentHour + 1);
        const presetDate = new Date(
          currentDate.setHours(
            defaultValue[id].hour,
            defaultValue[id].minutes,
            0,
            0,
          ),
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
      defaultValue[id].timeLeft = updateString;
      id++;
    });
    setDisplayText(updateText);
  }, 1000);
  if (state.show) {
    clearInterval(textCountDownInterval);
  }
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      {defaultValue.map(({id, title, timeLeft}) => (
        <Fragment key={id}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              showPickerOverlay(id);
            }}
            style={timeSlotStyles.linkContainer}>
            <Text style={timeSlotStyles.link}>{title}</Text>
            <Text
              style={[
                timeSlotStyles.description,
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
};

const timeSlotStyles = StyleSheet.create({
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
});

export default DisplayTime;
