from turtle import Screen
import turtle as t
import random

picachu = t.Turtle()
picachu.shape("arrow")
picachu.color("purple")
picachu.speed("fastest")

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
    for j in range(1, i+1):
        picachu.forward(100)
        picachu.right(360/i)


# random walk
direction = [0, 90, 180, 270]
t.colormode(255)


def randCol():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return (r, g, b)


for _ in range(300):
    picachu.color(randCol())
    picachu.pensize(10)
    picachu.forward(30)
    picachu.setheading(random.choice(direction))


# spiral graphed


def spiral(size):
    for _ in range(int(360/size)):
        picachu.color(randCol())
        picachu.setheading(picachu.heading()+size)
        picachu.circle(100)


spiral(3)

screen = Screen()  # class to make sure the window stays
screen.exitonclick()  # function self explanatory
