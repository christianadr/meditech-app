import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/Buttons/CameraButton.js";
import * as FileSystem from "expo-file-system";

import { SERVER_URL } from "../Globals.js";
import { getValueFor } from "../utils/storage.js";
import axios from "axios";

export default function CameraPreview({ navigation }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [cameraRatio, setCameraRatio] = useState("4:3");
    const [widthRatio, heightRatio] = cameraRatio.split(":").map(Number);
    const cameraRef = useRef(null);

    const { height, width } = Dimensions.get("window");

    const cameraWidth = width;
    const cameraHeight = (cameraWidth * heightRatio) / widthRatio;

    navigateToDashboard = () => {
        // console.log("Get Started Clicked..."); // debug purposes
        navigation.navigate("Dashboard");
    };

    useEffect(() => {
        const getCameraRatios = async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
            if (cameraRef.current) {
                const ratios =
                    await cameraRef.current.getSupportedRatiosAsync();
                if (ratios && ratios.length) {
                    setCameraRatio(ratios[0]);
                }
            }
        };
        getCameraRatios();
    }, []);

    // function to handle image capturing
    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    };

    // function to handle image OCR logic
    const handleImageStoring = async () => {
        if (image) {
            try {
                const formData = new FormData();
                const imageData = await FileSystem.readAsStringAsync(image, {
                    encoding: "base64",
                });

                // Create a Blob object from the base64-encoded data
                const imageBlob = new Blob([imageData], { type: "image/jpeg" });
                formData.append("image", imageBlob, "image.jpg");

                // Send the image data to the server using axios
                const access_token = await getValueFor("access_token");
                const url = `${SERVER_URL}/v1/prescriptions/upload`;
                const response = await axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "multipart/form-data;",
                    },
                });

                if (response.status == 200) {
                    navigation.navigate("AddPrescription");
                }
            } catch (error) {
                console.log(error.request);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!image ? (
                <Camera
                    style={[
                        styles.camera,
                        { width: cameraWidth, height: cameraHeight },
                    ]}
                    ratio={cameraRatio}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <Text>hello</Text>
                </Camera>
            ) : (
                <Image source={{ uri: image }} style={styles.camera} />
            )}
            <View>
                {image ? (
                    <View
                        style={{
                            // flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 30,
                        }}
                    >
                        <CameraButton
                            icon="retweet"
                            onPress={() => setImage(null)}
                            style={{ left: 50 }}
                        />
                        <CameraButton
                            onPress={handleImageStoring}
                            icon="check"
                            style={{ right: 50 }}
                        />
                    </View>
                ) : (
                    <>
                        <CameraButton
                            icon="cross"
                            onPress={navigateToDashboard}
                            style={{ left: width / 3 }}
                        />
                        <CameraButton icon="camera" onPress={takePicture} />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        // paddingBottom: 20,
    },
    camera: {
        flex: 1,
        // width: "100%",
    },
});
