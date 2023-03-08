import React from "react";
import Image from "next/legacy/image";
import img from "/public/images/gomoroccomid.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Router from "next/router";
import { IoBedSharp, IoAirplane } from "react-icons/io5";
import { SearchIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";



function HeaderNoSearch() {
    return (
      <header className="sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md py-5 px-5 md:px-10">
        {/* Left side */}
        <div className="relative flex items-center h-5 md:h-10 cursor-pointer my-auto">
          <Image
            src={img}
            objectFit="contain"
            objectPosition="left"
            alt="GoMorocco Logo"
            layout="fill"
            onClick={() => Router.push("/")}
          />
        </div>

        

        {/* Right Side */}
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<HamburgerIcon />}
                  variant="outline"
                  borderRadius="md"
                  borderWidth="1px"
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "#8DD3BB" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  <UserCircleIcon className="h-6" />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Navigate">
                    <MenuItem>
                      <IoAirplane className="mr-2" />
                      Find Flights
                    </MenuItem>
                    <MenuItem onClick={() => Router.push("/Hotels")}>
                      <IoBedSharp className="mr-2" />
                      Find Hotels
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Account">
                    <MenuItem>Login</MenuItem>
                    <MenuItem>Sign Up</MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </div>
      </header>
    );
}

export default HeaderNoSearch;