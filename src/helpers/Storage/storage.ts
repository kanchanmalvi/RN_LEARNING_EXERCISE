import AsyncStorage from '@react-native-async-storage/async-storage'

const store = 'app12Good'

export const storeData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(`@${store}:${key}`, JSON.stringify(data))
  } catch (error) {
    // Error saving data
    console.log(error)
  }
}
export const getStoreData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(`@${store}:${key}`)
    return data != null ? JSON.parse(data) : null
  } catch (e) {
    // error reading value
    console.log(e)
  }
}
