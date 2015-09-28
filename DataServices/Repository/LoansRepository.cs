using System.Data.Entity.Core.Objects;
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
    public class LoansRepository : GenericRepository<SharktyContext, loans>, ILoansRepository
    {

        public List<DtoLoans> selectAll()
        {
            var list = new List<DtoLoans>();

            list = (from q in Context.loans
                    let contactName = Context.contactsLoans.FirstOrDefault(x => x.id == q.contactId)
                    select new DtoLoans
                    {
                        id = q.id,
                        fullName = q.fullName,
                        loanDate = q.loanDate,
                        loanValue = q.loanValue,
                        payed = q.payed,
                        balance = q.balance,
                        dueDate = q.dueDate,
                        notes = q.notes,
                        contactName = contactName.contactName ?? ""

                    }).ToList();

            return list;
        }

        public DtoLoans selectById(int id, string lang)
        {
            var list = new DtoLoans();
            if (lang == "en")
            {
                list = (from q in Context.loans
                        where q.id == id
                        select new DtoLoans
                        {
                            fullName = q.fullName,
                            loanDate = q.loanDate,
                            loanValue = q.loanValue,
                            payed = q.payed,
                            balance = q.balance,
                            dueDate = q.dueDate,
                            notes = q.notes,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.loans
                        where q.id == id
                        select new DtoLoans
                        {
                            fullName = q.fullName,
                            loanDate = q.loanDate,
                            loanValue = q.loanValue,
                            payed = q.payed,
                            balance = q.balance,
                            dueDate = q.dueDate,
                            notes = q.notes,
                        }).FirstOrDefault();
            } return list;
        }

        public List<DtoLoans> getLoansByContacts(int contactId)
        {
            var list = new List<DtoLoans>();

            list = (from q in Context.loans.Where(x => x.contactId == contactId)
                    let contactName = Context.contactsLoans.FirstOrDefault(x => x.id == q.contactId)
                    select new DtoLoans
                    {
                        id = q.id,
                        fullName = q.fullName,
                        status = q.status != false ? "Progress" : "Payed",
                        loanDate = q.loanDate,
                        loanValue = q.loanValue,
                        payed = q.payed,
                        balance = q.balance,
                        dueDate = q.dueDate,
                        notes = q.notes,
                        contactName = contactName.contactName ?? ""

                    }).ToList();

            return list;
        }

        public List<DtoLoans> getLoansItemsByContacts(int contactId)
        {
            var list = new List<DtoLoans>();

            list = (from q in Context.loansItems.Where(x => x.contactId == contactId)
                    let contactName = Context.contactsLoans.FirstOrDefault(x => x.id == q.contactId)
                    select new DtoLoans
                    {
                        id = q.id,
                        payed = q.value,
                        fullName = q.byWho,
                        dueDate = q.dueDate,
                        notes = q.notes,
                        contactName = contactName.contactName ?? ""

                    }).ToList();

            return list;
        }


    }
}

