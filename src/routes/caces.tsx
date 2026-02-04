import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Plus, AlertTriangle, ShieldAlert, Calendar, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/caces')({
  component: CACESLayout,
})

const CACESLayout = () => {
  const { t } = useTranslation()
  const caces = [
    { id: 1, employee: 'Jean Dupont', category: '1A', dateObtained: '2020-03-15', expirationDate: '2025-03-15', daysLeft: -10, status: 'expired' },
    { id: 2, employee: 'Marie Martin', category: '3', dateObtained: '2023-06-10', expirationDate: '2028-06-10', daysLeft: 856, status: 'valid' },
    { id: 3, employee: 'Pierre Bernard', category: '5', dateObtained: '2019-11-20', expirationDate: '2025-02-10', daysLeft: 5, status: 'warning' },
    { id: 4, employee: 'Sophie Petit', category: '7', dateObtained: '2022-01-05', expirationDate: '2027-01-05', daysLeft: 335, status: 'valid' },
    { id: 5, employee: 'Luc Dubois', category: '1B', dateObtained: '2024-02-01', expirationDate: '2029-02-01', daysLeft: 1093, status: 'valid' },
  ]

  const getStatusBadge = (status: string, daysLeft: number) => {
    if (daysLeft < 0) return <Badge variant="destructive">{t('caces.expired')}</Badge>
    if (daysLeft <= 30) return <Badge variant="destructive">{t('caces.expiringSoon')}</Badge>
    if (daysLeft <= 90) return <Badge className="bg-yellow-500">{t('caces.expiringSoon')}</Badge>
    return <Badge variant="default">{t('caces.valid')}</Badge>
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('caces.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" /><Input placeholder={t('caces.search')} className="pl-9 w-64" /></div><Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button></div>
              <Button className="gap-2"><Plus className="h-4 w-4" />{t('caces.addCaces')}</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-red-200 bg-red-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('caces.expired')}</p><p className="text-2xl font-bold text-red-600">2</p></div><AlertTriangle className="h-8 w-8 text-red-600" /></div></CardContent></Card>
              <Card className="border-yellow-200 bg-yellow-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('caces.expiringSoon')}</p><p className="text-2xl font-bold text-yellow-600">1</p></div><Calendar className="h-8 w-8 text-yellow-600" /></div></CardContent></Card>
              <Card className="border-green-200 bg-green-50"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('caces.valid')}</p><p className="text-2xl font-bold text-green-600">15</p></div><FileText className="h-8 w-8 text-green-600" /></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{t('common.search')}</p><p className="text-2xl font-bold">18</p></div><FileText className="h-8 w-8 text-gray-600" /></div></CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>{t('caces.title')}</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full"><thead><tr className="border-b"><th className="text-left p-3 font-medium">{t('caces.employee')}</th><th className="text-left p-3 font-medium">{t('caces.category')}</th><th className="text-left p-3 font-medium">{t('caces.issueDate')}</th><th className="text-left p-3 font-medium">{t('caces.expiryDate')}</th><th className="text-left p-3 font-medium">{t('dashboard.days')}</th><th className="text-left p-3 font-medium">{t('caces.status')}</th><th className="text-right p-3 font-medium">{t('caces.actions')}</th></tr></thead>
                    <tbody>
                      {caces.map((cacesItem) => (
                        <tr key={cacesItem.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{cacesItem.employee}</td>
                          <td className="p-3"><Badge variant="outline">{cacesItem.category}</Badge></td>
                          <td className="p-3 text-gray-700">{cacesItem.dateObtained}</td>
                          <td className="p-3 text-gray-700">{cacesItem.expirationDate}</td>
                          <td className="p-3"><span className={`font-semibold ${cacesItem.daysLeft < 0 ? 'text-red-600' : cacesItem.daysLeft <= 30 ? 'text-yellow-600' : 'text-green-600'}`}>{cacesItem.daysLeft < 0 ? `${Math.abs(cacesItem.daysLeft)} jours de retard` : `${cacesItem.daysLeft} jours`}</span></td>
                          <td className="p-3">{getStatusBadge(cacesItem.status, cacesItem.daysLeft)}</td>
                          <td className="p-3"><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
  )
}
