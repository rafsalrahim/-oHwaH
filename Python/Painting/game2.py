from turtle import Turtle, Screen

picachu = Turtle()
screen = Screen()
screen.setup(500, 400)
bet = screen.textinput(title="make bet", prompt="which turtle")


screen.exitonclick()
