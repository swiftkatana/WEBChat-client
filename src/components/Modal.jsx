import React from 'react'
import { Modal, Button } from 'react-bootstrap'




export default function(props){



    return(
        <Modal     aria-labelledby="contained-modal-title-vcenter"
        centered show={props.show} onHide={props.onClick.ShowOrHide}>
            <Modal.Header closeButton>
            <Modal.Title>{props.text.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClick.good}>{props.text.good}</Button>
                <Button variant="danger" onClick={props.onClick.bad} >{props.text.bad}</Button>
            </Modal.Footer>
        </Modal>
    )


}