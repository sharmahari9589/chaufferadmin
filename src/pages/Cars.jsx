import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "../styles/cars.css";
import {
  craeteCar,
  deleteCar,
  getCar,
  updateCar,
} from "../routes/apiCalls/ApiCalls";
import ReactPaginate from 'react-paginate';

const Cars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [car, setCar] = useState([]);
  const [myImg,setMyImg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const itemsPerPage = 5; // Set the number of items per page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCar();
        setCar(res.data.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []); // Empty dependency array ensures that useEffect runs only once on component mount

  const onSubmit = async (data) => {
    try {
      const res = await craeteCar(data);
      let respose = await getCar();
      setCar(respose.data.data);
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
   
    setMyImg(  e.target.files[0] )
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const confirmDelete = async () => {
    const res = await deleteCar(id);
    let respose = await getCar();
    setCar(respose.data.data);
    handleClose();
    toast.success("Car deleted succesfully");
  };

  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    const res = await updateCar(data,myImg);
    let respose = await getCar();
    setCar(respose.data.data);
    toast.success("Car updated succesfully");
    handleClose();
  };

  return (
    <>
      <div className="sell__car">
        <h3 style={{ color: "white", display: "inline", marginRight: 650 }}>
          Cars{" "}
        </h3>
        <Button className="mb-2" variant="info" onClick={handleOpen}>
          Add
        </Button>

        <Table className="table-bordered table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle Tpe</th>
              <th>Base Price</th>
              <th>Hourly Price</th>
              <th>Distance Price</th>
              <th>Margin</th>
              <th>VAT</th>
              <th>Minimun dist/hr</th>
              <th>Upadte</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {car
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <tr key={index}>
                 <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.basePrice}</td>
                  <td>{item.hourlyPrice}</td>
                  <td>{item.distancePrice}</td>
                  <td>{item.margin}</td>
                  <td>{item.vat}</td>
                  <td>{item.minimumDistancePerHour}</td>
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
    pageCount={Math.ceil(car.length / itemsPerPage)}
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
          <Modal.Title>Add Cars Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFullName">
              <Form.Label className="text-dark">Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicel type"
                name="vehicleType"
                {...register("vehicleType")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-dark">Base Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter base price"
                name="basePrice"
                {...register("basePrice")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Hourly Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hourly price"
                name="hourlyPrice"
                {...register("hourlyPrice")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="text-dark">Distance Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter distance price"
                {...register("distancePrice")}
                name="distancePrice"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Margin</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter margin"
                name="margin"
                {...register("margin")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">VAT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vat"
                name="vat"
                {...register("vat")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Minimum dist/hr</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diastance per hour"
                name="minimumDistancePerHour"
                {...register("minimumDistancePerHour")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formP">
              <Form.Label className="text-dark">Car Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter diastance per hour"
                name="carImg"
                {...register("carImg")}
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
          <Modal.Title>Update Car Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdateData}>
            <Form.Group controlId="formFullName">
              <Form.Label className="text-dark">Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicle type"
                name="vehicleType"
                //  value={ data?.fullName }
                defaultValue={data?.vehicleType}
                // {...register("fullName")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-dark">Base Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.basePrice}
                placeholder="Enter email"
                name="basePrice"
                // {...register("email")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Hourly Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hourly price"
                defaultValue={data?.hourlyPrice}
                name="hourlyPrice"
                onChange={(e) => {
                  handleEdit(e);
                }}
                // {...register("zipCode")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="text-dark">Distance Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter distance price"
                defaultValue={data?.distancePrice}
                // {...register("address")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                name="distancePrice"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Margin</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter margin"
                defaultValue={data?.margin}
                name="margin"
                // {...register("phone")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">VAT</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter vat"
                defaultValue={data?.vat}
                name="vat"
                // {...register("phone")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">Minimun dist/hr</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter distance per hour"
                defaultValue={data?.minimumDistancePerHour}
                name="minimumDistancePerHour"
                // {...register("phone")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhon">
              <Form.Label className="text-dark">Car Image</Form.Label>
              <Form.Control
                type="file"

                onChange={(e) => {
                  handleEdit(e);
                }}
                placeholder="Enter distance per hour"
                name="carImg"
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

export default Cars;
