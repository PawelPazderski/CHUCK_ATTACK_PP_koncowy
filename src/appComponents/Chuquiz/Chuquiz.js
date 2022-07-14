import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import app from "./../../firebase"
import { getDatabase, ref, child, get } from "firebase/database";

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
            Swal.fire({
                icon: 'success',
                title: 'Good answer',
                background: 'brown',
                color: 'white',
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: "swal2-custom"
                }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Wrong answer',
                background: 'brown',
                color: 'white',
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: "swal2-custom"
                }
                })
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
            Swal.fire({
                icon: 'success',
                title: 'Good answer',
                background: 'brown',
                color: 'white',
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: "swal2-custom"
                }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Wrong answer',
                background: 'brown',
                color: 'white',
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: "swal2-custom"
                }
                })
        }
        setStartQuiz(false)
        setQuestion([])
        setIndex(0)

        console.log("end of quiz")
    }


    useEffect(() => {
        const dbRef = ref(getDatabase(app));
            get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                setQuestionList(snapshot.val())
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

    },[])

    return (
        <>
        <div className="quiz-body">
        <h1>Welcome to Chuquiz</h1>
        <h3 className="result-text">Result: {result}/{questionList.length}</h3>
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
                {index === questionList.length -1 && <CustomButton onClick={finishQuiz} size="lg" variant="dark">FINISH</CustomButton>}
                </>
            )}
        </div>
            
        </>
    )
}

export default Chuquiz