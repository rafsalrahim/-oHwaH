from re import I


data_list = [-5, -23, 5, 0, 23, -6, 23, 67]
new_list = []
while data_list:
    min_val = data_list[0]
    for i in data_list:
        if i < min_val:
            min_val = i
    new_list.append(min_val)
    data_list.remove(min_val)
print(new_list)


#HCF & LCM

a = int(input("Enter the first no: "))
b = int(input("Enter the second no: "))
HCF = 1
for i in range(2, a+1):
    if(a % i == 0 and b % i == 0):
        HCF = i

LCM = int(a*b/HCF)
print("LCM: ", LCM)
print("HCF: ", HCF)
