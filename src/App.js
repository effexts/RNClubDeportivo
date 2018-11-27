import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import color from 'color';
import PrimaryNav from './AppNavigation';
import reducers from './reducers';

const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
      ...DefaultTheme.colors,
      primary: '#446ba9',
      accent: '#deb01f',
      background: '#7699db',
      disabled: color('#fff')
        .alpha(0.86)
        .rgb()
        .string(),
      placeholder: color('#fff')
        .alpha(0.9)
        .rgb()
        .string(),
      backdrop: color('#0ff')
        .alpha(0.5)
        .rgb()
        .string(),
    }
  };

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <StoreProvider store={createStore(reducers)}>
                <PaperProvider theme={theme}>
                    <PrimaryNav />
                </PaperProvider>
            </StoreProvider>
        );
    }
}



export default App;