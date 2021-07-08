import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';


export default function Footer() {
    return (
        <div>
            <footer className="pt-5 pb-2">
                <Container>
                    <Row>
                        <Col className="text-left">made with 💚️ by codegenes.net</Col>
                        <Col className="text-left">@ 2021 vegan foods</Col>
                        <Col className="text-right">
                            <a href="#facebook" className="text-dark mr-1">
                                <FaFacebookF />
                            </a>
                            <a href="#instagram" className="text-dark">
                                <FaInstagram />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}
