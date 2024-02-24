import React, { useState } from "react";
import exit from "../assets/icons/exit.svg";
import { setDrivers } from "../store/drivers";
import driversAPI from "../service/drivers";
import { useDispatch } from "react-redux";

const ModalEdit = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data.id,
    fullName: data.fullName,
    number: data.number,
    allOrders: data.allOrders,
    typeOfUser: data.typeOfUser,
    createdAt: data.createdAt,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    driversAPI
      .editDrivers(data.id, formData)
      .then((res) => {
        res?.data &&
          driversAPI
            .getDrivers()
            .then((res) => {
              console.log("res drivers", res);
              dispatch(setDrivers(res?.data));
            })
            .catch((err) => {
              console.log("err courses", err);
            });
        onClose();
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  console.log(data);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="w-[740px] h-[495px] rounded-lg border  z-60 absolute bg-white top-[20%] left-[30%]">
        <div className="h-[64px] p-4 flex items-center justify-between border-b">
          <h3 className="font-[SemiBold] text-[20px] leading-6">Водитель</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-content-center"
          >
            <img src={exit} alt="" />
          </button>
        </div>
        <form
          onSubmit={handleSave}
          className="mt-[16px] flex flex-col gap-y-[16px]"
        >
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">ID водителя</label>
            <input
              disabled
              type="number"
              name="id"
              defaultValue={data?.id}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите ID водителя"
            />
          </div>
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">ФИО водителя </label>
            <input
              required
              type="text"
              name="fullName"
              defaultValue={data?.fullName}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите ФИО водителя"
            />
          </div>
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">Номер телефона</label>
            <input
              required
              type="text"
              name="number"
              maxLength={13}
              defaultValue={data?.number}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите номер телефона"
            />
          </div>
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">Все заказы</label>
            <input
              required
              type="number"
              name="allOrders"
              defaultValue={data?.allOrders}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите заказы"
            />
          </div>
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">Тип пользователя</label>
            <input
              required
              type="text"
              name="typeOfUser"
              defaultValue={data?.typeOfUser}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите тип пользователя"
            />
          </div>
          <div className="h-[40px] flex justify-between px-4 items-center">
            <label htmlFor="">Дата создание</label>
            <input
              required
              type="text"
              name="createdAt"
              defaultValue={data?.createdAt}
              onChange={handleChange}
              className="w-[538px] h-[40px] p-2 outline-none border rounded-md"
              placeholder="Введите дата создание"
            />
          </div>
          <div className="w-full flex justify-end gap-6 px-4">
            <button
              type="button"
              onClick={handleCancel}
              className=" border border-[#36AD49] text-[#36AD49] h-10 w-[242.5px] rounded-md"
            >
              Отменить
            </button>
            <button
              onClick={handleSave}
              type="submit"
              className="bg-[#36AD49] text-white h-10 w-[242.5px] rounded-md"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
