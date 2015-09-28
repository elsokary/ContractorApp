using DataContext.DBModel;
using Interface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel.DTOModel;

namespace DataServices.Repository
{
    public class ContactsLoanRepository : GenericRepository<SharktyContext, contactsLoans>, IContactsLoanRepository
    {
        public List<DtoContactLoan> selectAll()
        {
            var result = (from c in Context.contactsLoans
                          select new DtoContactLoan
                          {
                              id = c.id,
                              contactName = c.contactName,
                              phone = c.phone,
                              email = c.email,
                              address = c.address
                          }).ToList();
            return result;
        }
    }
}
