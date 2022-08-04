import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import ContactDetails from "./components/ContactDetails/ContactDetails.jsx";
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
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Container>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Navigate to='/contact-list'/>} />
                        <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/contact-list'/>} />
                        <Route path="/contact-list" element={<Home />} />
                        <Route path="/contact-list/search" element={<Home />} />
                        <Route path="/contact-list/:id" element={<ContactDetails />} />
                    </Routes>
                </Container>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

export default App;