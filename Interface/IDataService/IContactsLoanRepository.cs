using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface.IDataService
{
    public interface IContactsLoanRepository : IGenericRepository<contactsLoans>
    {
        List<DtoContactLoan> selectAll();
    }
}
