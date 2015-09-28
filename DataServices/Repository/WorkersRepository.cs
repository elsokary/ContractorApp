using DataContext.DBModel;
using DataModel.DTOModel;
using Interface.IDataService;
using System;
using System.Collections.Generic; 
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class WorkersRepository : GenericRepository<SharktyContext, workers>, IWorkersRepository
    {
        public List<DtoWorkertimesheet> SelectAllByProject(int projectId)
        {
            var list = new List<DtoWorkertimesheet>();

            list = (from q in Context.projectsWorkers.Include("workers")
                    where q.projectId == projectId
                    select new DtoWorkertimesheet
                    {
                        id = q.id,
                        workerId = q.workerId,
                        workerName = q.workers.fullname + " " + q.workers.workerTypes.title + " " + q.workers.daySalary,
                        unitPrice = q.workers.daySalary,
                        projectId = q.projectId,
                        projectName = q.projects.projectName
                    }).ToList();
            return list;
        }
        public List<DtoWorkers> SelectAll()
        {
            var list = new List<DtoWorkers>();

            list = (from q in Context.workers
                    select new DtoWorkers
                    {
                        id = q.id,
                       // fullname = q.fullname,
                        fullname = q.fullname + " " + q.workerTypes.title + " " + q.daySalary,
                        daySalary = q.daySalary,
                        workerTypeName = q.workerTypes.title,
                        address = q.address,
                        phone = q.phone,
                        socialCardNumber = q.socialCardNumber
                    }).ToList();
            return list;
        }

        public List<DtoWorkertimesheet> getWorkersLoansByProjectId(int projectId)
        {
            var list = new List<DtoWorkertimesheet>();

            list = (from q in Context.projectsWorkers.Include("workers")
                    let loan = Context.workerLoans.Where(x => x.workerId == q.workerId).Select(x => x.total).ToList().Sum()
                    where q.projectId == projectId
                    select new DtoWorkertimesheet
                    {
                        id = q.id,
                        workerId = q.workerId,
                        //workerName = q.workers.fullname,
                        workerName = q.workers.fullname + " " + q.workers.workerTypes.title + " " + q.workers.daySalary,
                        unitPrice = q.workers.daySalary,
                        total = loan ?? 0,
                        projectId = q.projectId,
                        projectName = q.projects.projectName
                    }).ToList();
            return list;
        }

        public List<DtoWorkertimesheet> getSalaryForWorkersByProject(int projectId, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoWorkertimesheet>();
            if (projectId != 0)
            {
                list = (from q in Context.workers
                        //join l in Context.workerLoans on q.id equals l.workerId
                        let loan = Context.workerLoans.Where(x => x.workerId == q.id && x.workDate >= startDate && x.workDate <= finishDate && x.projectId == projectId).Select(x => x.total).ToList().Sum()
                        join x in Context.workerTimeSheet on q.id equals x.workerId
                        where x.projectId == projectId && x.workDate >= startDate && x.workDate <= finishDate //&& l.workDate >= startDate && l.workDate <= finishDate

                        group x by new { q.id, q.fullname, q.daySalary, loan, q.workerTypeId } into g1
                        select new DtoWorkertimesheet
                        {
                            workerId = g1.Key.id,
                            workerTypeId = g1.Key.workerTypeId,
                            workerName = g1.Key.fullname,
                            unitPrice = g1.Key.daySalary,
                            loans = g1.Key.loan ?? 0,
                            totalDays = g1.Sum(i => i.quantity),
                            total = g1.Sum(i => i.total),
                            remaining = (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan) ?? 0) >= 0 ? (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan)) : 0,
                            credit = (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan) ?? 0) < 0 ? (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan)) : 0
                        }).OrderBy(q => q.workerId).ToList();
            }
            else
            {
                list = (from q in Context.workers
                        //join l in Context.workerLoans on q.id equals l.workerId
                        let loan = Context.workerLoans.Where(x => x.workerId == q.id && x.workDate >= startDate && x.workDate <= finishDate).Select(x => x.total).ToList().Sum()
                        join x in Context.workerTimeSheet on q.id equals x.workerId
                        where x.workDate >= startDate && x.workDate <= finishDate

                        group x by new { q.id, q.fullname, q.daySalary, loan, q.workerTypeId } into g1
                        select new DtoWorkertimesheet
                        {
                            workerId = g1.Key.id,
                            workerTypeId = g1.Key.workerTypeId,
                            workerName = g1.Key.fullname,
                            unitPrice = g1.Key.daySalary,
                            loans = g1.Key.loan ?? 0,
                            totalDays = g1.Sum(i => i.quantity),
                            total = g1.Sum(i => i.total),
                            remaining = (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan) ?? 0) >= 0 ? (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan)) : 0,
                            credit = (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan) ?? 0) < 0 ? (g1.Sum(i => i.total) - (g1.Key.loan == null ? 0 : g1.Key.loan)) : 0
                        }).OrderBy(q => q.workerId).ToList();
            }



            return list;
        }
        public List<DtoWorkertimesheet> getSalaryForWorkersByWorkerId(int workerId, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoWorkertimesheet>();

            list = (from q in Context.workerTimeSheet.Include("workers").Include("projects.projectName").Where(x => x.workerId == workerId)
                    let loan = Context.workerLoans.FirstOrDefault(x => x.workerId == q.workerId && x.workDate == q.workDate).total
                    where q.workDate >= startDate && q.workDate <= finishDate
                    select new DtoWorkertimesheet
                    {
                        unitPrice = q.workers.daySalary,
                        projectName = q.projects.projectName,
                        loans = loan ?? 0,
                        quantity = q.quantity,
                        workDate = q.workDate,
                        total = q.workers.daySalary * q.quantity,
                        // dayName =  (SqlFunctions.DatePart("dw", q.workDate).ToString()).ToString(),
                        remaining = ((q.workers.daySalary ?? 0) * (q.quantity ?? 0)) - (loan ?? 0)
                    }).ToList();

            foreach (DtoWorkertimesheet item in list)
            {
                item.dayName = item.workDate.Value.DayOfWeek.ToString();
            }
            return list;
        }

    }
}
