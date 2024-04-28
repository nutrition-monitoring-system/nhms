"use client";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SideNavBar from "@/components/SideNav";

import { useState } from "react";
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
  /* Check if the user is an admin or not. */
  // if user is authenticated then render the admin page else render the loading component
  if (status == "authenticated") {
    return (
      <>
        <div className="sm:grid hidden absolute inset-0 bg-white p-2 text-lg text-center z-[1000] place-items-center">
          The admin page is inaccessible on smaller devices at the moment.
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
    diet: ["Keto", "Paleo"],
    allergies: ["Peanuts", "Dairy"],
  },
  {
    id: 2,
    name: "Doe",
    status: "Healthy",
    symptoms: [
      { name: "Cough", intensity: 4, date: "2021-10-10" },
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
      { name: "Cough", intensity: 4, date: "2021-10-10" },
      { name: "Headache", intensity: 9, date: "2021-10-10" },
    ],
    chronicCondition: ["Chronic Kidney Disease", "Arthritis", "Cancer"],
  },
];

function MainPage() {
  const [selectRow, setSelectRow] = useState(rows[0]);
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
              <Paper className="p-6 !shadow-lg">
                <h1 className="font-semibold text-left text-md" gutterBottom>
                  Your Symptoms Data
                </h1>
                <Typography variant="body1" gutterBottom>
                  This is the data of all the symptoms that have been recorded
                  by the users.
                </Typography>
                <button className="shadow-lg bg-secondary tile text-white">
                  {/* This should let the admin create a new symptom: add a new SYMPTOM(NOT A LOG) to the database that the person can choose from. */}

                  {/* SHOULD BRING UP SOME SORT OF DIALOG */}
                  <Link underline="none" color="inherit" href="/user">
                    Create a new symptom
                  </Link>
                </button>
              </Paper>

              <div className="p-6 basis-1/3 shadow-lg bg-white flex flex-col">
                <h1 className="font-bold text-left text-md" gutterBottom>
                  This Week
                </h1>
                <span className="text-5xl">13</span>
                <p className="text-[0.75rem] text-secondary pb-2">
                  -25% from last week
                </p>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={25}
                />
              </div>
              <div className="p-6 basis-1/3 shadow-lg bg-white flex flex-col">
                <h1 className="font-bold text-left text-md" >
                  This Month
                </h1>
                <span className="text-5xl">55</span>
                <p className="text-[0.75rem] text-secondary text-left pb-2">
                -10% from last month
                </p>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={25}
                />
              </div>
              {/* <Paper className="p-6 basis-1/3 !shadow-lg">
                <Typography color="text.secondary" gutterBottom>
                  This Month
                </Typography>
                <div className="text-5xl">55</div>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75em" }}
                  gutterBottom
                >
                  
                </Typography>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={10}
                />
              </Paper> */}
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
                  <h1 className="font-bold text-left text-md">Symptoms</h1>
                  <h2 className="text-grey text-sm">
                    Recent symptom logs from the user.
                  </h2>
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
