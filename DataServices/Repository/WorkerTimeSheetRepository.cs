 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataContext.DBModel;
using DataServices.Repository;
using DataModel.DTOModel;
using Interface.IDataService;



namespace DataServices.Repository
{
    public class WorkertimesheetRepository : GenericRepository<SharktyContext, workerTimeSheet>, IWorkertimesheetRepository
    {

        public List<DtoWorkertimesheet> selectAll(int workerId)
        {
            var list = new List<DtoWorkertimesheet>();

            list = (from q in Context.workerTimeSheet.Include("projects")
                    let loan = Context.workerLoans.FirstOrDefault(x => x.workerId == q.workerId && x.workDate == q.workDate).total
                    where q.workerId == workerId
                    select new DtoWorkertimesheet
                    {
                        id = q.id,
                        workerId = q.workerId,
                        workerName = q.workers.fullname,
                        workDate = q.workDate,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        loans = loan,
                        notes = q.notes,
                    }).ToList();
            return list;
        }
        public List<DtoWorkertimesheet> selectAll()
        {
            var list = new List<DtoWorkertimesheet>();


            list = (from q in Context.workerTimeSheet.Include("projects")
                    let loan = Context.workerLoans.FirstOrDefault(x => x.workerId == q.workerId && x.workDate == q.workDate).total
                    select new DtoWorkertimesheet
                    {
                        id = q.id,
                        workerId = q.workerId,
                        workerName = q.workers.fullname,
                        workDate = q.workDate,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        loans = loan != null ? loan : 0,
                        notes = q.notes,
                    }).ToList().OrderByDescending(x => x.id).ToList();
            return list;
        }

        public DtoWorkertimesheet selectById(int id)
        {
            var list = new DtoWorkertimesheet();

            list = (from q in Context.workerTimeSheet
                    let loan = Context.workerLoans.Where(x => x.workerId == q.workerId && x.workDate == q.workDate).Select(x => x.total).ToList().Sum()
                    where q.id == id
                    select new DtoWorkertimesheet
                    {
                        id = q.id,
                        workerId = q.workerId,
                        workDate = q.workDate,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        projectId = q.projectId,
                        notes = q.notes,
                        loans = loan
                    }).FirstOrDefault();
            return list;
        }




    }
}

