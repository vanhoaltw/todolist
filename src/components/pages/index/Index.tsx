import { Box, Container, Tab } from "@mui/material";
import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabMyTask from "../index/TabMyTask";
import TabMyTeam from "../index/TabMyTeam";

export default function IndexPage() {
  const [currentTab, setCurrentTab] = useState("1");

  return (
    <Container maxWidth="sm">
      <Box sx={{ border: 1, borderColor: "divider" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(_, v) => setCurrentTab(v)}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab
                sx={{ fontWeight: "bold", fontSize: 16 }}
                icon={<BiTask size={22} />}
                label="Tasks"
                value="1"
              />
              <Tab
                sx={{ fontWeight: "bold", fontSize: 16 }}
                icon={<AiOutlineTeam size={22} />}
                label="Team"
                value="2"
              />
            </TabList>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: 450,
            }}
          >
            <TabPanel sx={{ height: "100%" }} value="1">
              <TabMyTask />
            </TabPanel>
            <TabPanel value="2">
              <TabMyTeam />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Container>
  );
}
