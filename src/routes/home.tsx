import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/home')({
  component: DashboardLayout,
})

const DashboardLayout = () => {
  const { t } = useTranslation()

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('dashboard.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>{t('dashboard.editMode')}</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 py-6">
        <DashboardContent t={t} />
      </div>
    </SidebarInset>
  )
}

const DashboardContent = ({ t }: { t: (key: string) => string }) => {
  // TODO: Replace with real data from database
  const metrics = {
    totalEmployees: 42,
    newHiresThisMonth: 3,
    departuresThisMonth: 1,
    employeesOnLeave: 2,
  }

  const alerts = {
    cacesExpired: 2,
    cacesExpiringSoon: 5,
    medicalVisitsOverdue: 1,
    medicalVisitsUpcoming: 8,
  }

  const upcomingDeadlines = [
    { id: 1, type: 'CACES expiration proche', employee: 'Jean Dupont', employeeId: 1, category: '1A', daysLeft: 3, severity: 'warning', date: '2025-02-18' },
    { id: 2, type: 'CACES expiration proche', employee: 'Marie Martin', employeeId: 2, category: '3', daysLeft: 5, severity: 'warning', date: '2025-02-20' },
    { id: 3, type: 'CACES expiré', employee: 'Pierre Bernard', employeeId: 3, category: '5', severity: 'critical', date: '2025-02-01' },
    { id: 4, type: 'Visite médicale planifiée', employee: 'Sophie Petit', employeeId: 4, visitType: 'Visite périodique', severity: 'info', date: '2025-02-22' },
    { id: 5, type: 'Visite en retard', employee: 'Luc Dubois', employeeId: 5, visitType: 'Visite de reprise', severity: 'critical', date: '2025-01-28' },
  ]

  const getStatusBadge = (severity: string) => {
    if (severity === 'critical') return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-500">{t('alerts.critical')}</span>
    if (severity === 'warning') return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">{t('alerts.warning')}</span>
    return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-500">{t('alerts.info')}</span>
  }

  const getTypeBadge = (type: string) => {
    if (type.includes('CACES')) return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-500">{t('caces.title')}</span>
    if (type.includes('Visite')) return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-500">{t('medicalVisits.title')}</span>
    return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-500/10 border border-gray-500/20 text-gray-500">{type}</span>
  }

  const getDetailBadge = (category?: string, visitType?: string) => {
    if (category) return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">CACES {category}</span>
    if (visitType) return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">{visitType}</span>
    return null
  }

  return (
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
                <span className="font-medium">{t('dashboard.title')}</span> - Vue d'ensemble de votre entreprise et alertes importantes
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalEmployees')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{metrics.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">{metrics.totalEmployees - metrics.employeesOnLeave} actifs</p>
          </CardContent>
        </Card>
        <Card className="p-4 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.newHires')}</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{metrics.newHiresThisMonth}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.thisMonth')}</p>
          </CardContent>
        </Card>
        <Card className="p-4 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium">{t('alerts.critical')}</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{alerts.cacesExpired + alerts.medicalVisitsOverdue}</div>
            <p className="text-xs text-muted-foreground">{((alerts.cacesExpired + alerts.medicalVisitsOverdue) / (alerts.cacesExpired + alerts.cacesExpiringSoon + alerts.medicalVisitsOverdue + alerts.medicalVisitsUpcoming) * 100).toFixed(0)}% du total</p>
          </CardContent>
        </Card>
        <Card className="p-4 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium">{t('alerts.warning')}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{alerts.cacesExpiringSoon}</div>
            <p className="text-xs text-muted-foreground">{((alerts.cacesExpiringSoon) / (alerts.cacesExpired + alerts.cacesExpiringSoon + alerts.medicalVisitsOverdue + alerts.medicalVisitsUpcoming) * 100).toFixed(0)}% du total</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        <Link to="/employees">
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            {t('employees.title')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/medical-visits">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t('medicalVisits.title')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/caces">
          <Button variant="outline" className="gap-2">
            <ShieldAlert className="h-4 w-4" />
            {t('caces.title')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/documents">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            {t('documents.title')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/alerts">
          <Button variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            {t('alerts.title')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Employé</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>{t('caces.status')}</TableHead>
              <TableHead className="text-right">{t('employees.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingDeadlines.map((deadline) => (
              <TableRow key={deadline.id} className="hover:bg-muted/50">
                <TableCell>{getTypeBadge(deadline.type)}</TableCell>
                <TableCell>
                  <Link to={`/employees_/${deadline.employeeId}`} className="text-gray-700 underline hover:opacity-80 transition-opacity">
                    {deadline.employee}
                  </Link>
                </TableCell>
                <TableCell>{getDetailBadge(deadline.category, deadline.visitType)}</TableCell>
                <TableCell className="text-gray-700">{deadline.date}</TableCell>
                <TableCell>{getStatusBadge(deadline.severity)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
