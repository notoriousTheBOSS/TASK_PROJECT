import React, { useState, useEffect } from "react";
import { Pagination, message } from "antd";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import add from "../../assets/icons/add.svg";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import ModalEdit from "../../components/ModalEdit";
import driversAPI from "../../service/drivers";
import { setDrivers } from "../../store/drivers";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  console.log(drivers);

  const getDrivers = () => {
    driversAPI
      .getDrivers()
      .then((res) => {
        console.log("res drivers", res);
        dispatch(setDrivers(res?.data));
      })
      .catch((err) => {
        console.log("err courses", err);
      });
  };

  // const postDrivers = (data) => {
  //     driversAPI
  //         .postDrivers(data)
  //         .then((res) => {
  //             console.log("post drivers", res);
  //             setData((prevData) => [...prevData, res.data]);
  //             setIsModalVisible(false);
  //         })
  //         .catch((err) => {
  //             console.error(err);
  //         });
  // };
  const postDrivers = (data) => {
    data?.fullName.length > 0 &&
    data?.number.length > 0 &&
    data?.allOrders.length > 0 &&
    data?.typeOfUser.length > 0
      ? driversAPI
          .postDrivers(data)
          .then(
            (res) =>
              res?.data &&
              driversAPI
                .getDrivers()
                .then((res) => {
                  console.log("res drivers", res);
                  dispatch(setDrivers(res?.data));
                })
                .catch((err) => {
                  console.log("err courses", err);
                })
          )
          .catch((err) => console.log(err))
      : message.warning("Please fill all fields");
  };

  const handleEditClick = (driver) => {
    setEditingDriver(driver);
    setIsModalVisible2(true);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const totalItems = drivers?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentData =
    drivers && Array.isArray(drivers)
      ? drivers.slice(startIndex, endIndex)
      : [];

  const handleModalToggle = () => {
    console.log("bosildi");
    setIsModalVisible(!isModalVisible);
    setEditData(null);
  };

  return (
    <div className="container border-x">
      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="max-w-[1160px] w-full ml-[280px] h-screen">
          <header className="border-b border-[#E5E9EB] top-0 fixed z-10 bg-white">
            <div className="w-[1160px] flex items-center justify-between h-[56px] px-4 ">
              <h2 className="font-[SemiBold] text-[20px] leading-6 flex gap-6">
                Все водители
                <span className="w-[1px] h-[24px] bg-[#E5E9EB] block"></span>
              </h2>
              <button
                onClick={handleModalToggle}
                className="bg-[#36AD49] rounded-md gap-2 flex items-center h-[36px] text-white px-[8px] text-[14px]"
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={add} alt="" />
                </span>
                Добавить
              </button>
            </div>
          </header>
          <main className="bg-[#EAF2F1] w-full h-[888px] p-4 mt-[56px]">
            {isModalVisible && (
              <Modal onClose={handleModalToggle} postDriver={postDrivers} />
            )}
            <div className="bg-white w-full h-full rounded-md flex flex-col justify-between">
              <div className="w-full h-full p-4">
                <Table data={currentData} handleEditClick={handleEditClick} />
                {isModalVisible2 && (
                  <ModalEdit
                    data={editingDriver}
                    onClose={() => {
                      setIsModalVisible2(false);
                      setEditingDriver(null);
                    }}
                  />
                )}
              </div>
              <div className="h-[56px] border-t flex items-center px-4 place-content-end">
                <Pagination
                  defaultCurrent={1}
                  total={totalItems}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
