import { Box, Text } from "@chakra-ui/react"
import Image from "next/legacy/image"
import BannerImg from "/public/images/bannerImg.jpeg"


function Banner() {
    return (
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] flex items-center justify-center">
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
          background="blue.500"
        />
        <div className="absolute flex items-center justify-center flex-col text-white">
          <Text fontWeight={"bold"} fontSize={{ base: "28px", md: "40px" }}>
            Helping Others
          </Text>
          <Text fontWeight={"bold"} fontSize={{ base: "43px", md: "80px" }}>
            Live & Travel
          </Text>
          <Text fontWeight={"semibold"} fontSize={{ base: "14px", md: "20" }}>
            Special offers to suit your plan
          </Text>
        </div>
      </div>
    );
}

export default Banner