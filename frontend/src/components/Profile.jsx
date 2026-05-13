
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { common } from "@mui/material/colors";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
const [totalCompliments, setTotalCompliments] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [compliments, setCompliments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchcompliments();
  }, []);


  const fetchcompliments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/compliments`, {
        withCredentials: true,

      });

      setCompliments(res.data.compliments || []);
      setTotalCompliments(res.data.totalCompliments || 0);

    }


    catch (error) {
      console.log(error);
    }
  };


  const fetchProfile = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/profile`,
      {
        withCredentials: true,
      }
    );

    const userProfile = res.data.profile;

    setProfile(userProfile);
    setLoading(false);

    setFormData({
      name: userProfile.name || "",
      profession: userProfile.profession || "",
      email: userProfile.email || "",
      phone: userProfile.phone || "",
      address: userProfile.address || "",
    });

    setPreview(userProfile.imageUrl || "");
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
  console.log(e.target.name, e.target.value);

  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("profession", formData.profession);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      if (image) {
        data.append("profilePic", image);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOpen(false);
      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{
        mt: { xs: 2, md: 5 },
        px: { xs: 1, sm: 2, md: 3 },
      }}>
        <Card
          sx={{
            bgcolor: "#121212",
            color: "#2196f3",
            borderRadius: 4,
            border: "1px solid #2196f3",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: {
                xs: 120,
                sm: 160,
                md: 220,
              },
              background:
                "linear-gradient(135deg, #000000 0%, #0d47a1 100%)",
            }}
          />

          <CardContent
            sx={{
              mt: {
                xs: -6,
                sm: -8,
                md: -12,
              },
            }}
          >
            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
            >
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Avatar
                    src={profile?.imageUrl}
                    sx={{
                      width: {
                        xs: 100,
                        sm: 140,
                        md: 180,
                      },
                      height: {
                        xs: 100,
                        sm: 140,
                        md: 180,
                      },
                      mx: "auto",
                      border: "4px solid white",
                    }}
                  />
                  <Typography
                    fontWeight="bold"
                    sx={{
                     wordBreak: "break-word",
                    }}
                  >


                    {profile?.name}
                  </Typography>

                  <Typography sx={{ wordBreak: "break-word", }}>
                    {profile?.profession}
                  </Typography>

                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                >
                  Profile Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography color="text.secondary">
                        Email
                      </Typography>
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {profile?.email}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography color="text.secondary">
                        Phone
                      </Typography>
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {profile?.phone}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography color="text.secondary">
                        Profession
                      </Typography>
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {profile?.profession}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography color="text.secondary">
                        Address
                      </Typography>
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {profile?.address}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>


        </Card>
  

<Typography
  variant="h5"
  textAlign="center"
  sx={{
    mt: 4,
    mb: 3,
    fontWeight: "bold",
    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
    wordBreak: "break-word",
  }}
>
  Total Contributions Since Joining : ₹
  {totalCompliments.toLocaleString("en-IN")}
</Typography>

{/* Mobile View */}
<Box
  sx={{
    display: {
      xs: "block",
      md: "none",
    },
  }}
>
  {compliments?.length > 0 ? (
    compliments.map((item) => (
      <Card
        key={item._id}
        sx={{
          mb: 2,
          bgcolor: "#121212",
          color: "#fff",
          border: "1px solid #1976d2",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1.5,
              width: "100%",
            }}
          >
            <Typography variant="body2">
              <strong>Year:</strong> {item.year}
            </Typography>

            <Typography variant="body2">
              <strong>Membership:</strong> ₹{item.membershipAmount}
            </Typography>

            <Typography variant="body2">
              <strong>Special:</strong> ₹{item.specialContribution}
            </Typography>

            <Typography variant="body2">
              <strong>Backlog:</strong> ₹{item.backlogAmount}
            </Typography>

            <Typography variant="body2">
              <strong>Mode:</strong> {item.paymentMode}
            </Typography>

            <Typography variant="body2">
              <strong>Date:</strong>{" "}
              {new Date(item.paymentDate).toLocaleDateString()}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              wordBreak: "break-word",
            }}
          >
            <strong>Remarks:</strong> {item.remarks}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography align="center">
      No compliments found
    </Typography>
  )}
</Box>

{/* Desktop View */}
<TableContainer
  component={Paper}
  sx={{
    display: {
      xs: "none",
      md: "block",
    },
    width: "100%",
    overflow: "hidden",
    bgcolor: "#121212",
    border: "1px solid #1976d2",
    borderRadius: 2,
  }}
>
  <Table stickyHeader size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
    <TableHead>
      <TableRow sx={{ bgcolor: "#0d47a1" }}>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "10%", wordBreak: "break-word" }}>Year</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "13%", wordBreak: "break-word" }}>Membership</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "18%", wordBreak: "break-word" }}>Special Contribution</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "13%", wordBreak: "break-word" }}>Backlog</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "13%", wordBreak: "break-word" }}>Payment Mode</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "15%", wordBreak: "break-word" }}>Payment Date</TableCell>
        <TableCell align="center" sx={{ color: "#2196f3", fontWeight: "bold", width: "18%", wordBreak: "break-word" }}>Remarks</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {compliments?.map((item) => (
        <TableRow key={item._id} sx={{ "&:hover": { bgcolor: "#1e1e1e" } }}>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>{item.year}</TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>₹{item.membershipAmount}</TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>₹{item.specialContribution}</TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>₹{item.backlogAmount}</TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>{item.paymentMode}</TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>
            {new Date(item.paymentDate).toLocaleDateString()}
          </TableCell>
          <TableCell align="center" sx={{ color: "#fff", wordBreak: "break-word" }}>{item.remarks}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>





        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {profile ? "Edit Profile" : "Create Profile"}
          </DialogTitle>

          <DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 2,
              }}
            >
              <Avatar
                src={preview}
                sx={{
                  width: 120,
                  height: 120,
                }}
              />
            </Box>

            <Button
              component="label"
              variant="outlined"
              startIcon={<PhotoCamera />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );

} 
