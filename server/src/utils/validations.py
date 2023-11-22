import re

# Used for validating email
_email_regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"
_psswd_regex = (
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
)


def validate_email(email):
    """
    Checks if the candidate email is a valid email

    Params:
      email: plain text email

    Returns:
      is_valid: boolean
    """

    if re.fullmatch(_email_regex, email):
        return True
    else:
        return False


def validate_password(password):
    """
    Checks if the password is:
      - 6-20 characters long
      - has atleast one lower case letter
      - has atleast one upper case letter
      - has atleast one digit
      - has atleast one special symbol (@,$,!,%,*,#,?,&)

    Params:
      password: plain text password

    Returns:
      is_valid: boolean

    """

    # Compiling regex
    pat = re.compile(_psswd_regex)

    # Searching regex
    mat = re.search(pat, password)

    if mat:
        return True
    else:
        return False
