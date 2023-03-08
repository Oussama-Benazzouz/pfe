import HeaderNoSearch from "../Components/HeaderNoSearch";
import Footer from "../Components/Footer";
import BannerImg from "/public/images/airportshort.jpg";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/legacy/image";

function Hotels() {
  return (
    <html className="html h-screen flex flex-col justify-between">
      <HeaderNoSearch />

      <main className="mb-auto">
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
            <Text fontWeight={"semibold"} fontSize={{ base: "14px", md: "20" }}>
              Special offers to suit your plan
            </Text>
            {/* <div className=" bg-white flex sm:flex-col items-center justify-center md:flex-row h-200 w-full">
              <input type="text" className="grow"/>
              <input type="date" name="" id="" className="grow"/>
            </div> */}
          </div>
        </div>

        
      </main>

      <Footer />
    </html>
  );
}

export default Hotels;
