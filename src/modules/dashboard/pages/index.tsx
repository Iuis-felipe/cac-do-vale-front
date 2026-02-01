import { useState } from "react";

import PageTitle from "../../../core/components/organism/PageTitle";
import useGetTodaySchedule from "../hook/useGetTodaySchedule";
import { ViewType } from "../model";
import useKpis from "../hook/useKpis";
import useGroupedSchedules from "../hook/useGroupedSchedules";
import KpiSection from "../components/KpiSection";
import LoadingScheduleGrid from "../components/LoadingSchedule";
import EmptyState from "../components/EmptyState";
import ScheduleList from "../components/ScheduleList";
import ViewToggleButton from "@/core/components/molecules/ToggleButton";
import clinicStore from "@/core/store/clinic";


const Dashboard = () => {
  const clinic = clinicStore.getState().clinic;
  const { data: schedules, isPending } = useGetTodaySchedule();
  const [view, setView] = useState<ViewType>("grid");

  const kpis = useKpis(schedules);
  const groupedSchedules = useGroupedSchedules(schedules);

  const isEmpty = !isPending && groupedSchedules.orderedKeys.length === 0;

  return (
    <div>
      <PageTitle title={`Bem vindo ao Dashboard`} subtitle={`Visão geral dos agendamentos - ${clinic?.name}`} />

      <KpiSection kpis={kpis} isLoading={isPending} />

      <header className="mt-10 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold flex items-center gap-2">
          Agendamentos
        </h2>
        <ViewToggleButton view={view} setView={setView} />
      </header>

      <main className="mt-6">
        {isPending ? (
          <LoadingScheduleGrid />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <ScheduleList groupedSchedules={groupedSchedules} view={view} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
