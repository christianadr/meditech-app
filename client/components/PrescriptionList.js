import * as React from "react";
import { useEffect } from "react";
import {
	RefreshControl,
	FlatList,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import { SERVER_URL } from "../Globals";
import { getValueFor } from "../utils/storage";

const PrescriptionList = () => {
	const [refreshing, setRefreshing] = React.useState(false);
	const [prescriptionList, setPrescriptionList] = React.useState([]);

	/**
	 * Retrieves a list of prescriptions from the backend associated
	 * with the user's account. This also updates the prescription list.
	 */
	const retrievePrescriptions = async () => {
		const url = `${SERVER_URL}/v1/prescriptions`;

		try {
			// Fetches data from the backend. Retrives all saved prescriptions
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await getValueFor("access_token")}`,
				},
			});

			if (response.ok) {
				const responseData = await response.json();

				// Retrieves data from the response and updates the list
				const prescriptionsFromResponse = responseData?.prescriptions;
				if (Array.isArray(prescriptionsFromResponse)) {
					for (item of prescriptionsFromResponse) {
						const prescription = {
							id: item[0],
							medication: item[1],
							dosage: item[2],
							instruction: item[3],
						};

						setPrescriptionList((currentValue) => [
							...currentValue,
							prescription,
						]);
					}
				}
			}
		} catch (err) {
			alert(`Error retrieving prescriptions: ${err.message}`);
		}
	};

	/**
	 * Called when user refreshes the list
	 */
	const onRefresh = async () => {
		setRefreshing(true);

		// Fetch prescriptions from the database
		const prescriptions = await retrievePrescriptions();
		setPrescriptionList(prescriptions);

		setRefreshing(false);
	};

	// Only called once or  the page is reloaded
	useEffect(() => {
		/**
		 * Used to call retrieve prescriptions on page load.
		 */
		const fetchData = async () => {
			await retrievePrescriptions();
		};

		fetchData();
	}, []);

	return (
		<FlatList
			data={prescriptionList}
			horizontal
			decelerationRate="fast"
			keyExtractor={(i) => i.id}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			renderItem={({ item, index }) => {
				return (
					<TouchableOpacity
						style={{
							marginLeft: 15,
							marginRight: index === prescriptionList.length - 1 ? 15 : 0,
						}}>
						<View style={styles.card}>
							<Text style={styles.header}>{item.medication}</Text>
							<Text style={styles.text}>{item.dosage}</Text>
							<Text style={[styles.text, { marginVertical: 15 }]}>
								{item.instruction}
							</Text>
							<Text style={[styles.text, { fontFamily: "Inter-Bold" }]}>
								Schedule
							</Text>
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 160,
		height: 185,
		borderWidth: 1,
		borderRadius: 15,
		padding: 10,
	},

	header: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
	},

	text: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
	},
	noPrescriptions: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 20,
	},
});

export default PrescriptionList;
