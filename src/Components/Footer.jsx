import Image from "next/legacy/image";
import img from "/public/images/gomoroccomid.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Flex, Spacer } from "@chakra-ui/react";
import { Router } from "next/router";

function Footer() {
  return (
    <div className=" bottom-0  bg-gray-100 ">
      <div className=" grid grid-cols-2 lg:grid-cols-3  pt-10 px-10 pb-10">
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
          display={{ base: "none", md: "none", lg: "flex" }}
        >
          <p className=" cursor-pointer hover:text-[#8DD3BB] " onClick={() => Router.push('/')}>Home</p>
          <Spacer />
          <p className="cursor-pointer hover:text-[#8DD3BB] ">Find Flights</p>
          <Spacer />
          <p className="cursor-pointer hover:text-[#8DD3BB] " onClick={() => Router.push('/Hotels')}>Find Hotels</p>
        </Flex>

        <div className=" flex flex-row items-center justify-end ">
          <FaFacebookF
            size={22}
            className="mx-2 cursor-pointer hover:text-[#8DD3BB] "
          />
          <FaInstagram
            size={22}
            className="mx-2 cursor-pointer hover:text-[#8DD3BB] "
          />
          <FaTwitter
            size={22}
            className="mx-2 cursor-pointer hover:text-[#8DD3BB] "
          />
          <FaLinkedin
            size={22}
            className="mx-2 cursor-pointer hover:text-[#8DD3BB] "
          />
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

      <div className="py-5">
        <p className="text-md text-black text-center">
          2023 ©GoMorocco. All right reserved.
        </p>
      </div>
    </div>
  );
}


export default Footer;
