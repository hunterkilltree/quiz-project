import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  function openFacebook() {
    window.open("https://www.facebook.com/InspiringNT/", "_blank");
  }

  function openTwitter() {
    window.open("https://twitter.com/inspiringNT/", "_blank");
  }

  function openInstagram() {
    window.open("https://www.instagram.com/inspiringnt/", "_blank");
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={7}>
            <Typography variant="h6" color="#a3826c" gutterBottom marginBottom='1.5rem' fontSize='calc(1.6 * 1rem)'>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom='1rem' fontSize='calc(0.9 * 1rem)'>
              Sarah Sutcliffe
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom='1rem' fontSize='calc(0.9 * 1rem)'>
              Phone: 08 8946 6413
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom='1rem' fontSize='calc(0.9 * 1rem)'>
              Mobile: 0498 578 030
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom='1rem' fontSize='calc(0.9 * 1rem)'>
              Email: inspirednt@cdu.edu.au
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6" color="#a3826c" gutterBottom marginBottom='1.5rem' fontSize='calc(1.6 * 1rem)'>
              Follow Us
            </Typography>
            <Link href="###" onClick={openFacebook} color="#a3826c">
              <Facebook />
            </Link>
            <Link href="###" onClick={openTwitter} color="#a3826c" sx={{ pl: 1, pr: 1 }}>
              <Twitter />
            </Link>
            <Link href="###" onClick={openInstagram} color="#a3826c">
              <Instagram />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"©Copyright Inspired NT "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}