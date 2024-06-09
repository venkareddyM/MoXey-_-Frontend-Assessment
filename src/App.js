import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  Spinner,
  Table,
  Container,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    const newUser = {
      ...data,
      userId: generateUserId(),
    };
    setTableData([...tableData, newUser]);
    reset();
    setOpenModal(false);
  };

  // Handle deleting an entry
  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  // Generate a random user ID
  const generateUserId = () => {
    return "UID" + Math.floor(Math.random() * 10000);
  };

  return (
    <Container className="mt-4">
      {/* Button to open the modal for adding entries */}
      <Button
        variant="primary"
        onClick={() => setOpenModal(true)}
        style={{ backgroundColor: "#22b470", marginBottom: "1rem" }}
      >
        + Add New User
      </Button>

      {/* Modal for adding new user */}
      <Modal show={openModal} onHide={() => setOpenModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>+Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Role</Form.Label>
              <Form.Control
                as="select"
                {...register("userRole", { required: "User Role is required" })}
              >
                <option value="">Select</option>
                <option value="role1">Role 1</option>
                <option value="role2">Role 2</option>
                <option value="role3">Role 3</option>
              </Form.Control>
              {errors.userRole && (
                <p className="text-danger">{errors.userRole.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                {...register("status", { required: "Status is required" })}
                placeholder="Enter status"
              />
              {errors.status && (
                <p className="text-danger">{errors.status.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry By</Form.Label>
              <Form.Control
                type="date"
                {...register("expiryBy", {
                  required: "Expiry date is required",
                })}
              />
              {errors.expiryBy && (
                <p className="text-danger">{errors.expiryBy.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                {...register("mobileNumber", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: "Invalid mobile number",
                  },
                })}
                placeholder="Enter mobile number"
              />
              {errors.mobileNumber && (
                <p className="text-danger">{errors.mobileNumber.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Limit</Form.Label>
              <Form.Control
                type="number"
                {...register("paymentLimit", {
                  required: "Payment Limit is required",
                  min: {
                    value: 0,
                    message: "Payment limit must be a positive number",
                  },
                })}
                placeholder="Enter payment limit"
              />
              {errors.paymentLimit && (
                <p className="text-danger">{errors.paymentLimit.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                as="select"
                {...register("supervisor", {
                  required: "Supervisor is required",
                })}
              >
                <option value="">Select Supervisor</option>
                <option value="sup1">Supervisor 1</option>
                <option value="sup2">Supervisor 2</option>
                <option value="sup3">Supervisor 3</option>
              </Form.Control>
              {errors.supervisor && (
                <p className="text-danger">{errors.supervisor.message}</p>
              )}
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="ms-2"
                style={{ backgroundColor: "#22b470" }}
              >
                Add User
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table displaying submitted data */}
      <h1>Settings</h1>
      <h6>User List</h6>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>User ID</th>
            <th>Email Address</th> <th>First Name</th>
            <th>Last Name</th>
            <th>User Role</th>
            <th>Expiry By</th>
            <th>Mobile Number</th>
            <th>Payment Limit</th>
            <th>Supervisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((user, index) => (
              <tr key={index}>
                <td>{user.status}</td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userRole}</td>
                <td>{user.expiryBy}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.paymentLimit}</td>
                <td>{user.supervisor}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleDelete(index)} style={{color:'green',backgroundColor:'darkgreen'}}>
                        Remove User
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No Users Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
