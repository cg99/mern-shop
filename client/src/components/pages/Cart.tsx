import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Items from '../cart/Items'
import ShippingForm from '../cart/ShippingForm'
import ContactForm from '../cart/ContactForm'
import BillingForm from '../cart/BillingForm'
import '../../sass/cart.scss';



const Cart: React.FC = () => {

    return (
        <div className="my-4">
            <Container>
                <Row>
                    <Col md={7} className="pr-4">
                        <h2 className="text-left mb-4">Shopping Cart</h2>
                        <Items />
                    </Col>
                    <Col md={5} style={{
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        padding: "2rem",
                        margin: "auto"
                    }}>
                        <h2 className="text-left mb-3">Payment Info</h2>
                        <Tabs defaultActiveKey="shipping" id="uncontrolled-tab-example">
                            <Tab eventKey="shipping" title="Shipping">
                                <ShippingForm />
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                <ContactForm />
                            </Tab>
                            <Tab eventKey="billing" title="Billing">
                                <BillingForm />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Cart
