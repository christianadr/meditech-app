import requests


class TestRegisterAPI:
    def test_create_user(self):
        url = "http://localhost:5000/v1/register/"

        # Test User
        test_name = "Juan Dela Cruz"
        test_email = "test@example.com"
        test_password = "Mypassword1234!"

        # Request to the server
        payload = {"name": test_name, "email": test_email, "password": test_password}
        response = requests.post(url, json=payload)

        assert response.status_code == 200
        assert response.text == "Registered new user."
