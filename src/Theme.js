import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { primaryNormal, primaryLight, primaryDark, blackNormal, blackLight, whiteNormal } from './partials/_colors';

const theme = createTheme({
    palette: {
        primary: {
            main: primaryDark
        },
        primaryLight: {
            main: primaryLight
        },
        primaryDark: {
            main: primaryNormal
        },
        black: {
            normal: blackNormal,
            light: blackLight
        },
        common: {
            white: whiteNormal
        }
    }
});

const CustomThemeProvider = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

export default CustomThemeProvider;
