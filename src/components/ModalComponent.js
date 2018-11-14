/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Image } from 'react-bootstrap';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div>
        <Modal isOpen= {this.props.modal} toggle={this.props.showModal} className={this.props.className}>
          <ModalHeader toggle={this.props.showModal}>{this.props.person.first_name}</ModalHeader>
          <ModalBody>
              <Image src={this.props.person.avatar} thumbnail /> {this.props.person.first_name} {this.props.person.last_name}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.showModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;