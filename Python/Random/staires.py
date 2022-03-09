# Print a staircase of size

# using # symbols and spaces.

# Note: The last line must have

# spaces in it.

# Sample Input

# 6

# Sample Output

#      #
#     ##
#    ###
#   ####
#  #####
# ######

import math
import os
import random
import re
import sys

#
# Complete the 'staircase' function below.
#
# The function accepts INTEGER n as parameter.
#


def staircase(n):
    # Write your code here

    for i in range(1, n+1):
        print(' ' * (n - i) + '#' * i)


if __name__ == '__main__':
    n = int(input().strip())

    staircase(n)
