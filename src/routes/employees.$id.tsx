import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Edit, FileText, ShieldAlert, Stethoscope, Calendar, User, Building, Briefcase, Phone, Mail, MapPin, Cake, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { SidebarInset } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/employees/$id')({
  component: EmployeeDetailLayout,
})

const EmployeeDetailLayout = () => {
  const { t } = useTranslation()
  return (
    <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <Link to="/employees"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div className="flex items-center gap-2"><User className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('employeeDetail.title')}</h2></div>
          <div className="ml-auto flex items-center gap-2"><Button variant="outline" className="gap-2"><Edit className="h-4 w-4" />{t('employeeDetail.edit')}</Button></div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-full">
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">JD</div>
                <div><h1 className="text-2xl font-bold text-gray-900">Jean Dupont</h1><p className="text-gray-600">Opérateur • Production</p></div>
              </div>
            </div>
            <Tabs defaultValue="information">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="information">{t('employeeDetail.information')}</TabsTrigger>
                <TabsTrigger value="documents">{t('employeeDetail.documents')}</TabsTrigger>
                <TabsTrigger value="caces">{t('employeeDetail.caces')}</TabsTrigger>
                <TabsTrigger value="visits">{t('employeeDetail.visits')}</TabsTrigger>
                <TabsTrigger value="history">{t('employeeDetail.history')}</TabsTrigger>
              </TabsList>
              <TabsContent value="information" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader><CardTitle>{t('employeeDetail.identity')}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3"><User className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.fullName')}</p><p className="font-medium">Jean Dupont</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><Cake className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.dateOfBirth')}</p><p className="font-medium">15 mars 1985 (39 ans)</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.address')}</p><p className="font-medium">123 Rue de la République, 75001 Paris</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.phone')}</p><p className="font-medium">+33 6 12 34 56 78</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.email')}</p><p className="font-medium">jean.dupont@email.com</p></div></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>{t('employeeDetail.jobAndContract')}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3"><Building className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employees.department')}</p><p className="font-medium">Production</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.jobPosition')}</p><p className="font-medium">Opérateur</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.startDate')}</p><p className="font-medium">15 janvier 2023</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.contractType')}</p><p className="font-medium">CDI</p></div></div>
                      <Separator />
                      <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-gray-500" /><div><p className="text-sm text-gray-500">{t('employeeDetail.status')}</p><Badge variant="default">{t('employees.active')}</Badge></div></div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <Card>
                  <CardHeader><CardTitle>{t('employeeDetail.documents')}</CardTitle></CardHeader>
                  <CardContent><div className="text-center py-8 text-gray-500"><FileText className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>{t('employeeDetail.noDocuments')}</p></div></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="caces">
                <Card>
                  <CardHeader><CardTitle>{t('employeeDetail.caces')}</CardTitle></CardHeader>
                  <CardContent><div className="text-center py-8 text-gray-500"><ShieldAlert className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>{t('employeeDetail.noCaces')}</p></div></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="visits">
                <Card>
                  <CardHeader><CardTitle>{t('employeeDetail.visits')}</CardTitle></CardHeader>
                  <CardContent><div className="text-center py-8 text-gray-500"><Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>{t('employeeDetail.noMedicalVisits')}</p></div></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                  <CardHeader><CardTitle>{t('employeeDetail.history')}</CardTitle></CardHeader>
                  <CardContent><div className="text-center py-8 text-gray-500"><Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>{t('employeeDetail.noHistory')}</p></div></CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
  )
}
