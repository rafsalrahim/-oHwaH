import turtle as t

picachu = t.Turtle()
screen = t.Screen()


def move_forward():
    picachu.forward(10)


def move_backword():
    picachu.backward(10)


def move_left():
    new_hed = picachu.heading() + 10
    picachu.setheading(new_hed)


def move_right():
    new_hed = picachu.heading() - 10
    picachu.setheading(new_hed)


screen.listen()
screen.onkey(key="w", fun=move_forward)
screen.onkey(key="s", fun=move_backword)
screen.onkey(key="a", fun=move_left)
screen.onkey(key="d", fun=move_right)
screen.onkey(key="c", fun=picachu.clear)
screen.exitonclick()
