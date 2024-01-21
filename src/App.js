import React, { useState } from "react";
import pic from "./assets/40542.jpg";
import "./App.css";

function App() {
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [indexVal, setIndex] = useState(false);
  const [formData, setFormData] = useState({
    namess: "",
    email: "",
    phone: "",
    url: "",
    isFav: false,
  });

  setTimeout(() => {
    setLoader(false);
  }, [1700]);

  const [formErrors, setFormErrors] = useState({
    namess: "",
    email: "",
    phone: "",
    url: "",
  });

  const [dataList, setDataList] = useState([
    {
      namess: "Aish",
      email: "aish@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: true,
    },
    {
      namess: "Kiran",
      email: "kiran@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: true,
    },
    {
      namess: "Krish",
      email: "krish@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: false,
    },
    {
      namess: "Shree",
      email: "shree@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: true,
    },
    {
      namess: "Manoj",
      email: "monaj@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: false,
    },
    {
      namess: "Bhadur",
      email: "bhadur@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: false,
    },
    {
      namess: "Ankit",
      email: "ankit@gmail.com",
      phone: "9987589568",
      url: "https://example.com",
      isFav: true,
    },
  ]);

  const toggleModal = (index) => {
    if (typeof index === "number") {
      setFormData({ ...dataList[index] });
      setIndex(index);
    } else {
      setFormData({
        namess: "",
        email: "",
        phone: "",
        url: "",
        isFav: false,
      });
    }
    setModalOpen(!isModalOpen);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding field's error when the user types
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleToggleFavorite = (index) => {
    const updatedList = [...dataList];
    updatedList[index].isFav = !updatedList[index].isFav;
    setDataList(updatedList);
  };

  const validateForm = () => {
    const { namess, email, phone, url } = formData;
    const newFormErrors = {};
    if (!namess.trim()) {
      newFormErrors.namess = "Name is required.";
    }
    if (!email.trim()) {
      newFormErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFormErrors.email = "Invalid email format.";
    }
    if (!phone.trim()) {
      newFormErrors.phone = "Phone is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newFormErrors.phone = "Invalid phone number.";
    }
    if (!url.trim()) {
      newFormErrors.url = "URL is required.";
    }
    setFormErrors(newFormErrors);
    return Object.keys(newFormErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedList = [...dataList];
      if (indexVal != "") {
        updatedList[indexVal] = { ...formData };
        setIndex("");
        setDataList(updatedList);
      } else {
        setDataList([...dataList, { ...formData }]);
      }
      setModalOpen(false);
      setFormData({
        namess: "",
        email: "",
        phone: "",
        url: "",
        isFav: false,
      });
    } else {
      // Form is not valid, display error messages
      console.log("Form is not valid");
    }
  };

  const handleDelete = (index) => {
    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);
  };

  return (
    <>
      {loader ? (
        <div className="loaderDiv">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="taskSection">
            <div className="btnDiv">
              <button className="addBtn" onClick={() => toggleModal()}>
                Add
              </button>
            </div>
            <div className="outerBox">
              {dataList.map((item, index) => (
                <div className="innerBox" key={index}>
                  <div className="imageBox">
                    <img src={pic} alt="pica" />
                  </div>
                  <div className="contentBox">
                    <p className="hd">{item.namess} </p>
                    <ul>
                      <li>
                        <i className="fa-solid fa-envelope"></i> {item.email}
                      </li>
                      <li>
                        <i className="fa-solid fa-phone-volume"></i>{" "}
                        {item.phone}
                      </li>
                      <li>
                        <i className="fa-solid fa-globe"></i> {item.url}
                      </li>
                    </ul>
                  </div>
                  <div className="buttonBox">
                    <div
                      className="buttonBoxin lftbr"
                      onClick={() => handleToggleFavorite(index)}
                    >
                      {item.isFav ? (
                        <i className="fa-solid fa-heart red"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </div>
                    <div
                      className="buttonBoxin lftbr"
                      onClick={() => toggleModal(index)}
                    >
                      <i className="fa-solid fa-file-pen"></i>
                    </div>
                    <div
                      className="buttonBoxin"
                      onClick={() => handleDelete(index)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`modal ${isModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <span className="close-btn" onClick={toggleModal}>
                &times;
              </span>
              <form onSubmit={handleSubmit} className="attractive-form">
                <div className="form-group">
                  <label htmlFor="namess">Name:</label>
                  <input
                    type="text"
                    id="namess"
                    name="namess"
                    value={formData.namess}
                    onChange={handleInputChange}
                  />
                  <p className="erorr">{formErrors.namess}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <p className="erorr">{formErrors.email}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <p className="erorr">{formErrors.phone}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="url">URL:</label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                  />
                  <p className="erorr">{formErrors.url}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="isFav">Is Favorite:</label>
                  <input
                    type="checkbox"
                    id="isFav"
                    name="isFav"
                    checked={formData.isFav}
                    onChange={() =>
                      setFormData({ ...formData, isFav: !formData.isFav })
                    }
                  />
                </div>

                <button className="submit" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
