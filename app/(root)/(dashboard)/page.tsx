import { redirect } from "next/navigation";
import React, { JSX } from "react";

const Dashboard: React.FC = (): JSX.Element => redirect("/guide");

export default Dashboard;
