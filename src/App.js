import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";


import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

const theme = createTheme({
    palette: {
        primary: {
            main: '#841818'
        },
        secondary: {
            main: '#E0BB20'
        }
    }
});


const App = () => {
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Container>
                    <Navbar/>
                    <Routes>
                        <Route path="/auth" exact element={<Auth />} />
                        <Route path="/" exact element={<Home />} />
                    </Routes>
                </Container>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

export default App;