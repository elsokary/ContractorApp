 
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
    public class ChequesRepository : GenericRepository<SharktyContext, cheques>, IChequesRepository
    {

        public List<DtoCheques> selectAllByProject(int projectId)
        {
            var list = new List<DtoCheques>();

            list = (from q in Context.cheques.Include("projects").Include("companies")
                    where q.projectId == projectId
                    select new DtoCheques
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        chequeTotal = q.chequeTotal,
                        taxes = q.taxes,
                        total = q.total,
                        chequeNumber = q.chequeNumber,
                        bankName = q.bankName,
                        branch = q.branch,
                        chequeDate = q.chequeDate,
                        notes = q.notes,
                        status = q.status,
                        companyId = q.companyId,
                        companyName = q.companies.companyName
                    }).ToList();
            return list;
        }

        public DtoCheques selectById(int id, string lang)
        {
            var list = new DtoCheques();
            if (lang == "en")
            {
                list = (from q in Context.cheques
                        where q.id == id
                        select new DtoCheques
                        {
                            projectId = q.projectId,
                            chequeTotal = q.chequeTotal,
                            taxes = q.taxes,
                            total = q.total,
                            chequeNumber = q.chequeNumber,
                            bankName = q.bankName,
                            branch = q.branch,
                            chequeDate = q.chequeDate,
                            notes = q.notes,
                            status = q.status,
                            companyId = q.companyId,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.cheques
                        where q.id == id
                        select new DtoCheques
                        {
                            projectId = q.projectId,
                            chequeTotal = q.chequeTotal,
                            taxes = q.taxes,
                            total = q.total,
                            chequeNumber = q.chequeNumber,
                            bankName = q.bankName,
                            branch = q.branch,
                            chequeDate = q.chequeDate,
                            notes = q.notes,
                            status = q.status,
                            companyId = q.companyId,
                        }).FirstOrDefault();
            } return list;
        }

        public List<DtoCheques> selectByCompany(int company, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoCheques>();

            list = (from q in Context.cheques.Include("projects").Include("companies")
                    where q.companyId == company
                          && q.chequeDate >= startDate && q.chequeDate <= finishDate
                    select new DtoCheques
                    {
                        projectName = q.projects.projectName,
                        chequeTotal = q.chequeTotal,
                        taxes = q.taxes,
                        total = q.total,
                        chequeNumber = q.chequeNumber,
                        bankName = q.bankName,
                        branch = q.branch,
                        chequeDate = q.chequeDate,
                        notes = q.notes,
                        status = q.status,
                        companyName = q.companies.companyName
                    }).ToList().OrderBy(x => x.chequeDate).ToList();

            return list;
        }



    }
}

