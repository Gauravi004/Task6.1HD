import './footer.css';

function Footer(){
    return (
        <>
        <div className='foot'>
        <div className="footer-section">
            <h3>Explore</h3>
            <p>Home</p>
            <p>Questions</p>
            <p>Articles</p>
            <p>Tutorials</p>
        </div>

        <div className="footer-section2">
            <h3>Support</h3>
            <p>Help</p>
            <p>FAQs</p>
            <p>Contact Us</p>
        </div>

        <div className="footer-section3">
            <h3>Stay Connected</h3>
            <img src="/facebook.jpg" alt="Facebook" />
            <img src="/twitter.jpg" alt="Twitter" />
            <img src="/instagram.avif" alt="Instagram" />
            <div className="footer-section4">
            <h3>DEV@Deakin 2025</h3>
           <br></br>
           <ul>
            <li> Privacy Policy</li>
            <li>Terms</li>
            <li>Code of Conduct</li>
           </ul>
           
            
        </div>
            
        </div>
 
        </div>
       
        </>

    )
}

export default Footer;