import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";
import { theme } from "./theme";
import { DataSourceProvider } from "./data";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <DataSourceProvider>
                <App />
            </DataSourceProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
