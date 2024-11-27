import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

// Generic type definition for TabItem
export type TabItem<T> = {
  key: T;
  label: string;
};

interface TabListProps<T> {
  tabs: TabItem<T>[];
  currentTab: T;
  onChange: (key: T) => void;
}

export const FbTabList = <T,>({ tabs, currentTab, onChange }: TabListProps<T>) => {
  const handleChange = (_: React.SyntheticEvent, newValue: T) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key as unknown as string}
            value={tab.key}
            label={tab.label}
          />
        ))}
      </Tabs>
    </Box>
  );
};