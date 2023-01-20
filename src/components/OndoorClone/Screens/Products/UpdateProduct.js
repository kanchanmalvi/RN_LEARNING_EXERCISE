import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState, useEffect} from 'react';
import selectUnitOptions from '../../../../../Assets/constantData/unit';
import {Dropdown} from 'react-native-element-dropdown';
import selectCategoryOptions from '../../../../../Assets/constantData/category';
import DocumentPicker from 'react-native-document-picker';
import Api from '../../../../API_Servies/Api';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const UpdateProduct = props => {
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);
  const Navigation = useNavigation();
  const settoken = useSelector(state => state?.authToken?.token?.token);
  const updateValue = props.route.params;

  useEffect(() => {
    if (updateValue) {
      var newCategory = selectCategoryOptions.find(
        e => e.label == updateValue?.category,
      );
      var newUnit = selectUnitOptions.find(e => e.label == updateValue?.unit);
      setValue('barcode', '' + updateValue?.barcode);
      setValue('name', updateValue?.name);
      setValue('product_description', updateValue?.product_description);
      setValue('quantity', '' + updateValue?.quantity);
      setValue('unit', newUnit);
      setValue('category', newCategory);
      setValue('image', updateValue?.image);
      setValue('price', '' + updateValue?.price);
    }
  });

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
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key == 'unit' || key == 'category') {
        formdata.append(key, value?.label);
      } else if (key == 'image') {
        formdata.append(key, value);
      } else {
        formdata.append(key, value);
      }
    }
    try {
      let url = 'product-update/' + updateValue.id;
      let param = formdata;
      console.log(url, param, 'checking url');
      const res = await Api.postFormData(
        url,
        param,
        settoken,
        null,
        'updateproduct',
      );
      if (res) {
        Navigation.navigate('productlist');
      }
    } catch (error) {
      console.log(error, 'put api error');
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
    <View style={{marginBottom: 50}}>
      <View style={{backgroundColor: '#F2994A', padding: 15}}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          Update Product
        </Text>
      </View>
      <ScrollView style={{marginVertical: 10}}>
        <View
          style={{
            margin: 10,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#1CB5E0',
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
                  placeholder="Barcode"
                  keyboardType="numeric"
                  maxLength={9}
                />
              )}
              name="barcode"
            />
          </View>
          {errors.barcode && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
        </View>

        <View style={{margin: 10}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#1CB5E0',
              paddingHorizontal: 10,
            }}>
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
        </View>

        {/* category */}
        <View
          style={{
            margin: 10,
            borderColor: '#1CB5E0',
            borderWidth: 1,
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
          style={{
            margin: 10,
            borderColor: '#1CB5E0',
            borderWidth: 1,
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
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
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
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
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
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
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
        </View>

        <View
          style={{
            margin: 10,
            borderColor: '#1CB5E0',
            borderWidth: 1,
            padding: 15,
          }}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TouchableOpacity onPress={() => pickImage(onChange)} style={{}}>
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
    </View>
  );
};

export default UpdateProduct;

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
    color: 'gray',
    textAlign: 'left',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  // for Modal style
  modalView: {
    backgroundColor: 'black',
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

//   try {
//     let url = 'http://192.168.1.15:8000/api/product-update/' + updateValue.id;
//     let headersObj = {
//       headers: {
//         Accept: '*/*',
//         'Content-Type': 'multipart/form-data',
//         Authorization: 'Bearer ' + settoken,
//       },
//     };
//     console.log(url, formdata, 'checking url');
//     const res = await axios.post(url, formdata, headersObj);
//     console.log(res, 'api put response');
//   } catch (error) {
//     console.log(error, 'put api error');
//   }
