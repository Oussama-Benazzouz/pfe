import { extendTheme } from "@chakra-ui/react"
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { Button } from "./button";


// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#8DD3BB",
      200: "#112211",
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
  },
  styles: {
    global: () => ({
        body: {
            bg: "blackAlpha.50",    
        }
    })
  },
  components: {
    Button,
  }
})