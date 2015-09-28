 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;



namespace DataServices.Repository
{
    public class LoansItemsRepository : GenericRepository<SharktyContext, loansItems>, ILoansItemsRepository
    {

        public List<DtoLoansItems> selectAll()
        {
            var list = new List<DtoLoansItems>();

            list = (from q in Context.loansItems
                    let contactName = Context.contactsLoans.FirstOrDefault(x => x.id == q.contactId)
                    select new DtoLoansItems
                    {
                        id = q.id,
                        value = q.value,
                        byWho = q.byWho,
                        dueDate = q.dueDate,
                        fullName = contactName.contactName ?? "", //q.loans.fullName,
                        notes = q.notes
                    }).ToList();

            return list;
        }


        public DtoLoansItems selectById(int id, string lang)
        {
            var list = new DtoLoansItems();
            if (lang == "en")
            {
                list = (from q in Context.loansItems
                        where q.id == id
                        select new DtoLoansItems
                        {
                            id = q.id,
                            value = q.value,
                            byWho = q.byWho,
                            dueDate = q.dueDate,
                            fullName = q.loans.fullName,
                            notes = q.notes
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.loansItems
                        where q.id == id
                        select new DtoLoansItems
                        {
                            id = q.id,
                            value = q.value,
                            byWho = q.byWho,
                            dueDate = q.dueDate,
                            fullName = q.loans.fullName,
                            notes = q.notes
                        }).FirstOrDefault();
            }
            return list;
        }


        public List<DtoLoansItems> selectByLoanId()
        {
            throw new NotImplementedException();
        }
    }
}

