from turtle import Turtle, Screen
import random

picachu = Turtle()
picachu.shape("arrow")
picachu.color("purple")

# pgm 1 dashed - squre
for _ in range(4):
    x = 0
    while x != 100:
        if (x % 2 != 0):
            picachu.penup()
            picachu.forward(10)
            x = x+5
        else:
            picachu.pendown()
            picachu.forward(10)
            x = x+5
    picachu.left(90)
picachu.pendown()

color_pallet = ["navy", "spring green", "gold", "tomato", "light coral",
                "medium violet red", "dark violet", "medium slate blue", "dark red"]
# shapes
for i in range(3, 10):
    picachu.color(random.choice(color_pallet))
    for j in range(1, i):
        picachu.forward(100)
        picachu.right(360/i)

# random walk


screen = Screen()  # class to make sure the window stays
screen.exitonclick()  # function self explanatory
