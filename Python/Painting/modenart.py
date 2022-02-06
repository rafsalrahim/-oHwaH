import colorgram as cg
import turtle as t
import random

rgb_colors = []
colors = cg.extract('testimg.jpeg', 30)
for color in colors:
    rgb_colors.append((color.rgb.r, color.rgb.g, color.rgb.b))
print(rgb_colors)

picachu = t.Turtle()
t.colormode(255)
picachu.penup()
picachu.hideturtle()
picachu.setheading(225)
picachu.forward(300)
picachu.setheading(0)
for i in range(1, 101):
    picachu.dot(20, random.choice(rgb_colors))
    picachu.forward(50)
    if i % 10 == 0:
        picachu.setheading(90)
        picachu.forward(50)
        picachu.setheading(180)
        picachu.forward(500)
        picachu.setheading(0)
ts = t.getscreen()
ts.getcanvas().postscript(file="duck.eps")

screen = t.Screen()  # class to make sure the window stays
screen.exitonclick()  # function self explanatory
