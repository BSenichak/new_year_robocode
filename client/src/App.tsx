import { Container, ThemeProvider } from "@mui/material"
import Theme from "./styles/muiTheme"
import "./styles/generalStyles.scss"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./store/store"
import { useEffect } from "react"
import { getUsers } from "./store/authReducer"

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
      dispatch(getUsers())
  },[])
  return (
    <ThemeProvider theme={Theme}>
      <Container>sdf</Container>
    </ThemeProvider>
  )
}

