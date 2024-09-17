import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Waiting for message...");

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log("WebSocket connection opened");
            ws.send("Hello from React Native App via WebSocket!");
        };

        ws.onmessage = (event) => {
            console.log("Message received: ", event.data);
            setMessage(event.data);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error: ", error.message);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => ws.close();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.helloText}>{message}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    helloText: {
        marginTop: 24,
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default App;
