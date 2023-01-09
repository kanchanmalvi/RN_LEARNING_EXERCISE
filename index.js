import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './store/store';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: 'pink',
    secondary: 'green',
    tertiary: 'blue',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
