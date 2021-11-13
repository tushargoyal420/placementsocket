import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material'
import firebase from '../../../firebase/firebase'

function AddTechnicalSkills() {
    const [skill, setSkill] = useState('')
    const [proficiency, setProficiency] = useState("")
    const [data, setData] = useState([])
    const userId = firebase.auth().currentUser.uid;
    const timeStamp = Date();

    const proficiencyArray = [
        {
            label: "Beginner",
            value: "Beginner"
        },
        {
            label: "Intermediate",
            value: "Intermediate"
        },
        {
            label: "Advance",
            value: "Advance"
        },
        {
            label: "Professional",
            value: "Professional"
        }
    ]
    const skillArray = [
        {
            label: "Java",
            value: "Java"
        },
        {
            label: "ReactJs",
            value: "ReactJs"
        },
        {
            label: "HTML",
            value: "HTML"
        },
        {
            label: "CSS",
            value: "CSS"
        },
        {
            label: "PHP",
            value: "PHP"
        },
        {
            label: "SQL",
            value: "SQL"
        },
        {
            label: "Firebase",
            value: "Firebase"
        },
        {
            label: "C++",
            value: "C++"
        },
        {
            label: "C",
            value: "C"
        },
        {
            label: "Perl",
            value: "Perl"
        },
        {
            label: "Android",
            value: "Android"
        },
        {
            label: "AWS",
            value: "AWS"
        },
    ]
    const submitDataa = ((e) => {
        e.preventDefault();

        try {
            firebase.database().ref('data/student/' + userId + '/technicalSkills')
                .child(skill).set({
                    'Skill': skill,
                    'Proficiency': proficiency,
                    'timeStamp': timeStamp
                }).catch((err) => {
                    alert(err.message)
                });
        } catch (err) {
            alert(err.message);
        }
    })
    useEffect(() => {
        firebase.database().ref('data/student/' + userId + '/technicalSkills')
            .once('value').then((snapshot) => {
                const dataList = []
                snapshot.forEach((childSnapshot) => {
                    // console.log(childSnapshot.key)
                    dataList.push(childSnapshot.val())
                })
                setData(dataList);
            }).catch((err) => {
                alert(err)
            })
    })

    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Add Technical<span className="colorChange"> Skills </span> </div>
                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <form className="detailsForm" onSubmit={submitDataa}>
                                <div className="detailsSection">

                                    <TextField onChange={(e) => setSkill(e.target.value)} className="textField" select required value={skill}
                                        style={{ minWidth: '200px' }} variant="standard" label="Skill" size="normal" >{skillArray.map((option) =>
                                            (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>


                                    <TextField value={proficiency} onChange={(e) => setProficiency(e.target.value)} className="textField" select required
                                        style={{ minWidth: '200px' }} variant="standard" label="Proficiency" size="normal">{proficiencyArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                </div>
                                <Button className='submitButton' type="submit" variant="contained" >Add</Button>
                            </form>

                            <div className='showSkill'>
                                {data.map((single, index) => (
                                    <div className="dataBox secondDataBox">
                                        <div> {single.Skill} ({single.Proficiency})</div>
                                        <Button variant="outlined" onClick={(() => {
                                            firebase.database().ref('data/student/' + userId + '/technicalSkills/' + single.Skill).remove()
                                        })} > Delete </Button>
                                    </div>
                                ))}
                            </div>

                        </section>

                    </div>
                </ul>
            </div >
        </div >)
}

export default AddTechnicalSkills
