import HeaderNoSearch from "../Components/HeaderNoSearch";
import Footer from "../Components/Footer";
import BannerImg from "/public/images/HotelBanner.jpg";
import { Box, Text, Button, Flex, Spacer, Input } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React, { useState } from "react";
import LargeCard from "../Components/LargeCard";

function Hotels() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState(1);

  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/Search",
      query: {
        location: destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <div className=" h-screen flex flex-col justify-between">
      <HeaderNoSearch />

      <main className="mb-auto ">
        <div className="">
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] flex items-center justify-center ">
            <Image
              src={BannerImg}
              alt="BannerImg"
              objectFit="cover"
              layout="fill"
            />
            <Box
              position="absolute"
              width="100%"
              height="100%"
              opacity="0.55"
              background="blue.300"
            />
            <div className="absolute flex items-center justify-center flex-col text-white">
              <Text fontWeight={"bold"} fontSize={{ base: "28px", md: "40px" }}>
                Make your travel wishlist,
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "43px", md: "80px" }}>
                we'll do the rest
              </Text>
              <Text
                fontWeight={"semibold"}
                fontSize={{ base: "14px", md: "20" }}
              >
                Special offers to suit your plan
              </Text>
            </div>
          </div>
          <div className="relative w-full h-[100px] flex justify-center ">
            <div className=" mx-auto px-8 sm:px-16 absolute -top-20">
              <div className=" bg-white shadow-xl rounded-2xl py-10 px-5 md:px-10 space-x-5">
                <Flex className="flex-col md:flex-row">
                  <div className="relative mb-4 mx-2">
                    <span
                      className="absolute text-gray-700 text-xs font-bold mb-2 left-0 top-2 mx-6 
            transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white "
                      htmlFor="destination"
                    >
                      Enter Destination
                    </span>
                    <Input
                      id="destination"
                      placeholder="Agadir, Morocco"
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <Spacer />

                  <div className="relative mb-4 mx-2">
                    <span
                      className="absolute text-gray-700 text-xs font-bold mb-2 left-0 top-2 mx-6 
            transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white z-10"
                      htmlFor="startDate"
                    >
                      Start Date
                    </span>
                    <DatePicker
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline focus:border-emerald-400 transition duration-200 "
                      id="startDate"
                      placeholderText="dd/mm/yyyy"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <Spacer />

                  <div className="relative mb-4 mx-2">
                    <span
                      className="absolute text-gray-700 text-xs font-bold mb-2 left-0 top-2 mx-6 
            transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white z-10"
                      htmlFor="endDate"
                    >
                      End Date
                    </span>
                    <DatePicker
                      className="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline focus:border-emerald-400 transition duration-200"
                      id="endDate"
                      placeholderText="dd/mm/yyyy"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <Spacer />

                  <div className="relative mb-4 mx-2">
                    <label
                      className="absolute text-gray-700 text-xs font-bold mb-2 left-0 top-2 mx-6 
            transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white"
                      htmlFor="numberOfPeople"
                    >
                      Nop
                    </label>
                    <Input
                      htmlSize={2}
                      width={"auto"}
                      id="numberOfPeople"
                      placeholder="Enter number of people"
                      type="number"
                      min="1"
                      max="10"
                      value={noOfGuests}
                      onChange={(e) => setNoOfGuests(e.target.value)}
                    />
                  </div>
                  <Spacer />

                  <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={search}
                    className="text-sm"
                  >
                    Search
                  </Button>
                </Flex>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[100px] mb-20 md:mb-10"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-16 ">
          <LargeCard
            img="https://links.papareact.com/4cj"
            title="The greatest Outdoors"
            description="Provided by GoMorocco."
            buttonText="Get Inspired"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Hotels;
