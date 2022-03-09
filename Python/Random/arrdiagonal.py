# Given a square matrix, calculate the absolute difference between the sums of its diagonals.

# For example, the square matrix

# is shown below:

# 1 2 3
# 4 5 6
# 9 8 9

# The left-to-right diagonal =
# . The right to left diagonal = . Their absolute difference is .
#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'diagonalDifference' function below.
#
# The function is expected to return an INTEGER.
# The function accepts 2D_INTEGER_ARRAY arr as parameter.
#

def diagonalDifference(arr):
    # Write your code here
    dr=0
    dl=0
    for i in range(len(arr)):
        dl += arr[i][i]
        dr += arr[i][n-i-1]
    return abs(dl-dr)


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    arr = []

    for _ in range(n):
        arr.append(list(map(int, input().rstrip().split())))

    result = diagonalDifference(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
