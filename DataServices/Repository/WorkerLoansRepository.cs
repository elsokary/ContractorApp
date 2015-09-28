
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;
using DataContext.DBModel;
using Interface.IDataService;
using DataModel.DTOModel;



namespace DataServices.Repository
{
    public class WorkerloansRepository : GenericRepository<SharktyContext, workerLoans>, IWorkerloansRepository
    {

        public IQueryable<DtoWorkerloans> selectAll(int projectId, string lang)
        {
            var list = new List<DtoWorkerloans>();
            if (lang == "en")
            {
                list = (from q in Context.workerLoans

                        select new DtoWorkerloans
                        {
                            workerId = q.workerId,
                            workDate = q.workDate,
                            total = q.total,
                            notes = q.notes,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.workerLoans

                        select new DtoWorkerloans
                        {
                            workerId = q.workerId,
                            workDate = q.workDate,
                            total = q.total,
                            notes = q.notes,
                        }).ToList();
            } return list.AsQueryable();
        }
        public List<DtoWorkerloans> selectAll()
        {
            var list = new List<DtoWorkerloans>();
            list = (from q in Context.workerLoans
                    join w in Context.workers on q.workerId equals w.id
                    select new DtoWorkerloans
                    {
                        id = q.id,
                        workerId = q.workerId,
                        workDate = q.workDate,
                        total = q.total,
                        notes = q.notes,
                        workerName = w.fullname
                    }).ToList();


            return list;
        }

        public DtoWorkerloans selectById(int id)
        {
            var list = new DtoWorkerloans();
            list = (from q in Context.workerLoans
                    where q.id == id
                    select new DtoWorkerloans
                    {
                        id = q.id,
                        projectId = q.projectId,
                        workerId = q.workerId,
                        workDate = q.workDate,
                        total = q.total,
                        notes = q.notes,
                    }).FirstOrDefault();

            return list;
        }




    }
}

