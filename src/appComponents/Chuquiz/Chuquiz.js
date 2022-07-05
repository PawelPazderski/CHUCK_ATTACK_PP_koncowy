import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const MENU_URL = "http://localhost:3001/quiz";

const CustomButton = styled(Button)`
    background: brown;
    border: none;
    `

const Chuquiz = () => {
    const [questionList, setQuestionList] = useState([])
    const [startQuiz, setStartQuiz] = useState(false)
    const [result, setResult] = useState(0)
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState([])
    const [select, setSelect] = useState([])

    const beginQuiz = () => {
        setResult(0)
        setSelect([])
        setStartQuiz(true)
        setQuestion(questionList[0])
        console.log("off u go")
    }
    
    const nextQuestion = () => {
        setIndex(prev => prev + 1)

        if (select === question.correct) {
            setResult(prev => prev + 1)
        }
        clearRadios()
    }

    useEffect(() => {
        setQuestion(questionList[index])
    },[index])
    
    const handleSelect = (e) => {
        // let optionIndex = e.target.options.selectedIndex;
        // console.log(e.target.options[optionIndex]);

        // e.target.options[optionIndex].checked = true
        console.log(`your answer: ${e.target.value}`, `/ correct answer: ${question.correct}`)
        
        setSelect(e.target.value);
    }

    const clearRadios = () => {
        const radios = document.querySelectorAll("[name = quiz-answer]");

        radios.forEach((item) => {
            return item.checked = false
        })
    }


    const finishQuiz = () => {
        if (select === question.correct) {
            setResult(prev => prev + 1)
        }
        setStartQuiz(false)
        setQuestion([])
        setIndex(0)

        console.log("end of quiz")
    }


    useEffect(() => {
        fetch(MENU_URL)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Błąd")
            } )
            .then(questions => setQuestionList(questions))
            .catch(err => console.log(err))

    },[])

    return (
        <>
        <div className="quiz-body">
        <h1>Welcome to Chuquiz</h1>
        <h2>Result: {result}/{questionList.length}</h2>
            {!startQuiz && <CustomButton onClick={beginQuiz} size="lg" variant="dark">START</CustomButton>}

            {startQuiz && (
                <>
                <div className='question-container'>
                    <h2 className="question-text">{question.question}</h2>
                    
                    <label className="single-question-container">{question.answer1}
                        <input type="radio" name="quiz-answer" value={question.answer1} onChange={handleSelect}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="single-question-container">{question.answer2}
                        <input type="radio" name="quiz-answer" value={question.answer2} onChange={handleSelect}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="single-question-container">{question.answer3}
                        <input type="radio" name="quiz-answer" value={question.answer3} onChange={handleSelect}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="single-question-container">{question.answer4}
                        <input type="radio" name="quiz-answer" value={question.answer4} onChange={handleSelect}/>
                        <span className="checkmark"></span>
                    </label>
                    
                </div>
                
                
                {index !== questionList.length - 1 && <CustomButton onClick={nextQuestion} size="lg" variant="dark">NEXT</CustomButton>}
                <br />
                <CustomButton onClick={finishQuiz} size="md" variant="dark">FINISH</CustomButton>
                </>
            )}
        </div>
            
        </>
    )
}

export default Chuquiz