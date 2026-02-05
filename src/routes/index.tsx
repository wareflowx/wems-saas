import { createFileRoute } from '@tanstack/react-router'
import { Users, ShieldAlert, Stethoscope, FileText, Sparkles, Bell, AlertTriangle, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useMemo } from 'react'

export const Route = createFileRoute('/')({ component: DashboardLayout })

const DashboardLayout = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [severityFilter, setSeverityFilter] = useState<string>('all')

  // Mock data
  const allAlerts = [
    { id: 1, type: 'CACES expiré', employee: 'Jean Dupont', employeeId: 1, category: '1A', severity: 'critical', date: '2025-02-10' },
    { id: 2, type: 'Visite en retard', employee: 'Marie Martin', employeeId: 2, visitType: 'Visite de reprise', severity: 'critical', date: '2025-02-01' },
    { id: 3, type: 'CACES expiration proche', employee: 'Pierre Bernard', employeeId: 3, category: '3', severity: 'warning', daysLeft: 5, date: '2025-02-15' },
    { id: 4, type: 'CACES expiration proche', employee: 'Sophie Petit', employeeId: 4, category: '5', severity: 'warning', daysLeft: 12, date: '2025-02-22' },
    { id: 5, type: 'Visite planifiée', employee: 'Luc Dubois', employeeId: 5, visitType: 'Visite périodique', severity: 'info', date: '2025-03-01' },
  ]

  const recentAlerts = useMemo(() => {
    return allAlerts.filter((alert) => {
      const matchesSearch =
        search === '' ||
        alert.employee.toLowerCase().includes(search.toLowerCase()) ||
        alert.type.toLowerCase().includes(search.toLowerCase())

      const matchesType = typeFilter === 'all' ||
        (typeFilter === 'caces' && alert.type.includes('CACES')) ||
        (typeFilter === 'medical' && alert.type.includes('Visite'))

      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter

      return matchesSearch && matchesType && matchesSeverity
    })
  }, [allAlerts, search, typeFilter, severityFilter])

  const kpis = {
    totalEmployees: 42,
    activeEmployees: 38,
    criticalAlerts: 2,
    warningAlerts: 2,
  }

  const getAlertBadge = (severity: string, daysLeft?: number) => {
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
    return <span className="text-gray-400">-</span>
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('dashboard.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
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
                <div className="text-2xl font-bold">{kpis.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">{kpis.activeEmployees} actifs</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.critical')}</CardTitle>
                <ShieldAlert className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">{((kpis.criticalAlerts / recentAlerts.length) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.warning')}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.warningAlerts}</div>
                <p className="text-xs text-muted-foreground">{((kpis.warningAlerts / recentAlerts.length) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">Toutes les alertes</CardTitle>
                <Bell className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{recentAlerts.length}</div>
                <p className="text-xs text-muted-foreground">Total alertes</p>
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
                <Stethoscope className="h-4 w-4" />
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
                <Bell className="h-4 w-4" />
                {t('alerts.title')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('employees.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="caces">{t('caces.title')}</SelectItem>
                <SelectItem value="medical">{t('medicalVisits.title')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sévérités</SelectItem>
                <SelectItem value="critical">{t('alerts.critical')}</SelectItem>
                <SelectItem value="warning">{t('alerts.warning')}</SelectItem>
                <SelectItem value="info">{t('alerts.info')}</SelectItem>
              </SelectContent>
            </Select>
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
                {recentAlerts.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-muted/50">
                    <TableCell>{getTypeBadge(alert.type)}</TableCell>
                    <TableCell>
                      <Link to={`/employees_/${alert.employeeId}`} className="text-gray-700 underline hover:opacity-80 transition-opacity">
                        {alert.employee}
                      </Link>
                    </TableCell>
                    <TableCell>{getDetailBadge(alert.category, alert.visitType)}</TableCell>
                    <TableCell className="text-gray-700">{alert.date}</TableCell>
                    <TableCell>{getAlertBadge(alert.severity)}</TableCell>
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
      </div>
    </SidebarInset>
  )
}
