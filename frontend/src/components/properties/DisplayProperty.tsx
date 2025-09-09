import type { Property } from "../../types/Properties";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PurchasePropertyButton from "./PurchasePropertyButton";
import type { DisplayProperty } from "../../types/Properties";

interface DisplayPropertyProps {
  propertyId: Property["id"];
}

const DisplayProperty = ({ propertyId }: DisplayPropertyProps) => {

  const [property, setProperty] = useState<DisplayProperty | null>(null);

  const fetchData = async (propertyId: string) => {
    if (!propertyId) {
      return;
    }

    const getPropertyDisplayResult = await fetch(`${import.meta.env.VITE_API_URL}/properties/${propertyId}/display`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (getPropertyDisplayResult.ok) {
      const propertyDisplay = await getPropertyDisplayResult.json();
      setProperty(propertyDisplay);
    }
  };

  useEffect(() => {
    fetchData(propertyId);
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
        <Card
          sx={{
            width: "50%",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: "auto",
            marginTop: 10,
          }}
        >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Property Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    marginTop: 4,
                    gap: 2,
                  }}
                >
                  <Typography variant="h6"><b>Price:</b> {property.property.price || "N/A"}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>Beds:</b> {property.property.beds || "N/A"}</Typography>
                    <Typography variant="h6"><b>Baths:</b> {property.property.baths || "N/A"}</Typography>
                    <Typography variant="h6"><b>Sqft:</b> {property.property.sqft || "N/A"}</Typography>
                  </Box>
                  <Typography variant="h6"><b>Address:</b> {property.property.address || "N/A"}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>City:</b> {property.property.city || "N/A"}</Typography>
                    <Typography variant="h6"><b>State:</b> {property.property.state || "N/A"}</Typography>
                    <Typography variant="h6"><b>Zip Code:</b> {property.property.zipCode || "N/A"}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>Property Type:</b> {property.property.propertyType || "N/A"}</Typography>
                    <Typography variant="h6"><b>Year Built:</b> {property.property.yearBuilt || "N/A"}</Typography>
                  </Box>
                  <PurchasePropertyButton displayProperty={property} buyerId={property.owner.id} />
                </Box>
            </CardContent>
        </Card>
    </Box>
  );
};

export default DisplayProperty;