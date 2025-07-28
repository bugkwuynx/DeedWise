import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import type { NewProperty } from "../../types/Properties";
import states from "../../data/states.json";
import PostPropertyButton from "../common/PostPropertyButton";

const PostProperty = () => {
  const [property, setProperty] = useState<NewProperty>({
    ownerId: "",
    isListed: false,
    beds: 0,
    baths: 0,
    sqft: 0,
    address: "",
    city: "",
    state: "Select State",
    zipCode: "",
    propertyType: "",
    yearBuilt: 0,
    price: 0,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              flex: 1,
              padding: "1rem",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Post Property
            </Typography>
            <TextField
              label="Address"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, address: e.target.value })
              }
            />
            <TextField
              label="City"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, city: e.target.value })
              }
            />
            <Select
              label="State"
              variant="outlined"
              sx={{
                width: "100%",
                color: "black",
              }}
              value={property.state || "Select State"}
              onChange={(e) =>
                setProperty({ ...property, state: e.target.value })
              }
            >
              {states.states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Zip Code"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, zipCode: e.target.value })
              }
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderWidth: "1px",
              height: "100%",
              color: "black",
              alignSelf: "center",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              flex: 1,
              padding: "1rem",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Property Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <TextField
                label="Beds"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                onChange={(e) =>
                  setProperty({ ...property, beds: parseInt(e.target.value) })
                }
              />
              <TextField
                label="Baths"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                onChange={(e) =>
                  setProperty({ ...property, baths: parseInt(e.target.value) })
                }
              />
            </Box>
            <TextField
              label="Sqft"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, sqft: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Year Built"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({
                  ...property,
                  yearBuilt: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Property Type"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, propertyType: e.target.value })
              }
            />
            <TextField
              label="Year Built"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({
                  ...property,
                  yearBuilt: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Price"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                setProperty({ ...property, price: parseInt(e.target.value) })
              }
            />
            <PostPropertyButton {...property} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostProperty;
