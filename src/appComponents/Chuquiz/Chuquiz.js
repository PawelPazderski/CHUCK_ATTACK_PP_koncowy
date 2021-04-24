import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const MENU_URL = "http://localhost:3001/quiz";

const CustomButton = styled(Button)`
    background: brown;
    border: none;
    `

// const quizSelect = document.querySelector(".form-control")



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
    }

    useEffect(() => {
        setQuestion(questionList[index])
    },[index])
    
    const handleSelect = (e) => {
        setSelect(e.target.value)
    }


    const finishQuiz = () => {
        if (select === question.correct) {
            setResult(prev => prev + 1)
        }
        setStartQuiz(false)
        setQuestion([])
        setIndex(0)

        console.log("end this shit")
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
                 <Form>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label className="question-text">{question.question}</Form.Label>
                    <div className="quiz-select">
                        <Form.Control className="quiz-select" value={select} onChange={handleSelect} as="select" multiple>
                        <option>{question.answer1}</option>
                        <option>{question.answer2}</option>
                        <option>{question.answer3}</option>
                        <option>{question.answer4}</option>
                        </Form.Control>
                    </div>
                    
                </Form.Group>
                
                </Form>
                {/* <form>
               
                    <h4>{question.question}</h4>
                    <select value={select} onChange={handleSelect} as="select" multiple>
                    
                    <option>{question.answer1}</option>
                    <option>{question.answer2}</option>
                    <option>{question.answer3}</option>
                    <option>{question.answer4}</option>
                    </select>
                
                
                </form> */}
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