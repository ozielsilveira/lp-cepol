import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import ArticlesList from './articlesList';

export const Manager: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event);
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="dashboard tabs">
                    <Tab label="Artigos" />
                    <Tab label="Pesquisas" />
                    <Tab label="Equipamentos" />
                    <Tab label="Profissionais" />
                </Tabs>
            </Box>
            {activeTab === 0 && <ArticlesList />}
        </Box>
    );
}

