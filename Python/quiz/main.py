from question_model import Question
from data import question_data
from quiz_brain import QuizBrain

question_bank = []

for item in question_data:
    question_text = item["text"]
    question_answer = item["answer"]
    new_question = Question(question_text, question_answer)
    question_bank.append(new_question)

quiz = QuizBrain(question_bank)

while quiz.still_ques_left():
    quiz.next_question()
print(f"Total score : {quiz.score}")
