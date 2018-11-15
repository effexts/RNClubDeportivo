import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import color from 'color';
import PrimaryNav from './AppNavigation';

const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
      ...DefaultTheme.colors,
      primary: '#deb01f',
      accent: '#678fca',
      background: '#678fca',
      text: '#fff',
      surface: '#22213f',
      disabled: color('#fff')
        .alpha(0.86)
        .rgb()
        .string(),
      placeholder: color('#fff')
        .alpha(0.9)
        .rgb()
        .string(),
      backdrop: color('#fff')
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
            <PaperProvider theme={theme}>
                <PrimaryNav />
            </PaperProvider>
        );
    }
}



export default App;