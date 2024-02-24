import React, { useState } from "react";
import editor from "../assets/icons/editorMenu.svg";
import { Dropdown, Space } from "antd";
import edit from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import driversAPI from "../service/drivers";
import { useDispatch } from "react-redux";
import { setDrivers } from "../store/drivers";

// const formatCreatedAt = (createdAt) => {
//     if (!createdAt || isNaN(Date.parse(createdAt))) {
//         return "Invalid createdAt value";
//     }

//     const date = new Date(createdAt);

//     if (isNaN(date.getTime())) {
//         return "Invalid date";
//     }

//     const formattedDate = date.toISOString().split("T")[0];
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     return `${formattedDate} ${hours}:${minutes}`;
// };

const Table = ({ data, handleEditClick }) => {
  const dispatch = useDispatch();

  // const sortedData = data?.sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );
  // const slicedData = sortedData?.slice(0, 10);
  return (
    <div>
      <div className="driverstable">
        <table className="max-w-full w-full border">
          <thead>
            <tr className="h-[48px] border-b-2  w-full text-left text-[14px]">
              <th className="w-[48px] px-4 border-r-[1px]">№</th>
              <th className="w-[120px] px-4 border-r-[1px]">ID водителя</th>
              <th className="w-[200px] px-4 border-r-[1px]">ФИО водителя</th>
              <th className="w-[180px] px-4 border-r-[1px]">Номер телефона</th>
              <th className="w-[140px] px-4 border-r-[1px]">Все заказы</th>
              <th className="w-[200px] px-4 border-r-[1px]">
                Тип пользователя
              </th>
              <th className="w-[160px] px-4 border-r-[1px]">Дата создание</th>
              <th className="w-[48px] px-4 border-r-[1px]">
                <button>
                  <img src={editor} alt="" />
                </button>
              </th>
            </tr>
          </thead>
          {data?.length > 0 || data ? (
            data?.map((item, index) => {
              return (
                <tbody>
                  <tr
                    key={index}
                    className={`h-[60px] border-b-2 text-[14px]  w-full ${
                      (index + 1) % 2 == 1 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="border-r-[1px] text-center">{index + 1}</td>
                    <td className="border-r-[1px] px-4 ">{+item?.id}</td>
                    <td className="border-r-[1px] px-4 ">{item?.fullName}</td>
                    <td className="border-r-[1px] px-4 ">
                      +
                      {/* {item?.number.length > 13
                                                ? `${item.number.slice(0, 13)}`
                                                : item.number} */}
                      {item?.number}
                    </td>
                    <td className="border-r-[1px] px-4  ">{item?.allOrders}</td>
                    <td className="border-r-[1px] px-4  ">
                      {item?.typeOfUser}
                    </td>
                    <td className="border-r-[1px] px-4  ">
                      {/* {formatCreatedAt(item.createdAt)} */}
                      {item?.createdAt}
                    </td>
                    <td className="border-r-[1px] px-4  ">
                      <Dropdown
                        menu={{
                          items: [
                            {
                              label: (
                                <button
                                  onClick={() => handleEditClick(item)}
                                  className="w-full flex items-center gap-3 p-2 rounded-s-sm"
                                >
                                  <span className="h-[32px] w-[32px] bg-[#36AD490D] rounded-md grid place-content-center ">
                                    <img src={edit} alt="" />
                                  </span>
                                  Редактировать
                                </button>
                              ),
                              key: "0",
                            },
                            {
                              type: "divider",
                            },
                            {
                              label: (
                                <button
                                  onClick={() =>
                                    driversAPI
                                      .deleteDrivers(+item?.id)
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
                                  }
                                  className="w-full flex items-center gap-3 p-2 rounded-s-sm"
                                >
                                  <span className="h-[32px] w-[32px] bg-[#FEE8E6] rounded-md grid place-content-center ">
                                    <img src={deleteIcon} alt="" />
                                  </span>
                                  Удалить
                                </button>
                              ),
                              key: "1",
                            },
                          ],
                        }}
                        trigger={["click"]}
                      >
                        <button onClick={(e) => e.preventDefault()}>
                          <Space>...</Space>
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div className="w-full py-2 text-center">Loading...</div>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
