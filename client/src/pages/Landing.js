import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components/index'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
   <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            {/*Laning page info*/}
            <div className='info'>
                <h1>
                    Job <span>tracking</span> app
                </h1>
                <p>
                Deep v jianbing typewriter taxidermy church-key kickstarter tofu snackwave. Lo-fi echo park plaid bushwick health goth vaporware quinoa. Franzen bicycle rights locavore hashtag everyday carry master cleanse pug coloring book meditation raclette hexagon bespoke edison bulb helvetica.
                </p>
                <Link to="/register" className='btn btn-hero'>
                    Login/Register
                </Link>
            </div>
            {/*landing page image*/}
            <div>
                <img src={main} alt="job finder" className='img main-img'/>
            </div>
        </div>
   </Wrapper>
  )
}

export default Landing