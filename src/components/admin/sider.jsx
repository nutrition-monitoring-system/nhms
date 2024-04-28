import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardFooter } from "@/components/ui/card";
import { Button, Chip, Divider } from "@mui/material";

export default function AdminPeopleCard({ row }) {
  return (
    <div className="h-full basis-1/3">
      <Card className="p-6">
        <CardHeader title={row.name} subheader="September 14, 2016" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            NHMS, short for Nutrition and Health Monitoring System, is the
            result of Team Delta’s year-long software engineering project at the
            University of Aberdeen. This web-based application is designed to
            assist individuals with chronic health conditions such as IBS and
            diabetes in tracking their nutrition and symptoms.
          </Typography>

          <Divider sx={{ margin: "16px 0" }} />

          <div>
            <div>Chronic Condition</div>
            <div className="flex items-center gap-3 my-2">
              {row.chronicCondition?.map((condition, index) => (
                <Chip key={index} label={condition} clickable />
              ))}
            </div>
          </div>

          <Divider sx={{ margin: "16px 0" }} />

          <div>
            <div>Personal Goals</div>
            <div className="flex items-center gap-3 my-2">
              {row.goals?.map((condition, index) => (
                <Chip key={index} label={condition} clickable />
              ))}
            </div>
          </div>
        </CardContent>
        <div className="p-3">
          <button className="tile bg-secondary">View Profile</button>
        </div>
      </Card>
    </div>
  );
}
