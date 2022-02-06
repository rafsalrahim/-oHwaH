from imghdr import tests


def test_1(string=""):

    # initializing the substring
    substring = ""
    testList = []
    initial = 0

    while initial < len(string):
        for i in range(initial, len(string)):
            substring += string[i]

            # checking conditions
            if substring.count(string[i]) > 1:
                testList.append(substring[:-1])
                initial += 1
                substring = ""
                break
    maxi = ""

    for word in testList:

        if len(word) > len(maxi):
            maxi = word

    if len(maxi) < 3:
        return "-1"
    else:
        return maxi


# Driver code
print(test_1("character"))
