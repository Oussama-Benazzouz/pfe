import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { StarIcon } from "@heroicons/react/solid";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { loadStripe } from "@stripe/stripe-js";
import { authModalState } from "../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Simple({
  img,
  location,
  imgs,
  title,
  star,
  description,
  price,
  amenities,
  user,
}) {
  const [slider, setSlider] = React.useState(null);
  const setAuthModalState = useSetRecoilState(authModalState);

  async function handlePayment() {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          img: img,
        }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          throw new Error("Redirect to Stripe Checkout failed");
        }
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Box
            position={"relative"}
            height={"600px"}
            width={"full"}
            overflow={"hidden"}
          >
            {/* CSS files for react-slick */}
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
              aria-label="left-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <BiLeftArrowAlt />
            </IconButton>
            {/* Right Icon */}
            <IconButton
              aria-label="right-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <BiRightArrowAlt />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {imgs.map((result, index) => (
                <Box
                  key={index}
                  height={"6xl"}
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize={"cover"}
                  backgroundImage={`url(${result.url_1440})`}
                />
              ))}
            </Slider>
          </Box>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Flex className="justify-between" align={"center"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {title}
              </Heading>
              <Flex align={"center"}>
                <StarIcon className="h-5 text-emerald-400" />
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"xl"}
                  mr={2}
                >
                  ({star})
                </Text>
              </Flex>
            </Flex>

            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              mr={2}
            >
              {location}
            </Text>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              mr={2}
            >
              {price} €
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Amenities
              </Text>

              <SimpleGrid columns={{ base: 2, lg: 3 }} spacing={10}>
                {amenities.map((result, index) => (
                  <List>
                    <ListItem key={index}>
                      <Text
                        fontSize={{ base: "10px", md: "12px", lg: "14px" }}
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        {result.facility_name}
                      </Text>
                    </ListItem>
                  </List>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
          {user ? (
            <>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                fontWeight={"bold"}
                variant={"solid"}
                colorScheme={"teal"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={handlePayment}
              >
                Book Now
              </Button>
            </>
          ) : (
            <>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                fontWeight={"bold"}
                variant={"solid"}
                colorScheme={"teal"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={() => setAuthModalState({ open: true, view: "login" })}
              >
                Book Now
              </Button>
            </>
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
