import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  Sparkles,
  Search,
  Stethoscope,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, DetailBadge } from "@/components/ui/badge";
import { PageHeaderCard } from "@/components/ui/page-header-card";
import { MetricsSection } from "@/components/ui/metrics-section";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { SearchX } from "lucide-react";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [employeeFilter, setEmployeeFilter] = useState<string>("all");
  const [detailFilter, setDetailFilter] = useState<string>("all");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <DashboardContent
          t={t}
          search={search}
          typeFilter={typeFilter}
          severityFilter={severityFilter}
          employeeFilter={employeeFilter}
          detailFilter={detailFilter}
          setSearch={setSearch}
          setTypeFilter={setTypeFilter}
          setSeverityFilter={setSeverityFilter}
          setEmployeeFilter={setEmployeeFilter}
          setDetailFilter={setDetailFilter}
        />
    </div>
  );
};

const DashboardContent = ({
  t,
  search,
  typeFilter,
  severityFilter,
  employeeFilter,
  detailFilter,
  setSearch,
  setTypeFilter,
  setSeverityFilter,
  setEmployeeFilter,
  setDetailFilter,
}: {
  t: (key: string) => string;
  search: string;
  typeFilter: string;
  severityFilter: string;
  employeeFilter: string;
  detailFilter: string;
  setSearch: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setSeverityFilter: (value: string) => void;
  setEmployeeFilter: (value: string) => void;
  setDetailFilter: (value: string) => void;
}) => {
  // TODO: Replace with real data from database
  const metrics = {
    totalEmployees: 42,
    newHiresThisMonth: 3,
    departuresThisMonth: 1,
    employeesOnLeave: 2,
  };

  const alerts = {
    cacesExpired: 2,
    cacesExpiringSoon: 5,
    medicalVisitsOverdue: 1,
    medicalVisitsUpcoming: 8,
  };

  const allDeadlines = [
    {
      id: 1,
      type: "CACES expiration proche",
      employee: "Jean Dupont",
      employeeId: 1,
      category: "1A",
      daysLeft: 3,
      severity: "warning",
      date: "2025-02-18",
    },
    {
      id: 2,
      type: "CACES expiration proche",
      employee: "Marie Martin",
      employeeId: 2,
      category: "3",
      daysLeft: 5,
      severity: "warning",
      date: "2025-02-20",
    },
    {
      id: 3,
      type: "CACES expiré",
      employee: "Pierre Bernard",
      employeeId: 3,
      category: "5",
      severity: "critical",
      date: "2025-02-01",
    },
    {
      id: 4,
      type: "Visite médicale planifiée",
      employee: "Sophie Petit",
      employeeId: 4,
      visitType: "Visite périodique",
      severity: "info",
      date: "2025-02-22",
    },
    {
      id: 5,
      type: "Visite en retard",
      employee: "Luc Dubois",
      employeeId: 5,
      visitType: "Visite de reprise",
      severity: "critical",
      date: "2025-01-28",
    },
  ];

  // Get unique employees and details
  const uniqueEmployees = useMemo(() => {
    const employees = new Set(allDeadlines.map((d) => d.employee));
    return Array.from(employees);
  }, [allDeadlines]);

  const uniqueDetails = useMemo(() => {
    const details = new Set<string>();
    allDeadlines.forEach((d) => {
      if (d.category) details.add(`CACES ${d.category}`);
      if (d.visitType) details.add(d.visitType);
    });
    return Array.from(details);
  }, [allDeadlines]);

  const upcomingDeadlines = useMemo(() => {
    return allDeadlines.filter((deadline) => {
      const matchesSearch =
        search === "" ||
        deadline.employee.toLowerCase().includes(search.toLowerCase()) ||
        deadline.type.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "caces" && deadline.type.includes("CACES")) ||
        (typeFilter === "medical" && deadline.type.includes("Visite"));

      const matchesSeverity =
        severityFilter === "all" || deadline.severity === severityFilter;

      const matchesEmployee =
        employeeFilter === "all" || deadline.employee === employeeFilter;

      const matchesDetail =
        detailFilter === "all" ||
        (deadline.category && detailFilter === `CACES ${deadline.category}`) ||
        (deadline.visitType && detailFilter === deadline.visitType);

      return (
        matchesSearch &&
        matchesType &&
        matchesSeverity &&
        matchesEmployee &&
        matchesDetail
      );
    });
  }, [
    allDeadlines,
    search,
    typeFilter,
    severityFilter,
    employeeFilter,
    detailFilter,
  ]);

  const getStatusBadge = (severity: string) => {
    if (severity === "critical") return <StatusBadge color="red">{t("alerts.critical")}</StatusBadge>;
    if (severity === "warning") return <StatusBadge color="yellow">{t("alerts.warning")}</StatusBadge>;
    return <StatusBadge color="blue">{t("alerts.info")}</StatusBadge>;
  };

  const getTypeBadge = (type: string) => {
    if (type.includes("CACES")) return <StatusBadge color="purple">{t("caces.title")}</StatusBadge>;
    if (type.includes("Visite")) return <StatusBadge color="green">{t("medicalVisits.title")}</StatusBadge>;
    return <StatusBadge color="gray">{type}</StatusBadge>;
  };

  const getDetailBadge = (category?: string, visitType?: string) => {
    if (category) {
      const colors: Record<string, "blue" | "indigo" | "purple" | "pink" | "teal" | "gray"> = {
        "1A": "blue",
        "1B": "indigo",
        "3": "purple",
        "5": "pink",
        "7": "teal",
      };
      const color = colors[category] || "gray";
      return <DetailBadge color={color}>CACES {category}</DetailBadge>;
    }
    if (visitType) {
      const colors: Record<string, "purple" | "orange" | "teal" | "gray"> = {
        "Visite périodique": "purple",
        "Visite de reprise": "orange",
        "Visite initiale": "teal",
      };
      const color = colors[visitType] || "gray";
      return <DetailBadge color={color}>{visitType}</DetailBadge>;
    }
    return null;
  };

  return (
    <div className="min-h-full space-y-3">
      {/* Header */}
      <PageHeaderCard
        icon={<Sparkles className="h-4 w-4 text-gray-600" />}
        title={t("dashboard.title")}
        description={t("dashboard.description")}
      />

      {/* Key Metrics */}
      <MetricsSection
        kpis={[
          {
            title: t("dashboard.totalEmployees"),
            value: metrics.totalEmployees,
            description: `${metrics.totalEmployees - metrics.employeesOnLeave} ${t("employees.active")}`,
            icon: <Users className="h-4 w-4" />,
          },
          {
            title: t("dashboard.newHires"),
            value: metrics.newHiresThisMonth,
            description: t("dashboard.thisMonth"),
            icon: <CheckCircle2 className="h-4 w-4" />,
            iconColor: "text-green-500",
          },
          {
            title: t("alerts.critical"),
            value: alerts.cacesExpired + alerts.medicalVisitsOverdue,
            description: `${(
              ((alerts.cacesExpired + alerts.medicalVisitsOverdue) /
                (alerts.cacesExpired +
                  alerts.cacesExpiringSoon +
                  alerts.medicalVisitsOverdue +
                  alerts.medicalVisitsUpcoming)) *
                100
            ).toFixed(0)}${t("common.ofTotal")}`,
            icon: <ShieldAlert className="h-4 w-4" />,
            iconColor: "text-red-500",
          },
          {
            title: t("alerts.warning"),
            value: alerts.cacesExpiringSoon,
            description: `${(
              (alerts.cacesExpiringSoon /
                (alerts.cacesExpired +
                  alerts.cacesExpiringSoon +
                  alerts.medicalVisitsOverdue +
                  alerts.medicalVisitsUpcoming)) *
                100
            ).toFixed(0)}${t("common.ofTotal")}`,
            icon: <AlertTriangle className="h-4 w-4" />,
            iconColor: "text-yellow-500",
          },
        ]}
      />

      <div className="flex gap-2 flex-col">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("employees.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder={t("dashboard.filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.allTypes")}</SelectItem>
              <SelectItem value="caces">{t("caces.title")}</SelectItem>
              <SelectItem value="medical">
                {t("medicalVisits.title")}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder={t("dashboard.filterBySeverity")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("dashboard.allSeverities")}
              </SelectItem>
              <SelectItem value="critical">{t("alerts.critical")}</SelectItem>
              <SelectItem value="warning">{t("alerts.warning")}</SelectItem>
              <SelectItem value="info">{t("alerts.info")}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder={t("dashboard.filterByEmployee")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.allEmployees")}</SelectItem>
              {uniqueEmployees.map((employee) => (
                <SelectItem key={employee} value={employee}>
                  {employee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={detailFilter} onValueChange={setDetailFilter}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder={t("dashboard.filterByDetail")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.allDetails")}</SelectItem>
              {uniqueDetails.map((detail) => (
                <SelectItem key={detail} value={detail}>
                  {detail}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("dashboard.filterByType")}</TableHead>
                <TableHead>{t("dashboard.filterByEmployee")}</TableHead>
                <TableHead>{t("dashboard.filterByDetail")}</TableHead>
                <TableHead>{t("caces.date")}</TableHead>
                <TableHead>{t("caces.status")}</TableHead>
                <TableHead className="text-right">
                  {t("employees.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingDeadlines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <SearchX className="h-8 w-8 opacity-50" />
                      </div>
                      <p className="text-lg font-medium">
                        {t("common.noData")}
                      </p>
                      <p className="text-sm mt-2 max-w-md text-center">
                        {t("dashboard.noDataFound")}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                upcomingDeadlines.map((deadline) => (
                  <TableRow key={deadline.id} className="hover:bg-muted/50">
                    <TableCell>{getTypeBadge(deadline.type)}</TableCell>
                    <TableCell>
                      <Link
                        to={`/employees_/${deadline.employeeId}`}
                        className="text-gray-700 underline hover:opacity-80 transition-opacity"
                      >
                        {deadline.employee}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {getDetailBadge(deadline.category, deadline.visitType)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {deadline.date}
                    </TableCell>
                    <TableCell>{getStatusBadge(deadline.severity)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/home")({
  component: DashboardLayout,
});
