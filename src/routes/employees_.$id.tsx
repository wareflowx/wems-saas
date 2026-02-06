import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Edit,
  FileText,
  ShieldAlert,
  Stethoscope,
  Calendar,
  User,
  Building,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Cake,
  CheckCircle2,
  Plus,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { AddCacesDialog } from "@/components/employees/AddCacesDialog";
import { useState } from "react";
import { PageHeaderCard } from "@/components/ui/page-header-card";
import { MetricsSection } from "@/components/ui/metrics-section";
import { StatusBadge, DetailBadge } from "@/components/ui/badge";

export const Route = createFileRoute("/employees_/$id")({
  component: EmployeeDetailLayout,
});

const employees = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    department: "Production",
    jobTitle: "Opérateur",
    status: "active",
    startDate: "2023-01-15",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    dateOfBirth: "1985-03-15",
    address: "123 Rue de la République, 75001 Paris",
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    department: "Administration",
    jobTitle: "Comptable",
    status: "active",
    startDate: "2022-06-01",
    email: "marie.martin@email.com",
    phone: "+33 6 98 76 54 32",
    dateOfBirth: "1988-07-22",
    address: "456 Avenue des Champs-Élysées, 75008 Paris",
  },
  {
    id: 3,
    firstName: "Pierre",
    lastName: "Bernard",
    department: "Production",
    jobTitle: "Technicien",
    status: "on_leave",
    startDate: "2021-03-10",
    email: "pierre.bernard@email.com",
    phone: "+33 6 11 22 33 44",
    dateOfBirth: "1990-11-05",
    address: "789 Boulevard Haussmann, 75009 Paris",
  },
  {
    id: 4,
    firstName: "Sophie",
    lastName: "Petit",
    department: "RH",
    jobTitle: "Responsable RH",
    status: "active",
    startDate: "2020-09-20",
    email: "sophie.petit@email.com",
    phone: "+33 6 55 66 77 88",
    dateOfBirth: "1992-02-14",
    address: "321 Rue de Rivoli, 75004 Paris",
  },
  {
    id: 5,
    firstName: "Luc",
    lastName: "Dubois",
    department: "Production",
    jobTitle: "Opérateur",
    status: "active",
    startDate: "2024-01-08",
    email: "luc.dubois@email.com",
    phone: "+33 6 77 88 99 00",
    dateOfBirth: "1995-05-30",
    address: "654 Boulevard Voltaire, 75011 Paris",
  },
];

const employeeCaces: {
  [key: number]: Array<{
    id: number;
    category: string;
    issueDate: string;
    expiryDate: string;
    status: "valid" | "expiring_soon" | "expired";
  }>;
} = {
  1: [
    {
      id: 1,
      category: "1A",
      issueDate: "2022-03-15",
      expiryDate: "2025-03-15",
      status: "expiring_soon",
    },
    {
      id: 2,
      category: "3",
      issueDate: "2021-06-01",
      expiryDate: "2026-06-01",
      status: "valid",
    },
  ],
  2: [
    {
      id: 3,
      category: "2",
      issueDate: "2023-01-10",
      expiryDate: "2026-01-10",
      status: "valid",
    },
  ],
  5: [
    {
      id: 4,
      category: "1B",
      issueDate: "2023-08-20",
      expiryDate: "2024-08-20",
      status: "expired",
    },
  ],
};

const getAge = (dateOfBirth: string) => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  return monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
    ? age - 1
    : age;
};

const getStatusBadge = (status: string) => {
  const statusMap = {
    active: { color: "green" as const, label: "Actif" },
    on_leave: { color: "yellow" as const, label: "En congé" },
    terminated: { color: "red" as const, label: "Terminé" },
  };
  const { color, label } =
    statusMap[status as keyof typeof statusMap] || statusMap.active;
  return <StatusBadge color={color}>{label}</StatusBadge>;
};

const getCacesStatusBadge = (status: "valid" | "expiring_soon" | "expired") => {
  const statusMap = {
    valid: { color: "green" as const, label: "Valide" },
    expiring_soon: { color: "yellow" as const, label: "Expire bientôt" },
    expired: { color: "red" as const, label: "Expiré" },
  };
  const { color, label } = statusMap[status];
  return <StatusBadge color={color}>{label}</StatusBadge>;
};

