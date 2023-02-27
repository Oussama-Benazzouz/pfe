import { ComponentStyleConfig } from "@chakra-ui/theme"

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: '5px',
        fontsize: "10pt",
        fontWeight: "700",
        _focus: {
            boxShadow: "none",
        },
    },
    sizes: {
        sm: {
            fontSize: "8pt",
        },
        md: {
            fontSize: "10pt",
        }
    },
    variants: {
        solid: {
            bg: "brand.200",
            color: "white",
            _hover: {
                color: "brand.200",
            }
        },
        ghost: {
            color: "black",
        }
    }
}