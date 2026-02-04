import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Plus, Calendar, User, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

const MedicalVisitsLayout = () => {
  const { t } = useTranslation()
  const visits = [
    { id: 1, employee: 'Jean Dupont', type: t('medicalVisits.periodicVisit'), scheduledDate: '2025-02-15', status: 'scheduled', daysUntil: 3 },
    { id: 2, employee: 'Marie Martin', type: t('medicalVisits.returnVisit'), scheduledDate: '2025-02-01', status: 'overdue', daysUntil: -10 },
    { id: 3, employee: 'Pierre Bernard', type: t('medicalVisits.initialVisit'), scheduledDate: '2025-03-20', status: 'scheduled', daysUntil: 36 },
    { id: 4, employee: 'Sophie Petit', type: t('medicalVisits.periodicVisit'), scheduledDate: '2025-02-10', status: 'completed', actualDate: '2025-02-10', fitnessStatus: 'Apt' },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = { scheduled: { label: t('medicalVisits.scheduled'), variant: 'default' as const }, overdue: { label: t('medicalVisits.overdue'), variant: 'destructive' as const }, completed: { label: t('medicalVisits.completed'), variant: 'secondary' as const }, cancelled: { label: t('medicalVisits.cancelled'), variant: 'outline' as const } }
    const { label, variant } = statusMap[status as keyof typeof statusMap] || statusMap.scheduled
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><User className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('medicalVisits.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" /><Input placeholder={t('common.search')} className="pl-9 w-64" /></div><Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button></div>
              <Button className="gap-2"><Plus className="h-4 w-4" />{t('medicalVisits.newVisit')}</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-red-200 bg-red-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('medicalVisits.overdue')}</p><p className="text-2xl font-bold text-red-600">2</p></div><AlertTriangle className="h-8 w-8 text-red-600" /></div></CardContent></Card>
              <Card className="border-blue-200 bg-blue-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('medicalVisits.upcoming')}</p><p className="text-2xl font-bold text-blue-600">7</p></div><Calendar className="h-8 w-8 text-blue-600" /></div></CardContent></Card>
              <Card className="border-green-200 bg-green-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('medicalVisits.completed')}</p><p className="text-2xl font-bold text-green-600">45</p></div><CheckCircle2 className="h-8 w-8 text-green-600" /></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('medicalVisits.total')}</p><p className="text-2xl font-bold">54</p></div><FileText className="h-8 w-8 text-gray-600" /></div></CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>{t('medicalVisits.visitsList')}</CardTitle></CardHeader>
              <CardContent>
                <table className="w-full"><thead><tr className="border-b"><th className="text-left p-3 font-medium">{t('medicalVisits.employee')}</th><th className="text-left p-3 font-medium">{t('medicalVisits.type')}</th><th className="text-left p-3 font-medium">{t('medicalVisits.scheduledDate')}</th><th className="text-left p-3 font-medium">{t('medicalVisits.status')}</th><th className="text-right p-3 font-medium">{t('common.actions')}</th></tr></thead>
                  <tbody>
                    {visits.map((visit) => (
                      <tr key={visit.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{visit.employee}</td>
                        <td className="p-3">{visit.type}</td>
                        <td className="p-3">{visit.scheduledDate}</td>
                        <td className="p-3">{getStatusBadge(visit.status)}</td>
                        <td className="p-3 text-right"><div className="flex justify-end gap-2"><Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
  )
}

export const Route = createFileRoute('/medical-visits')({
  component: MedicalVisitsLayout,
})
