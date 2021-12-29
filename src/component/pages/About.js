import React from 'react'
import "../../css/About.css"
import ImageWithName from '../small/ImageWithName'
import pic1 from "../../img/dheeraj.jpeg"
import pic2 from "../../img/harsh.jpg"
import pic3 from "../../img/munnuu.jpeg"
import GoogleMap from '../small/GoogleMap'

function About() {

    return (
        <div className="backgroundPage">
            <div className="centerWholePage">

            <div className="centerPageHeading">About <span className="colorChange"> us</span> </div>
                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <li><h1 className="heading1"> Who we Are </h1> </li>
                            <div className="rowsectionContent">
                                <span className="paraFirstbigText"> Lorem </span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.
                            </div>
                        </section>

                        <section className="rowSection">
                            <li><h1 className="heading1"> Founders </h1> </li>
                            <div className="rowsectionContent">
                                <ul className="founderUnorderList">
                                    <li>  <ImageWithName firstName="Dheeraj" lastName="Kumar" image={pic1} alt="dheerajImage" designation="Founder" /></li>
                                    <li>  <ImageWithName firstName="Harsh" lastName="Raj" image={pic2} alt="harshImage" designation="Founder" /></li>
                                    <li>  <ImageWithName firstName="Munnu" lastName="Kumar" image={pic3} alt="munnuImage" designation="Founder" /></li>
                                </ul>
                            </div>
                        </section>

                        <section className="rowSection">
                            <li><h1 className="heading1"> Our Location </h1> </li>
                            <div className="rowsectionContent">
                                <GoogleMap className="maps" />
                            </div>
                        </section>

                    </div>
                </ul>
            </div>
        </div>
    )
}

export default About
