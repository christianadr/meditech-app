import os
import requests
from conftest import Token, TestPrescription

SERVER_URL = "http://127.0.0.1:5000"


class TestServerAPI:
    # Test user registration
    def test_create_user(self):
        url = f"{SERVER_URL}/v1/register/"

        # Test user
        test_name = "Juan Dela Cruz"
        test_email = "test@example.com"
        test_password = "Mypassword1234!"

        # Request to the server
        payload = {"name": test_name, "email": test_email, "password": test_password}
        response = requests.post(url, json=payload)

        assert response.status_code == 200
        assert response.text == "Registered new user."

    # Test user login
    def test_login_user(self):
        url = f"{SERVER_URL}/v1/login/"

        # Test User
        test_email = "test@example.com"
        test_password = "Mypassword1234!"

        # Request to the server
        payload = {"email": test_email, "password": test_password}
        response = requests.post(url, json=payload)

        data = response.json()

        assert response.status_code == 200
        assert data["access_token"]
        assert data["refresh_token"]

        # Store token to be used to other tests
        Token.token = data["access_token"]

    # Test add prescriptions
    def test_add_prescriptions(self):
        url = f"{SERVER_URL}/v1/prescriptions/"

        # Test payload
        payload = {
            "medication": "Omeprozole",
            "dosage": "20mg",
            "instruction": "1 tab a day for 15 days",
        }

        # Send data to server
        response = requests.post(
            url, json=payload, headers={"Authorization": f"Bearer {Token.token}"}
        )

        assert response.status_code == 200
        assert response.text == "Added prescription to the database."

    def test_get_prescriptions(self):
        url = f"{SERVER_URL}/v1/prescriptions/"

        # Request data from server
        response = requests.get(url, headers={"Authorization": f"Bearer {Token.token}"})

        json_data = response.json()

        assert json_data
        assert json_data["prescriptions"]
        assert isinstance(json_data["prescriptions"], list)

        # Get the first item the list
        test_item = json_data["prescriptions"][0]

        assert isinstance(test_item[0], int)
        assert test_item[1] == "Omeprozole"
        assert test_item[2] == "20mg"
        assert test_item[3] == "1 tab a day for 15 days"

        # Store prescription id
        TestPrescription.id = test_item[0]

    def test_update_prescriptions(self):
        url = f"{SERVER_URL}/v1/prescriptions/"

        # Test payload
        new_data = {"prescription_id": TestPrescription.id, "medication": "Paracetamol"}

        # Request data from server
        response = requests.put(
            url, json=new_data, headers={"Authorization": f"Bearer {Token.token}"}
        )

        assert response.status_code == 200
        assert response.text == "Updated prescription in the database."

    def test_upload_files(self):
        url = f"{SERVER_URL}/v1/prescriptions/upload"

        # Test payload
        test_image = {"file": open("./tests/images/test_prescription.jpg", "rb")}

        # Send image to server
        response = requests.post(
            url, files=test_image, headers={"Authorization": f"Bearer {Token.token}"}
        )

        assert response.status_code == 200

    def test_delete_prescriptions(self):
        url = f"{SERVER_URL}/v1/prescriptions/delete"

        # Test payload
        payload = {"prescription_id": 1}

        # Send data to server
        response = requests.post(
            url, json=payload, headers={"Authorization": f"Bearer {Token.token}"}
        )

        assert response.status_code == 200
        assert response.text == f"Prescription ID {payload['prescription_id']} deleted."
