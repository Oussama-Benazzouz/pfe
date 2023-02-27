import Image from 'next/legacy/image';
import React from 'react'
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import img from '/public/images/gomoroccomid.svg';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';


function Header() {
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
        />
      </div>

      {/* Middle Side */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm font-sans">
        <input
          className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className=" hidden md:inline bg-[#8DD3BB] h-8 text-white rounded-full p-2 cursor-pointer md:mx-2" />
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
                <MenuItem>Login</MenuItem>
                <MenuItem>Sign Up</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
}

export default Header;