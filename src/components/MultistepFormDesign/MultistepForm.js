import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {selectInOut} from '../../../Assets/constantData/unit';
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';

const MultistepForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('Select Date Of Birth');
  const [isFocus, setIsFocus] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      dateofbirth: '',
      email: '',
      username: '',
      gender: '',
      hobbies: '',
      age: '',
      isAdmin: '',
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date, setValue) => {
    try {
      var dates = new Date(date);
      (mnth = ('0' + (dates.getMonth() + 1)).slice(-2)),
        (day = ('0' + dates.getDate()).slice(-2));
      const birthdate = [dates.getFullYear(), mnth, day].join('-');
      setValue(birthdate);
      setDob(birthdate);
    } catch (error) {
      console.log(error, 'date error');
    }
    hideDatePicker();
  };

  const onSubmit = async data => {
    console.log(data, 'data');
  };

  return (
    <View>
      <View style={{backgroundColor: '#F2994A', padding: 10, marginBottom: 10}}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Multi Step Form
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Firstname"
                  maxLength={15}
                />
              )}
              name="name"
            />
          </View>
          {errors.name && <Text style={{color: 'red'}}>This is required.</Text>}
        </View>
        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Lastname"
                  maxLength={15}
                />
              )}
              name="lastname"
            />
          </View>
          {errors.lastname && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>
        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Email"
                  maxLength={15}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>
        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              padding: 14,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <TouchableOpacity onPress={showDatePicker}>
                    <Text>{dob}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={date => handleConfirm(date, onChange)}
                    onCancel={hideDatePicker}
                    minimumDate={
                      new Date(
                        moment().subtract(120, 'years').format('YYYY-MM-DD'),
                      )
                    }
                    maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                  />
                </View>
              )}
              name="dateofbirth"
            />
          </View>
          {errors.dateofbirth && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              padding: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Dropdown
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={selectInOut}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? ' Select Gender' : ' Select '}
                  searchPlaceholder="Search..."
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
              name="gender"
            />
          </View>
          {errors.gender && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Username"
                  maxLength={15}
                />
              )}
              name="username"
            />
          </View>
          {errors.username && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Hobbies"
                  maxLength={15}
                />
              )}
              name="hobbies"
            />
          </View>
          {errors.hobbies && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Age"
                  maxLength={15}
                  keyboardType="numeric"
                />
              )}
              name="age"
            />
          </View>
          {errors.age && <Text style={{color: 'red'}}>This is required.</Text>}
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'pink',
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Are you Admin ?"
                  maxLength={15}
                />
              )}
              name="isAdmin"
            />
          </View>
          {errors.isAdmin && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{backgroundColor: 'orange', padding: 12, margin: 5}}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MultistepForm;

const styles = StyleSheet.create({});
