import EmailIcon from "@mui/icons-material/Email"; // Import an icon for email confirmation
import { Box, Card, Container, Typography } from "@mui/material";
import Head from "next/head";

export default function EmailConfirmation() {
  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Email Confirmation - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="We’ve sent you an email to confirm your account. Please check your inbox to proceed."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://ahali.vercel.app/email-confirmation"
        />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Email Confirmation - Ahali" />
        <meta
          property="og:description"
          content="We’ve sent you an email to confirm your account. Please check your inbox to proceed."
        />
        <meta
          property="og:url"
          content="https://ahali.vercel.app/email-confirmation"
        />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/email-confirmation-thumbnail.jpg"
        />
      </Head>
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            my: 5,
            textAlign: "center",
            boxShadow: 43,
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <EmailIcon color="info" sx={{ fontSize: 50 }} />
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Check Your Inbox
          </Typography>

          <Typography color="textSecondary">
            We have sent a confirmation email to your registered email address.
            Please open it and click the confirmation link to verify your
            account.
          </Typography>
        </Card>
      </Container>
    </>
  );
}
