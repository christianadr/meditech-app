import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/Buttons/CameraButton.js";

import { SERVER_URL } from "../Globals.js";
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

    // function to handle image OCR logic
    const handleImageStoring = async () => {
        navigation.navigate("AddPrescription");
        // if (image) {
        //     try {
        //         // Convert the image data to FormData
        //         const formData = new FormData();
        //         formData.append("image", {
        //             uri: image,
        //             name: "photo.jpg",
        //             type: "image/jpg",
        //         });

        //         // Send the image data to the server using axios
        //         const response = await axios.post(
        //             `${SERVER_URL}/v1/prescriptions/upload`,
        //             formData,
        //             {
        //                 headers: {
        //                     "Content-Type": "multipart/form-data",
        //                 },
        //             }
        //         );

        //         // Handle the response from the server
        //         console.log("Image uploaded:", response.data);

        //         // Here you can perform actions based on the server response if needed
        //     } catch (error) {
        //         console.error("Error uploading image:", error);
        //         // Handle errors that occur during image upload
        //     }
        // } else {
        //     console.warn("No image captured yet.");
        //     // Handle the case where there is no image captured
        // }
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
