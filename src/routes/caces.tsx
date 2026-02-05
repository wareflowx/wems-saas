import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Plus, AlertTriangle, ShieldAlert, Calendar, FileText, Sparkles, AlertCircle, Download } from 'lucide-react'
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

  // KPIs
  const kpis = {
    totalCaces: caces.length,
    expiredCaces: caces.filter(c => c.status === 'expired').length,
    warningCaces: caces.filter(c => c.status === 'warning').length,
    validCaces: caces.filter(c => c.status === 'valid').length,
  }

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
                    <span className="font-medium">{t('caces.title')}</span> - {kpis.totalCaces} certificats
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('common.search')}</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.totalCaces}</div>
                <p className="text-xs text-muted-foreground">Total CACES</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('caces.expired')}</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.expiredCaces}</div>
                <p className="text-xs text-muted-foreground">{((kpis.expiredCaces / kpis.totalCaces) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('caces.expiringSoon')}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.warningCaces}</div>
                <p className="text-xs text-muted-foreground">{((kpis.warningCaces / kpis.totalCaces) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('caces.valid')}</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.validCaces}</div>
                <p className="text-xs text-muted-foreground">{((kpis.validCaces / kpis.totalCaces) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('caces.search')}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            <Button className="gap-2 ml-auto"><Plus className="h-4 w-4" />{t('caces.addCaces')}</Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('caces.employee')}</TableHead>
                  <TableHead>{t('caces.category')}</TableHead>
                  <TableHead>{t('caces.issueDate')}</TableHead>
                  <TableHead>{t('caces.expiryDate')}</TableHead>
                  <TableHead>{t('dashboard.days')}</TableHead>
                  <TableHead>{t('caces.status')}</TableHead>
                  <TableHead className="text-right">{t('caces.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caces.map((cacesItem) => (
                  <TableRow key={cacesItem.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{cacesItem.employee}</TableCell>
                    <TableCell><Badge variant="outline">{cacesItem.category}</Badge></TableCell>
                    <TableCell className="text-gray-700">{cacesItem.dateObtained}</TableCell>
                    <TableCell className="text-gray-700">{cacesItem.expirationDate}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${cacesItem.daysLeft < 0 ? 'text-red-600' : cacesItem.daysLeft <= 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {cacesItem.daysLeft < 0 ? `${Math.abs(cacesItem.daysLeft)} jours de retard` : `${cacesItem.daysLeft} jours`}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(cacesItem.status, cacesItem.daysLeft)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
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
