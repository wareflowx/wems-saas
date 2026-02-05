import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Plus, Calendar, User, FileText, CheckCircle2, Clock, AlertTriangle, Sparkles, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const MedicalVisitsLayout = () => {
  const { t } = useTranslation()
  const visits = [
    { id: 1, employee: 'Jean Dupont', type: t('medicalVisits.periodicVisit'), scheduledDate: '2025-02-15', status: 'scheduled', daysUntil: 3 },
    { id: 2, employee: 'Marie Martin', type: t('medicalVisits.returnVisit'), scheduledDate: '2025-02-01', status: 'overdue', daysUntil: -10 },
    { id: 3, employee: 'Pierre Bernard', type: t('medicalVisits.initialVisit'), scheduledDate: '2025-03-20', status: 'scheduled', daysUntil: 36 },
    { id: 4, employee: 'Sophie Petit', type: t('medicalVisits.periodicVisit'), scheduledDate: '2025-02-10', status: 'completed', actualDate: '2025-02-10', fitnessStatus: 'Apt' },
  ]

  // KPIs
  const kpis = {
    totalVisits: visits.length,
    overdueVisits: visits.filter(v => v.status === 'overdue').length,
    upcomingVisits: visits.filter(v => v.status === 'scheduled').length,
    completedVisits: visits.filter(v => v.status === 'completed').length,
  }

  const getStatusBadge = (status: string) => {
    const statusMap = { scheduled: { label: t('medicalVisits.scheduled'), variant: 'default' as const }, overdue: { label: t('medicalVisits.overdue'), variant: 'destructive' as const }, completed: { label: t('medicalVisits.completed'), variant: 'secondary' as const }, cancelled: { label: t('medicalVisits.cancelled'), variant: 'outline' as const } }
    const { label, variant } = statusMap[status as keyof typeof statusMap] || statusMap.scheduled
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('medicalVisits.title')}</h2></div>
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
                    <span className="font-medium">{t('medicalVisits.title')}</span> - Planifiez et suivez les visites médicales obligatoires de vos employés
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('medicalVisits.total')}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.totalVisits}</div>
                <p className="text-xs text-muted-foreground">Total visites</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('medicalVisits.overdue')}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.overdueVisits}</div>
                <p className="text-xs text-muted-foreground">{((kpis.overdueVisits / kpis.totalVisits) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('medicalVisits.upcoming')}</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.upcomingVisits}</div>
                <p className="text-xs text-muted-foreground">{((kpis.upcomingVisits / kpis.totalVisits) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('medicalVisits.completed')}</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.completedVisits}</div>
                <p className="text-xs text-muted-foreground">{((kpis.completedVisits / kpis.totalVisits) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common.search')}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            <Button className="gap-2 ml-auto"><Plus className="h-4 w-4" />{t('medicalVisits.newVisit')}</Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('medicalVisits.employee')}</TableHead>
                  <TableHead>{t('medicalVisits.type')}</TableHead>
                  <TableHead>{t('medicalVisits.scheduledDate')}</TableHead>
                  <TableHead>{t('medicalVisits.status')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits.map((visit) => (
                  <TableRow key={visit.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{visit.employee}</TableCell>
                    <TableCell>{visit.type}</TableCell>
                    <TableCell className="text-gray-700">{visit.scheduledDate}</TableCell>
                    <TableCell>{getStatusBadge(visit.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button>
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

export const Route = createFileRoute('/medical-visits')({
  component: MedicalVisitsLayout,
})
