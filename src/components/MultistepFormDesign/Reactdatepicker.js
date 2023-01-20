import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const Reactdatepicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    console.log('open');
    setDatePickerVisibility(true);
  };
  const handleConfirm = async date => {
    setDatePickerVisibility(false);
  };
  return (
    <View>
      <Text>Reactdatepicker</Text>

      <Button title="open" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        minimumDate={
          new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
        }
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
      />
    </View>
  );
};

export default Reactdatepicker;

const styles = StyleSheet.create({});
