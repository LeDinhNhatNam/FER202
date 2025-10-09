import Button from 'react-bootstrap/Button';
import './Footer.css';

function MyFooter() {
    return (
        <footer>
            <p>Author: TraLBT</p>
            <p>Created by: tralbt@fe.edu.vn </p>
            <p>&copy; {new Date().getFullYear()} TraLBT. All rights reserved</p>
            <Button variant="link" href=""> My link Github's project: Movies Management </Button>
        </footer>
    );
}
export default MyFooter;