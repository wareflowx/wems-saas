import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Upload, File, Download, Trash2, Eye, FileIcon, FileSpreadsheet, FileImage, FileText as FileIcon2, Sparkles, FileText } from 'lucide-react'
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

export const Route = createFileRoute('/documents')({
  component: DocumentsLayout,
})

const DocumentsLayout = () => {
  const { t } = useTranslation()
  const documents = [
    { id: 1, name: 'Contrat_CDID_Dupont.pdf', type: 'Contrat', employee: 'Jean Dupont', uploadDate: '2024-01-15', size: '2.4 MB', category: 'pdf' },
    { id: 2, name: 'CACES_1A_Certificat.pdf', type: 'CACES', employee: 'Marie Martin', uploadDate: '2023-11-20', size: '1.8 MB', category: 'pdf' },
    { id: 3, name: 'Visite_Medicale_Initial.pdf', type: 'Visite médicale', employee: 'Pierre Bernard', uploadDate: '2024-01-10', size: '945 KB', category: 'pdf' },
    { id: 4, name: 'Photo_Identification.jpg', type: 'Identification', employee: 'Sophie Petit', uploadDate: '2023-09-15', size: '2.1 MB', category: 'image' },
  ]

  // KPIs
  const kpis = {
    totalDocuments: documents.length,
    pdfDocuments: documents.filter(d => d.category === 'pdf').length,
    imageDocuments: documents.filter(d => d.category === 'image').length,
    thisMonth: 2
  }

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'pdf': return <FileIcon2 className="h-5 w-5 text-red-600" />
      case 'spreadsheet': return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case 'image': return <FileImage className="h-5 w-5 text-blue-600" />
      default: return <FileIcon className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><FileIcon2 className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('documents.title')}</h2></div>
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
                    <span className="font-medium">{t('documents.title')}</span> - {kpis.totalDocuments} {t('documents.name').toLowerCase()}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('documents.name')}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">Total documents</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">PDF</CardTitle>
                <FileIcon2 className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.pdfDocuments}</div>
                <p className="text-xs text-muted-foreground">{((kpis.pdfDocuments / kpis.totalDocuments) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">Images</CardTitle>
                <FileImage className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.imageDocuments}</div>
                <p className="text-xs text-muted-foreground">{((kpis.imageDocuments / kpis.totalDocuments) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
                <Upload className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.thisMonth}</div>
                <p className="text-xs text-muted-foreground">Nouveaux</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('documents.search')}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            <Button className="gap-2 ml-auto"><Upload className="h-4 w-4" />{t('documents.addDocument')}</Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('documents.name')}</TableHead>
                  <TableHead>{t('documents.type')}</TableHead>
                  <TableHead>{t('caces.employee')}</TableHead>
                  <TableHead>{t('caces.date')}</TableHead>
                  <TableHead>{t('documents.name')} (Taille)</TableHead>
                  <TableHead className="text-right">{t('employees.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(doc.category)}</div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge>{doc.type}</Badge></TableCell>
                    <TableCell className="text-gray-700">{doc.employee}</TableCell>
                    <TableCell className="text-gray-700">{doc.uploadDate}</TableCell>
                    <TableCell className="text-gray-700">{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button>
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
