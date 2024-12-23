import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        padding={3}
        border="1px solid #ddd"
        borderRadius="8px"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ErrorOutlineIcon style={{ fontSize: 64, color: "#ff6b6b" }} />
        <Typography variant="h4" color="textPrimary">
          Oops! Something Went Wrong
        </Typography>
        <Typography color="textSecondary">
          We are sorry for the inconvenience. Please try refreshing the page or
          go back to the previous page.
        </Typography>
        <Box display="flex" gap={2} marginTop={2}>
          <Link href="/">
            <Button variant="outlined" startIcon={<HomeIcon />}>
              Go Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
