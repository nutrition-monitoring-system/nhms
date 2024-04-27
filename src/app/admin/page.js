"use client";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SideNavBar from "@/components/SideNav";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AdminTable from "@/components/admin/table";
import {
  Button,
  LinearProgress,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AdminPeopleCard from "@/components/admin/sider";

export default function Page() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
function Home() {
  // useRouter hook is use to navigate programmatically to different routes
  const router = useRouter();
  // checking if user is authenticated or not
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });
  // if user is authenticated then render the admin page else render the loading component
  if (status == "authenticated") {
    return (
      <>
        <div className="sm:grid hidden absolute inset-0 bg-white p-2 text-lg text-center z-[1000] place-items-center">
          The admin page is not accessibility on smaller devices at the moment
        </div>
        <div className="flex gap-4 p-2 px-3 py-10 bg-gray-900 md:flex-col md:hidden">
          <SideNavBar />
          <MainPage />
        </div>
      </>
    );
  }
  return <Loading></Loading>;
}

const rows = [
  {
    id: 1,
    name: "Johns",
    status: "Sick",
    symptoms: [
      { name: "Fever", intensity: 6, date: "2021-10-10" },
      { name: "Cough", intensity: 4, date: "2021-10-10" },
      { name: "Headache", intensity: 3, date: "2021-10-10" },
    ],
    chronicCondition: ["IBS", "Diabetes", "Hypertension"],
    goals: ["Lose Weight", "Gain Muscle"],
  },
  {
    id: 2,
    name: "Doe",
    status: "Healthy",
    symptoms: [
      { name: "Couph", intensity: 4, date: "2021-10-10" },
      { name: "Headache", intensity: 9, date: "2021-10-10" },
    ],
    chronicCondition: ["Asthma", "COPD"],
    goals: ["Lose Weight", "Gain Muscle"],
  },
  {
    id: 3,
    name: "Doe",
    status: "Healthy",
    symptoms: [
      { name: "Couph", intensity: 4, date: "2021-10-10" },
      { name: "Headache", intensity: 9, date: "2021-10-10" },
    ],
    chronicCondition: ["Chronic Kidney Disease", "Arthritis", "Cancer"],
  },
];

function MainPage() {
  const [selectRow, setSelectRow] = React.useState(rows[0]);
  const onSelect = (row) => {
    setSelectRow(row);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full p-6 rounded-xl bg-gray-50 min-h-fits font-opensans">
        <header>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              NHMS
            </Link>
            <Typography color="text.primary">Admin</Typography>
          </Breadcrumbs>
        </header>

        <div className="flex flex-row gap-8 p-2 h-fit">
          <div className="flex flex-col gap-2 basis-2/3">
            <div className="flex gap-4">
              <Paper className="p-6">
                <Typography color="text.primary" gutterBottom>
                  Your Symptoms Data
                </Typography>
                <Typography variant="body1" gutterBottom>
                  This is the data of all the symptoms that have been recorded
                  by the users.
                </Typography>
                <Button variant="contained" color="primary">
                  <Link underline="none" color="inherit" href="/user">
                    Create New Symptoms
                  </Link>
                </Button>
              </Paper>
              <Paper className="p-6 basis-1/3">
                <Typography color="text.secondary" gutterBottom>
                  This Week
                </Typography>
                <div className="text-5xl">13</div>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75em" }}
                  gutterBottom
                >
                  -25% from last week
                </Typography>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={25}
                />
              </Paper>
              <Paper className="p-6 basis-1/3">
                <Typography color="text.secondary" gutterBottom>
                  This Month
                </Typography>
                <div className="text-5xl">55</div>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75em" }}
                  gutterBottom
                >
                  -10% from last Month
                </Typography>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={10}
                />
              </Paper>
            </div>

            <div>
              <div className="flex justify-end gap-2 p-2 mb-4">
                <Button variant="contained" color="inherit" size="small">
                  Filter
                </Button>
                <Button variant="contained" color="inherit" size="small">
                  Export
                </Button>
              </div>
              <Paper className="p-6" sx={{ overflow: "hidden" }}>
                <div className="mb-6">
                  <Typography color="text.primary">Symptoms</Typography>
                  <Typography color="text.secondary">
                    Recent orders from the user.
                  </Typography>
                </div>
                <AdminTable rows={rows} onSelect={onSelect} />
              </Paper>
            </div>
          </div>

          {selectRow && <AdminPeopleCard row={selectRow} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4ab9b",
    },
  },
});
