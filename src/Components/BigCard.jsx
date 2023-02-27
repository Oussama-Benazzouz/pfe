import { Text, Button, Box } from "@chakra-ui/react";
import Image from "next/legacy/image";
import showFlights from "/public/images/showFlights.jpg";
import hotelImg from "/public/images/moroccohotel.jpg";
import { SearchIcon } from "@chakra-ui/icons";

function BigCard() {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row mt-20 mb-20 ">
      <div className=" relative w-full md:w-50%  h-[450px] mb-5 md:mr-5 ">
        <Image
          src={showFlights}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute flex items-center justify-end flex-col text-white w-full h-full">
          <Text fontWeight={"Bold"} fontSize={{ base: "36px", md: "40px" }}>
            Flights
          </Text>
          <Text fontsize={{ base: "12px", md: "16px" }}>
            Search Flights & Places Hire to our most popular
          </Text>
          <Text fontsize={{ base: "12px", md: "16px" }}>destinations</Text>
          <Button
            leftIcon={<SearchIcon />}
            variant="solid"
            colorScheme="teal"
            className="mt-5 mb-5 flex items-center justify-center"
          >
            Flights
          </Button>
        </div>
      </div>
      <div className=" relative w-full md:w-50%  h-[450px] mb-5 md:ml-5">
        <Image
          src={hotelImg}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          opacity="0.25"
          background="blue.300"
          className="rounded-lg"
        />
        <div className="absolute flex items-center justify-end flex-col text-white w-full h-full">
          <Text fontWeight={"Bold"} fontSize={{ base: "36px", md: "40px" }}>
            Hotels
          </Text>
          <Text fontsize={{ base: "12px", md: "16px" }}>
            Search Flights & Places Hire to our most popular
          </Text>
          <Text fontsize={{ base: "12px", md: "16px" }}>destinations</Text>
          <Button
            leftIcon={<SearchIcon />}
            variant="solid"
            colorScheme="teal"
            className="mt-5 mb-5 flex items-center justify-center "
          >
            Hotels
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BigCard;
