import Image from "next/legacy/image";
import img from "/public/images/gomoroccomid.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Flex, Spacer } from "@chakra-ui/react";

function Footer() {
  return (
    <div className="">
      <div className="bottom-0 grid grid-cols-2 md:grid-cols-3  pt-20 px-10 pb-10">
        <div className=" relative space-y-4 text-xs text-gray-400 flex align-center h-10 md:h-10 cursor-pointer my-auto justify-center ">
          <Image
            src={img}
            objectFit="contain"
            objectPosition="left"
            alt="GoMorocco Logo"
            layout="fill"
          />
        </div>

        <Flex
          className="text-md text-gray-800 font-bold"
          display={{ base: "none", md: "flex" }}
        >
          <p className=" cursor-pointer">Home</p>
          <Spacer />
          <p className="cursor-pointer">Find Flights</p>
          <Spacer />
          <p className="cursor-pointer">Find Hotels</p>
        </Flex>

        <div className=" flex flex-row align-center justify-end ">
          <FaFacebookF size={24} className="mx-2 cursor-pointer" />
          <FaInstagram size={24} className="mx-2 cursor-pointer" />
          <FaTwitter size={24} className="mx-2 cursor-pointer" />
          <FaLinkedin size={24} className="mx-2 cursor-pointer" />
        </div>
      </div>
      <hr
        className="mx-10 my-2"
        style={{
          color: "black",
          backgroundColor: "black",
          height: 1.5,
        }}
      />
    </div>
  );
}

export default Footer;
