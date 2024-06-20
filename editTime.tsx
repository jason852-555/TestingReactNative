import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Overlay from 'react-native-elements';
import moment from 'moment';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import {defaultValue} from './defaultTime';

export const state = {
  dateString: moment(new Date()).format('YYYY-MM-DD'),
  date: new Date(),
  id: 0,
  show: false,
};

const onChange = (event: any, selectedDate: any) => {
  const changeDate = new Date(selectedDate);
  defaultValue[state.id].hour = changeDate.getHours();
  defaultValue[state.id].minutes = changeDate.getMinutes();
  state.show = false;
  console.log(changeDate.getHours() + ' ' + changeDate.getMinutes());
};

export const showPickerOverlay = (id: number) => {
  state.id = id - 1;
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
            display={'spinner'}
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
              display={'spinner'}
              onChange={onChange}
              is24Hour={true}
              style={{backgroundColor: 'white'}}
            />
          )}
        </>
      )}
    </View>
  );
}

export default EditTime;
