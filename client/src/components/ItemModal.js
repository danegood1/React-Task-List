import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    model: false,
    title: "",
    desc: "",
    start_date: Date.now
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.title]: e.target.value });
    this.setState({ [e.target.desc]: e.target.value });
    this.setState({ [e.target.start_date]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      title: this.state.title,
      desc: this.state.desc,
      start_date: this.state.start_date
    };

    // Add item from addItem action
    this.props.addItem(newItem);

    // Close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Task
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to edit Tasks</h4>
        )}
        <br />

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Tasks:</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Enter Title</Label>
                <Input
                  type="text"
                  title="title"
                  id="item"
                  placeholder="Add task..."
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="item">Enter Description</Label>
                <Input
                  type="text"
                  title="desc"
                  id="item"
                  placeholder="Add description..."
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Task
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
