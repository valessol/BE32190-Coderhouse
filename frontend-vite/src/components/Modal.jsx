import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CartContext } from "../context/CartContext";

const Modal = ({ onClose, data }) => {
  const { total, deleteAllProductsFromCart } = useContext(CartContext);

  const handleSubmit = async () => {
    await deleteAllProductsFromCart();
    onClose();
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-[60%] sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-6xl font-bold text-amber-500 my-4"
                  >
                    Resumen de compra
                  </Dialog.Title>
                  {data.map((item) => (
                    <div key={item._id} className="border-b last:border-none">
                      <p className="mb-4 font-bold text-3xl ">{item.title}</p>
                      <p className="text-2xl mb-0">Cantidad: {item.quantity}</p>

                      <p className="text-2xl mb-0">Precio: $ {item.price}</p>
                      <p className="mb-4 text-2xl subtotal">
                        Subtotal: ${" "}
                        <span className="font-bold">
                          {item.price * item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                  <div>
                    <p className="my-4 text-3xl font-black uppercase">
                      Total de la compra: $ {total}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 bg-gray-950 text-white uppercase p-4 font-bold border-none transition-colors md:mt-0 xl:flex-row hover:cursor-pointer hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-700"
                    onClick={handleSubmit}
                  >
                    Finalizar pedido
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