const EmployeeDetailLayout = () => {
  const { t } = useTranslation();
  const { id } = Route.useParams();
  const [isAddCacesDialogOpen, setIsAddCacesDialogOpen] = useState(false);
  const employee = employees.find((e) => e.id === parseInt(id));
  const cacesList = employeeCaces[employee?.id || 0] || [];

  if (!employee) {
    return (
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <Link to="/employees">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Employé non trouvé</h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
          <div className="min-h-full flex items-center justify-center">
            <div className="text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Employé non trouvé
              </h2>
              <p className="text-gray-500 mb-4">
                L'employé avec l'ID {id} n'existe pas.
              </p>
              <Link to="/employees">
                <Button>Retour à la liste</Button>
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
    );
  }

  const initials =
    `${employee.firstName[0]}${employee.lastName[0]}`.toUpperCase();

  // Calculate tenure in months
  const getTenure = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    const months =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());
    return months;
  };

  return (
    <SidebarInset>
      <Tabs defaultValue="information" className="flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
          <div className="min-h-full space-y-3">
            {/* Header */}
            <PageHeaderCard
              icon={<Sparkles className="h-4 w-4 text-gray-600" />}
              title={`${employee.firstName} ${employee.lastName}`}
              description={`${employee.jobTitle} • ${employee.department}`}
            />

            {/* Key Metrics */}
            <MetricsSection
              kpis={[
                {
                  title: "Âge",
                  value: getAge(employee.dateOfBirth),
                  description: "ans",
                  icon: <Cake className="h-4 w-4" />,
                },
                {
                  title: "Ancienneté",
                  value: getTenure(employee.startDate),
                  description: "mois",
                  icon: <Calendar className="h-4 w-4" />,
                },
                {
                  title: "Statut",
                  description: employee.jobTitle,
                  icon: <Briefcase className="h-4 w-4" />,
                  value: getStatusBadge(employee.status),
                },
                {
                  title: "Département",
                  value: employee.department,
                  description: `${getTenure(employee.startDate)} mois d'ancienneté`,
                  icon: <Building className="h-4 w-4" />,
                },
              ]}
            />

            <div className="flex gap-2 flex-col">
              <div className="border-b bg-card">
                <TabsList className="grid w-full grid-cols-5 h-14 bg-transparent border-0">
                  <TabsTrigger value="information">
                    {t("employeeDetail.information")}
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    {t("employeeDetail.documents")}
                  </TabsTrigger>
                  <TabsTrigger value="caces">
                    {t("employeeDetail.caces")}
                  </TabsTrigger>
                  <TabsTrigger value="visits">
                    {t("employeeDetail.visits")}
                  </TabsTrigger>
                  <TabsTrigger value="history">
                    {t("employeeDetail.history")}
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="information" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>{t("employeeDetail.identity")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.fullName")}
                          </p>
                          <p className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Cake className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.dateOfBirth")}
                          </p>
                          <p className="font-medium">
                            {new Date(employee.dateOfBirth).toLocaleDateString(
                              "fr-FR",
                            )}{" "}
                            ({getAge(employee.dateOfBirth)} ans)
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.address")}
                          </p>
                          <p className="font-medium">{employee.address}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.phone")}
                          </p>
                          <p className="font-medium">{employee.phone}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.email")}
                          </p>
                          <p className="font-medium">{employee.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>
                        {t("employeeDetail.jobAndContract")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employees.department")}
                          </p>
                          <p className="font-medium">{employee.department}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.jobPosition")}
                          </p>
                          <p className="font-medium">{employee.jobTitle}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.startDate")}
                          </p>
                          <p className="font-medium">
                            {new Date(employee.startDate).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.contractType")}
                          </p>
                          <p className="font-medium uppercase">
                            {employee.status === "active"
                              ? "CDI"
                              : employee.status === "on_leave"
                                ? "CDD"
                                : employee.status}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("employeeDetail.status")}
                          </p>
                          {getStatusBadge(employee.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="mt-0">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>{t("employeeDetail.documents")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("employeeDetail.noDocuments")}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="caces" className="mt-0">
                <Card className="bg-background">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>{t("employeeDetail.caces")}</CardTitle>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => setIsAddCacesDialogOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {cacesList.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ShieldAlert className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{t("employeeDetail.noCaces")}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cacesList.map((caces) => (
                          <div
                            key={caces.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <ShieldAlert className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  CACES {caces.category}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Obtenu le{" "}
                                  {new Date(caces.issueDate).toLocaleDateString(
                                    "fr-FR",
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  Expiration
                                </p>
                                <p className="font-medium">
                                  {new Date(
                                    caces.expiryDate,
                                  ).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                              {getCacesStatusBadge(caces.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="visits" className="mt-0">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>{t("employeeDetail.visits")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("employeeDetail.noMedicalVisits")}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="mt-0">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>{t("employeeDetail.history")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("employeeDetail.noHistory")}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
      <AddCacesDialog
        open={isAddCacesDialogOpen}
        onOpenChange={setIsAddCacesDialogOpen}
        onSuccess={() => {
          // TODO: Refresh CACES list
        }}
        employeeId={employee?.id}
        employeeName={`${employee?.firstName} ${employee?.lastName}`}
      />
    </SidebarInset>
  );
};
