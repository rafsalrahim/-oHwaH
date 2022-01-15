import random


def generateOne(strlen):
    alphabet = "abcdefghijklmnopqrstuvwxyz "
    res = ""

    for i in range(strlen):
        res += alphabet[random.randrange(27)]
    return res


def score(goal, teststr):
    numscore = 0

    for i in range(len(goal)):
        if goal[i] == teststr[i]:
            numscore += 1
    return numscore/len(goal)


def main():
    goalStr = "a computer science portal geeks"
    newStr = generateOne(35)
    best = 0
    newScore = score(goalStr, newStr)
    while newScore < 1:
        if newScore > best:
            print(newStr)
            best = newScore
        newStr = generateOne(35)
        newScore = score(goalStr, newStr)


main()
