import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import selectUnitOptions from '../../Assets/constantData/unit';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import selectCategoryOptions from '../../Assets/constantData/category';
import DocumentPicker from 'react-native-document-picker';
import Api from '../API_Servies/Api';

let token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjNkYzQzZmY1NmRiYzVhNmYyNzUyZTA3ZDIyZjA0ZjdhODliMzY2NzYwMzJlNDRiMzBiMTkxZGZiZWI4YzkxMDE4NWE0YWVkNzVjY2NlNDYiLCJpYXQiOjE2NzM1ODk5MjEuNDAxMTE3LCJuYmYiOjE2NzM1ODk5MjEuNDAxMTIsImV4cCI6MTcwNTEyNTkyMS4yMzY4MDksInN1YiI6IjEzIiwic2NvcGVzIjpbXX0.tJpRc1A9pAoL4ub2kF-RvbE_SSSNPcWRut5njaik38lxGpvNkBDFXalwO7hVIx1dJlrrEmNz9LnSTClqsDK03XV0gjomHRolY3x1_coxVy__7X2GFFC3Mg7haONt6exoPN8cu8zUDrps0dyN8wfCd_BHp90nBcmFo9IfnJkseSAMGyxFOch5BumreOcwpjfAF0MS72y-rUfpk5UuJpQUsvv5NtB4DwLxv13r1xdL7qFjkm9YRRB3g3rdBCELcxln6VPeRSoCY0GOM4T2_OADYhg_t1PrahSZaU76kuyQtLFicaa1afK0B8Ll6ael6V3fCF2gYHuwp5n8VB5gNSyFDuGwSZ2cz04tDa7Zndrih0Z9u7QQU-Z6nVRx03eOJNK87dLAXtANkj21y6ke0DrtJSvLjmXSwkmNn_zSDkoqIunaZ8nYiyFk3g8OuFQBO9wPPrTJT3Sq2LytNiuqohdH5mgfiIdKgDcXRN-eBBtQgooaPfkqQfKL5cH2grkkmrLsaFR65lhiM-oezYqlCRpocKbqStwlEk6mT8Lwg7i9R4qzhoghYDyld-igsMZ-ndvBZ4YvkEAoiGREPwRRr6YjiBuPQZVyt-udceDoZQd6I_HYfNYvj4WtPdEAMf9oep125xLjilKt-EWBDTp2UUZT4jwDQryIL6eHjkacyYzBHnk';

const AddProduct = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      barcode: '',
      name: '',
      unit: '',
      category: '',
      price: '',
      quantity: '',
      product_description: '',
      image: '',
    },
  });

  const onSubmit = async data => {
    var formdata = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key == 'unit' || key == 'category') {
        formdata.append(key, value?.label);
      } else if (key == 'image') {
        formdata.append(key, value);
      } else {
        formdata.append(key, value);
      }
    }
    console.log(formdata, 'formdata');

    try {
      let headersObj = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      };
      let url = 'http://192.168.1.34:8000/api/product';
      let res = await axios.post(url, formdata, headersObj);

      console.log(res, 'api response');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  //image picker
  const pickImage = async () => {
    try {
      const response = await DocumentPicker?.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('seting images', response);
      setImage(response?.name);
      setValue('image', response);
    } catch (error) {
      setImage(null);

      Alert.alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };
  return (
    <ScrollView style={{}}>
      <View style={{margin: 10}}>
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
              placeholder="Barcode"
              keyboardType="numeric"
              maxLength={9}
            />
          )}
          name="barcode"
        />
        {errors.barcode && <Text>This is required.</Text>}
      </View>

      <View style={{margin: 10}}>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Name"
            />
          )}
          name="name"
        />
        {errors.name && <Text>This is required.</Text>}
      </View>

      {/* category */}
      <View
        style={{margin: 10, borderColor: 'white', borderWidth: 1, padding: 10}}>
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
              data={selectCategoryOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? ' Select Category' : ' category '}
              searchPlaceholder="Search..."
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="category"
        />
        {errors.category && <Text>This is required.</Text>}
      </View>

      {/* unit */}

      <View
        style={{margin: 10, borderColor: 'white', borderWidth: 1, padding: 10}}>
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
              data={selectUnitOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? ' Select Unit' : ' SelectStock '}
              searchPlaceholder="Search..."
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="unit"
        />
        {errors.unit && <Text>This is required.</Text>}
      </View>
      <View style={{margin: 10}}>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Price"
              keyboardType="numeric"
            />
          )}
          name="price"
        />
        {errors.price && <Text>This is required.</Text>}
      </View>
      <View style={{margin: 10}}>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Quantity"
              keyboardType="numeric"
            />
          )}
          name="quantity"
        />
        {errors.quantity && <Text>This is required.</Text>}
      </View>
      <View style={{margin: 10}}>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Description"
            />
          )}
          name="product_description"
        />
        {errors.product_description && <Text>This is required.</Text>}
      </View>

      <View
        style={{margin: 10, borderColor: 'white', borderWidth: 1, padding: 15}}>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TouchableOpacity onPress={() => pickImage(onChange)} style={{}}>
              {value && (
                <Text
                  style={{
                    color: 'orange',
                    marginLeft: 10,
                    position: 'absolute',
                    backgroundColor: 'black',
                    top: -25,
                    paddingHorizontal: 5,
                  }}>
                  Choose Image
                </Text>
              )}
              <Text style={[image ? styles.nn : styles.rr]}>
                {image ?? value?.uri ?? 'Choose Image'}
              </Text>
            </TouchableOpacity>
          )}
          name="image"
        />
        {errors.image && <Text>This is required.</Text>}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{margin: 10, backgroundColor: 'orange', padding: 15}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'white',
  },
  // for Modal style
  modalView: {
    backgroundColor: 'white',
    height: '100%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  nn: {
    color: 'black',
  },
  rr: {
    color: 'gray',
  },
});
