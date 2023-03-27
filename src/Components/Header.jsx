import Image from "next/legacy/image";
import React, { useState } from "react";
import { SearchIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";
import img from "/public/images/gomoroccomid.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  MenuDivider,
  Text,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Router from "next/router";
import { IoBedSharp, IoAirplane } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import AuthModal from "./Modal/Auth/AuthModal";
import { authModalState } from "../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { signOut } from "firebase/auth";




function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };


  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
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

      {/* Middle Side */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm font-sans">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className=" hidden lg:inline bg-[#8DD3BB] h-8 text-white rounded-full p-2 cursor-pointer md:mx-2 " />
      </div>

      {/* Right Side */}
      <AuthModal />
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        {user ? (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                  _hover={{ bg: "gray.100" }}
                  _expanded={{ bg: "#FFF" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      name=""
                      src={user.photoURL}
                    >
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <Text className="ml-1">{user.displayName}</Text>
                  </HStack>
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
                    <MenuItem
                      onClick={() =>
                        Router.push(`/Profile/${user.uid}`)
                      }
                    >
                      <UserCircleIcon className="h-5 mr-2" />
                      Profile
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Account">
                    <MenuItem onClick={() => signOut(auth)}>Sign Out</MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        ) : (
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
                    <MenuItem
                      onClick={() =>
                        setAuthModalState({ open: true, view: "login" })
                      }
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setAuthModalState({ open: true, view: "signup" })
                      }
                    >
                      Sign Up
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        )}
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#8DD3BB"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4 ">
            <h2 className="text-2xl font-semibold flex-grow">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg outline-none text-green-600"
            />
          </div>

          <div className="flex">
            <button
              onClick={resetInput}
              className="flex-grow text-red-500 font-semibold"
            >
              Cancel
            </button>
            <button className="flex-grow text-[#8DD3BB] font-semibold">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
