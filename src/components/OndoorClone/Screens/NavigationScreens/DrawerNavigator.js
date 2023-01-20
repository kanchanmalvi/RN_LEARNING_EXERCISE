import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutOndoor from '../AboutOndoor';
import ContactOndoor from '../ContactOndoor';
import ProductScreen from '../Products/ProductScreen';
import UsersScreen from '../Users/UsersScreen';
import StackScreens from './StackScreens';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="productlist"
        component={StackScreens}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="about"
        component={AboutOndoor}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="contact"
        component={ContactOndoor}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
