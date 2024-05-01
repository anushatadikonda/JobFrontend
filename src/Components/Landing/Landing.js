import React from 'react'
import '../assets/css/landing.css'
import Lan1 from '../assets/images/hero-shape2.png.webp'
import Lan2 from '../assets/images/hero-img.png.webp'
import Lan3 from '../assets/images/hero-shape.png.webp'
import Aboutimg from '../assets/images/about.png.webp'
import Lannavbar from './Lannavbar'

function Landing() {
    return (
        <>
            <div className="landing_page">
                <section className="landing_1">
                    <Lannavbar/>
                    <div className="head1_img">
                        <img src={Lan1} alt="" />
                    </div>
                    <div className="head2_img">
                        <img src={Lan2} alt="" className='lan2' />
                    </div>
                    <div className="job_title">
                        <h2>Jobs</h2>
                    </div>
                    <div className="lan_title">
                        <span>Easiest way to find a perfect job</span>
                        <h1>Find Your Next Dream Job</h1>
                        <div className="tittle_button">
                            <button className='titlebtn'>Looking For a job?</button>
                            <button className='titlebtn1'>Find Talent</button>
                        </div>
                    </div>
                    <div className="lan3img">
                        <img src={Lan3} alt="" />
                    </div>
                </section>
                <section className="aboutus" id="aboutus">
                    <div className="about-content">
                        <div className="aboutimg">
                            <img src={Aboutimg} alt="" />
                        </div>
                        <div className="aboutcontent">
                            <div className="about_title">
                                <h2>Talents</h2>
                            </div>
                            <h1>We Build Lasting Relationships Between Candidates & Businesses</h1>
                            <p>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
                            <p>Automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
                            <button>Find talent</button>
                        </div>
                    </div>
                </section>
                <section className="categories">
                    <div className="cat_details">
                        <h1>Browse From Top Categories</h1>
                        <p>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
                    </div>
                    <div className="cat_card">
                        <div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                deployed_code
                            </span>
                            <h5>Design & Creatives</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div>
                        <div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                credit_card_heart
                            </span>
                            <h5>Finance</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div><div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                satellite_alt
                            </span>
                            <h5>Marketing</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div><div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                health_and_safety
                            </span>
                            <h5>Health/Medical</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div><div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                monitoring
                            </span>
                            <h5>Corporate</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div><div className="cat_card_details">
                            <span class="material-symbols-outlined">
                                description
                            </span>
                            <h5>Copywriting</h5>
                            <p>The automated process starts as soon as your clothes go into.</p>
                        </div>
                    </div>
                    <div className="Categories_title">
                        <h2>Categories</h2>
                    </div>
                </section>
                {/* <section className="jobdetails">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                            </div>
                            <div class="carousel-item">
                                <h1>Hellos</h1>
                            </div>
                            <div class="carousel-item">
                                <h1>work</h1>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </section> */}
                <footer className='main_footer'>
                    <div className="logo_footer">
                        <h2>About</h2>
                        <div className="logo">
                            <span class="material-symbols-outlined">
                                work_update
                            </span>&nbsp;&nbsp;
                            <h2>Hired</h2>
                        </div>
                        <p>The automated process starts as soon as your clothes go into the machine.The outcome is gleaming clothes.</p>
                    </div>
                    <div className="usefulLinks_footer">
                        <h2>Useful Links</h2>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">AboutUS</a></li>
                            <li><a href="#">Frontend Tutorial</a></li>
                            <li><a href="#">Database Tutorial</a></li>
                            <li><a href="#">PowerBi Tutorial</a></li>
                        </ul>
                    </div>
                    <div className="footer_questions">
                        <h2>Contact Us</h2>
                        <div className="address">
                            <span class="material-symbols-outlined">
                                location_on
                            </span>&nbsp;&nbsp;
                            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                        </div>
                        <div className="phone">
                            <span class="material-symbols-outlined">
                                call
                            </span>&nbsp;&nbsp;
                            <p>	+2 392 3929 210</p>
                        </div>
                        <div className="mail">
                            <span class="material-symbols-outlined">
                                mail
                            </span>&nbsp;&nbsp;&nbsp;
                            <p>info@yourdomain.com</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Landing