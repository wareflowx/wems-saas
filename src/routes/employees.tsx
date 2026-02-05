import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Plus, Trash2, Eye, Edit, UserPlus, Users, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { useState, useMemo, useEffect } from 'react'
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
import { CreateEmployeeDialog } from '@/components/employees/CreateEmployeeDialog'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/employees')({
  component: EmployeesLayout,
})

const EmployeesLayout = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const itemsPerPage = 10

  const employees = [
    { id: 1, firstName: 'Jean', lastName: 'Dupont', department: 'Production', jobTitle: 'Opérateur', status: 'active', startDate: '2023-01-15' },
    { id: 2, firstName: 'Marie', lastName: 'Martin', department: 'Administration', jobTitle: 'Comptable', status: 'active', startDate: '2022-06-01' },
    { id: 3, firstName: 'Pierre', lastName: 'Bernard', department: 'Production', jobTitle: 'Technicien', status: 'on_leave', startDate: '2021-03-10' },
    { id: 4, firstName: 'Sophie', lastName: 'Petit', department: 'RH', jobTitle: 'Responsable RH', status: 'active', startDate: '2020-09-20' },
    { id: 5, firstName: 'Luc', lastName: 'Dubois', department: 'Production', jobTitle: 'Opérateur', status: 'active', startDate: '2024-01-08' },
  ]

  // KPIs
  const kpis = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    onLeaveEmployees: employees.filter(e => e.status === 'on_leave').length,
    newHiresThisMonth: 3
  }

  // Get unique departments and statuses
  const uniqueDepartments = useMemo(() => {
    const departments = new Set(employees.map((e) => e.department))
    return Array.from(departments)
  }, [employees])

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(employees.map((e) => e.status))
    return Array.from(statuses)
  }, [employees])

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        search === '' ||
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase())

      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [employees, search, departmentFilter, statusFilter])

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, departmentFilter, statusFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-500">
            {t('employees.active')}
          </span>
        )
      case 'on_leave':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
            {t('employees.onLeave')}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-500/10 border border-gray-500/20 text-gray-500">
            {status}
          </span>
        )
    }
  }

  return (
    <>
      <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Users className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('employees.title')}</h2></div>
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
                      <span className="font-medium">{t('employees.title')}</span> - {kpis.totalEmployees} {t('dashboard.totalEmployees')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">{t('common.search')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">{kpis.activeEmployees} {t('employees.active')}</p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">{t('employees.active')}</CardTitle>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">{kpis.activeEmployees}</div>
                  <p className="text-xs text-muted-foreground">{((kpis.activeEmployees / kpis.totalEmployees) * 100).toFixed(0)}% {t('common.search').toLowerCase()}</p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">{t('employees.onLeave')}</CardTitle>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">{kpis.onLeaveEmployees}</div>
                  <p className="text-xs text-muted-foreground">{((kpis.onLeaveEmployees / kpis.totalEmployees) * 100).toFixed(0)}% {t('common.search').toLowerCase()}</p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">{t('dashboard.newHires')}</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">{kpis.newHiresThisMonth}</div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.thisMonth')}</p>
                </CardContent>
              </Card>
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
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('employees.department')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t('employeeDetail.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'active' ? t('employees.active') : status === 'on_leave' ? t('employees.onLeave') : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="gap-2 ml-auto" onClick={() => setIsCreateDialogOpen(true)}><UserPlus className="h-4 w-4" />{t('employees.addEmployee')}</Button>
            </div>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('employeeDetail.fullName')}</TableHead>
                    <TableHead>{t('employees.department')}</TableHead>
                    <TableHead>{t('employees.position')}</TableHead>
                    <TableHead>{t('employeeDetail.status')}</TableHead>
                    <TableHead>{t('employeeDetail.startDate')}</TableHead>
                    <TableHead className="text-right">{t('employees.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Link to={`/employees_/${employee.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">{employee.firstName[0]}{employee.lastName[0]}</div>
                          <div>
                            <p className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</p>
                            <p className="text-sm text-gray-500">ID: EMP-{employee.id.toString().padStart(4, '0')}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-gray-700">{employee.department}</TableCell>
                      <TableCell className="text-gray-700">{employee.jobTitle}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell className="text-gray-700">{employee.startDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('common.view')} de {startIndex + 1} à {Math.min(endIndex, filteredEmployees.length)} sur {filteredEmployees.length} employés
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}>
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
    </>
  )
}
