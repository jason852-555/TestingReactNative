import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Overlay from 'react-native-elements';
import moment from 'moment';
import links from './displayTime';
import {Text, View, TouchableOpacity, Platform} from 'react-native';

export const state = {
  dateString: moment(new Date()).format('YYYY-MM-DD'),
  date: new Date(),
  show: false,
};

const onChange = (event: any, selectedDate: any) => {
  const changeDate = new Date(selectedDate);
  //links[2].hour = changeDate.getHours();
  //links[2].minutes = changeDate.getMinutes();
  state.show = false;
  console.log(changeDate.getHours() + ' ' + changeDate.getMinutes());
};

export const showPickerOverlay = () => {
  state.show = true;
};

const hideOverlay = () => {
  state.show = false;
};

function EditTime(this: any): React.JSX.Element {
  return (
    <View style={{flex: 1, borderRadius: 100}}>
      {Platform.OS === 'ios' ? (
        <Overlay isVisible={state.show}>
          <View>
            <TouchableOpacity onPress={hideOverlay}>
              <Text style={{paddingHorizontal: 15}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideOverlay}>
              <Text style={{paddingHorizontal: 15, color: 'green'}}>Done</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={state.date}
            mode={'time'}
            is24Hour={true}
            onChange={onChange}
            style={{backgroundColor: 'white'}}
          />
        </Overlay>
      ) : (
        <>
          {state.show && (
            <DateTimePicker
              value={state.date}
              mode={'time'}
              is24Hour={true}
              onChange={onChange}
              style={{backgroundColor: 'white'}}
            />
          )}
        </>
      )}
    </View>
  );
}

export default EditTime;
