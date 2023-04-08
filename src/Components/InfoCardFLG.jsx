import React from "react";
import Image from "next/image";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaShoppingCart,
} from "react-icons/fa";
import { Flex } from "@chakra-ui/react";
import { authModalState } from "../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

const InfoCard = ({
  origin,
  destination,
  departureTime,
  departureTimeretour,
  arrivalTime,
  arrivalTimeretour,
  durationretour,
  image,
  id,
  price,
  duration,
  stops,
  namecompany,
  user,
}) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handlePayment = async () => {
    console.log("handlePayment called");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          destination,
          price,
        }),
      });

      console.log("Response:", response);

      if (response.ok) {
        const { url } = await response.json();
        console.log("Redirecting to URL:", url);
        window.location.href = url;
      } else {
        console.error(
          "Error creating checkout session:",
          await response.text()
        );
        throw new Error("Error creating checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 cursor-pointer scale-77 m-5">
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <div className="flex items-center mb-3">
            <Image
              src={image}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-row justify-center align-center">
              <h1 className="text-3xl md:text-4xl font-bold ml-4 text-gray-800">
                {id} -
              </h1>
              <h1 className="text-3xl md:text-4xl font-bold ml-4 text-gray-800">
                {namecompany}
              </h1>
            </div>
            {user ? (
              <FaShoppingCart
                className="ml-auto text-3xl text-emerald-400"
                onClick={handlePayment}
              />
            ) : (
              <FaShoppingCart
                className="ml-auto text-3xl text-emerald-400"
                onClick={() => setAuthModalState({ open: true, view: "login" })}
              />
            )}
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800">
            {" "}
            {origin}{" "}
            <FaPlaneDeparture className="inline-block mx-1 text-emerald-400" />{" "}
            {destination}{" "}
            <FaPlaneArrival className="inline-block mx-1 text-emerald-400" />{" "}
          </h3>
          <hr className="my-3" />
          <div className="flex justify-between text-gray-600 text-sm md:text-base">
            <div className="flex flex-col items-center">
              <p className="font-bold">{departureTime}</p>
              <span className="text-gray-400">{origin}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{arrivalTime}</p>
              <span className="text-gray-400">{destination}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{duration}</p>
            </div>
          </div>

          <hr className="my-5 mx-20" />

          <div className="flex justify-between text-gray-600 text-sm md:text-base">
            <div className="flex flex-col items-center">
              <p className="font-bold">{departureTimeretour}</p>
              <span className="text-gray-400">{destination}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{arrivalTimeretour}</p>
              <span className="text-gray-400">{origin}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{durationretour}</p>
            </div>
          </div>
          <div className="flex justify-between text-gray-600 text-sm md:text-base">
            <div className="my-5">
              <span className="text-gray-400 my-5">stops : {stops}</span>
            </div>
            <div></div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-emerald-400">{price}</p>
              <span className="text-gray-400">aller-retour</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCard;
