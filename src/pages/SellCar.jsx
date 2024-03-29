import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  craeteVandor,
  deleteCustomer,
  deleteVandor,
  getCustomer,
  getVandor,
  updateCustomer,
  updateVandor,
} from "../routes/apiCalls/ApiCalls";
import { toast, ToastContainer } from "react-toastify";
import "../styles/sell-car.css";
import ReactPaginate from 'react-paginate';

const SellCar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [customer, setCustomer] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const itemsPerPage = 5; // Set the number of items per page

  // useEffect(async () => {
  //   const res = await getCustomer();
  //   setCustomer(res.data.data);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCustomer();
        setCustomer(res.data.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []); // Empty dependency array ensures that useEffect runs only once on component mount

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (id, item) => {
    setData(item);
    setShowUpdateModal(true);
  };

  const handleDelete = (id) => {
    setId(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setData(null);

    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const confirmDelete = async () => {
    const res = await deleteCustomer(id);
    let respose = await getCustomer();
    setCustomer(respose.data.data);
    handleClose();
    toast.success("Vandor deleted succesfully");
  };

  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    const res = await updateCustomer(data);
    let respose = await getCustomer();
    setCustomer(respose.data.data);
    toast.success("vandor updated succesfully");
    handleClose();
  };

  return (
    <>
      <div className="sell__car">
        <h3 style={{ color: "white", display: "inline", marginRight: 650 }}>
          Customers{" "}
        </h3>

        <Table className="table-bordered table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Poastal Code</th>
              <th>Upadte</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customer
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <tr key={index}>
               <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.zipCode}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleUpdate(item._id, item)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ToastContainer />
      </div>
      <div className="pagination" >
  <ReactPaginate
    pageCount={Math.ceil(customer.length / itemsPerPage)}
    onPageChange={({ selected }) => handlePageChange(selected + 1)}
    containerClassName="pagination"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    activeClassName="active"
    previousLabel="Previous"
    nextLabel="Next"
  />
</div>

      {/* modal for updating  */}

      <Modal show={showUpdateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Custonmer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdateData}>
            <Form.Group controlId="formFullName">
              <Form.Label className="text-dark">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                //  value={ data?.fullName }
                defaultValue={data?.fullName}
                // {...register("fullName")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={data?.email}
                placeholder="Enter email"
                name="email"
                // {...register("email")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                defaultValue={data?.zipCode}
                name="zipCode"
                onChange={(e) => {
                  handleEdit(e);
                }}
                // {...register("zipCode")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="text-dark">Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter address"
                defaultValue={data?.address}
                // {...register("address")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                name="address"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Phone</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter phone number"
                defaultValue={data?.phone}
                name="phone"
                // {...register("phone")}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal for updating  */}

      {/* modal for deleteing */}

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => confirmDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for deleteing */}
    </>
  );
};

export default SellCar;
