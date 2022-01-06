MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 24,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 100,
            "coffee": 24,
        },
        "cost": 3.0,
    }
}

resources = {
    "water": 300,
    "milk": 200,
    "coffee": 100,
}

profit = 0

def is_resource_suff(order_ingridiants):
    is_enough = True
    for item in order_ingridiants:
        if order_ingridiants[item]>= resources[item]:
            print("sorry there is not enough {item}.")
            is_enough = False
    return is_enough

def  process_coins():
    print("Insert coins...")
    total = int(input("How may quarters: "))  *  0.25
    total += int(input("How may dimes: "))  *  0.1
    total+= int(input("How may nickles: "))  *  0.05
    total += int(input("How may pennies: "))  *  0.01
    return total

def is_trans_succ(payment,cost):
    if(payment>=cost):
        change = round(payment - cost, 2)
        print (f"change ${change}")
        global profit
        profit += cost
        return True
    else:
        return False

def make_coffe(drink_name,ingrediants):
    for item in ingrediants:
        resources[item] -= ingrediants[item]
    print(f"here is your {drink_name}")



is_on =True
while is_on:
    choice = input("“​What would you like? (espresso/latte/cappuccino):")
    if choice == "off":
        is_on= False
    elif choice == "report":
        print(f"warer : {resources['water'] }ml")
        print(f"milk : {resources['milk'] }ml")
        print(f"coffee : {resources['coffee'] }ml")
        print(f"profit : ${profit }")
    else:
        drink = MENU[choice]
        if is_resource_suff(drink["ingredients"]):
            payment =process_coins()
            is_trans_succ(payment,drink["cost"])
            make_coffe(choice,drink["ingredients"])

