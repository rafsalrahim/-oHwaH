class QuizBrain:
    score = 0

    def __init__(self, q_list):
        self.question_no = 0
        self.question_list = q_list

    def still_ques_left(self):
        return self.question_no < len(self.question_list)

    def next_question(self):
        current_question = self.question_list[self.question_no]
        self.question_no += 1
        usr_answer = input(
            f"Q. {self.question_no}: {current_question.text} (true/false): ")
        self.check_answer(usr_answer, current_question.answer)

    def check_answer(self, usr_answer, correct_answer):
        if usr_answer.lower() == correct_answer.lower():
            self.score += 1
        else:
            print(f"Answer is wrong, correct answer is {correct_answer}.")
