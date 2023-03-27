import React from "react";
import Image from "next/legacy/image";
import img from "/public/images/gomoroccomid.svg";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
import Router from "next/router";
import { IoBedSharp, IoAirplane } from "react-icons/io5";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import AuthModal from "./Modal/Auth/AuthModal";



function HeaderNoSearch({userData}) {

    const setAuthModalState = useSetRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

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
                        src={userData.photoURL}
                      >
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                      </Avatar>
                      <Text className="ml-1">{userData.displayName}</Text>
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
                      <MenuItem onClick={() => signOut(auth)}>
                        Sign Out
                      </MenuItem>
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
      </header>
    );
}

export default HeaderNoSearch;