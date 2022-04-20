# Input: s = "abcabcbb"
# Output: 3
# Explanation: The answer is "abc", with the length of

s = "ABDEFGABEFJKK"
l2 = []
lst = []
for i in range(len(s)):
    if(s[i] in lst):
        l2.append(lst)  # [[b]]
        lst = []  # []
        lst.append(s[i])
    else:
        lst.append(s[i])  # [A,B,D,E]
val = 0
for x in l2:
    if len(x) > val:
        val = len(x)

print(val)
