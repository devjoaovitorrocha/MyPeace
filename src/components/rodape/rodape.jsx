
import'./rodape.css'

function Rodape() {
    return (
        <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>About Us</h3>
          </div>

          <div className="footer-column">
            <h3>Home</h3>
          </div>

          <div className="footer-column">
            <h3>Sign Up</h3>
            <p>Join us today!</p>
            <button>Sign Up</button>
          </div>

          <div className="footer-column">
            <h3>Login</h3>
            <p>Welcome back!</p>
            <button>Login</button>
          </div>
          
        </div>
      </footer>
    );
}

export default Rodape;