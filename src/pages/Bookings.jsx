import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Button,
  Modal,
  Form,
  Collapse,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  addExtraamount,
  allotBooking,
  craeteVandor,
  deleteCustomer,
  deleteVandor,
  getAllBookings,
  getCustomer,
  getVandor,
  getVandorByName,
  refund,
  updateCustomer,
  updateVandor,
} from "../routes/apiCalls/ApiCalls";
import { toast, ToastContainer } from "react-toastify";
import "../styles/bookings.css";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transId, setTransid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [bookId, setBookId] = useState();
  const [vandor, setVandor] = useState([]);
  const [text, setText] = useState([]);
  const [booking, setBooking] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [price, setPrice] = useState();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const itemsPerPage = 5; // Set the number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBookings();
        setBooking(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []); // Empty dependency array ensures that useEffect runs only once on component mount

  const handleSearch = async (e) => {
    let res = await getVandorByName(e.target.value);
    setText(res.data.data);

    if (e.target.value === "") {
      document.getElementById("myUl").style.display = "none";
    } else {
      document.getElementById("myUl").style.display = "block";
    }

    // Set the name directly here
  };




  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (id, item) => {
    setBookId(id);
    setShowUpdateModal(true);
  };

  const handleAccept = (id, item) => {
    setBookId(id);
    setShowAcceptModal(true);
  };

  const handleExtra = (id) => {
    setBookId(id);
    setShowExtraModal(true);
  };

  const handleRefund = (id, trasId, pri) => {
    setPrice(pri);
    setTransid(trasId);
    setBookId(id);
    setShowRefundModal(true);
  };

  const handleClose = () => {
    setData(null);
    setShowModal(false);
    setShowUpdateModal(false);
    setShowExtraModal(false);
    setShowAcceptModal(false);
    setShowRefundModal(false);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const confirmDelete = async () => {
    const res = await deleteCustomer(id);
    let respose = await getCustomer();
    setBooking(respose.data.data);
    handleClose();
    toast.success("Vandor deleted succesfully");
  };

  const onSubmit = async (e) => {
    if (e.chaufferLiscence[0]?.size && e.chaufferLiscence[0].size > 1024 * 1024) {
      toast.error("Use filesize less than 1 MB");
    } else {
      let res = await allotBooking(bookId, id, e);
      toast.success("Booking updated successfully");
      handleClose();
      const response = await getAllBookings();
      setBooking(response.data.data);
      reset();
    }
  };


  const onExtraSubmit = async (e) => {
    let res = await addExtraamount(bookId, e);
    toast.success("Booking updated succefully");
    handleClose();
    const response = await getAllBookings();
    setBooking(response.data.data);
  };

  const onRefundSubmit = async (e) => {
    let res = await refund(bookId, e, transId);
    if (res.data.status == true) {
      toast.success("Payment Refunded succefully");
      reset();
    }

    handleClose();
    const response = await getAllBookings();
    setBooking(response.data.data);
  };

  const handleLiClick = (names, email, id) => {
    setName(names);
    setEmail(email);
    setId(id);
    document.getElementById("inputText").value = names;
    document.getElementById("myUl").style.display = "none";
  };

  const [expandedVendorRow, setExpandedVendorRow] = useState(null);
  const [expandedChaufferRow, setExpandedChaufferRow] = useState(null);
  const [expandedBookingRow, setExpandedBookingRow] = useState(null);
  const handleToggleVendorRow = (index) => {
    setExpandedVendorRow(expandedVendorRow === index ? null : index);
  };

  const handleToggleChaufferRow = (index) => {
    setExpandedChaufferRow(expandedChaufferRow === index ? null : index);
  };

  const handleToggleBookingRow = (index) => {
    setExpandedBookingRow(expandedBookingRow === index ? null : index);
  };

  const handleSet = async () => {
    let res = await addExtraamount(bookId);
    toast.success("Booking accepted succesfully");
    const response = await getAllBookings();
    setBooking(response.data.data);
    handleClose();
  };


  return (
    <>
      <div className="sell__car" style={{ width: 1500 }}>
        <h3 style={{ color: "white", display: "inline", marginRight: 650 }}>
          Bookings{" "}
        </h3>

        <Table className="table-bordered table-dark " >
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone</th>
              <th>Booking Details</th>
              <th>Vendor</th>
              <th>Is Allotted</th>
              <th>Chauffeur's Details</th>
              <th>Cancel and Refund</th>
              <th>Accept Booking</th>
              <th>Allot Booking</th>
              <th>Extra Price</th>
            </tr>
          </thead>
          <tbody>
            {booking
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item?.user?.fullName}</td>
                    <td>{item?.user?.email}</td>
                    <td>{item?.user?.phone}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleToggleBookingRow(index)}
                      >
                        {expandedBookingRow === index
                          ? "Hide Booking Details"
                          : "Show Booking Details"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleToggleVendorRow(index)}
                      >
                        {expandedVendorRow === index
                          ? "Hide Vendor Details"
                          : "Show Vendor Details"}
                      </Button>
                    </td>


                    <td>
                      {item.isAlloted ? (
                        <Button variant="success">Yes</Button>
                      ) : (
                        <Button variant="danger">No</Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleToggleChaufferRow(index)}
                      >
                        {expandedChaufferRow === index
                          ? "Hide Chauffeur Details"
                          : "Show Chauffeur Details"}
                      </Button>
                    </td>

                    <td>{item?.paymentStatus=="unpiad"?<Button
                        variant="info">Unpaid</Button>:<Button
                        variant="info"
                        onClick={() =>
                          handleRefund(
                            item._id,
                            item.transactionId,
                            item?.finalPrice
                          )
                        }
                      >
                        Refund
                      </Button>}
                      
                    </td>
                    <td>
                      {item?.bookingStatus === 'accepted' ? (
                        <Button variant={"success"}>
                          Accepted
                        </Button>
                      ) : item?.bookingStatus === 'cancelled' ? (
                        <Button variant={"primary"}>
                          Cancelled
                        </Button>
                      ) : (
                        <Button variant={"danger"} onClick={() => handleAccept(item._id, item)}>
                          Pending
                        </Button>
                      )}

                    </td>
                    <td>
                      <Button
                        variant={item?.isAlloted == true ? 'success' : 'warning'}
                        onClick={() => handleUpdate(item._id, item)}
                      >
                        {item.isAlloted ? 'Alloted' : 'Not Alloted'}
                      </Button>

                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleExtra(item._id, item)}
                      >
                        Add Extra Price
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="12">
                      <Collapse in={expandedVendorRow === index}>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              border: "1px solid black",
                            }}
                          >
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Vendor Name</strong> {item?.vandor?.fullName}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Vendor Email</strong><br></br> {item?.vandor?.email}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Vendor Phone</strong><br></br> {item?.vandor?.phone}
                            </div>
                          </div>
                        </div>
                      </Collapse>
                      <Collapse in={expandedChaufferRow === index}>
                        <div>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                border: "1px solid black",
                              }}
                            >
                              <div style={{ flex: 1, border: "1px solid black" }}>
                                <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Chauffeur Name</strong>{" "}
                                <br></br> {item?.allocateChaufferName}
                              </div>
                              <div style={{ flex: 1, border: "1px solid black" }}>
                                <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Chauffeur Phone</strong><br></br> {item?.vandor?.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                      <Collapse in={expandedBookingRow === index}>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              border: "1px solid black",
                            }}
                          >
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Booking Id</strong> <br></br>{item?.bookingId}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Booking Status</strong> <br></br>{item?.bookingStatus}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Pickup Date</strong><br></br> {item?.startDate?.split("T")[0]}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Pickup Time</strong><br></br> {item?.startTime?.split("T")[1]?.slice(0, 5)}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>payment Status</strong> <br></br>{item?.paymentStatus}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Final Price</strong><br></br> {Math.round(item?.finalPrice * 100) / 100}$
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Transaction Id</strong><br></br> {item?.transactionId}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>Booking Mode</strong><br></br> {item?.bookingMode}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>From</strong> <br></br>{item?.from}
                            </div>
                            <div style={{ flex: 1, border: "1px solid black" }}>
                              <strong style={{ backgroundColor: "#c2c2a3", color: "black" }}>To</strong><br></br> {item?.to}
                            </div>
                          </div>
                        </div>
                      </Collapse>

                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </Table>
        <ToastContainer />
      </div>
      <div className="pagination" style={{ width: 1500 }}>
        <ReactPaginate
          pageCount={Math.ceil(booking.length / itemsPerPage)}
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
          <Modal.Title>Add Chauffeur's Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label className="text-dark">Vendor Name</Form.Label>
              <Form.Control
                id="inputText"
                type="text"
                placeholder="Search vendor here"
                name="vendorName"
                autoComplete="off"
                defaultValue={name}
                onChange={(e) => {
                  handleSearch(e);
                }}
                onInput={() => {
                  document.getElementById("myUl").style.display = "block";
                }}
                list="vendorsDataList"
                required
              />
              {/* <datalist id="vendorsDataList" >
            {text?.map((result) => (
              <option 
                key={result._id}
                value={result.fullName}
                data-email={result.email}
                data-id={result._id}
              />
            ))}
          </datalist> */}
              <div>
                <ul id="myUl">
                  {text?.map((result) => (
                    <li
                      key={result._id}
                      style={{
                        listStyle: "none",
                        cursor: "pointer",
                        backgroundColor: "#f2f2f2",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() =>
                        handleLiClick(result.fullName, result.email, result._id)
                      }
                    >
                      {/* You can also add an icon or any other element here */}

                      <span style={{ flexGrow: 1 }}>{result.fullName}</span>
                    </li>

                  ))}
                </ul>
              </div>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-dark">Vandor Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={email}
                placeholder="Enter email"
                name="vandorNmail"
                // {...register("email")}
                onChange={(e) => {
                  handleEdit(e);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label className="text-dark">Chauffeur Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Chauffeur name"
                // defaultValue={data?.zipCode}
                name="chaufferName"
                // onChange={(e) => { handleEdit(e) }}
                {...register("chaufferName")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="text-dark">Chauffeur's Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile number"
                // defaultValue={data?.address}
                {...register("chaufferNumber")}
                // onChange={(e) => { handleEdit(e) }}
                name="chaufferNumber"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-dark">
                Chauffeur's Drving Certificate
              </Form.Label>
              <Form.Control
                type="file"
                // onChange={(e) => { handleEdit(e) }}
                placeholder="Enter phone "
                // defaultValue={data?.phone}
                name="chaufferLiscence"
                {...register("chaufferLiscence")}
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

      <Modal show={showExtraModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onExtraSubmit)}>
            <Form.Group controlId="formAd">
              <Form.Label className="text-dark">Add Amount</Form.Label>
              <Form.Control
                type="ext"
                placeholder="Enter extra amount"
                // defaultValue={data?.address}
                {...register("extraAmount")}
                // onChange={(e) => { handleEdit(e) }}
                name="extraAmount"
                required
              />
            </Form.Group>
            <Form.Group controlId="formAd">
              <Form.Label className="text-dark">Add Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                // defaultValue={data?.address}
                {...register("reasonExtra")}
                // onChange={(e) => { handleEdit(e) }}
                name="reasonExtra"
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal for deleteing */}

      <Modal show={showAcceptModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to accept booking?</p>

          <Button
            variant="success"
            onClick={() => {
              handleSet();
            }}
          >
            Accept
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showRefundModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onRefundSubmit)}>
            <Form.Group controlId="for">
              <Form.Label className="text-dark">Add Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter amount (not more than ${price})`}
                // defaultValue={data?.address}
                {...register("amount")}
                // onChange={(e) => { handleEdit(e) }}
                name="amount"
                required
              />
              <br></br>
              <Form.Control
                type="text"
                placeholder={`Enter cancel resaon`}
                // defaultValue={data?.address}
                {...register("reason")}
                // onChange={(e) => { handleEdit(e) }}
                name="reason"
                required
              />
            </Form.Group>
<br></br>
            <Button variant="danger" type="submit">
              Refund
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Bookings;
