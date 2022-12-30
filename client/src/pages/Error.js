import { Link } from 'react-router-dom'
import img from "../assets/images/not_found.svg"
import Wrapper from "../assets/wrappers/ErrorPage"


const Error = () => {
  return (
    <Wrapper>
        <div className='full-page'>
            <img src={img} alt="404 not found"/>
            <h3>Page Not Found</h3>
            <p>We can't find the page you're looking for</p>
            <Link to="/"><h4>Back Home</h4></Link>
        </div>
    </Wrapper>
  )
}

export default Error