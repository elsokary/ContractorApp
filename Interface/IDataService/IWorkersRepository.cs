using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface.IDataService
{
    public interface IWorkersRepository : IGenericRepository<workers>
    {
        List<DtoWorkertimesheet> SelectAllByProject(int projectId);
        List<DtoWorkertimesheet> getWorkersLoansByProjectId(int projectId);
        List<DtoWorkers> SelectAll();

        List<DtoWorkertimesheet> getSalaryForWorkersByProject(int projectId, DateTime startDate, DateTime finishDate);
        List<DtoWorkertimesheet> getSalaryForWorkersByWorkerId(int workerId, DateTime startDate, DateTime finishDate);
    }
}
