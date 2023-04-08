import HeaderNoSearch from "../Components/HeaderNoSearch";
import Footer from "../Components/Footer";
import BannerImg from "/public/images/airportshort.jpg";
import { Box, Text, Button, Input, Flex, Spacer } from "@chakra-ui/react";
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
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d2dc17860emsh973eb4a7f985cc9p17695ejsn4bb3ff981242",
      "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
    },
  };

  const [codeOrgn, setCodeOrgn] = useState(null);
  const [codeDest, setCodeDest] = useState(null);

  useEffect(() => {
    fetch(
      `https://skyscanner44.p.rapidapi.com/autocomplete?query=${origin}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCodeOrgn(response))
      .catch((err) => console.error(err));
  }, [origin]);
  useEffect(() => {
    fetch(
      `https://skyscanner44.p.rapidapi.com/autocomplete?query=${destination}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCodeDest(response);
      })
      .catch((err) => console.error(err));
  }, [destination]);

  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/SearchFL",
      query: {
        orgn: origin,
        dest: destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfPeople,
        iataorg: codeOrgn[0].iata_code,
        iatadest: codeDest[0].iata_code,
      },
    });
  };

  return (
    <div className=" h-screen flex flex-col justify-between">
      <HeaderNoSearch />

      <main className="">
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
          <div className="relative w-full h-[100px] flex justify-center">
            <div className=" mx-auto px-8 sm:px-16 absolute -top-20">
              <div className=" bg-white shadow-xl rounded-2xl py-10 px-5 md:px-10">
                <Flex className="flex-col md:flex-row">
                  <div className="relative mb-4 mx-2">
                    <span
                      className="absolute text-gray-700 text-xs  font-bold mb-2 left-0 top-2 mx-6 
              transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white "
                      htmlFor="origin"
                      z-index="1"
                    >
                      Enter Origin
                    </span>
                    <Input
                      variant={"outline"}
                      id="origin"
                      placeholder="Paris, France"
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  <Spacer />

                  <div className="relative mb-4 mx-2">
                    <span
                      className="absolute text-gray-700 text-xs font-bold mb-2 left-0 top-2 mx-6 
            transition durantion-200 input-text -translate-y-7 -translate-x-4 bg-white "
                      htmlFor="destination"
                    >
                      Enter Destination
                    </span>
                    <Input
                      variant={"outline"}
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
                      placeholder="Enter number of people"
                      htmlSize={4}
                      width={"auto"}
                      type="number"
                      id="numberOfPeople"
                      min="1"
                      max="10"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
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
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
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
