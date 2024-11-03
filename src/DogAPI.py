import requests

CLIENT_ID = "80qsip303j6izdcooaptwt7mhzuxrmgs"
CLIENT_SECRET = "zyrcj8c8ry9cilo66rn1ektft3bjv68h2ei0m04fyh2yku4wbnq0zfde5bigwsdl"
IDENTIFY_CAT_DOG = 'https://www.nyckel.com/v1/functions/cat-vs-dogs-identifier/invoke'
IDENTIFY_DOG_BREED = 'https://www.nyckel.com/v1/functions/dog-breed-identifier/invoke'
INDENTIFY_CAT_BREED = 'https://www.nyckel.com/v1/functions/cat-breed-identifier/invoke'

def get_access_token():
    token_url = 'https://www.nyckel.com/connect/token'
    data = {'grant_type': 'client_credentials', 'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET}
    result = requests.post(token_url, data = data)
    data = result.json() 
    access_token =data['access_token']
    return access_token


def api_call(url, fileName):
    headers = {
    'Authorization': 'Bearer ' + get_access_token(),
    }

    with open(fileName, 'rb') as f:
        result = requests.post(url, headers=headers, files={'data': f})
        data = result.json()
        dog_or_cat = data['labelName']
    return dog_or_cat

def main(fileName):
    dog_or_cat = api_call(IDENTIFY_CAT_DOG,FileName)
    if dog_or_cat == "Dog":
        dog_breed = api_call(IDENTIFY_DOG_BREED,FileName)
        return dog_breed
    elif dog_or_cat == "Cat":
        cat_breed = api_call(INDENTIFY_CAT_BREED,FileName)
        return cat_breed
    else:
        return False


if __name__ == "__main__":
    FileName = "/Users/emilysun/Downloads/TEST.png"
    result = api_call(IDENTIFY_CAT_DOG,FileName)
    result2 = api_call(IDENTIFY_DOG_BREED,FileName)
    print(result)
    print(result2)