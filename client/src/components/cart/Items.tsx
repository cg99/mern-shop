import React from 'react'
import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoMdClose } from 'react-icons/io'
import { TiMinus, TiPlus } from 'react-icons/ti'

const Items = () => {
    return (
        <div>
            <Table className="shopping__cart--table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img className="mr-3" width="60" src="https://instagram.fktm6-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/108165045_730418197690944_800490400612758439_n.jpg?_nc_ht=instagram.fktm6-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=OQEYYIod7K4AX8TdbFj&tp=1&oh=03facf7cf006cf7d5e1457c64925a78b&oe=60053045" alt="" />
                            <span>Pumpkin Seed Butter</span>
                        </td>
                        <td><TiMinus className="product__add" /> <span className="product__quantity"> 4 </span> <TiPlus className="product__minus" /></td>
                        <td>Rs 200</td>
                        <td><IoMdClose className="product__item--cancel" /></td>
                    </tr>
                    <tr>
                        <td>
                            <img className="mr-3" width="60" src="https://instagram.fktm6-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/60216949_2098835593561054_7067612655439060242_n.jpg?_nc_ht=instagram.fktm6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=jLOhbemKKJ0AX9PDHCJ&tp=1&oh=b847c2c641929e45b86f5cbb547c0cbf&oe=600450ED" alt="" />
                            <span>No-tella</span>
                        </td>
                        <td><TiMinus className="product__add" /> <span className="product__quantity"> 2 </span> <TiPlus className="product__minus" /></td>
                        <td>Rs 300</td>
                        <td><IoMdClose className="product__item--cancel" /></td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col className="text-left d-flex" style={{ alignItems: "flex-end" }}>
                    <Link to="/products" style={boldStyle}> <IoIosArrowBack style={{ marginTop: "1px" }} /> Continue Shopping </Link>
                </Col>
                <Col className="mr-3">
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Subtotal: </Col>
                        <Col className="text-left">Rs 3999</Col>
                    </Row>
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Shipping: </Col>
                        <Col className="text-left">Free</Col>
                    </Row>
                    <Row style={{ borderTop: "2px solid #dae0e5", marginTop: "5px" }}>
                        <Col className="text-right"><div style={boldStyle}>Total: </div></Col>
                        <Col className="text-left"><div style={boldStyle}>Rs. 3999 </div></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const boldStyle = {
    color: "#333",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center"
}

export default Items
