import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  craeteVandor,
  deleteVandor,
  getVandor,
  updateVandor,
  verifyVandor,
} from "../routes/apiCalls/ApiCalls";
import { toast, ToastContainer } from "react-toastify";
import "../styles/vandors.css";
import ReactPaginate from 'react-paginate';

const Vandors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [vandor, setVandor] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const itemsPerPage = 5; // Set the number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVandor();
        setVandor(res.data.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // The empty dependency array means this effect will run once, similar to componentDidMount

  const onSubmit = async (data) => {
    try {
      const res = await craeteVandor(data);
      let respose = await getVandor();
      setVandor(respose.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    handleClose();
  };

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

  const handleVerify = async (id) => {
    await verifyVandor(id);
    let respose = await getVandor();
    setVandor(respose.data.data);
  };

  const handleClose = () => {
    setData(null);

    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const confirmDelete = async () => {
    const res = await deleteVandor(id);
    let respose = await getVandor();
    setVandor(respose.data.data);
    handleClose();
    toast.success("Vandor deleted succesfully");
  };

  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    const res = await updateVandor(data);
    let respose = await getVandor();
    setVandor(respose.data.data);
    toast.success("vandor updated succesfully");
    handleClose();
  };

  return (
    <>
      <div className="sell">
        <h3 style={{ color: "white", display: "inline", marginRight: 650 }}>
          Vandors{" "}
        </h3>
        <Button className="mb-2" variant="info" onClick={handleOpen}>
          Add
        </Button>

        <Table className="table-bordered table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Poastal Code</th>
              <th>Company Name</th>
              <th>Additional Info</th>
              <th>Is Approved</th>
              <th>Upadte</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vandor
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
                  <td>{item.companyName}</td>
                  <td>{item.additonalInfo}</td>
                  <td>
                    <Button
                      variant={item.isVerified ? "success" : "danger"}
                      onClick={() => handleVerify(item._id)}
                    >
                      {item.isVerified ? "Yes" : "No"}
                    </Button>
                  </td>
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
      <div className="pagination" style={{width:1700}}>
  <ReactPaginate
    pageCount={Math.ceil(vandor.length / itemsPerPage)}
    onPageChange={({ selected }) => handlePageChange(selected + 1)}
    containerClassName="pagination"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    activeClassName="active"
    previousLabel="Previous"
    nextLabel="Next"
  />
</div>

      {/* modal for adding  */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Vandors Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFullName">
              <Form.Label className="text-dark">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                {...register("fullName")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                {...register("email")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                {...register("zipCode")}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Comapany Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                {...register("companyName")}
                required
              />
            </Form.Group>
              <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                {...register("zipCode")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="text-dark">Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter address"
                {...register("address")}
                name="address"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                {...register("phone")}
                required
              />
            </Form.Group>

              <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Additional Info</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                {...register("additonalInfo")}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal for adding  */}

      {/* modal for updating  */}

      <Modal show={showUpdateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Vandors Information</Modal.Title>
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
                type="tel"
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

            
            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Comapny Name</Form.Label>
              <Form.Control
                type="tel"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter Company Name"
                defaultValue={data?.companyName}
                name="companyName"
                // {...register("phone")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Additional Info</Form.Label>
              <Form.Control
                type="tel"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Additional Info"
                defaultValue={data?.additonalInfo}
                name="additonalInfo"
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

export default Vandors;
