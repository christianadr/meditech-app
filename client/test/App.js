import axios from "axios";
import { faker } from "@faker-js/faker";
import { assert } from "chai";
import { before, after, describe, it, test } from "mocha";

const SERVER_URL = "http://192.168.1.63:5000";

describe("Testing App Functionalities", () => {
	describe("Testing Registration Endpoint", () => {
		let test_user = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password({ length: 12, prefix: "!" }),
		};

		before(async () => {
			// Checks if the server is up
			const response = await axios.get(SERVER_URL).catch((err) => {
				console.log(err.response);
			});

			console.log(response.data);
			assert.equal(response.status, 200);
		});

		it("OK, register user to the database.", async () => {
			// Test payload to send to server
			const payload = {
				name: test_user.name,
				email: test_user.email,
				password: test_user.password,
			};

			// Registers user to the server
			const response = await axios
				.post(`${SERVER_URL}/v1/register`, payload)
				.catch((err) => {
					console.log(err.response);
				});

			console.log(response.data);
			assert.equal(response.status, 200);
			assert.equal(response.data, "Registered new user.");
		});

		it("OK, logins the user", async () => {
			// Test payload to send to server
			const payload = {
				email: test_user.email,
				password: test_user.password,
			};

			// Logins the user to the server
			const response = await axios
				.post(`${SERVER_URL}/v1/login/`, payload)
				.catch((err) => {
					console.log(err.response);
				});

			console.log(response.data);
			assert.equal(response.status, 200);
			assert.hasAllKeys(response.data, ["access_token", "refresh_token"]);

			test_user.access_token = response.data["access_token"];
			test_user.refresh_token = response.data["refresh_token"];
		});

		it("OK, sends prescription details to the server", async () => {
			// Test payload to send to server
			const payload = {
				medication: "Omeprozole",
				dosage: "20mg",
				instruction: "1 tab a day for 15 days",
			};

			// Sends payload to the server
			const response = await axios
				.post(`${SERVER_URL}/v1/prescriptions`, payload, {
					headers: { Authorization: `Bearer ${test_user.access_token}` },
				})
				.catch((err) => {
					console.log(err.response);
				});

			console.log(response.data);
			assert.equal(response.status, 200);
			assert.equal(response.data, "Added prescription to the database.");
		});

		it("OK, gets all prescription from the server", async () => {
			// Sends GET request to the server
			const response = await axios
				.get(`${SERVER_URL}/v1/prescriptions`, {
					headers: { Authorization: `Bearer ${test_user.access_token}` },
				})
				.catch((err) => {
					console.log(err.response);
				});

			console.log(response.data);
			assert.equal(response.status, 200);
			assert.hasAllKeys(response.data, ["prescriptions"]);
			assert.lengthOf(response.data.prescriptions, 1);

			test_user.prescriptions = response.data["prescriptions"];
		});

		it("OK, deletes prescription from the server", async () => {
			// Test payload to send to server
			const payload = {
				prescription_id: test_user.prescriptions[0][0], // gets the id of the first prescription
			};

			// Sends request to the server
			const response = await axios
				.post(`${SERVER_URL}/v1/prescriptions/delete`, payload, {
					headers: {
						Authorization: `Bearer ${test_user.access_token}`,
					},
				})
				.catch((err) => {
					console.log(err.response);
				});

			console.log(response.data);
			assert.equal(response.status, 200);
			assert.equal(
				response.data,
				`Prescription ID ${payload.prescription_id} deleted.`
			);
		});
	});
});
