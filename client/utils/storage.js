import * as SecureStore from "expo-secure-store";

/**
 * Responsible for saving values in the local storage
 * @param {*} key
 * @param {*} value
 */
export async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

/**
 * Reads value from the local storage using the passed key argument.
 * @param {*} key
 * @returns
 */
export async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		return result;
	} else {
		return null;
	}
}
