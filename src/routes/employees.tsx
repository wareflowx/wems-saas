import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  SearchX,
  Filter,
  Plus,
  Trash2,
  Edit,
  UserPlus,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bell,
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { useState, useMemo, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateEmployeeDialog } from "@/components/employees/CreateEmployeeDialog";
import { DeleteEmployeeDialog } from "@/components/employees/DeleteEmployeeDialog";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/employees")({
  component: EmployeesLayout,
});

const EmployeesLayout = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{id: number, name: string} | null>(null);
  const itemsPerPage = 10;

  const employees = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      contract: "CDI",
      jobTitle: "Opérateur",
      workLocation: "Site A",
      status: "active",
      startDate: "2023-01-15",
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Martin",
      contract: "CDD",
      jobTitle: "Comptable",
      workLocation: "Site B",
      status: "active",
      startDate: "2022-06-01",
    },
    {
      id: 3,
      firstName: "Pierre",
      lastName: "Bernard",
      contract: "Intérim",
      jobTitle: "Technicien",
      workLocation: "Site A",
      status: "on_leave",
      startDate: "2021-03-10",
    },
    {
      id: 4,
      firstName: "Sophie",
      lastName: "Petit",
      contract: "CDI",
      jobTitle: "Responsable RH",
      workLocation: "Site C",
      status: "active",
      startDate: "2020-09-20",
    },
    {
      id: 5,
      firstName: "Luc",
      lastName: "Dubois",
      contract: "CDD",
      jobTitle: "Opérateur",
      workLocation: "Site A",
      status: "active",
      startDate: "2024-01-08",
    },
  ];

  // KPIs
  const kpis = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((e) => e.status === "active").length,
    onLeaveEmployees: employees.filter((e) => e.status === "on_leave").length,
    newHiresThisMonth: 3,
  };

  // Notifications
  const [readNotifications, setReadNotifications] = useState<Set<number>>(
    new Set(),
  );

  const notifications = {
    critical: [
      {
        id: 1,
        employee: "Jean Dupont",
        type: "CACES expiré",
        category: "1A",
        time: "2 jours",
      },
      {
        id: 2,
        employee: "Marie Martin",
        type: "Visite médicale manquée",
        date: "2026-02-01",
        time: "4 jours",
      },
    ],
    warning: [
      {
        id: 3,
        employee: "Pierre Bernard",
        type: "CACES expire bientôt",
        category: "3",
        daysLeft: 5,
        time: "5 jours",
      },
      {
        id: 4,
        employee: "Sophie Petit",
        type: "CACES expire bientôt",
        category: "2",
        daysLeft: 7,
        time: "7 jours",
      },
    ],
  };

  const markAsRead = (id: number) => {
    setReadNotifications((prev) => new Set([...prev, id]));
  };

  const markAllAsRead = () => {
    const allIds = [...notifications.critical, ...notifications.warning].map(
      (n) => n.id,
    );
    setReadNotifications(new Set(allIds));
  };

  // Get unique contracts and statuses
  const uniqueContracts = useMemo(() => {
    const contracts = new Set(employees.map((e) => e.contract));
    return Array.from(contracts);
  }, [employees]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(employees.map((e) => e.status));
    return Array.from(statuses);
  }, [employees]);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        search === "" ||
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesContract =
        departmentFilter === "all" || employee.contract === departmentFilter;
      const matchesStatus =
        statusFilter === "all" || employee.status === statusFilter;

      return matchesSearch && matchesContract && matchesStatus;
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-500">
            {t("employees.active")}
          </span>
        );
      case "on_leave":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
            {t("employees.onLeave")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-500/10 border border-gray-500/20 text-gray-500">
            {status}
          </span>
        );
    }
  };

  const getContractBadge = (contract: string) => {
    const contractColors: { [key: string]: string } = {
      'CDI': 'bg-blue-500/10 border border-blue-500/20 text-blue-500',
      'CDD': 'bg-orange-500/10 border border-orange-500/20 text-orange-500',
      'Intérim': 'bg-teal-500/10 border border-teal-500/20 text-teal-500',
    };
    const colors = contractColors[contract] || 'bg-gray-500/10 border border-gray-500/20 text-gray-500';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors}`}>
        {contract}
      </span>
    );
  };

  const getPositionBadge = (position: string) => {
    const positionColors: { [key: string]: string } = {
      'Opérateur': 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500',
      'Technicien': 'bg-amber-500/10 border border-amber-500/20 text-amber-500',
      'Comptable': 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-500',
      'Responsable RH': 'bg-rose-500/10 border border-rose-500/20 text-rose-500',
    };
    const colors = positionColors[position] || 'bg-gray-500/10 border border-gray-500/20 text-gray-500';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors}`}>
        {position}
      </span>
    );
  };

  const getWorkLocationBadge = (location: string) => {
    const locationColors: { [key: string]: string } = {
      'Site A': 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-500',
      'Site B': 'bg-amber-500/10 border border-amber-500/20 text-amber-500',
      'Site C': 'bg-violet-500/10 border border-violet-500/20 text-violet-500',
    };
    const colors = locationColors[location] || 'bg-gray-500/10 border border-gray-500/20 text-gray-500';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors}`}>
        {location}
      </span>
    );
  };

  return (
    <>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">{t("employees.title")}</h2>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.critical.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-background">
                      {notifications.critical.length +
                        notifications.warning.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="p-3 border-b">
                  <div className="flex items-center justify-between">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold">
                      {t("notifications.title")}
                    </DropdownMenuLabel>
                    <span className="text-xs text-muted-foreground">
                      {notifications.critical.length +
                        notifications.warning.length -
                        readNotifications.size}{" "}
                      {t("notifications.new")}
                    </span>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.critical.filter(
                    (n) => !readNotifications.has(n.id),
                  ).length > 0 && (
                    <div className="border-b">
                      <div className="px-3 py-1.5 bg-red-50 border-b border-red-100">
                        <p className="text-[11px] font-semibold text-red-700 flex items-center gap-1.5">
                          <AlertCircle className="h-3 w-3" />
                          {t("notifications.critical")} (
                          {
                            notifications.critical.filter(
                              (n) => !readNotifications.has(n.id),
                            ).length
                          }
                          )
                        </p>
                      </div>
                      <div className="divide-y divide-border">
                        {notifications.critical
                          .filter((n) => !readNotifications.has(n.id))
                          .map((notification) => (
                            <DropdownMenuItem
                              key={notification.id}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-red-50/30 cursor-pointer border-0 group"
                            >
                              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <ShieldAlert className="h-3 w-3 text-red-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {notification.employee}
                                </p>
                                <p className="text-[11px] text-muted-foreground truncate">
                                  {notification.type}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-3 w-3 text-green-600" />
                                </Button>
                              </div>
                            </DropdownMenuItem>
                          ))}
                      </div>
                    </div>
                  )}

                  {notifications.warning.filter(
                    (n) => !readNotifications.has(n.id),
                  ).length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 bg-yellow-50 border-b border-yellow-100">
                        <p className="text-[11px] font-semibold text-yellow-700 flex items-center gap-1.5">
                          <AlertTriangle className="h-3 w-3" />
                          {t("notifications.warning")} (
                          {
                            notifications.warning.filter(
                              (n) => !readNotifications.has(n.id),
                            ).length
                          }
                          )
                        </p>
                      </div>
                      <div className="divide-y divide-border">
                        {notifications.warning
                          .filter((n) => !readNotifications.has(n.id))
                          .map((notification) => (
                            <DropdownMenuItem
                              key={notification.id}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-yellow-50/30 cursor-pointer border-0 group"
                            >
                              <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                <Calendar className="h-3 w-3 text-yellow-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {notification.employee}
                                </p>
                                <p className="text-[11px] text-muted-foreground truncate">
                                  {notification.type}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-3 w-3 text-green-600" />
                                </Button>
                              </div>
                            </DropdownMenuItem>
                          ))}
                      </div>
                    </div>
                  )}

                  {notifications.critical.filter(
                    (n) => !readNotifications.has(n.id),
                  ).length === 0 &&
                    notifications.warning.filter(
                      (n) => !readNotifications.has(n.id),
                    ).length === 0 && (
                      <div className="py-8 px-3 text-center">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                          <Check className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">{t("notifications.allRead")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("notifications.noNew")}
                        </p>
                      </div>
                    )}
                </div>

                {notifications.critical.filter(
                  (n) => !readNotifications.has(n.id),
                ).length > 0 ||
                notifications.warning.filter(
                  (n) => !readNotifications.has(n.id),
                ).length > 0 ? (
                  <div className="p-2 border-t bg-muted/30 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 justify-center text-xs gap-1"
                      onClick={markAllAsRead}
                    >
                      <Check className="h-3 w-3" />
                      {t("notifications.markAllRead")}
                    </Button>
                  </div>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{t("dashboard.editMode")}</span>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 py-6">
          <div className="min-h-full space-y-3">
            {/* Header */}
            <div className="mb-2">
              <Card className="p-3 bg-background shadow-sm rounded-md">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Sparkles className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-medium">{t('employees.title')}</span> - {t('employees.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">
                    {t("dashboard.totalEmployees")}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">{kpis.totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">
                    {kpis.activeEmployees} {t("employees.active")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">
                    {t("employees.active")}
                  </CardTitle>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">
                    {kpis.activeEmployees}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (kpis.activeEmployees / kpis.totalEmployees) *
                      100
                    ).toFixed(0)}
                    {t("common.ofTotal")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">
                    {t("employees.onLeave")}
                  </CardTitle>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">
                    {kpis.onLeaveEmployees}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (kpis.onLeaveEmployees / kpis.totalEmployees) *
                      100
                    ).toFixed(0)}
                    {t("common.ofTotal")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">
                    {t("dashboard.newHires")}
                  </CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">
                    {kpis.newHiresThisMonth}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.thisMonth")}
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("employees.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("employeeDetail.contractType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.allContracts")}</SelectItem>
                  {uniqueContracts.map((contract) => (
                    <SelectItem key={contract} value={contract}>
                      {contract}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("employeeDetail.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.allStatuses")}</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "active"
                        ? t("employees.active")
                        : status === "on_leave"
                          ? t("employees.onLeave")
                          : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="gap-2 ml-auto"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                {t("employees.addEmployee")}
              </Button>
            </div>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("employeeDetail.fullName")}</TableHead>
                    <TableHead>{t("employeeDetail.contractType")}</TableHead>
                    <TableHead>{t("employees.position")}</TableHead>
                    <TableHead>{t("employees.workLocation")}</TableHead>
                    <TableHead>{t("employeeDetail.status")}</TableHead>
                    <TableHead>{t("employeeDetail.startDate")}</TableHead>
                    <TableHead className="text-right">
                      {t("employees.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64">
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <SearchX className="h-8 w-8 opacity-50" />
                          </div>
                          <p className="text-lg font-medium">{t("common.noData")}</p>
                          <p className="text-sm mt-2 max-w-md text-center">
                            {t("dashboard.noDataFound")}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Link
                            to={`/employees_/${employee.id}`}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <p className="font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {t("common.employeeId")}{employee.id.toString().padStart(4, "0")}
                            </p>
                          </Link>
                        </TableCell>
                        <TableCell>{getContractBadge(employee.contract)}</TableCell>
                        <TableCell>{getPositionBadge(employee.jobTitle)}</TableCell>
                        <TableCell>{getWorkLocationBadge(employee.workLocation)}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell className="text-gray-700">
                          {employee.startDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEmployeeToDelete({
                                  id: employee.id,
                                  name: `${employee.firstName} ${employee.lastName}`
                                });
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t("common.view")} de {startIndex + 1} à{" "}
                {Math.min(endIndex, filteredEmployees.length)} sur{" "}
                {filteredEmployees.length} {t("common.employees")}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <CreateEmployeeDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          // TODO: Refresh employees list
        }}
      />
      <DeleteEmployeeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          // TODO: Refresh employees list
        }}
        employeeId={employeeToDelete?.id}
        employeeName={employeeToDelete?.name}
      />
    </>
  );
};
