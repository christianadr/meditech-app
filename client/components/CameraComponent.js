import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { Image, StyleSheet, Text, Alert } from "react-native";
import CameraButton from "./Buttons/CameraButton";

export default function CameraComponent({ isOpen, onClose }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === false) {
        return Alert.alert("Denied", "Camera access denied.");
    }

    return (
        isOpen && (
            <>
                {!image ? (
                    <Camera
                        style={styles.camera}
                        type={type}
                        flashMode={flash}
                        ref={cameraRef}
                    >
                        <Text>Hello</Text>
                    </Camera>
                ) : (
                    <Image source={{ uri: image }} style={styles.camera} />
                )}
                <>{image ? <View></View> : <CameraButton />}</>
            </>
        )
    );
}

const styles = StyleSheet.create({
    camera: {
        position: "absolute",
        resizeMode: "contain",
        height: "100%",
        width: "100%",
    },
});
