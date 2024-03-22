import React from 'react';
import { Flex, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom'; 

const cities = [
  { id: 1, name: "Toronto" },
  { id: 2, name: "Montreal" },
  { id: 3, name: "Vancouver" },
  { id: 4, name: "Calgary" },
  { id: 5, name: "Edmonton" },
  { id: 6, name: "Ottawa" },
  { id: 7, name: "Winnipeg" },
  { id: 8, name: "Quebec City" },
  { id: 9, name: "Hamilton" },
  { id: 10, name: "Kitchener" }
];


function NavbarSimple() {
  return (
    <Flex
      bg="teal.500"
      color="black"
      p="4"
      justify="space-between"
      align="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="banner"

    > <Box p="2">
    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
      WikiMaps
    </Link>
  </Box>
      <Flex gap="4">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="teal.500" _hover={{ bg: 'teal.600' }}>
            Cities
          </MenuButton>
          <MenuList>
            {cities.map((city) => (
              <MenuItem key={city.id}>
                <Link to={`/city/${city.id}`} style={{ width: '100%' }}>
                  {city.name}
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavbarSimple;