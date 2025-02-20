// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { link } from "fs";

// export const Research: React.FC = () => {
//   const researchs = [
//     {
//       id: 1,
//       title: "Development of Next-Generation Vaccines",
//       description: "We are working on a revolutionary approach...",
//       link: "/researchDetailed",
//     },
//     {
//       id: 2,
//       title: "Restoration of Degraded Ecosystems",
//       description: "Our team is developing innovative techniques...",
//       link: "/researchDetailed",
//     },
//     {
//       id: 3,
//       title: "Quantum Materials for Computing",
//       description: "We investigate new materials with quantum properties...",
//       link: "/researchDetailed",
//     },
//   ];
//   const navigate = useNavigate();
//   return (
//     <Container>
//       <Box
//         role="tabpanel"
//         hidden={false}
//         id="research-tab"
//         aria-labelledby="research-tab-label"
//         sx={{ py: { xs: 3, md: 6, lg: 8 }, bgcolor: "white" }}
//       >
//         <Box sx={{ textAlign: "center", mb: 4 }}>
//           <Typography
//             sx={{ mb: 4, mt: 2 }}
//             variant="h4"
//             fontWeight="bold"
//             gutterBottom
//           >
//             Ongoing Research
//           </Typography>
//         </Box>
//         <Grid container spacing={3} justifyContent="center">
//           {researchs.map((research) => (
//             <Grid item xs={12} sm={6} lg={4} key={research.id}>
//               <Card onClick={() => navigate(research.link)}>
//                 <CardHeader
//                   // avatar={<AtomIcon style={{ fontSize: "3rem", color: "#1e88e5" }} />}
//                   title={
//                     <Typography variant="h6" component="h3">
//                       {research.title}
//                     </Typography>
//                   }
//                   sx={{ textAlign: "center", pb: 0 }}
//                 />
//                 <CardContent>
//                   <Typography variant="body2" color="textSecondary">
//                     {research.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchResearch } from "../../redux/slices/researchSlice";

export const Research: React.FC = () => {
  // const researchs = [
  //   {
  //     id: 1,
  //     title: "Development of Next-Generation Vaccines",
  //     description: "We are working on a revolutionary approach...",
  //   },
  //   {
  //     id: 2,
  //     title: "Restoration of Degraded Ecosystems",
  //     description: "Our team is developing innovative techniques...",
  //   },
  //   {
  //     id: 3,
  //     title: "Quantum Materials for Computing",
  //     description: "We investigate new materials with quantum properties...",
  //   },
  // ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const researchList = useAppSelector((state) => state.research.list);
  const loading = useAppSelector((state) => state.research.loading);
  useEffect(() => {
    if (researchList.length === 0) {
      dispatch(fetchResearch());
    }
  }, [dispatch, researchList.length]);

  return (
    <Container>
      <Box
        role="tabpanel"
        hidden={false}
        id="research-tab"
        aria-labelledby="research-tab-label"
        // sx={{ py: { xs: 3, md: 6, lg: 8 }, bgcolor: "white" }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{ mb: 4, mt: 2 }}
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Ongoing Research
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {researchList.map((research) => (
              <Grid item xs={12} sm={6} lg={4} key={research.id}>
                <Card
                  onClick={() => navigate(`/research/${research.id}`)}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" component="h3" sx={{textAlign: "justify"}}>
                        {research.title}
                      </Typography>
                    }
                    sx={{ textAlign: "center", pb: 0 }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {research.description}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {research.professional?.name?.trim() && (
                        <Typography variant="caption">
                          Partners: {research.professional.name}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
