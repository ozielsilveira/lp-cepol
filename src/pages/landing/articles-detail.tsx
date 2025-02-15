import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchArticleDetail } from "../../redux/slices/articlesSlice";

// Mock para os detalhes das pesquisas
// const mockArticleDetails = {
//   1: {
//     title: "Development of Next-Generation Vaccines",
//     texts: [
//       "Exploring mRNA technologies and their potential to revolutionize vaccine development. Researchers are focusing on creating more effective and faster-to-produce vaccines.",
//       "Combining adjuvants for better efficacy and longer-lasting immunity. This approach aims to enhance the body's immune response to vaccines."
//     ],
//     images: [
//       { src: "/images/vaccine1.jpg", alt: "Vaccine Research", caption: "Innovative Vaccine Design" },
//       { src: "/images/vaccine2.jpg", alt: "Lab Work", caption: "Laboratory Experimentation" },
//     ],
//   },
//   2: {
//     title: "Restoration of Degraded Ecosystems",
//     texts: [
//       "Techniques for reforestation and the restoration of degraded ecosystems. This includes planting native species and managing invasive species.",
//       "Use of AI to monitor ecosystems and track the health of various species. AI technology helps in making data-driven decisions for conservation efforts."
//     ],
//     images: [
//       { src: "/images/ecosystem1.jpg", alt: "Forest Restoration", caption: "Reforestation Efforts" },
//       { src: "/images/ecosystem2.jpg", alt: "Monitoring Wildlife", caption: "Animal Observation" },
//     ],
//   },
//   3: {
//     title: "Quantum Materials for Computing",
//     abstract: "Quantum Computing for Materials lorm Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     texts: [
//       "Nanoporous polymeric materials are porous materials with pore sizes in the nanometer range (that is, below 500 nm), processed as bulk or film materials, and from a wide set of polymers. Over the last several years, research and development on these novel materials have progressed significantly, because it is believed that the reduction of the pore size to the nanometer range could strongly influence some of the properties of porous polymers, providing unexpected and improved properties compared to conventional porous and microporous polymers and non-porous solids.",
//       "In the last years, CellMat Laboratory has become a reference in this topic. The investigations carried out in CellMat have permitted to prove for the first time, the presence of the Knudsen effect in this type of breathtaking materials, to evidence the possibility of producing transparent foams and to prove the improved mechanical properties of these novel materials."
//     ],
//     images: [
//       { src: "http://cellmat.es/wp-content/uploads/2017/01/From-micro-to-nano-1024x323.png", alt: "Quantum Materials", caption: "Researching New Materials" },
//       { src: "http://cellmat.es/wp-content/uploads/2017/01/Confinement-effects.png", alt: "Quantum Computing", caption: "Advancements in Computing" },
//     ],
//   },
// };

export const ArticleDetailed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);

  useEffect(() => {
    if (articlesList.length === 0) {
      dispatch(fetchArticleDetail(id));
    }
  }, [dispatch, articlesList.length]);
  // Simula a busca dos dados de pesquisa detalhada
  const detailedArticle = id ? articlesList[parseInt(id)] : null;

  if (!detailedArticle) {
    return <p>No articles found.</p>;
  }

  return (
    <Box sx={{ pb: 5, pl: 20, pr: 20 }}>
      {/* Título principal */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {detailedArticle.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {detailedArticle.description}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Coluna de textos */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              // border: "2px solid #e0e0e0",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1">{detailedArticle.bodyText}</Typography>
          </Box>
          <Box
            sx={{
              // border: "2px solid #e0e0e0",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1">{detailedArticle.secondText}</Typography>
          </Box>
        </Grid>

        {/* Coluna de imagens */}
        <Grid item xs={12} md={6}>
          {detailedArticle.images.map((image, index) => (
            <Card key={`image-${index}`} sx={{ marginBottom: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={image.url}
                alt={image.description}
              />
              <CardContent>
                <Typography variant="caption" align="center">
                  {image.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
