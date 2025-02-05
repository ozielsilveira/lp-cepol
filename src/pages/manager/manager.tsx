import React from 'react';
import ProfessionalManager from './professionalsManager';
import { Box } from '@mui/material';

export const Manager: React.FC = () => {
    return (
       <Box>teste</Box>
    );
}

// import React, { useState } from "react";
// import { Drawer, List, ListItem, ListItemText, Box, Button, Typography, Modal } from "@mui/material";

// const sections = ["Articles", "Researchs", "Professionals", "About"];

// export const Manager: React.FC = () => {
//   const [selectedSection, setSelectedSection] = useState<string | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleSelectSection = (section: string) => {
//     setSelectedSection(section);
//   };

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
//         <List>
//           {sections.map((section) => (
//             <ListItem key={section} onClick={() => handleSelectSection(section)} component="div" sx={{ cursor: "pointer" }}>
//               <ListItemText primary={section} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         {selectedSection ? (
//           <>
//             <Typography variant="h5" gutterBottom>
//               {selectedSection} List
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//               <Button variant="contained" color="primary" onClick={handleOpenModal}>
//                 Adicionar Novo
//               </Button>
//               <Button variant="contained" color="warning" disabled>
//                 Editar Selecionado
//               </Button>
//               <Button variant="contained" color="error" disabled>
//                 Excluir Selecionado
//               </Button>
//             </Box>
//             <Modal open={modalOpen} onClose={handleCloseModal}>
//               <Box sx={{ p: 3, backgroundColor: "white", margin: "auto", mt: 10, width: 300 }}>
//                 <Typography variant="h6">Adicionar Novo Item</Typography>
//                 <Button onClick={handleCloseModal}>Fechar</Button>
//               </Box>
//             </Modal>
//             {/* Aqui você pode adicionar a lógica para listar os itens de cada seção */}
//           </>
//         ) : (
//           <Typography variant="h6">Selecione uma seção para gerenciar</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };


