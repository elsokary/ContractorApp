using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface.IDataService
{
    public interface IAccountantsRepository : IGenericRepository<accounters>
    {
        List<DtoFinancialcustody> getfinancialCustody();
        List<DtoFinancialcustody> getfinancialCustodyByProject(int projectId, DateTime startDate, DateTime finishDate);
        List<DtoFinancialcustody> getfinancialCustodyByAccountant(int accountantId, DateTime startDate, DateTime finishDate);
    }
}
