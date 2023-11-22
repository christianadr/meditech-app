import requests


class TestLoginAPI:
    def test_login_user(self):
        url = "http://localhost:5000/v1/login/"

        # Test User
        test_email = "test@example.com"
        test_password = "Mypassword1234!"

        # Request to the server
        payload = {"email": test_email, "password": test_password}
        response = requests.post(url, json=payload)

        data = response.json()

        assert response.status_code == 200
        assert data["access_token"] is not None
        assert data["refresh_token"] is not None
