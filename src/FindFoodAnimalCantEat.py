import json

def read_json_file(file_path):
    with open(file_path,'r') as file:
        print("here")
        data = json.load(file)
    return data


def find_item_by_name(name, data):
    for item in data:
        if item["name"].lower() == name.lower():
            return item
    return None

def find_food_cat_cant_eat(FileName, name):
    data = read_json_file(FileName)
    food = find_item_by_name(name,data)
    return food


def find_food_dog_cant_eat(FileName, name):
    data = read_json_file(FileName)
    
    food = find_item_by_name(name,data)
    return food

if __name__ == "__main__":
    print("here")
    FileName = "/Users/emilysun/Downloads/FoodDogCantEat.json"
    p = find_food_dog_cant_eat(FileName,"Grapes")
    print(p["name"])
    
    